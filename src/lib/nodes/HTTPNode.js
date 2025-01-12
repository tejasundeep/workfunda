import axios from 'axios';

export async function executeHTTPNode(config) {
    const { 
        method = 'GET',
        url,
        headers = {},
        body,
        authentication,
        responseType = 'auto',
        returnFullResponse = false
    } = config;

    if (!url) {
        throw new Error('URL is required');
    }

    try {
        // Prepare headers with authentication
        const requestHeaders = { ...headers };
        if (authentication) {
            if (authentication.type === 'basic') {
                const credentials = Buffer.from(`${authentication.username}:${authentication.password}`).toString('base64');
                requestHeaders['Authorization'] = `Basic ${credentials}`;
            } else if (authentication.type === 'bearer') {
                requestHeaders['Authorization'] = `Bearer ${authentication.token}`;
            }
        }

        // Prepare request config
        const requestConfig = {
            method: method.toLowerCase(),
            url,
            headers: requestHeaders,
            validateStatus: null // Don't throw on any status
        };

        // Add body for non-GET requests
        if (method !== 'GET' && body) {
            requestConfig.data = typeof body === 'string' ? JSON.parse(body) : body;
        }

        const response = await axios(requestConfig);

        // Parse response based on content type
        let parsedData;
        const contentType = response.headers['content-type'] || '';
        
        if (responseType === 'auto') {
            if (contentType.includes('application/json')) {
                parsedData = response.data;
            } else if (contentType.includes('text/')) {
                parsedData = { content: response.data };
            } else {
                parsedData = { content: response.data, binary: true };
            }
        } else if (responseType === 'string') {
            parsedData = { content: String(response.data) };
        } else if (responseType === 'buffer') {
            parsedData = { content: response.data, binary: true };
        } else {
            parsedData = response.data;
        }

        // Return full response or just the data
        return returnFullResponse ? {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
            data: parsedData
        } : parsedData;

    } catch (error) {
        const errorResponse = {
            message: error.message,
            code: error.code,
            status: error.response?.status,
            statusText: error.response?.statusText,
            headers: error.response?.headers,
            data: error.response?.data
        };
        throw new Error(JSON.stringify(errorResponse));
    }
}
