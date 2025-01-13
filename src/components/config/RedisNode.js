import React from 'react';
import { MenuItem } from '@mui/material';
import ConfigField from './ConfigField';

const RedisNode = ({ config, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="node-config">
      <ConfigField
        label="Redis URL"
        value={config.url || ''}
        onChange={(value) => handleChange('url', value)}
      />
      <ConfigField
        label="Operation"
        value={config.operation || 'get'}
        onChange={(value) => handleChange('operation', value)}
        select
      >
        <MenuItem value="get">Get</MenuItem>
        <MenuItem value="set">Set</MenuItem>
        <MenuItem value="delete">Delete</MenuItem>
        <MenuItem value="publish">Publish</MenuItem>
        <MenuItem value="subscribe">Subscribe</MenuItem>
      </ConfigField>
      <ConfigField
        label="Key"
        value={config.key || ''}
        onChange={(value) => handleChange('key', value)}
      />
      <ConfigField
        label="Value"
        value={config.value || ''}
        onChange={(value) => handleChange('value', value)}
        multiline
        rows={2}
      />
      <ConfigField
        label="TTL (seconds)"
        value={config.ttl || ''}
        onChange={(value) => handleChange('ttl', value)}
        type="number"
      />
    </div>
  );
};

export default RedisNode;
