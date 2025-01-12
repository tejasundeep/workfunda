function getValueByPath(obj, path) {
    return path.split('.').reduce((current, key) => current?.[key], obj);
}

function setValueByPath(obj, path, value) {
    const keys = path.split('.');
    const lastKey = keys.pop();
    const target = keys.reduce((current, key) => {
        if (!current[key]) current[key] = {};
        return current[key];
    }, obj);
    target[lastKey] = value;
    return obj;
}

export async function executeTransformNode(config, inputData) {
    const { 
        mode = 'map',
        fields = [],
        expression,
        filterCondition,
        keepOnlySelected = false,
        returnArray = true
    } = config;

    try {
        // Convert input to array if it's not already
        const items = Array.isArray(inputData) ? inputData : [inputData];

        switch (mode) {
            case 'map': {
                const mappedItems = items.map(item => {
                    const result = keepOnlySelected ? {} : { ...item };
                    
                    fields.forEach(field => {
                        const { source, target, type = 'direct', transform } = field;
                        
                        let value;
                        if (type === 'direct') {
                            value = getValueByPath(item, source);
                        } else if (type === 'expression') {
                            // Evaluate expression in a safe context
                            const evalContext = { item, value: getValueByPath(item, source) };
                            value = new Function('item', 'value', `return ${transform}`)(evalContext.item, evalContext.value);
                        }
                        
                        setValueByPath(result, target, value);
                    });
                    
                    return result;
                });
                
                return returnArray ? mappedItems : mappedItems[0];
            }

            case 'filter': {
                if (!filterCondition) {
                    throw new Error('Filter condition is required for filter mode');
                }

                const filteredItems = items.filter(item => {
                    const evalContext = { item };
                    return new Function('item', `return ${filterCondition}`)(evalContext.item);
                });

                return returnArray ? filteredItems : filteredItems[0];
            }

            case 'custom': {
                if (!expression) {
                    throw new Error('Expression is required for custom mode');
                }

                // Provide a safe context for custom transformations
                const context = {
                    items,
                    helpers: {
                        formatDate: (date) => new Date(date).toISOString(),
                        parseJSON: (str) => JSON.parse(str),
                        stringify: (obj) => JSON.stringify(obj),
                    }
                };

                const result = new Function('items', 'helpers', expression)(context.items, context.helpers);
                return returnArray ? (Array.isArray(result) ? result : [result]) : result;
            }

            default:
                throw new Error(`Unsupported transformation mode: ${mode}`);
        }
    } catch (error) {
        console.error('Transform execution failed:', error);
        throw new Error(`Failed to execute transformation: ${error.message}`);
    }
}
