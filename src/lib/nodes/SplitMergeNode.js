function getValueByPath(obj, path) {
    return path.split('.').reduce((current, key) => current?.[key], obj);
}

export async function executeSplitNode(config, inputData) {
    const { 
        mode = 'itemList',
        field = '',
        size = 1,
        condition = '',
        addIndex = false
    } = config;

    try {
        if (!inputData) {
            throw new Error('No input data provided');
        }

        let items;
        switch (mode) {
            case 'itemList': {
                // Split based on array field
                const sourceArray = field ? getValueByPath(inputData, field) : inputData;
                
                if (!Array.isArray(sourceArray)) {
                    throw new Error('Input data or specified field must be an array');
                }

                items = sourceArray.map((item, index) => 
                    addIndex ? { ...item, splitIndex: index } : item
                );
                break;
            }

            case 'batchSize': {
                // Split into batches of specified size
                const sourceArray = Array.isArray(inputData) ? inputData : [inputData];
                items = [];
                
                for (let i = 0; i < sourceArray.length; i += size) {
                    const batch = sourceArray.slice(i, i + size);
                    items.push(addIndex ? { items: batch, batchIndex: Math.floor(i / size) } : batch);
                }
                break;
            }

            case 'condition': {
                // Split based on condition
                if (!condition) {
                    throw new Error('Condition is required for conditional split');
                }

                const sourceArray = Array.isArray(inputData) ? inputData : [inputData];
                const evalFn = new Function('item', `return ${condition}`);
                
                const trueItems = [];
                const falseItems = [];

                sourceArray.forEach((item, index) => {
                    const result = evalFn(item);
                    if (result) {
                        trueItems.push(addIndex ? { ...item, splitIndex: index } : item);
                    } else {
                        falseItems.push(addIndex ? { ...item, splitIndex: index } : item);
                    }
                });

                items = [trueItems, falseItems];
                break;
            }

            default:
                throw new Error(`Unsupported split mode: ${mode}`);
        }

        return { outputs: items };
    } catch (error) {
        console.error('Split execution failed:', error);
        throw new Error(`Failed to execute split: ${error.message}`);
    }
}

export async function executeMergeNode(config, inputData) {
    const { 
        mode = 'append',
        field = '',
        deduplicateBy = '',
        sortField = '',
        sortOrder = 'asc'
    } = config;

    try {
        if (!Array.isArray(inputData)) {
            throw new Error('Input data must be an array of arrays or objects to merge');
        }

        // Flatten all inputs into a single array
        let mergedItems = inputData.flat();

        switch (mode) {
            case 'append':
                // Items are already merged by flat()
                break;

            case 'combine': {
                // Combine objects by merging their properties
                if (mergedItems.some(item => typeof item !== 'object')) {
                    throw new Error('All items must be objects when using combine mode');
                }
                mergedItems = [Object.assign({}, ...mergedItems)];
                break;
            }

            case 'joinByField': {
                // Join arrays based on a common field
                if (!field) {
                    throw new Error('Field is required for joinByField mode');
                }

                const [leftArray, rightArray] = inputData;
                if (!Array.isArray(leftArray) || !Array.isArray(rightArray)) {
                    throw new Error('Both inputs must be arrays for join operation');
                }

                mergedItems = leftArray.map(leftItem => {
                    const rightItem = rightArray.find(item => 
                        getValueByPath(item, field) === getValueByPath(leftItem, field)
                    );
                    return rightItem ? { ...leftItem, ...rightItem } : leftItem;
                });
                break;
            }

            default:
                throw new Error(`Unsupported merge mode: ${mode}`);
        }

        // Post-processing
        if (deduplicateBy) {
            // Deduplicate based on field
            const seen = new Set();
            mergedItems = mergedItems.filter(item => {
                const value = getValueByPath(item, deduplicateBy);
                if (seen.has(value)) return false;
                seen.add(value);
                return true;
            });
        }

        if (sortField) {
            // Sort items
            mergedItems.sort((a, b) => {
                const aValue = getValueByPath(a, sortField);
                const bValue = getValueByPath(b, sortField);
                return sortOrder === 'asc' 
                    ? (aValue > bValue ? 1 : -1)
                    : (aValue < bValue ? 1 : -1);
            });
        }

        return mergedItems;
    } catch (error) {
        console.error('Merge execution failed:', error);
        throw new Error(`Failed to execute merge: ${error.message}`);
    }
}
