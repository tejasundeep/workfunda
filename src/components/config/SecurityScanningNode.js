import React from 'react';
import { MenuItem } from '@mui/material';
import ConfigField from './ConfigField';

const SecurityScanningNode = ({ config, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="node-config">
      <ConfigField
        label="Scan Type"
        value={config.scanType || 'vulnerability'}
        onChange={(value) => handleChange('scanType', value)}
        select
      >
        <MenuItem value="vulnerability">Vulnerability Scan</MenuItem>
        <MenuItem value="dependency">Dependency Check</MenuItem>
        <MenuItem value="sast">Static Analysis</MenuItem>
        <MenuItem value="dast">Dynamic Analysis</MenuItem>
        <MenuItem value="container">Container Security</MenuItem>
        <MenuItem value="secrets">Secret Detection</MenuItem>
      </ConfigField>
      <ConfigField
        label="Scanner"
        value={config.scanner || 'sonarqube'}
        onChange={(value) => handleChange('scanner', value)}
        select
      >
        <MenuItem value="sonarqube">SonarQube</MenuItem>
        <MenuItem value="snyk">Snyk</MenuItem>
        <MenuItem value="owasp">OWASP ZAP</MenuItem>
        <MenuItem value="trivy">Trivy</MenuItem>
        <MenuItem value="checkmarx">Checkmarx</MenuItem>
      </ConfigField>
      <ConfigField
        label="Severity Threshold"
        value={config.severityThreshold || 'high'}
        onChange={(value) => handleChange('severityThreshold', value)}
        select
      >
        <MenuItem value="critical">Critical Only</MenuItem>
        <MenuItem value="high">High and Above</MenuItem>
        <MenuItem value="medium">Medium and Above</MenuItem>
        <MenuItem value="low">All Issues</MenuItem>
      </ConfigField>
      <ConfigField
        label="Auto Remediation"
        value={config.autoRemediation || false}
        onChange={(value) => handleChange('autoRemediation', value)}
        type="boolean"
      />
      <ConfigField
        label="Scan Schedule"
        value={config.schedule || 'daily'}
        onChange={(value) => handleChange('schedule', value)}
        select
      >
        <MenuItem value="commit">On Commit</MenuItem>
        <MenuItem value="daily">Daily</MenuItem>
        <MenuItem value="weekly">Weekly</MenuItem>
        <MenuItem value="custom">Custom Schedule</MenuItem>
      </ConfigField>
      <ConfigField
        label="Compliance Frameworks"
        value={config.frameworks || []}
        onChange={(value) => handleChange('frameworks', value)}
        select
        multiple
      >
        <MenuItem value="pci">PCI DSS</MenuItem>
        <MenuItem value="hipaa">HIPAA</MenuItem>
        <MenuItem value="gdpr">GDPR</MenuItem>
        <MenuItem value="soc2">SOC 2</MenuItem>
        <MenuItem value="iso27001">ISO 27001</MenuItem>
      </ConfigField>
    </div>
  );
};

export default SecurityScanningNode;
