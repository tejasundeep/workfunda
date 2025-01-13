import React from 'react';
import { MenuItem } from '@mui/material';
import ConfigField from './ConfigField';

const HTTPRequestNode = ({ config, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="node-config">
      <ConfigField
        label="Method"
        value={config.method || 'GET'}
        onChange={(value) => handleChange('method', value)}
        select
      >
        <MenuItem value="GET">GET</MenuItem>
        <MenuItem value="POST">POST</MenuItem>
        <MenuItem value="PUT">PUT</MenuItem>
        <MenuItem value="PATCH">PATCH</MenuItem>
        <MenuItem value="DELETE">DELETE</MenuItem>
        <MenuItem value="HEAD">HEAD</MenuItem>
        <MenuItem value="OPTIONS">OPTIONS</MenuItem>
      </ConfigField>
      <ConfigField
        label="URL"
        value={config.url || ''}
        onChange={(value) => handleChange('url', value)}
        helperText="API endpoint URL"
      />
      <ConfigField
        label="Headers"
        value={config.headers || ''}
        onChange={(value) => handleChange('headers', value)}
        multiline
        rows={3}
        helperText="JSON object of request headers"
      />
      <ConfigField
        label="Query Parameters"
        value={config.queryParams || ''}
        onChange={(value) => handleChange('queryParams', value)}
        multiline
        rows={2}
        helperText="URL query parameters"
      />
      <ConfigField
        label="Request Body"
        value={config.body || ''}
        onChange={(value) => handleChange('body', value)}
        multiline
        rows={4}
        helperText="Request body data"
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
        <MenuItem value="oauth2">OAuth 2.0</MenuItem>
        <MenuItem value="apiKey">API Key</MenuItem>
      </ConfigField>
      <ConfigField
        label="Auth Credentials"
        value={config.authCredentials || ''}
        onChange={(value) => handleChange('authCredentials', value)}
        multiline
        rows={2}
        helperText="Authentication credentials"
      />
      <ConfigField
        label="Timeout (ms)"
        value={config.timeout || 5000}
        onChange={(value) => handleChange('timeout', value)}
        type="number"
      />
      <ConfigField
        label="Retry Options"
        value={config.retryOptions || ''}
        onChange={(value) => handleChange('retryOptions', value)}
        multiline
        rows={2}
        helperText="Retry configuration"
      />
      <ConfigField
        label="Response Handling"
        value={config.responseHandling || []}
        onChange={(value) => handleChange('responseHandling', value)}
        select
        multiple
      >
        <MenuItem value="json">Parse JSON</MenuItem>
        <MenuItem value="xml">Parse XML</MenuItem>
        <MenuItem value="text">Raw Text</MenuItem>
        <MenuItem value="binary">Binary Data</MenuItem>
      </ConfigField>
    </div>
  );
};

export default HTTPRequestNode;
