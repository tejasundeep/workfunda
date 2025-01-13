import React from 'react';
import ConfigField from '../common/ConfigField';

export default function TransformNode({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange(field, value);
  };

  const transformTypeOptions = [
    { value: 'map', label: 'Map' },
    { value: 'filter', label: 'Filter' },
    { value: 'reduce', label: 'Reduce' },
    { value: 'custom', label: 'Custom Function' }
  ];

  const inputTypeOptions = [
    { value: 'json', label: 'JSON' },
    { value: 'xml', label: 'XML' },
    { value: 'csv', label: 'CSV' },
    { value: 'text', label: 'Plain Text' }
  ];

  return (
    <div>
      <ConfigField
        label="Transform Type"
        type="select"
        field="transformType"
        value={data.config?.transformType}
        onChange={handleChange}
        options={transformTypeOptions}
        required
      />

      <ConfigField
        label="Input Type"
        type="select"
        field="inputType"
        value={data.config?.inputType}
        onChange={handleChange}
        options={inputTypeOptions}
        required
      />

      <ConfigField
        label="Output Type"
        type="select"
        field="outputType"
        value={data.config?.outputType}
        onChange={handleChange}
        options={inputTypeOptions}
        required
      />

      {data.config?.transformType === 'custom' && (
        <ConfigField
          label="Custom Function"
          type="textarea"
          field="customFunction"
          value={data.config?.customFunction}
          onChange={handleChange}
          placeholder={`function transform(input) {
  // Your transformation logic here
  return output;
}`}
          rows={10}
          required
        />
      )}

      {data.config?.transformType === 'map' && (
        <ConfigField
          label="Mapping Template"
          type="textarea"
          field="mappingTemplate"
          value={data.config?.mappingTemplate}
          onChange={handleChange}
          placeholder={`{
  "outputField": "{{inputField}}"
}`}
          rows={5}
          required
        />
      )}

      {data.config?.transformType === 'filter' && (
        <ConfigField
          label="Filter Condition"
          type="textarea"
          field="filterCondition"
          value={data.config?.filterCondition}
          onChange={handleChange}
          placeholder={`item => item.value > 0`}
          rows={3}
          required
        />
      )}

      {data.config?.transformType === 'reduce' && (
        <>
          <ConfigField
            label="Reducer Function"
            type="textarea"
            field="reducerFunction"
            value={data.config?.reducerFunction}
            onChange={handleChange}
            placeholder={`(accumulator, currentValue) => accumulator + currentValue`}
            rows={3}
            required
          />
          <ConfigField
            label="Initial Value"
            type="textarea"
            field="initialValue"
            value={data.config?.initialValue}
            onChange={handleChange}
            placeholder="0"
            rows={1}
            required
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
          { value: 'skip', label: 'Skip Failed Items' },
          { value: 'fail', label: 'Fail Entire Transform' },
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
          placeholder="Default value for failed transformations"
          rows={2}
        />
      )}
    </div>
  );
}
