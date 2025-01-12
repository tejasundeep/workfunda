import { WebClient } from "@slack/web-api";

export async function executeSlackNode(nodeConfig, credentials) {
    // nodeConfig might have { channel, text }
    const token = credentials.slackToken; // from process.env or wherever
    if (!token) {
        throw new Error("No Slack bot token found.");
    }

    const channel = nodeConfig.channel || "general";
    const text = nodeConfig.text || "Hello from Slack Node!";
    const client = new WebClient(token);

    const result = await client.chat.postMessage({ channel, text });
    return result;
}
