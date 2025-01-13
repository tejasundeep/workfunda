import React from 'react';
import { MenuItem } from '@mui/material';
import ConfigField from './ConfigField';

const CodeExecutionNode = ({ config, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="node-config">
      <ConfigField
        label="Language"
        value={config.language || 'javascript'}
        onChange={(value) => handleChange('language', value)}
        select
      >
        <MenuItem value="javascript">JavaScript</MenuItem>
        <MenuItem value="python">Python</MenuItem>
        <MenuItem value="shell">Shell Script</MenuItem>
        <MenuItem value="php">PHP</MenuItem>
        <MenuItem value="ruby">Ruby</MenuItem>
        <MenuItem value="java">Java</MenuItem>
      </ConfigField>
      <ConfigField
        label="Code"
        value={config.code || ''}
        onChange={(value) => handleChange('code', value)}
        multiline
        rows={10}
      />
      <ConfigField
        label="Execution Mode"
        value={config.executionMode || 'sandboxed'}
        onChange={(value) => handleChange('executionMode', value)}
        select
      >
        <MenuItem value="sandboxed">Sandboxed</MenuItem>
        <MenuItem value="container">Container</MenuItem>
        <MenuItem value="local">Local</MenuItem>
        <MenuItem value="function">Serverless Function</MenuItem>
      </ConfigField>
      <ConfigField
        label="Environment Variables"
        value={config.environmentVars || ''}
        onChange={(value) => handleChange('environmentVars', value)}
        multiline
        rows={3}
        helperText="JSON object of environment variables"
      />
      <ConfigField
        label="Resource Limits"
        value={config.resourceLimits || ''}
        onChange={(value) => handleChange('resourceLimits', value)}
        multiline
        rows={2}
        helperText="JSON object for CPU, memory, and time limits"
      />
      <ConfigField
        label="Dependencies"
        value={config.dependencies || ''}
        onChange={(value) => handleChange('dependencies', value)}
        multiline
        rows={3}
        helperText="List of required packages or libraries"
      />
    </div>
  );
};

export default CodeExecutionNode;
