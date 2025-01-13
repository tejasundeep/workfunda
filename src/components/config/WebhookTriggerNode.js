import React from 'react';
import { MenuItem } from '@mui/material';
import ConfigField from './ConfigField';

const WebhookTriggerNode = ({ config, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="node-config">
      <ConfigField
        label="HTTP Method"
        value={config.method || 'POST'}
        onChange={(value) => handleChange('method', value)}
        select
      >
        <MenuItem value="GET">GET</MenuItem>
        <MenuItem value="POST">POST</MenuItem>
        <MenuItem value="PUT">PUT</MenuItem>
        <MenuItem value="DELETE">DELETE</MenuItem>
        <MenuItem value="PATCH">PATCH</MenuItem>
        <MenuItem value="ANY">ANY</MenuItem>
      </ConfigField>
      <ConfigField
        label="Path"
        value={config.path || ''}
        onChange={(value) => handleChange('path', value)}
        helperText="Webhook endpoint path (e.g., /my-webhook)"
      />
      <ConfigField
        label="Authentication"
        value={config.auth || 'none'}
        onChange={(value) => handleChange('auth', value)}
        select
      >
        <MenuItem value="none">None</MenuItem>
        <MenuItem value="basic">Basic Auth</MenuItem>
        <MenuItem value="bearer">Bearer Token</MenuItem>
        <MenuItem value="apiKey">API Key</MenuItem>
        <MenuItem value="custom">Custom</MenuItem>
      </ConfigField>
      <ConfigField
        label="Response Type"
        value={config.responseType || 'json'}
        onChange={(value) => handleChange('responseType', value)}
        select
      >
        <MenuItem value="json">JSON</MenuItem>
        <MenuItem value="text">Plain Text</MenuItem>
        <MenuItem value="xml">XML</MenuItem>
        <MenuItem value="binary">Binary</MenuItem>
      </ConfigField>
      <ConfigField
        label="Request Schema"
        value={config.requestSchema || ''}
        onChange={(value) => handleChange('requestSchema', value)}
        multiline
        rows={3}
        helperText="JSON Schema for request validation"
      />
      <ConfigField
        label="Response Template"
        value={config.responseTemplate || ''}
        onChange={(value) => handleChange('responseTemplate', value)}
        multiline
        rows={3}
        helperText="Template for response formatting"
      />
      <ConfigField
        label="Rate Limiting"
        value={config.rateLimit || ''}
        onChange={(value) => handleChange('rateLimit', value)}
        type="number"
        helperText="Requests per minute (empty for unlimited)"
      />
    </div>
  );
};

export default WebhookTriggerNode;
