import React from 'react';
import { MenuItem } from '@mui/material';
import ConfigField from './ConfigField';

const CostManagementNode = ({ config, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="node-config">
      <ConfigField
        label="Cost Type"
        value={config.costType || 'cloud'}
        onChange={(value) => handleChange('costType', value)}
        select
      >
        <MenuItem value="cloud">Cloud Resources</MenuItem>
        <MenuItem value="service">Service Usage</MenuItem>
        <MenuItem value="license">Licensing</MenuItem>
        <MenuItem value="infrastructure">Infrastructure</MenuItem>
        <MenuItem value="operation">Operational</MenuItem>
      </ConfigField>
      <ConfigField
        label="Provider"
        value={config.provider || 'aws'}
        onChange={(value) => handleChange('provider', value)}
        select
      >
        <MenuItem value="aws">AWS</MenuItem>
        <MenuItem value="azure">Azure</MenuItem>
        <MenuItem value="gcp">Google Cloud</MenuItem>
        <MenuItem value="custom">Custom Provider</MenuItem>
      </ConfigField>
      <ConfigField
        label="Budget Limit"
        value={config.budgetLimit || ''}
        onChange={(value) => handleChange('budgetLimit', value)}
        type="number"
      />
      <ConfigField
        label="Alert Thresholds"
        value={config.alertThresholds || []}
        onChange={(value) => handleChange('alertThresholds', value)}
        select
        multiple
      >
        <MenuItem value="50">50% of Budget</MenuItem>
        <MenuItem value="75">75% of Budget</MenuItem>
        <MenuItem value="90">90% of Budget</MenuItem>
        <MenuItem value="100">Budget Exceeded</MenuItem>
      </ConfigField>
      <ConfigField
        label="Optimization Strategy"
        value={config.optimizationStrategy || 'automated'}
        onChange={(value) => handleChange('optimizationStrategy', value)}
        select
      >
        <MenuItem value="automated">Automated Optimization</MenuItem>
        <MenuItem value="scheduled">Scheduled Scaling</MenuItem>
        <MenuItem value="manual">Manual Review</MenuItem>
        <MenuItem value="hybrid">Hybrid Approach</MenuItem>
      </ConfigField>
      <ConfigField
        label="Cost Allocation"
        value={config.costAllocation || ''}
        onChange={(value) => handleChange('costAllocation', value)}
        multiline
        rows={3}
        helperText="JSON object for cost allocation rules"
      />
      <ConfigField
        label="Report Schedule"
        value={config.reportSchedule || 'monthly'}
        onChange={(value) => handleChange('reportSchedule', value)}
        select
      >
        <MenuItem value="daily">Daily</MenuItem>
        <MenuItem value="weekly">Weekly</MenuItem>
        <MenuItem value="monthly">Monthly</MenuItem>
        <MenuItem value="quarterly">Quarterly</MenuItem>
      </ConfigField>
    </div>
  );
};

export default CostManagementNode;
