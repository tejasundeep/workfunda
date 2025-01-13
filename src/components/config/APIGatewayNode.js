import React from 'react';
import { MenuItem } from '@mui/material';
import ConfigField from './ConfigField';

const APIGatewayNode = ({ config, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="node-config">
      <ConfigField
        label="Gateway Type"
        value={config.type || 'rest'}
        onChange={(value) => handleChange('type', value)}
        select
      >
        <MenuItem value="rest">REST API</MenuItem>
        <MenuItem value="graphql">GraphQL</MenuItem>
        <MenuItem value="soap">SOAP</MenuItem>
        <MenuItem value="grpc">gRPC</MenuItem>
      </ConfigField>
      <ConfigField
        label="Rate Limiting"
        value={config.rateLimit || '100'}
        onChange={(value) => handleChange('rateLimit', value)}
        type="number"
      />
      <ConfigField
        label="Authentication"
        value={config.auth || 'none'}
        onChange={(value) => handleChange('auth', value)}
        select
      >
        <MenuItem value="none">None</MenuItem>
        <MenuItem value="apiKey">API Key</MenuItem>
        <MenuItem value="jwt">JWT</MenuItem>
        <MenuItem value="oauth2">OAuth 2.0</MenuItem>
      </ConfigField>
      <ConfigField
        label="Caching Strategy"
        value={config.caching || 'none'}
        onChange={(value) => handleChange('caching', value)}
        select
      >
        <MenuItem value="none">No Caching</MenuItem>
        <MenuItem value="memory">In-Memory</MenuItem>
        <MenuItem value="redis">Redis</MenuItem>
        <MenuItem value="cdn">CDN</MenuItem>
      </ConfigField>
      <ConfigField
        label="Timeout (ms)"
        value={config.timeout || '5000'}
        onChange={(value) => handleChange('timeout', value)}
        type="number"
      />
    </div>
  );
};

export default APIGatewayNode;
