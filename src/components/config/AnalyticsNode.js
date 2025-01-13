import React from 'react';
import { TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import ConfigField from './ConfigField';

const AnalyticsNode = ({ config, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="node-config">
      <ConfigField
        label="Analytics Type"
        value={config.type || 'custom'}
        onChange={(value) => handleChange('type', value)}
        select
      >
        <MenuItem value="google">Google Analytics</MenuItem>
        <MenuItem value="mixpanel">Mixpanel</MenuItem>
        <MenuItem value="segment">Segment</MenuItem>
        <MenuItem value="custom">Custom</MenuItem>
      </ConfigField>
      <ConfigField
        label="Event Name"
        value={config.eventName || ''}
        onChange={(value) => handleChange('eventName', value)}
      />
      <ConfigField
        label="API Key"
        value={config.apiKey || ''}
        onChange={(value) => handleChange('apiKey', value)}
        type="password"
      />
    </div>
  );
};

export default AnalyticsNode;
