import React from 'react';
import { MenuItem } from '@mui/material';
import ConfigField from './ConfigField';

const ComplianceCheckNode = ({ config, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="node-config">
      <ConfigField
        label="Compliance Framework"
        value={config.framework || 'gdpr'}
        onChange={(value) => handleChange('framework', value)}
        select
      >
        <MenuItem value="gdpr">GDPR</MenuItem>
        <MenuItem value="hipaa">HIPAA</MenuItem>
        <MenuItem value="pci">PCI DSS</MenuItem>
        <MenuItem value="sox">SOX</MenuItem>
        <MenuItem value="iso27001">ISO 27001</MenuItem>
        <MenuItem value="ccpa">CCPA</MenuItem>
      </ConfigField>
      <ConfigField
        label="Check Type"
        value={config.checkType || 'policy'}
        onChange={(value) => handleChange('checkType', value)}
        select
      >
        <MenuItem value="policy">Policy Check</MenuItem>
        <MenuItem value="configuration">Configuration Audit</MenuItem>
        <MenuItem value="access">Access Control</MenuItem>
        <MenuItem value="data">Data Protection</MenuItem>
        <MenuItem value="security">Security Controls</MenuItem>
      </ConfigField>
      <ConfigField
        label="Scope"
        value={config.scope || []}
        onChange={(value) => handleChange('scope', value)}
        select
        multiple
      >
        <MenuItem value="infrastructure">Infrastructure</MenuItem>
        <MenuItem value="application">Applications</MenuItem>
        <MenuItem value="data">Data Storage</MenuItem>
        <MenuItem value="network">Network</MenuItem>
        <MenuItem value="api">APIs</MenuItem>
      </ConfigField>
      <ConfigField
        label="Evidence Collection"
        value={config.evidenceCollection || true}
        onChange={(value) => handleChange('evidenceCollection', value)}
        type="boolean"
      />
      <ConfigField
        label="Report Format"
        value={config.reportFormat || 'pdf'}
        onChange={(value) => handleChange('reportFormat', value)}
        select
      >
        <MenuItem value="pdf">PDF</MenuItem>
        <MenuItem value="html">HTML</MenuItem>
        <MenuItem value="json">JSON</MenuItem>
        <MenuItem value="csv">CSV</MenuItem>
      </ConfigField>
      <ConfigField
        label="Remediation Actions"
        value={config.remediationActions || ''}
        onChange={(value) => handleChange('remediationActions', value)}
        multiline
        rows={3}
        helperText="JSON array of remediation steps"
      />
    </div>
  );
};

export default ComplianceCheckNode;
