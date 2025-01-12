import fs from "fs";
import path from "path";

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

export default function handler(req, res) {
    const { method } = req;

    switch (method) {
        case "GET": {
            const workflows = loadWorkflows();
            return res.status(200).json(workflows);
        }
        case "POST": {
            try {
                const { id, name, nodes, edges } = req.body;
                let workflows = loadWorkflows();

                if (id) {
                    // Update existing if found
                    const idx = workflows.findIndex((w) => w.id === id);
                    if (idx > -1) {
                        workflows[idx] = { id, name, nodes, edges };
                    } else {
                        // Or add new if not found
                        workflows.push({ id, name, nodes, edges });
                    }
                } else {
                    // Create new
                    const newId = `wf_${Date.now()}`;
                    workflows.push({ id: newId, name, nodes, edges });
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
        default:
            res.setHeader("Allow", ["GET", "POST"]);
            return res.status(405).end(`Method ${method} Not Allowed`);
    }
}
