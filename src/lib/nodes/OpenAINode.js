import fetch from 'node-fetch';

export async function executeOpenAINode(nodeConfig, credentials) {
    const apiKey = credentials.openaiApiKey;
    if (!apiKey) {
        throw new Error("No OpenAI API key found.");
    }

    const prompt = nodeConfig.prompt || "Hello, OpenAI!";
    const model = nodeConfig.model || "text-davinci-003";
    const maxTokens = nodeConfig.maxTokens || 100;

    const url = `https://api.openai.com/v1/engines/${model}/completions`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({ prompt, max_tokens: maxTokens })
    });

    const result = await response.json();
    if (!response.ok) {
        const errorMessage = `OpenAI error: ${result.error.message}`;
        console.error(errorMessage);
        throw new Error(errorMessage);
    }
    return result;
}
