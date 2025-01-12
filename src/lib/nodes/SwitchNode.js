function getValue(path, obj) {
    return path.split('.').reduce((acc, part) => acc?.[part], obj);
}

function matchesCase(inputValue, caseValue, mode) {
    switch (mode) {
        case 'equals':
            return String(inputValue) === String(caseValue);
        case 'contains':
            return String(inputValue).includes(String(caseValue));
        case 'regex':
            try {
                const regex = new RegExp(caseValue);
                return regex.test(String(inputValue));
            } catch (error) {
                console.error('Invalid regex:', error);
                return false;
            }
        default:
            return false;
    }
}

export async function executeSwitchNode(config, inputData) {
    const { inputField, mode, cases, includeDefault } = config;

    if (!inputField) {
        throw new Error('Input field not specified');
    }

    if (!cases || cases.length === 0) {
        throw new Error('No cases specified');
    }

    try {
        const inputValue = getValue(inputField, inputData);
        const outputs = new Array(cases.length + (includeDefault ? 1 : 0)).fill(null);
        let matched = false;

        // Check each case
        cases.forEach((caseItem, index) => {
            if (matchesCase(inputValue, caseItem.value, mode)) {
                outputs[index] = inputData;
                matched = true;
            }
        });

        // Handle default case if enabled and no match found
        if (includeDefault && !matched) {
            outputs[outputs.length - 1] = inputData;
        }

        return { outputs };
    } catch (error) {
        console.error('Switch execution failed:', error);
        throw new Error(`Failed to execute switch: ${error.message}`);
    }
}
