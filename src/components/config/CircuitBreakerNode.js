import React from 'react';
import { MenuItem } from '@mui/material';
import ConfigField from './ConfigField';

const CircuitBreakerNode = ({ config, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="node-config">
      <ConfigField
        label="Failure Threshold"
        value={config.failureThreshold || '5'}
        onChange={(value) => handleChange('failureThreshold', value)}
        type="number"
        helperText="Number of failures before opening circuit"
      />
      <ConfigField
        label="Success Threshold"
        value={config.successThreshold || '2'}
        onChange={(value) => handleChange('successThreshold', value)}
        type="number"
        helperText="Successful calls needed to close circuit"
      />
      <ConfigField
        label="Timeout (ms)"
        value={config.timeout || '1000'}
        onChange={(value) => handleChange('timeout', value)}
        type="number"
      />
      <ConfigField
        label="Reset Timeout (ms)"
        value={config.resetTimeout || '60000'}
        onChange={(value) => handleChange('resetTimeout', value)}
        type="number"
        helperText="Time before attempting to close circuit"
      />
      <ConfigField
        label="Fallback Strategy"
        value={config.fallbackStrategy || 'static'}
        onChange={(value) => handleChange('fallbackStrategy', value)}
        select
      >
        <MenuItem value="static">Static Response</MenuItem>
        <MenuItem value="cache">Cache</MenuItem>
        <MenuItem value="alternative">Alternative Service</MenuItem>
        <MenuItem value="graceful-degradation">Graceful Degradation</MenuItem>
      </ConfigField>
      <ConfigField
        label="Monitoring"
        value={config.monitoring || 'metrics'}
        onChange={(value) => handleChange('monitoring', value)}
        select
      >
        <MenuItem value="metrics">Metrics Only</MenuItem>
        <MenuItem value="alerts">Alerts</MenuItem>
        <MenuItem value="logs">Detailed Logs</MenuItem>
        <MenuItem value="dashboard">Dashboard</MenuItem>
      </ConfigField>
    </div>
  );
};

export default CircuitBreakerNode;
