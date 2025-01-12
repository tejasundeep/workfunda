export async function executeFunctionNode(config, inputData) {
    const { code, returnAll } = config;

    if (!code) {
        throw new Error('No function code provided');
    }

    try {
        // Create a context object with helper functions
        const context = {
            helpers: {
                formatDate: (date) => new Date(date).toISOString(),
                parseJSON: (str) => JSON.parse(str),
                stringify: (obj) => JSON.stringify(obj),
            },
            workflowData: {
                timestamp: new Date().toISOString(),
            }
        };

        // Convert input data to array if it's not already
        const items = Array.isArray(inputData) ? inputData : [inputData];
        
        // Create the function with sandbox
        const processFn = new Function('item', 'context', code);
        
        // Process each item
        const processedItems = await Promise.all(
            items.map(async (item) => {
                try {
                    return await processFn(item, context);
                } catch (error) {
                    console.error('Error processing item:', error);
                    throw new Error(`Error processing item: ${error.message}`);
                }
            })
        );

        // Return based on returnAll setting
        return returnAll ? processedItems : processedItems[0];
    } catch (error) {
        console.error('Function execution failed:', error);
        throw new Error(`Failed to execute function: ${error.message}`);
    }
}
