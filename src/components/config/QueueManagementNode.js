import React from 'react';
import { MenuItem } from '@mui/material';
import ConfigField from './ConfigField';

const QueueManagementNode = ({ config, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="node-config">
      <ConfigField
        label="Queue Service"
        value={config.service || 'sqs'}
        onChange={(value) => handleChange('service', value)}
        select
      >
        <MenuItem value="sqs">AWS SQS</MenuItem>
        <MenuItem value="rabbitmq">RabbitMQ</MenuItem>
        <MenuItem value="kafka">Apache Kafka</MenuItem>
        <MenuItem value="redis">Redis Queue</MenuItem>
        <MenuItem value="azure">Azure Queue Storage</MenuItem>
        <MenuItem value="gcp">Google Cloud Pub/Sub</MenuItem>
      </ConfigField>
      <ConfigField
        label="Operation"
        value={config.operation || 'send'}
        onChange={(value) => handleChange('operation', value)}
        select
      >
        <MenuItem value="send">Send Message</MenuItem>
        <MenuItem value="receive">Receive Message</MenuItem>
        <MenuItem value="peek">Peek Message</MenuItem>
        <MenuItem value="delete">Delete Message</MenuItem>
        <MenuItem value="purge">Purge Queue</MenuItem>
        <MenuItem value="deadletter">Handle Dead Letter</MenuItem>
      </ConfigField>
      <ConfigField
        label="Queue Name/URL"
        value={config.queueUrl || ''}
        onChange={(value) => handleChange('queueUrl', value)}
        helperText="Queue identifier or URL"
      />
      <ConfigField
        label="Message Body"
        value={config.messageBody || ''}
        onChange={(value) => handleChange('messageBody', value)}
        multiline
        rows={3}
        helperText="Message content to send"
      />
      <ConfigField
        label="Message Attributes"
        value={config.messageAttributes || ''}
        onChange={(value) => handleChange('messageAttributes', value)}
        multiline
        rows={2}
        helperText="Additional message metadata"
      />
      <ConfigField
        label="Batch Size"
        value={config.batchSize || 1}
        onChange={(value) => handleChange('batchSize', value)}
        type="number"
        helperText="Number of messages to process"
      />
      <ConfigField
        label="Visibility Timeout"
        value={config.visibilityTimeout || 30}
        onChange={(value) => handleChange('visibilityTimeout', value)}
        type="number"
        helperText="Message lock duration in seconds"
      />
      <ConfigField
        label="Delivery Delay"
        value={config.deliveryDelay || 0}
        onChange={(value) => handleChange('deliveryDelay', value)}
        type="number"
        helperText="Delay in seconds before delivery"
      />
      <ConfigField
        label="Message Priority"
        value={config.priority || 'normal'}
        onChange={(value) => handleChange('priority', value)}
        select
      >
        <MenuItem value="high">High</MenuItem>
        <MenuItem value="normal">Normal</MenuItem>
        <MenuItem value="low">Low</MenuItem>
      </ConfigField>
      <ConfigField
        label="Error Handling"
        value={config.errorHandling || ''}
        onChange={(value) => handleChange('errorHandling', value)}
        multiline
        rows={2}
        helperText="Error handling and retry policy"
      />
    </div>
  );
};

export default QueueManagementNode;
