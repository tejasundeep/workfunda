import React from 'react';
import { MenuItem } from '@mui/material';
import ConfigField from './ConfigField';

const WorkflowTestingNode = ({ config, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="node-config">
      <ConfigField
        label="Test Type"
        value={config.testType || 'unit'}
        onChange={(value) => handleChange('testType', value)}
        select
      >
        <MenuItem value="unit">Unit Test</MenuItem>
        <MenuItem value="integration">Integration Test</MenuItem>
        <MenuItem value="e2e">End-to-End Test</MenuItem>
        <MenuItem value="load">Load Test</MenuItem>
        <MenuItem value="chaos">Chaos Test</MenuItem>
      </ConfigField>
      <ConfigField
        label="Test Data Source"
        value={config.dataSource || 'mock'}
        onChange={(value) => handleChange('dataSource', value)}
        select
      >
        <MenuItem value="mock">Mock Data</MenuItem>
        <MenuItem value="fixture">Test Fixtures</MenuItem>
        <MenuItem value="replay">Traffic Replay</MenuItem>
        <MenuItem value="live">Live Data</MenuItem>
      </ConfigField>
      <ConfigField
        label="Assertions"
        value={config.assertions || ''}
        onChange={(value) => handleChange('assertions', value)}
        multiline
        rows={3}
        helperText="JSON array of test assertions"
      />
      <ConfigField
        label="Environment"
        value={config.environment || 'test'}
        onChange={(value) => handleChange('environment', value)}
        select
      >
        <MenuItem value="local">Local</MenuItem>
        <MenuItem value="test">Test</MenuItem>
        <MenuItem value="staging">Staging</MenuItem>
        <MenuItem value="production">Production</MenuItem>
      </ConfigField>
      <ConfigField
        label="Mock Services"
        value={config.mockServices || ''}
        onChange={(value) => handleChange('mockServices', value)}
        multiline
        rows={2}
        helperText="Services to mock during testing"
      />
      <ConfigField
        label="Test Report Format"
        value={config.reportFormat || 'junit'}
        onChange={(value) => handleChange('reportFormat', value)}
        select
      >
        <MenuItem value="junit">JUnit XML</MenuItem>
        <MenuItem value="html">HTML Report</MenuItem>
        <MenuItem value="json">JSON</MenuItem>
        <MenuItem value="custom">Custom Format</MenuItem>
      </ConfigField>
    </div>
  );
};

export default WorkflowTestingNode;
