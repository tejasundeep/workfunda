import React from 'react';
import { MenuItem } from '@mui/material';
import ConfigField from './ConfigField';

const FeatureFlagNode = ({ config, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="node-config">
      <ConfigField
        label="Feature Key"
        value={config.featureKey || ''}
        onChange={(value) => handleChange('featureKey', value)}
      />
      <ConfigField
        label="Provider"
        value={config.provider || 'custom'}
        onChange={(value) => handleChange('provider', value)}
        select
      >
        <MenuItem value="custom">Custom</MenuItem>
        <MenuItem value="launchdarkly">LaunchDarkly</MenuItem>
        <MenuItem value="optimizely">Optimizely</MenuItem>
        <MenuItem value="split">Split.io</MenuItem>
        <MenuItem value="flagsmith">Flagsmith</MenuItem>
      </ConfigField>
      <ConfigField
        label="Rollout Strategy"
        value={config.rolloutStrategy || 'percentage'}
        onChange={(value) => handleChange('rolloutStrategy', value)}
        select
      >
        <MenuItem value="all">All Users</MenuItem>
        <MenuItem value="percentage">Percentage Rollout</MenuItem>
        <MenuItem value="user-group">User Groups</MenuItem>
        <MenuItem value="region">Geographic Region</MenuItem>
        <MenuItem value="custom-rule">Custom Rules</MenuItem>
      </ConfigField>
      <ConfigField
        label="Rollout Percentage"
        value={config.rolloutPercentage || '0'}
        onChange={(value) => handleChange('rolloutPercentage', value)}
        type="number"
        helperText="0-100"
      />
      <ConfigField
        label="Target Groups"
        value={config.targetGroups || ''}
        onChange={(value) => handleChange('targetGroups', value)}
        multiline
        rows={2}
        helperText="Comma-separated groups"
      />
      <ConfigField
        label="Default Value"
        value={config.defaultValue || false}
        onChange={(value) => handleChange('defaultValue', value)}
        type="boolean"
      />
    </div>
  );
};

export default FeatureFlagNode;
