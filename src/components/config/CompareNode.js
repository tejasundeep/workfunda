import React from 'react';
import ConfigField from '../common/ConfigField';

export default function CompareNode({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange(field, value);
  };

  const compareTypeOptions = [
    { value: 'equality', label: 'Equality' },
    { value: 'numeric', label: 'Numeric' },
    { value: 'string', label: 'String' },
    { value: 'array', label: 'Array' },
    { value: 'object', label: 'Object' },
    { value: 'custom', label: 'Custom Function' }
  ];

  const numericOperatorOptions = [
    { value: 'eq', label: 'Equal (=)' },
    { value: 'ne', label: 'Not Equal (≠)' },
    { value: 'gt', label: 'Greater Than (>)' },
    { value: 'gte', label: 'Greater Than or Equal (≥)' },
    { value: 'lt', label: 'Less Than (<)' },
    { value: 'lte', label: 'Less Than or Equal (≤)' },
    { value: 'between', label: 'Between' }
  ];

  const stringOperatorOptions = [
    { value: 'eq', label: 'Equal' },
    { value: 'ne', label: 'Not Equal' },
    { value: 'contains', label: 'Contains' },
    { value: 'startsWith', label: 'Starts With' },
    { value: 'endsWith', label: 'Ends With' },
    { value: 'regex', label: 'Regular Expression' }
  ];

  const arrayOperatorOptions = [
    { value: 'includes', label: 'Includes' },
    { value: 'excludes', label: 'Excludes' },
    { value: 'any', label: 'Any Match' },
    { value: 'all', label: 'All Match' },
    { value: 'length', label: 'Length' }
  ];

  return (
    <div>
      <ConfigField
        label="Compare Type"
        type="select"
        field="compareType"
        value={data.config?.compareType}
        onChange={handleChange}
        options={compareTypeOptions}
        required
      />

      {data.config?.compareType === 'numeric' && (
        <>
          <ConfigField
            label="Operator"
            type="select"
            field="operator"
            value={data.config?.operator}
            onChange={handleChange}
            options={numericOperatorOptions}
            required
          />
          <ConfigField
            label="Value A"
            type="number"
            field="valueA"
            value={data.config?.valueA}
            onChange={handleChange}
            validation="number"
            required
          />
          <ConfigField
            label="Value B"
            type="number"
            field="valueB"
            value={data.config?.valueB}
            onChange={handleChange}
            validation="number"
            required
          />
          {data.config?.operator === 'between' && (
            <ConfigField
              label="Value C"
              type="number"
              field="valueC"
              value={data.config?.valueC}
              onChange={handleChange}
              validation="number"
              required
            />
          )}
        </>
      )}

      {data.config?.compareType === 'string' && (
        <>
          <ConfigField
            label="Operator"
            type="select"
            field="operator"
            value={data.config?.operator}
            onChange={handleChange}
            options={stringOperatorOptions}
            required
          />
          <ConfigField
            label="String A"
            type="text"
            field="stringA"
            value={data.config?.stringA}
            onChange={handleChange}
            required
          />
          <ConfigField
            label="String B"
            type="text"
            field="stringB"
            value={data.config?.stringB}
            onChange={handleChange}
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

      {data.config?.compareType === 'array' && (
        <>
          <ConfigField
            label="Operator"
            type="select"
            field="operator"
            value={data.config?.operator}
            onChange={handleChange}
            options={arrayOperatorOptions}
            required
          />
          <ConfigField
            label="Array A"
            type="textarea"
            field="arrayA"
            value={data.config?.arrayA}
            onChange={handleChange}
            placeholder={'[1, 2, 3]'}
            rows={3}
            required
          />
          <ConfigField
            label="Array B"
            type="textarea"
            field="arrayB"
            value={data.config?.arrayB}
            onChange={handleChange}
            placeholder={'[4, 5, 6]'}
            rows={3}
            required
          />
          <ConfigField
            label="Compare By Key"
            type="text"
            field="compareKey"
            value={data.config?.compareKey}
            onChange={handleChange}
            placeholder="id"
          />
        </>
      )}

      {data.config?.compareType === 'object' && (
        <>
          <ConfigField
            label="Object A"
            type="textarea"
            field="objectA"
            value={data.config?.objectA}
            onChange={handleChange}
            placeholder={'{\n  "key": "value"\n}'}
            rows={4}
            required
          />
          <ConfigField
            label="Object B"
            type="textarea"
            field="objectB"
            value={data.config?.objectB}
            onChange={handleChange}
            placeholder={'{\n  "key": "value"\n}'}
            rows={4}
            required
          />
          <ConfigField
            label="Deep Compare"
            type="checkbox"
            field="deepCompare"
            value={data.config?.deepCompare}
            onChange={handleChange}
          />
          <ConfigField
            label="Ignore Keys"
            type="textarea"
            field="ignoreKeys"
            value={data.config?.ignoreKeys}
            onChange={handleChange}
            placeholder={'id\ntimestamp'}
            rows={2}
          />
        </>
      )}

      {data.config?.compareType === 'custom' && (
        <ConfigField
          label="Custom Compare Function"
          type="textarea"
          field="customFunction"
          value={data.config?.customFunction}
          onChange={handleChange}
          placeholder={'function compare(a, b) {\n  // Your comparison logic here\n  return true or false;\n}'}
          rows={10}
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
          { value: 'false', label: 'Return False on Error' },
          { value: 'true', label: 'Return True on Error' },
          { value: 'error', label: 'Throw Error' }
        ]}
      />
    </div>
  );
}
