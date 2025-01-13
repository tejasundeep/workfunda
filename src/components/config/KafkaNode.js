import React from 'react';
import { MenuItem } from '@mui/material';
import ConfigField from './ConfigField';

const KafkaNode = ({ config, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="node-config">
      <ConfigField
        label="Broker List"
        value={config.brokers || ''}
        onChange={(value) => handleChange('brokers', value)}
      />
      <ConfigField
        label="Topic"
        value={config.topic || ''}
        onChange={(value) => handleChange('topic', value)}
      />
      <ConfigField
        label="Operation"
        value={config.operation || 'produce'}
        onChange={(value) => handleChange('operation', value)}
        select
      >
        <MenuItem value="produce">Produce</MenuItem>
        <MenuItem value="consume">Consume</MenuItem>
      </ConfigField>
      <ConfigField
        label="Consumer Group"
        value={config.consumerGroup || ''}
        onChange={(value) => handleChange('consumerGroup', value)}
      />
      <ConfigField
        label="Security Protocol"
        value={config.securityProtocol || 'PLAINTEXT'}
        onChange={(value) => handleChange('securityProtocol', value)}
        select
      >
        <MenuItem value="PLAINTEXT">PLAINTEXT</MenuItem>
        <MenuItem value="SSL">SSL</MenuItem>
        <MenuItem value="SASL_PLAINTEXT">SASL_PLAINTEXT</MenuItem>
        <MenuItem value="SASL_SSL">SASL_SSL</MenuItem>
      </ConfigField>
    </div>
  );
};

export default KafkaNode;
