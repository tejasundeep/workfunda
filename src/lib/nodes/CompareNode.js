function getValueByPath(obj, path) {
    return path.split('.').reduce((current, key) => current?.[key], obj);
}

function compareValues(value1, value2, operator, caseSensitive = true) {
    // Handle null/undefined
    if (value1 == null || value2 == null) {
        return operator === 'equals' ? value1 === value2 : value1 !== value2;
    }

    // Convert to strings for string operations
    const str1 = String(value1);
    const str2 = String(value2);

    switch (operator) {
        case 'equals':
            return caseSensitive ? str1 === str2 : str1.toLowerCase() === str2.toLowerCase();
        case 'notEquals':
            return caseSensitive ? str1 !== str2 : str1.toLowerCase() !== str2.toLowerCase();
        case 'contains':
            return caseSensitive ? str1.includes(str2) : str1.toLowerCase().includes(str2.toLowerCase());
        case 'notContains':
            return caseSensitive ? !str1.includes(str2) : !str1.toLowerCase().includes(str2.toLowerCase());
        case 'startsWith':
            return caseSensitive ? str1.startsWith(str2) : str1.toLowerCase().startsWith(str2.toLowerCase());
        case 'endsWith':
            return caseSensitive ? str1.endsWith(str2) : str1.toLowerCase().endsWith(str2.toLowerCase());
        case 'regex': {
            try {
                const flags = caseSensitive ? '' : 'i';
                const regex = new RegExp(str2, flags);
                return regex.test(str1);
            } catch (error) {
                console.error('Invalid regex:', error);
                return false;
            }
        }
        case 'greaterThan':
            return Number(value1) > Number(value2);
        case 'greaterThanEqual':
            return Number(value1) >= Number(value2);
        case 'lessThan':
            return Number(value1) < Number(value2);
        case 'lessThanEqual':
            return Number(value1) <= Number(value2);
        case 'empty':
            return value1 === '' || value1 == null || (Array.isArray(value1) && value1.length === 0);
        case 'notEmpty':
            return value1 !== '' && value1 != null && (!Array.isArray(value1) || value1.length > 0);
        default:
            throw new Error(`Unsupported operator: ${operator}`);
    }
}

export async function executeCompareNode(config, inputData) {
    const { 
        conditions = [],
        mode = 'boolean',
        caseSensitive = true,
        matchAll = true // true for AND, false for OR
    } = config;

    if (!conditions || conditions.length === 0) {
        throw new Error('No conditions specified');
    }

    try {
        // Evaluate each condition
        const results = conditions.map(condition => {
            const { field, operator, value } = condition;
            
            // Get actual value from input data
            const actualValue = getValueByPath(inputData, field);
            
            // Compare values
            return compareValues(actualValue, value, operator, caseSensitive);
        });

        // Combine results based on matchAll setting
        const finalResult = matchAll 
            ? results.every(result => result)  // AND
            : results.some(result => result);  // OR

        if (mode === 'boolean') {
            return finalResult;
        } else { // branch mode
            return {
                outputs: [
                    finalResult ? inputData : null,  // true branch
                    finalResult ? null : inputData   // false branch
                ]
            };
        }
    } catch (error) {
        console.error('Compare execution failed:', error);
        throw new Error(`Failed to execute comparison: ${error.message}`);
    }
}
