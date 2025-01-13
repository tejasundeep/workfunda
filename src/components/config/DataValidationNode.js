import React from 'react';
import { MenuItem } from '@mui/material';
import ConfigField from './ConfigField';

const DataValidationNode = ({ config, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="node-config">
      <ConfigField
        label="Validation Type"
        value={config.type || 'schema'}
        onChange={(value) => handleChange('type', value)}
        select
      >
        <MenuItem value="schema">JSON Schema</MenuItem>
        <MenuItem value="regex">Regular Expression</MenuItem>
        <MenuItem value="custom">Custom Rules</MenuItem>
      </ConfigField>
      <ConfigField
        label="Validation Rules"
        value={config.rules || ''}
        onChange={(value) => handleChange('rules', value)}
        multiline
        rows={4}
      />
      <ConfigField
        label="Error Handling"
        value={config.errorHandling || 'reject'}
        onChange={(value) => handleChange('errorHandling', value)}
        select
      >
        <MenuItem value="reject">Reject Invalid Data</MenuItem>
        <MenuItem value="fix">Auto-Fix if Possible</MenuItem>
        <MenuItem value="flag">Flag for Review</MenuItem>
      </ConfigField>
    </div>
  );
};

export default DataValidationNode;
