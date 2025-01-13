import React from 'react';
import { MenuItem } from '@mui/material';
import ConfigField from './ConfigField';

const WorkflowControlNode = ({ config, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="node-config">
      <ConfigField
        label="Control Type"
        value={config.type || 'condition'}
        onChange={(value) => handleChange('type', value)}
        select
      >
        <MenuItem value="condition">Conditional Branch</MenuItem>
        <MenuItem value="loop">Loop</MenuItem>
        <MenuItem value="delay">Delay</MenuItem>
        <MenuItem value="parallel">Parallel Execution</MenuItem>
        <MenuItem value="retry">Retry Logic</MenuItem>
      </ConfigField>
      <ConfigField
        label="Condition/Expression"
        value={config.expression || ''}
        onChange={(value) => handleChange('expression', value)}
        multiline
        rows={3}
      />
      <ConfigField
        label="Max Iterations"
        value={config.maxIterations || 10}
        onChange={(value) => handleChange('maxIterations', value)}
        type="number"
      />
      <ConfigField
        label="Timeout (seconds)"
        value={config.timeout || 300}
        onChange={(value) => handleChange('timeout', value)}
        type="number"
      />
      <ConfigField
        label="Error Handling"
        value={config.errorHandling || 'retry'}
        onChange={(value) => handleChange('errorHandling', value)}
        select
      >
        <MenuItem value="retry">Retry</MenuItem>
        <MenuItem value="skip">Skip</MenuItem>
        <MenuItem value="fail">Fail Workflow</MenuItem>
        <MenuItem value="alternate">Use Alternate Path</MenuItem>
      </ConfigField>
    </div>
  );
};

export default WorkflowControlNode;
