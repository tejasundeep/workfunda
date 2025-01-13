import React from 'react';
import { MenuItem } from '@mui/material';
import ConfigField from './ConfigField';

const ABTestingNode = ({ config, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="node-config">
      <ConfigField
        label="Test Name"
        value={config.testName || ''}
        onChange={(value) => handleChange('testName', value)}
      />
      <ConfigField
        label="Test Type"
        value={config.testType || 'ab'}
        onChange={(value) => handleChange('testType', value)}
        select
      >
        <MenuItem value="ab">A/B Test</MenuItem>
        <MenuItem value="split">Split Test</MenuItem>
        <MenuItem value="multivariate">Multivariate Test</MenuItem>
        <MenuItem value="bandit">Multi-Armed Bandit</MenuItem>
      </ConfigField>
      <ConfigField
        label="Variants"
        value={config.variants || ''}
        onChange={(value) => handleChange('variants', value)}
        multiline
        rows={3}
        helperText="JSON array of variant configurations"
      />
      <ConfigField
        label="Traffic Allocation"
        value={config.trafficAllocation || '50'}
        onChange={(value) => handleChange('trafficAllocation', value)}
        type="number"
        helperText="Percentage of traffic to include in test"
      />
      <ConfigField
        label="Success Metrics"
        value={config.successMetrics || []}
        onChange={(value) => handleChange('successMetrics', value)}
        select
        multiple
      >
        <MenuItem value="conversion">Conversion Rate</MenuItem>
        <MenuItem value="revenue">Revenue</MenuItem>
        <MenuItem value="engagement">Engagement Time</MenuItem>
        <MenuItem value="custom">Custom Metric</MenuItem>
      </ConfigField>
      <ConfigField
        label="Statistical Significance"
        value={config.significance || '95'}
        onChange={(value) => handleChange('significance', value)}
        type="number"
        helperText="Required confidence level (%)"
      />
    </div>
  );
};

export default ABTestingNode;
