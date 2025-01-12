import fs from "fs";
import path from "path";
import { executeSlackNode } from "../../../../lib/nodes/SlackNode";
import { executeTelegramNode } from "../../../../lib/nodes/TelegramNode";
import { executeEmailNode } from "../../../../lib/nodes/EmailNode";
import { validateSchedule, scheduleWorkflow, cancelSchedule } from "../../../../lib/nodes/SchedulerNode";
import { executeHTTPNode } from "../../../../lib/nodes/HTTPNode";
import { executeTransformNode } from "../../../../lib/nodes/TransformNode";
import { executeSplitNode, executeMergeNode } from "../../../../lib/nodes/SplitMergeNode";
import { executeCompareNode } from "../../../../lib/nodes/CompareNode";
import { executeSwitchNode } from "../../../../lib/nodes/SwitchNode";
import { executeFunctionNode } from "../../../../lib/nodes/FunctionNode";
import { executeSetNode } from "../../../../lib/nodes/SetNode";

const filePath = path.join(process.cwd(), "src", "data", "workflows.json");

function loadWorkflows() {
    if (!fs.existsSync(filePath)) return [];
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
}

function getCredentials() {
    return {
        slackToken: process.env.SLACK_BOT_TOKEN || "",
        telegramBotToken: process.env.TELEGRAM_BOT_TOKEN || "",
        emailHost: process.env.EMAIL_HOST || "",
        emailPort: parseInt(process.env.EMAIL_PORT || "587"),
        emailUser: process.env.EMAIL_USER || "",
        emailPass: process.env.EMAIL_PASS || "",
    };
}

async function executeNode(node, inputData, credentials) {
    const nodeType = node.data.nodeType;
    const config = node.data.config || {};
    let result;

    try {
        switch (nodeType) {
            case "slack":
                await executeSlackNode(config, credentials);
                result = inputData;
                break;

            case "telegram":
                await executeTelegramNode(config, credentials);
                result = inputData;
                break;

            case "email":
                await executeEmailNode(config, credentials);
                result = inputData;
                break;

            case "http":
                result = await executeHTTPNode(config);
                break;

            case "transform":
                result = await executeTransformNode(config, inputData);
                break;

            case "split":
                result = await executeSplitNode(config, inputData);
                break;

            case "merge":
                result = await executeMergeNode(config, inputData);
                break;

            case "compare":
                result = await executeCompareNode(config, inputData);
                break;

            case "switch":
                result = await executeSwitchNode(config, inputData);
                break;

            case "function":
                result = await executeFunctionNode(config, inputData);
                break;

            case "set":
                result = await executeSetNode(config, inputData);
                break;

            default:
                console.log(`Unknown node type: ${nodeType}`);
                result = inputData;
        }

        return result;
    } catch (error) {
        console.error(`Error executing ${nodeType} node:`, error);
        throw error;
    }
}

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { id } = req.query;
    const workflows = loadWorkflows();
    const workflow = workflows.find((w) => w.id === id);

    if (!workflow) {
        return res.status(404).json({ error: "Workflow not found" });
    }

    const { nodes, edges } = workflow;
    const credentials = getCredentials();

    // Find scheduler node if exists
    const schedulerNode = nodes.find(node => node.data.nodeType === 'scheduler');
    if (schedulerNode) {
        try {
            validateSchedule(schedulerNode.data.config);
            
            // Schedule the workflow execution
            const executeWorkflow = async () => {
                let nodeResults = new Map();
                
                // Execute nodes in sequence, following edges
                for (let node of nodes) {
                    if (node.data.nodeType === 'scheduler') continue;
                    
                    // Get input data from previous nodes
                    const incomingEdges = edges.filter(e => e.target === node.id);
                    const inputData = incomingEdges.map(e => nodeResults.get(e.source)).filter(Boolean);
                    
                    // Execute node with input data
                    const result = await executeNode(node, inputData.length ? inputData : null, credentials);
                    nodeResults.set(node.id, result);
                }
            };

            scheduleWorkflow(id, schedulerNode.data.config, executeWorkflow);
            return res.status(200).json({ message: "Workflow scheduled successfully" });
        } catch (error) {
            console.error('Scheduler error:', error);
            return res.status(400).json({ error: error.message });
        }
    }

    // If no scheduler node, execute normally
    try {
        let nodeResults = new Map();
        
        // Execute nodes in sequence, following edges
        for (let node of nodes) {
            // Get input data from previous nodes
            const incomingEdges = edges.filter(e => e.target === node.id);
            const inputData = incomingEdges.map(e => nodeResults.get(e.source)).filter(Boolean);
            
            // Execute node with input data
            const result = await executeNode(node, inputData.length ? inputData : null, credentials);
            nodeResults.set(node.id, result);
        }

        return res.status(200).json({ message: "Workflow executed successfully" });
    } catch (error) {
        console.error('Execution error:', error);
        return res.status(500).json({ error: error.message });
    }
}
