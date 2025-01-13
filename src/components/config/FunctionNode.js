import React from 'react';
import ConfigField from '../common/ConfigField';

export default function FunctionNode({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange(field, value);
  };

  const functionTypeOptions = [
    { value: 'inline', label: 'Inline Function' },
    { value: 'module', label: 'Module Import' },
    { value: 'predefined', label: 'Predefined Function' },
    { value: 'async', label: 'Async Function' }
  ];

  const predefinedFunctionOptions = [
    { value: 'math', label: 'Mathematical Operations' },
    { value: 'string', label: 'String Operations' },
    { value: 'date', label: 'Date Operations' },
    { value: 'array', label: 'Array Operations' },
    { value: 'object', label: 'Object Operations' }
  ];

  const mathFunctionOptions = [
    { value: 'sum', label: 'Sum' },
    { value: 'average', label: 'Average' },
    { value: 'min', label: 'Minimum' },
    { value: 'max', label: 'Maximum' },
    { value: 'round', label: 'Round' }
  ];

  const stringFunctionOptions = [
    { value: 'concat', label: 'Concatenate' },
    { value: 'split', label: 'Split' },
    { value: 'replace', label: 'Replace' },
    { value: 'trim', label: 'Trim' },
    { value: 'case', label: 'Change Case' }
  ];

  const dateFunctionOptions = [
    { value: 'format', label: 'Format Date' },
    { value: 'add', label: 'Add Duration' },
    { value: 'subtract', label: 'Subtract Duration' },
    { value: 'diff', label: 'Date Difference' },
    { value: 'parse', label: 'Parse Date' }
  ];

  const arrayFunctionOptions = [
    { value: 'map', label: 'Map' },
    { value: 'filter', label: 'Filter' },
    { value: 'reduce', label: 'Reduce' },
    { value: 'sort', label: 'Sort' },
    { value: 'unique', label: 'Get Unique' }
  ];

  const objectFunctionOptions = [
    { value: 'pick', label: 'Pick Properties' },
    { value: 'omit', label: 'Omit Properties' },
    { value: 'merge', label: 'Merge Objects' },
    { value: 'rename', label: 'Rename Properties' },
    { value: 'transform', label: 'Transform Properties' }
  ];

  return (
    <div>
      <ConfigField
        label="Function Type"
        type="select"
        field="functionType"
        value={data.config?.functionType}
        onChange={handleChange}
        options={functionTypeOptions}
        required
      />

      {data.config?.functionType === 'inline' && (
        <>
          <ConfigField
            label="Function Code"
            type="textarea"
            field="functionCode"
            value={data.config?.functionCode}
            onChange={handleChange}
            placeholder={'function process(input) {\n  // Your code here\n  return output;\n}'}
            rows={10}
            required
          />
          <ConfigField
            label="Input Parameters"
            type="textarea"
            field="inputParams"
            value={data.config?.inputParams}
            onChange={handleChange}
            placeholder={'[\n  {\n    "name": "param1",\n    "type": "string"\n  }\n]'}
            rows={4}
          />
        </>
      )}

      {data.config?.functionType === 'module' && (
        <>
          <ConfigField
            label="Module Path"
            type="text"
            field="modulePath"
            value={data.config?.modulePath}
            onChange={handleChange}
            placeholder="./utils/myFunction"
            required
          />
          <ConfigField
            label="Function Name"
            type="text"
            field="functionName"
            value={data.config?.functionName}
            onChange={handleChange}
            placeholder="processData"
            required
          />
          <ConfigField
            label="ES Module"
            type="checkbox"
            field="esModule"
            value={data.config?.esModule}
            onChange={handleChange}
          />
        </>
      )}

      {data.config?.functionType === 'predefined' && (
        <>
          <ConfigField
            label="Function Category"
            type="select"
            field="functionCategory"
            value={data.config?.functionCategory}
            onChange={handleChange}
            options={predefinedFunctionOptions}
            required
          />

          {data.config?.functionCategory === 'math' && (
            <ConfigField
              label="Math Function"
              type="select"
              field="mathFunction"
              value={data.config?.mathFunction}
              onChange={handleChange}
              options={mathFunctionOptions}
              required
            />
          )}

          {data.config?.functionCategory === 'string' && (
            <ConfigField
              label="String Function"
              type="select"
              field="stringFunction"
              value={data.config?.stringFunction}
              onChange={handleChange}
              options={stringFunctionOptions}
              required
            />
          )}

          {data.config?.functionCategory === 'date' && (
            <>
              <ConfigField
                label="Date Function"
                type="select"
                field="dateFunction"
                value={data.config?.dateFunction}
                onChange={handleChange}
                options={dateFunctionOptions}
                required
              />
              <ConfigField
                label="Date Format"
                type="text"
                field="dateFormat"
                value={data.config?.dateFormat}
                onChange={handleChange}
                placeholder="YYYY-MM-DD HH:mm:ss"
              />
            </>
          )}

          {data.config?.functionCategory === 'array' && (
            <ConfigField
              label="Array Function"
              type="select"
              field="arrayFunction"
              value={data.config?.arrayFunction}
              onChange={handleChange}
              options={arrayFunctionOptions}
              required
            />
          )}

          {data.config?.functionCategory === 'object' && (
            <ConfigField
              label="Object Function"
              type="select"
              field="objectFunction"
              value={data.config?.objectFunction}
              onChange={handleChange}
              options={objectFunctionOptions}
              required
            />
          )}
        </>
      )}

      {data.config?.functionType === 'async' && (
        <>
          <ConfigField
            label="Async Function Code"
            type="textarea"
            field="asyncFunctionCode"
            value={data.config?.asyncFunctionCode}
            onChange={handleChange}
            placeholder={'async function process(input) {\n  // Your async code here\n  return output;\n}'}
            rows={10}
            required
          />
          <ConfigField
            label="Timeout (ms)"
            type="number"
            field="timeout"
            value={data.config?.timeout}
            onChange={handleChange}
            min={0}
            max={30000}
            validation="number"
          />
          <ConfigField
            label="Retry Count"
            type="number"
            field="retryCount"
            value={data.config?.retryCount}
            onChange={handleChange}
            min={0}
            max={5}
            validation="number"
          />
        </>
      )}

      <ConfigField
        label="Error Handling"
        type="select"
        field="errorHandling"
        value={data.config?.errorHandling}
        onChange={handleChange}
        options={[
          { value: 'throw', label: 'Throw Error' },
          { value: 'return', label: 'Return Error' },
          { value: 'default', label: 'Use Default Value' }
        ]}
      />

      {data.config?.errorHandling === 'default' && (
        <ConfigField
          label="Default Value"
          type="textarea"
          field="defaultValue"
          value={data.config?.defaultValue}
          onChange={handleChange}
          placeholder="Default value to return on error"
          rows={2}
        />
      )}

      <ConfigField
        label="Cache Results"
        type="checkbox"
        field="cacheResults"
        value={data.config?.cacheResults}
        onChange={handleChange}
      />

      {data.config?.cacheResults && (
        <ConfigField
          label="Cache Duration (seconds)"
          type="number"
          field="cacheDuration"
          value={data.config?.cacheDuration}
          onChange={handleChange}
          min={0}
          validation="number"
        />
      )}
    </div>
  );
}
