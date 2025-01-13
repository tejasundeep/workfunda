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
        label="Enable Validation"
        type="switch"
        field="enabled"
        value={data.config?.enabled}
        onChange={handleChange}
      />

      {data.config?.enabled && (
        <>
          <ConfigField
            label="Validation Type"
            type="select"
            field="validationType"
            value={data.config?.validationType}
            onChange={handleChange}
            options={validationTypeOptions}
            required
          />

          <ConfigField
            label="Stop on Error"
            type="switch"
            field="stopOnError"
            value={data.config?.stopOnError}
            onChange={handleChange}
          />

          <ConfigField
            label="Throw Exception"
            type="switch"
            field="throwException"
            value={data.config?.throwException}
            onChange={handleChange}
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
                label="Case Sensitive"
                type="switch"
                field="caseSensitive"
                value={data.config?.caseSensitive}
                onChange={handleChange}
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
            <>
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
              <ConfigField
                label="Enable Caching"
                type="switch"
                field="enableCaching"
                value={data.config?.enableCaching}
                onChange={handleChange}
              />
            </>
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
                type="switch"
                field="allowNull"
                value={data.config?.allowNull}
                onChange={handleChange}
              />
              <ConfigField
                label="Strict Type Checking"
                type="switch"
                field="strictTypeChecking"
                value={data.config?.strictTypeChecking}
                onChange={handleChange}
              />
            </>
          )}

          {data.config?.validationType === 'range' && (
            <>
              <ConfigField
                label="Minimum Value"
                type="number"
                field="minValue"
                value={data.config?.minValue}
                onChange={handleChange}
                validation="number"
              />
              <ConfigField
                label="Maximum Value"
                type="number"
                field="maxValue"
                value={data.config?.maxValue}
                onChange={handleChange}
                validation="number"
              />
              <ConfigField
                label="Include Minimum"
                type="switch"
                field="includeMin"
                value={data.config?.includeMin}
                onChange={handleChange}
              />
              <ConfigField
                label="Include Maximum"
                type="switch"
                field="includeMax"
                value={data.config?.includeMax}
                onChange={handleChange}
              />
            </>
          )}

          {data.config?.validationType === 'enum' && (
            <>
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
                rows={6}
                required
              />
              <ConfigField
                label="Case Sensitive"
                type="switch"
                field="caseSensitive"
                value={data.config?.caseSensitive}
                onChange={handleChange}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}
