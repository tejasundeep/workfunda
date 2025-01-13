import React from 'react';
import { MenuItem } from '@mui/material';
import ConfigField from './ConfigField';

const LoadBalancerNode = ({ config, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="node-config">
      <ConfigField
        label="Algorithm"
        value={config.algorithm || 'round-robin'}
        onChange={(value) => handleChange('algorithm', value)}
        select
      >
        <MenuItem value="round-robin">Round Robin</MenuItem>
        <MenuItem value="least-connections">Least Connections</MenuItem>
        <MenuItem value="weighted">Weighted</MenuItem>
        <MenuItem value="ip-hash">IP Hash</MenuItem>
        <MenuItem value="random">Random</MenuItem>
      </ConfigField>
      <ConfigField
        label="Health Check Path"
        value={config.healthCheckPath || '/health'}
        onChange={(value) => handleChange('healthCheckPath', value)}
      />
      <ConfigField
        label="Health Check Interval (s)"
        value={config.healthCheckInterval || '30'}
        onChange={(value) => handleChange('healthCheckInterval', value)}
        type="number"
      />
      <ConfigField
        label="Session Persistence"
        value={config.sessionPersistence || 'none'}
        onChange={(value) => handleChange('sessionPersistence', value)}
        select
      >
        <MenuItem value="none">None</MenuItem>
        <MenuItem value="cookie">Cookie Based</MenuItem>
        <MenuItem value="ip">IP Based</MenuItem>
      </ConfigField>
      <ConfigField
        label="SSL Termination"
        value={config.sslTermination || false}
        onChange={(value) => handleChange('sslTermination', value)}
        type="boolean"
      />
    </div>
  );
};

export default LoadBalancerNode;
