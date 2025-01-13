import fetch from "node-fetch";

export async function executeTelegramNode(nodeConfig, credentials) {
    // nodeConfig might have { chatId, text }
    const token = credentials.telegramBotToken;
    if (!token) {
        throw new Error("No Telegram bot token found.");
    }

    const chatId = nodeConfig.chatId || "YOUR_CHAT_ID";
    const text = nodeConfig.text || "Hello from Telegram Node!";

    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text }),
    });

    const result = await response.json();
    if (!result.ok) {
        const errorMessage = `Telegram error: ${result.description}`;
        console.error(errorMessage);
        throw new Error(errorMessage);
    }
    return result;
}
