import fs from "fs";
import path from "path";
import cron from "node-cron";
import chokidar from 'chokidar';

const filePath = path.join(process.cwd(), "src", "data", "workflows.json");

function loadWorkflows() {
    if (!fs.existsSync(filePath)) return [];
    const data = fs.readFileSync(filePath, "utf-8");
    try {
        return JSON.parse(data);
    } catch {
        return [];
    }
}

function saveWorkflows(workflows) {
    fs.writeFileSync(filePath, JSON.stringify(workflows, null, 2), "utf-8");
}

// Function to schedule a workflow with a cron expression
function scheduleWorkflow(workflowId, cronExpression) {
    cron.schedule(cronExpression, () => {
        console.log(`Executing workflow: ${workflowId}`);
        // Add logic to execute the workflow
    });
}

// Function to trigger a workflow at regular intervals
function intervalTrigger(workflowId, interval) {
    setInterval(() => {
        console.log(`Interval trigger for workflow: ${workflowId}`);
        executeWorkflow(workflowId);
    }, interval);
}

// Function to watch a directory for file changes
function fileSystemTrigger(workflowId, directory) {
    const watcher = chokidar.watch(directory, { persistent: true });

    watcher
        .on('add', path => {
            console.log(`File ${path} has been added`);
            executeWorkflow(workflowId);
        })
        .on('change', path => {
            console.log(`File ${path} has been changed`);
            executeWorkflow(workflowId);
        })
        .on('unlink', path => {
            console.log(`File ${path} has been removed`);
            executeWorkflow(workflowId);
        });
}

// Function to execute a workflow
function executeWorkflow(workflowId) {
    // Add logic to execute the workflow
    console.log(`Executing workflow: ${workflowId}`);
}

export default function handler(req, res) {
    const { method, url } = req;

    if (url.startsWith('/api/webhook')) {
        const workflowId = url.split('/').pop(); // Extract workflow ID from URL
        console.log(`Webhook triggered for workflow: ${workflowId}`);
        executeWorkflow(workflowId);
        return res.status(200).json({ message: "Workflow triggered by webhook" });
    }

    switch (method) {
        case "GET": {
            const workflows = loadWorkflows();
            return res.status(200).json(workflows);
        }
        case "POST": {
            try {
                const { id, name, nodes, edges, cronExpression, interval, directory } = req.body;
                let workflows = loadWorkflows();

                if (id) {
                    // Update existing if found
                    const idx = workflows.findIndex((w) => w.id === id);
                    if (idx > -1) {
                        workflows[idx] = { id, name, nodes, edges };
                        if (cronExpression) {
                            scheduleWorkflow(id, cronExpression);
                        }
                        if (interval) {
                            intervalTrigger(id, interval);
                        }
                        if (directory) {
                            fileSystemTrigger(id, directory);
                        }
                    } else {
                        // Or add new if not found
                        workflows.push({ id, name, nodes, edges });
                    }
                } else {
                    // Create new
                    const newId = `wf_${Date.now()}`;
                    workflows.push({ id: newId, name, nodes, edges });
                    if (cronExpression) {
                        scheduleWorkflow(newId, cronExpression);
                    }
                    if (interval) {
                        intervalTrigger(newId, interval);
                    }
                    if (directory) {
                        fileSystemTrigger(newId, directory);
                    }
                }

                saveWorkflows(workflows);
                return res
                    .status(200)
                    .json({ message: "Workflow saved/updated" });
            } catch (err) {
                console.error(err);
                return res.status(500).json({ error: "Error saving workflow" });
            }
        }
        case "POST /manual": {
            const { workflowId } = req.body;
            console.log(`Manual trigger for workflow: ${workflowId}`);
            executeWorkflow(workflowId);
            return res.status(200).json({ message: "Workflow manually triggered" });
        }
        default:
            res.setHeader("Allow", ["GET", "POST"]);
            return res.status(405).end(`Method ${method} Not Allowed`);
    }
}
