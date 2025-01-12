function evaluateExpression(expression, context) {
    // Simple expression evaluator for $input.data.field syntax
    if (typeof expression !== 'string' || !expression.startsWith('$')) {
        return expression;
    }

    const parts = expression.slice(1).split('.');
    return parts.reduce((obj, key) => obj?.[key], context);
}

function convertValue(value, type, context) {
    try {
        switch (type) {
            case 'string':
                return String(value);
            case 'number':
                return Number(value);
            case 'boolean':
                return value === 'true' || value === true;
            case 'array':
                return typeof value === 'string' ? JSON.parse(value) : value;
            case 'object':
                return typeof value === 'string' ? JSON.parse(value) : value;
            case 'expression':
                return evaluateExpression(value, context);
            default:
                return value;
        }
    } catch (error) {
        console.error(`Error converting value ${value} to type ${type}:`, error);
        throw new Error(`Failed to convert value: ${error.message}`);
    }
}

export async function executeSetNode(config, inputData) {
    const { variables = [], keepOnlySet = false } = config;

    try {
        // Create context for expression evaluation
        const context = {
            input: inputData,
            workflow: {
                // Add any workflow-level variables here
            }
        };

        // Process variables
        const result = {};
        for (const variable of variables) {
            const { name, value, type, scope } = variable;
            
            if (!name) {
                console.warn('Skipping variable with empty name');
                continue;
            }

            try {
                const convertedValue = convertValue(value, type, context);
                
                if (scope === 'workflow') {
                    // Store in workflow context for future nodes
                    context.workflow[name] = convertedValue;
                }
                
                result[name] = convertedValue;
            } catch (error) {
                console.error(`Error processing variable ${name}:`, error);
                throw new Error(`Failed to process variable ${name}: ${error.message}`);
            }
        }

        // Return based on keepOnlySet setting
        return keepOnlySet ? result : { ...inputData, ...result };
    } catch (error) {
        console.error('Set node execution failed:', error);
        throw new Error(`Failed to execute set node: ${error.message}`);
    }
}
