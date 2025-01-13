import React from 'react';
import { MenuItem } from '@mui/material';
import ConfigField from './ConfigField';

const MonitoringNode = ({ config, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="node-config">
      <ConfigField
        label="Monitor Type"
        value={config.type || 'metric'}
        onChange={(value) => handleChange('type', value)}
        select
      >
        <MenuItem value="metric">Metrics Monitor</MenuItem>
        <MenuItem value="health">Health Check</MenuItem>
        <MenuItem value="log">Log Monitor</MenuItem>
        <MenuItem value="performance">Performance Monitor</MenuItem>
      </ConfigField>
      <ConfigField
        label="Alert Threshold"
        value={config.threshold || ''}
        onChange={(value) => handleChange('threshold', value)}
        type="number"
      />
      <ConfigField
        label="Alert Channels"
        value={config.channels || []}
        onChange={(value) => handleChange('channels', value)}
        select
        multiple
      >
        <MenuItem value="email">Email</MenuItem>
        <MenuItem value="slack">Slack</MenuItem>
        <MenuItem value="pagerduty">PagerDuty</MenuItem>
        <MenuItem value="webhook">Webhook</MenuItem>
      </ConfigField>
      <ConfigField
        label="Check Interval (seconds)"
        value={config.interval || 60}
        onChange={(value) => handleChange('interval', value)}
        type="number"
      />
    </div>
  );
};

export default MonitoringNode;
