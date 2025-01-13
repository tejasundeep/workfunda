import React from 'react';
import { MenuItem } from '@mui/material';
import ConfigField from './ConfigField';

const ServiceDiscoveryNode = ({ config, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="node-config">
      <ConfigField
        label="Discovery Service"
        value={config.service || 'consul'}
        onChange={(value) => handleChange('service', value)}
        select
      >
        <MenuItem value="consul">Consul</MenuItem>
        <MenuItem value="eureka">Eureka</MenuItem>
        <MenuItem value="etcd">etcd</MenuItem>
        <MenuItem value="zookeeper">Zookeeper</MenuItem>
        <MenuItem value="kubernetes">Kubernetes Service Discovery</MenuItem>
      </ConfigField>
      <ConfigField
        label="Registration Mode"
        value={config.registrationMode || 'auto'}
        onChange={(value) => handleChange('registrationMode', value)}
        select
      >
        <MenuItem value="auto">Automatic</MenuItem>
        <MenuItem value="manual">Manual</MenuItem>
      </ConfigField>
      <ConfigField
        label="Service Name"
        value={config.serviceName || ''}
        onChange={(value) => handleChange('serviceName', value)}
      />
      <ConfigField
        label="Health Check Type"
        value={config.healthCheckType || 'http'}
        onChange={(value) => handleChange('healthCheckType', value)}
        select
      >
        <MenuItem value="http">HTTP</MenuItem>
        <MenuItem value="tcp">TCP</MenuItem>
        <MenuItem value="grpc">gRPC</MenuItem>
        <MenuItem value="script">Script</MenuItem>
      </ConfigField>
      <ConfigField
        label="Tags"
        value={config.tags || ''}
        onChange={(value) => handleChange('tags', value)}
        helperText="Comma-separated tags"
      />
    </div>
  );
};

export default ServiceDiscoveryNode;
