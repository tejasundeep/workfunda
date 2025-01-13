import React from 'react';
import { Form } from 'react-bootstrap';
import ConfigField from '../common/ConfigField';

export default function SplitNode({ data, onChange }) {
  const splitTypeOptions = [
    { value: 'condition', label: 'Condition Based' },
    { value: 'array', label: 'Array Split' },
    { value: 'batch', label: 'Batch Size' },
    { value: 'regex', label: 'Regular Expression' }
  ];

  return (
    <div>
      <ConfigField
        label="Split Type"
        type="select"
        field="splitType"
        value={data.config?.splitType}
        onChange={onChange}
        options={splitTypeOptions}
        required
      />

      {data.config?.splitType === 'condition' && (
        <ConfigField
          label="Conditions"
          type="textarea"
          field="conditions"
          value={data.config?.conditions}
          onChange={onChange}
          placeholder={`[
  {
    "condition": "value > 0",
    "output": "positive"
  },
  {
    "condition": "value < 0",
    "output": "negative"
  }
]`}
          rows={6}
          required
        />
      )}

      {data.config?.splitType === 'array' && (
        <>
          <ConfigField
            label="Array Path"
            type="text"
            field="arrayPath"
            value={data.config?.arrayPath}
            onChange={onChange}
            placeholder="data.items"
            required
          />
          <ConfigField
            label="Preserve Original"
            type="checkbox"
            field="preserveOriginal"
            value={data.config?.preserveOriginal}
            onChange={onChange}
          />
        </>
      )}

      {data.config?.splitType === 'batch' && (
        <ConfigField
          label="Batch Size"
          type="number"
          field="batchSize"
          value={data.config?.batchSize}
          onChange={onChange}
          placeholder="Enter batch size"
          min={1}
          validation="number"
          required
        />
      )}

      {data.config?.splitType === 'regex' && (
        <>
          <ConfigField
            label="Regular Expression"
            type="text"
            field="regex"
            value={data.config?.regex}
            onChange={onChange}
            placeholder="Enter regex pattern"
            required
          />
          <ConfigField
            label="Flags"
            type="text"
            field="regexFlags"
            value={data.config?.regexFlags}
            onChange={onChange}
            placeholder="g, i, m"
          />
        </>
      )}

      <ConfigField
        label="Default Output"
        type="text"
        field="defaultOutput"
        value={data.config?.defaultOutput}
        onChange={onChange}
        placeholder="default"
      />

      <ConfigField
        label="Error Handling"
        type="select"
        field="errorHandling"
        value={data.config?.errorHandling}
        onChange={onChange}
        options={[
          { value: 'skip', label: 'Skip Failed Items' },
          { value: 'fail', label: 'Fail Entire Split' },
          { value: 'default', label: 'Use Default Output' }
        ]}
      />
    </div>
  );
}
