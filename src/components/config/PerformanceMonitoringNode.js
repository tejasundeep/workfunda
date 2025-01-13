import React from 'react';
import { MenuItem } from '@mui/material';
import ConfigField from './ConfigField';

const PerformanceMonitoringNode = ({ config, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="node-config">
      <ConfigField
        label="Monitoring Type"
        value={config.monitoringType || 'apm'}
        onChange={(value) => handleChange('monitoringType', value)}
        select
      >
        <MenuItem value="apm">Application Performance</MenuItem>
        <MenuItem value="infrastructure">Infrastructure</MenuItem>
        <MenuItem value="realUser">Real User Monitoring</MenuItem>
        <MenuItem value="synthetic">Synthetic Monitoring</MenuItem>
        <MenuItem value="database">Database Performance</MenuItem>
      </ConfigField>
      <ConfigField
        label="Provider"
        value={config.provider || 'newrelic'}
        onChange={(value) => handleChange('provider', value)}
        select
      >
        <MenuItem value="newrelic">New Relic</MenuItem>
        <MenuItem value="datadog">Datadog</MenuItem>
        <MenuItem value="dynatrace">Dynatrace</MenuItem>
        <MenuItem value="prometheus">Prometheus</MenuItem>
        <MenuItem value="elastic">Elastic APM</MenuItem>
      </ConfigField>
      <ConfigField
        label="Metrics"
        value={config.metrics || []}
        onChange={(value) => handleChange('metrics', value)}
        select
        multiple
      >
        <MenuItem value="response_time">Response Time</MenuItem>
        <MenuItem value="throughput">Throughput</MenuItem>
        <MenuItem value="error_rate">Error Rate</MenuItem>
        <MenuItem value="cpu">CPU Usage</MenuItem>
        <MenuItem value="memory">Memory Usage</MenuItem>
        <MenuItem value="disk">Disk I/O</MenuItem>
      </ConfigField>
      <ConfigField
        label="Sampling Rate (%)"
        value={config.samplingRate || '100'}
        onChange={(value) => handleChange('samplingRate', value)}
        type="number"
      />
      <ConfigField
        label="Alert Conditions"
        value={config.alertConditions || ''}
        onChange={(value) => handleChange('alertConditions', value)}
        multiline
        rows={3}
        helperText="JSON array of alert conditions"
      />
      <ConfigField
        label="Retention Period (days)"
        value={config.retentionPeriod || '30'}
        onChange={(value) => handleChange('retentionPeriod', value)}
        type="number"
      />
    </div>
  );
};

export default PerformanceMonitoringNode;
