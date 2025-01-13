import React from 'react';
import ConfigField from '../common/ConfigField';

export default function SwitchNode({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange(field, value);
  };

  const switchTypeOptions = [
    { value: 'value', label: 'Value Switch' },
    { value: 'expression', label: 'Expression Switch' },
    { value: 'regex', label: 'Regular Expression' },
    { value: 'custom', label: 'Custom Function' }
  ];

  return (
    <div>
      <ConfigField
        label="Switch Type"
        type="select"
        field="switchType"
        value={data.config?.switchType}
        onChange={handleChange}
        options={switchTypeOptions}
        required
      />

      {data.config?.switchType === 'value' && (
        <>
          <ConfigField
            label="Input Value"
            type="text"
            field="inputValue"
            value={data.config?.inputValue}
            onChange={handleChange}
            placeholder="Value to switch on"
            required
          />
          <ConfigField
            label="Cases"
            type="textarea"
            field="cases"
            value={data.config?.cases}
            onChange={handleChange}
            placeholder={`[
  {
    "value": "case1",
    "output": "output1"
  },
  {
    "value": "case2",
    "output": "output2"
  }
]`}
            rows={6}
            required
          />
        </>
      )}

      {data.config?.switchType === 'expression' && (
        <>
          <ConfigField
            label="Input Expression"
            type="textarea"
            field="inputExpression"
            value={data.config?.inputExpression}
            onChange={handleChange}
            placeholder={`// JavaScript expression
input.value > 10`}
            rows={3}
            required
          />
          <ConfigField
            label="Cases"
            type="textarea"
            field="cases"
            value={data.config?.cases}
            onChange={handleChange}
            placeholder={`[
  {
    "condition": "value > 100",
    "output": "high"
  },
  {
    "condition": "value > 50",
    "output": "medium"
  },
  {
    "condition": "value > 0",
    "output": "low"
  }
]`}
            rows={8}
            required
          />
        </>
      )}

      {data.config?.switchType === 'regex' && (
        <>
          <ConfigField
            label="Input Pattern"
            type="text"
            field="inputPattern"
            value={data.config?.inputPattern}
            onChange={handleChange}
            placeholder="Regular expression pattern"
            required
          />
          <ConfigField
            label="Cases"
            type="textarea"
            field="cases"
            value={data.config?.cases}
            onChange={handleChange}
            placeholder={`[
  {
    "pattern": "^user_.*",
    "output": "user"
  },
  {
    "pattern": "^admin_.*",
    "output": "admin"
  }
]`}
            rows={6}
            required
          />
          <ConfigField
            label="Case Sensitive"
            type="checkbox"
            field="caseSensitive"
            value={data.config?.caseSensitive}
            onChange={handleChange}
          />
        </>
      )}

      {data.config?.switchType === 'custom' && (
        <ConfigField
          label="Custom Switch Function"
          type="textarea"
          field="customFunction"
          value={data.config?.customFunction}
          onChange={handleChange}
          placeholder={`function switchCase(input) {
  // Your switch logic here
  // Return the output case name
  return 'case1';
}`}
          rows={10}
          required
        />
      )}

      <ConfigField
        label="Default Case"
        type="text"
        field="defaultCase"
        value={data.config?.defaultCase}
        onChange={handleChange}
        placeholder="default"
      />

      <ConfigField
        label="Error Handling"
        type="select"
        field="errorHandling"
        value={data.config?.errorHandling}
        onChange={handleChange}
        options={[
          { value: 'throw', label: 'Throw Error' },
          { value: 'default', label: 'Use Default Case' },
          { value: 'skip', label: 'Skip Switch' }
        ]}
      />

      <ConfigField
        label="Description"
        type="textarea"
        field="description"
        value={data.config?.description}
        onChange={handleChange}
        placeholder="Describe the purpose of this switch"
        rows={2}
      />
    </div>
  );
}
