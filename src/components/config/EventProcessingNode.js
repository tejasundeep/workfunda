import React from 'react';
import { MenuItem } from '@mui/material';
import ConfigField from './ConfigField';

const EventProcessingNode = ({ config, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="node-config">
      <ConfigField
        label="Event Source"
        value={config.source || 'kafka'}
        onChange={(value) => handleChange('source', value)}
        select
      >
        <MenuItem value="kafka">Apache Kafka</MenuItem>
        <MenuItem value="rabbitmq">RabbitMQ</MenuItem>
        <MenuItem value="sqs">AWS SQS</MenuItem>
        <MenuItem value="eventbridge">AWS EventBridge</MenuItem>
        <MenuItem value="pubsub">Google Pub/Sub</MenuItem>
      </ConfigField>
      <ConfigField
        label="Event Type"
        value={config.eventType || 'message'}
        onChange={(value) => handleChange('eventType', value)}
        select
      >
        <MenuItem value="message">Message</MenuItem>
        <MenuItem value="command">Command</MenuItem>
        <MenuItem value="notification">Notification</MenuItem>
        <MenuItem value="state-change">State Change</MenuItem>
      </ConfigField>
      <ConfigField
        label="Processing Mode"
        value={config.mode || 'sync'}
        onChange={(value) => handleChange('mode', value)}
        select
      >
        <MenuItem value="sync">Synchronous</MenuItem>
        <MenuItem value="async">Asynchronous</MenuItem>
        <MenuItem value="batch">Batch</MenuItem>
        <MenuItem value="stream">Stream</MenuItem>
      </ConfigField>
      <ConfigField
        label="Dead Letter Queue"
        value={config.dlq || ''}
        onChange={(value) => handleChange('dlq', value)}
      />
      <ConfigField
        label="Retry Policy"
        value={config.retryPolicy || 'exponential'}
        onChange={(value) => handleChange('retryPolicy', value)}
        select
      >
        <MenuItem value="none">No Retry</MenuItem>
        <MenuItem value="fixed">Fixed Interval</MenuItem>
        <MenuItem value="exponential">Exponential Backoff</MenuItem>
      </ConfigField>
    </div>
  );
};

export default EventProcessingNode;
