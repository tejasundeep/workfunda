import React from 'react';
import ConfigField from '../common/ConfigField';

export default function SetNode({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange(field, value);
  };

  const operationTypeOptions = [
    { value: 'set', label: 'Set Value' },
    { value: 'delete', label: 'Delete Value' },
    { value: 'increment', label: 'Increment Value' },
    { value: 'decrement', label: 'Decrement Value' },
    { value: 'toggle', label: 'Toggle Boolean' },
    { value: 'append', label: 'Append to Array' },
    { value: 'prepend', label: 'Prepend to Array' },
    { value: 'merge', label: 'Merge Objects' }
  ];

  const valueTypeOptions = [
    { value: 'string', label: 'String' },
    { value: 'number', label: 'Number' },
    { value: 'boolean', label: 'Boolean' },
    { value: 'array', label: 'Array' },
    { value: 'object', label: 'Object' },
    { value: 'expression', label: 'Expression' }
  ];

  const mergeStrategyOptions = [
    { value: 'replace', label: 'Replace' },
    { value: 'merge', label: 'Deep Merge' },
    { value: 'concat', label: 'Concatenate Arrays' },
    { value: 'union', label: 'Array Union' }
  ];

  return (
    <div>
      <ConfigField
        label="Operation Type"
        type="select"
        field="operationType"
        value={data.config?.operationType}
        onChange={handleChange}
        options={operationTypeOptions}
        required
      />

      <ConfigField
        label="Variable Path"
        type="text"
        field="variablePath"
        value={data.config?.variablePath}
        onChange={handleChange}
        placeholder="user.profile.name"
        required
      />

      {!['delete', 'toggle'].includes(data.config?.operationType) && (
        <ConfigField
          label="Value Type"
          type="select"
          field="valueType"
          value={data.config?.valueType}
          onChange={handleChange}
          options={valueTypeOptions}
          required
        />
      )}

      {data.config?.valueType === 'string' && (
        <ConfigField
          label="String Value"
          type="text"
          field="stringValue"
          value={data.config?.stringValue}
          onChange={handleChange}
          required
        />
      )}

      {data.config?.valueType === 'number' && (
        <ConfigField
          label="Number Value"
          type="number"
          field="numberValue"
          value={data.config?.numberValue}
          onChange={handleChange}
          validation="number"
          required
        />
      )}

      {data.config?.valueType === 'boolean' && (
        <ConfigField
          label="Boolean Value"
          type="checkbox"
          field="booleanValue"
          value={data.config?.booleanValue}
          onChange={handleChange}
        />
      )}

      {data.config?.valueType === 'array' && (
        <ConfigField
          label="Array Value"
          type="textarea"
          field="arrayValue"
          value={data.config?.arrayValue}
          onChange={handleChange}
          placeholder={`[
  "item1",
  "item2",
  "item3"
]`}
          rows={4}
          required
        />
      )}

      {data.config?.valueType === 'object' && (
        <ConfigField
          label="Object Value"
          type="textarea"
          field="objectValue"
          value={data.config?.objectValue}
          onChange={handleChange}
          placeholder={`{
  "key1": "value1",
  "key2": "value2"
}`}
          rows={4}
          required
        />
      )}

      {data.config?.valueType === 'expression' && (
        <ConfigField
          label="Expression"
          type="textarea"
          field="expression"
          value={data.config?.expression}
          onChange={handleChange}
          placeholder={`// Use JavaScript expressions
input.value * 2`}
          rows={4}
          required
        />
      )}

      {['increment', 'decrement'].includes(data.config?.operationType) && (
        <ConfigField
          label="Step Value"
          type="number"
          field="stepValue"
          value={data.config?.stepValue}
          onChange={handleChange}
          placeholder="1"
          validation="number"
        />
      )}

      {['append', 'prepend'].includes(data.config?.operationType) && (
        <ConfigField
          label="Max Array Length"
          type="number"
          field="maxLength"
          value={data.config?.maxLength}
          onChange={handleChange}
          min={0}
          validation="number"
        />
      )}

      {data.config?.operationType === 'merge' && (
        <ConfigField
          label="Merge Strategy"
          type="select"
          field="mergeStrategy"
          value={data.config?.mergeStrategy}
          onChange={handleChange}
          options={mergeStrategyOptions}
          required
        />
      )}

      <ConfigField
        label="Create Path"
        type="checkbox"
        field="createPath"
        value={data.config?.createPath}
        onChange={handleChange}
      />

      <ConfigField
        label="Error Handling"
        type="select"
        field="errorHandling"
        value={data.config?.errorHandling}
        onChange={handleChange}
        options={[
          { value: 'throw', label: 'Throw Error' },
          { value: 'ignore', label: 'Ignore Error' },
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
          placeholder="Default value if operation fails"
          rows={2}
        />
      )}

      <ConfigField
        label="Description"
        type="textarea"
        field="description"
        value={data.config?.description}
        onChange={handleChange}
        placeholder="Describe the purpose of this operation"
        rows={2}
      />
    </div>
  );
}
