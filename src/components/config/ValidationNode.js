import React from 'react';
import ConfigField from '../common/ConfigField';

export default function ValidationNode({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange(field, value);
  };

  const validationTypeOptions = [
    { value: 'schema', label: 'JSON Schema' },
    { value: 'regex', label: 'Regular Expression' },
    { value: 'custom', label: 'Custom Function' },
    { value: 'type', label: 'Type Check' },
    { value: 'range', label: 'Range Check' },
    { value: 'enum', label: 'Enumeration' }
  ];

  const dataTypeOptions = [
    { value: 'string', label: 'String' },
    { value: 'number', label: 'Number' },
    { value: 'boolean', label: 'Boolean' },
    { value: 'array', label: 'Array' },
    { value: 'object', label: 'Object' },
    { value: 'date', label: 'Date' },
    { value: 'email', label: 'Email' },
    { value: 'url', label: 'URL' },
    { value: 'ip', label: 'IP Address' }
  ];

  return (
    <div>
      <ConfigField
        label="Validation Type"
        type="select"
        field="validationType"
        value={data.config?.validationType}
        onChange={handleChange}
        options={validationTypeOptions}
        required
      />

      {data.config?.validationType === 'schema' && (
        <ConfigField
          label="JSON Schema"
          type="textarea"
          field="jsonSchema"
          value={data.config?.jsonSchema}
          onChange={handleChange}
          placeholder={`{
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "minLength": 1
    },
    "age": {
      "type": "number",
      "minimum": 0
    }
  },
  "required": ["name", "age"]
}`}
          rows={12}
          required
        />
      )}

      {data.config?.validationType === 'regex' && (
        <>
          <ConfigField
            label="Regular Expression"
            type="text"
            field="regex"
            value={data.config?.regex}
            onChange={handleChange}
            placeholder="^[a-zA-Z0-9]+$"
            required
          />
          <ConfigField
            label="Flags"
            type="text"
            field="regexFlags"
            value={data.config?.regexFlags}
            onChange={handleChange}
            placeholder="gi"
          />
        </>
      )}

      {data.config?.validationType === 'custom' && (
        <ConfigField
          label="Custom Validation Function"
          type="textarea"
          field="customValidation"
          value={data.config?.customValidation}
          onChange={handleChange}
          placeholder={`function validate(value) {
  // Your validation logic here
  // Return true if valid, false otherwise
  return true;
}`}
          rows={8}
          required
        />
      )}

      {data.config?.validationType === 'type' && (
        <>
          <ConfigField
            label="Data Type"
            type="select"
            field="dataType"
            value={data.config?.dataType}
            onChange={handleChange}
            options={dataTypeOptions}
            required
          />
          <ConfigField
            label="Allow Null"
            type="checkbox"
            field="allowNull"
            value={data.config?.allowNull}
            onChange={handleChange}
          />
        </>
      )}

      {data.config?.validationType === 'range' && (
        <>
          <ConfigField
            label="Minimum Value"
            type="text"
            field="minValue"
            value={data.config?.minValue}
            onChange={handleChange}
            placeholder="0"
          />
          <ConfigField
            label="Maximum Value"
            type="text"
            field="maxValue"
            value={data.config?.maxValue}
            onChange={handleChange}
            placeholder="100"
          />
          <ConfigField
            label="Include Minimum"
            type="checkbox"
            field="includeMin"
            value={data.config?.includeMin}
            onChange={handleChange}
          />
          <ConfigField
            label="Include Maximum"
            type="checkbox"
            field="includeMax"
            value={data.config?.includeMax}
            onChange={handleChange}
          />
        </>
      )}

      {data.config?.validationType === 'enum' && (
        <ConfigField
          label="Allowed Values"
          type="textarea"
          field="enumValues"
          value={data.config?.enumValues}
          onChange={handleChange}
          placeholder={`[
  "value1",
  "value2",
  "value3"
]`}
          rows={4}
          required
        />
      )}

      <ConfigField
        label="Required Field"
        type="checkbox"
        field="required"
        value={data.config?.required}
        onChange={handleChange}
      />

      <ConfigField
        label="Custom Error Message"
        type="text"
        field="errorMessage"
        value={data.config?.errorMessage}
        onChange={handleChange}
        placeholder="Invalid value provided"
      />

      <ConfigField
        label="Transform Before Validation"
        type="checkbox"
        field="enableTransform"
        value={data.config?.enableTransform}
        onChange={handleChange}
      />

      {data.config?.enableTransform && (
        <ConfigField
          label="Transform Function"
          type="textarea"
          field="transformFunction"
          value={data.config?.transformFunction}
          onChange={handleChange}
          placeholder={`function transform(value) {
  // Transform the value before validation
  return transformedValue;
}`}
          rows={6}
          required
        />
      )}

      <ConfigField
        label="Sanitize After Validation"
        type="checkbox"
        field="enableSanitization"
        value={data.config?.enableSanitization}
        onChange={handleChange}
      />

      {data.config?.enableSanitization && (
        <ConfigField
          label="Sanitization Function"
          type="textarea"
          field="sanitizationFunction"
          value={data.config?.sanitizationFunction}
          onChange={handleChange}
          placeholder={`function sanitize(value) {
  // Sanitize the value after validation
  return sanitizedValue;
}`}
          rows={6}
          required
        />
      )}

      <ConfigField
        label="Conditional Validation"
        type="checkbox"
        field="enableConditional"
        value={data.config?.enableConditional}
        onChange={handleChange}
      />

      {data.config?.enableConditional && (
        <ConfigField
          label="Condition Function"
          type="textarea"
          field="conditionFunction"
          value={data.config?.conditionFunction}
          onChange={handleChange}
          placeholder={`function shouldValidate(context) {
  // Return true if validation should be performed
  return true;
}`}
          rows={6}
          required
        />
      )}

      <ConfigField
        label="Error Handling"
        type="select"
        field="errorHandling"
        value={data.config?.errorHandling}
        onChange={handleChange}
        options={[
          { value: 'throw', label: 'Throw Error' },
          { value: 'return', label: 'Return Error Object' },
          { value: 'callback', label: 'Use Error Callback' }
        ]}
      />

      {data.config?.errorHandling === 'callback' && (
        <ConfigField
          label="Error Callback"
          type="textarea"
          field="errorCallback"
          value={data.config?.errorCallback}
          onChange={handleChange}
          placeholder={`function handleError(error) {
  // Handle validation error
  console.error(error);
}`}
          rows={6}
          required
        />
      )}

      <ConfigField
        label="Description"
        type="textarea"
        field="description"
        value={data.config?.description}
        onChange={handleChange}
        placeholder="Describe the purpose of this validation"
        rows={2}
      />
    </div>
  );
}
