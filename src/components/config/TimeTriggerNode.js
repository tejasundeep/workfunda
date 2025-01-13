import React from 'react';
import { MenuItem } from '@mui/material';
import ConfigField from './ConfigField';

const TimeTriggerNode = ({ config, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="node-config">
      <ConfigField
        label="Trigger Type"
        value={config.triggerType || 'cron'}
        onChange={(value) => handleChange('triggerType', value)}
        select
      >
        <MenuItem value="cron">Cron Expression</MenuItem>
        <MenuItem value="interval">Fixed Interval</MenuItem>
        <MenuItem value="specific">Specific Time</MenuItem>
        <MenuItem value="recurring">Recurring Schedule</MenuItem>
      </ConfigField>
      <ConfigField
        label="Cron Expression"
        value={config.cronExpression || ''}
        onChange={(value) => handleChange('cronExpression', value)}
        helperText="e.g., '0 0 * * *' for daily at midnight"
      />
      <ConfigField
        label="Interval"
        value={config.interval || ''}
        onChange={(value) => handleChange('interval', value)}
        type="number"
        helperText="Interval in minutes"
      />
      <ConfigField
        label="Time Zone"
        value={config.timezone || 'UTC'}
        onChange={(value) => handleChange('timezone', value)}
        select
      >
        <MenuItem value="UTC">UTC</MenuItem>
        <MenuItem value="America/New_York">Eastern Time</MenuItem>
        <MenuItem value="America/Los_Angeles">Pacific Time</MenuItem>
        <MenuItem value="Europe/London">London</MenuItem>
        <MenuItem value="Asia/Tokyo">Tokyo</MenuItem>
      </ConfigField>
      <ConfigField
        label="Active Days"
        value={config.activeDays || []}
        onChange={(value) => handleChange('activeDays', value)}
        select
        multiple
      >
        <MenuItem value="1">Monday</MenuItem>
        <MenuItem value="2">Tuesday</MenuItem>
        <MenuItem value="3">Wednesday</MenuItem>
        <MenuItem value="4">Thursday</MenuItem>
        <MenuItem value="5">Friday</MenuItem>
        <MenuItem value="6">Saturday</MenuItem>
        <MenuItem value="0">Sunday</MenuItem>
      </ConfigField>
      <ConfigField
        label="Retry on Failure"
        value={config.retryOnFailure || false}
        onChange={(value) => handleChange('retryOnFailure', value)}
        type="boolean"
      />
    </div>
  );
};

export default TimeTriggerNode;
