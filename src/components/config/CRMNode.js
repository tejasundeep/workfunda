import React from 'react';
import { MenuItem } from '@mui/material';
import ConfigField from './ConfigField';

const CRMNode = ({ config, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="node-config">
      <ConfigField
        label="CRM Platform"
        value={config.platform || 'salesforce'}
        onChange={(value) => handleChange('platform', value)}
        select
      >
        <MenuItem value="salesforce">Salesforce</MenuItem>
        <MenuItem value="hubspot">HubSpot</MenuItem>
        <MenuItem value="zoho">Zoho CRM</MenuItem>
        <MenuItem value="dynamics">Microsoft Dynamics</MenuItem>
        <MenuItem value="pipedrive">Pipedrive</MenuItem>
      </ConfigField>
      <ConfigField
        label="Operation"
        value={config.operation || 'read'}
        onChange={(value) => handleChange('operation', value)}
        select
      >
        <MenuItem value="read">Read Records</MenuItem>
        <MenuItem value="create">Create Record</MenuItem>
        <MenuItem value="update">Update Record</MenuItem>
        <MenuItem value="delete">Delete Record</MenuItem>
        <MenuItem value="upsert">Upsert Record</MenuItem>
        <MenuItem value="query">Custom Query</MenuItem>
      </ConfigField>
      <ConfigField
        label="Object Type"
        value={config.objectType || 'contact'}
        onChange={(value) => handleChange('objectType', value)}
        select
      >
        <MenuItem value="contact">Contact</MenuItem>
        <MenuItem value="lead">Lead</MenuItem>
        <MenuItem value="account">Account</MenuItem>
        <MenuItem value="opportunity">Opportunity</MenuItem>
        <MenuItem value="case">Case</MenuItem>
        <MenuItem value="custom">Custom Object</MenuItem>
      </ConfigField>
      <ConfigField
        label="Fields"
        value={config.fields || ''}
        onChange={(value) => handleChange('fields', value)}
        multiline
        rows={3}
        helperText="Comma-separated field names or JSON mapping"
      />
      <ConfigField
        label="Filter Conditions"
        value={config.filterConditions || ''}
        onChange={(value) => handleChange('filterConditions', value)}
        multiline
        rows={2}
      />
      <ConfigField
        label="Batch Processing"
        value={config.batchProcessing || false}
        onChange={(value) => handleChange('batchProcessing', value)}
        type="boolean"
      />
    </div>
  );
};

export default CRMNode;
