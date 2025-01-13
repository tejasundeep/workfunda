import React from 'react';
import ConfigField from '../common/ConfigField';

export default function QueueNode({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange(field, value);
  };

  const queueTypeOptions = [
    { value: 'memory', label: 'In-Memory' },
    { value: 'redis', label: 'Redis' },
    { value: 'rabbitmq', label: 'RabbitMQ' },
    { value: 'kafka', label: 'Apache Kafka' },
    { value: 'sqs', label: 'AWS SQS' },
    { value: 'custom', label: 'Custom Provider' }
  ];

  const deliveryModeOptions = [
    { value: 'at_least_once', label: 'At Least Once' },
    { value: 'at_most_once', label: 'At Most Once' },
    { value: 'exactly_once', label: 'Exactly Once' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'normal', label: 'Normal' },
    { value: 'high', label: 'High' },
    { value: 'critical', label: 'Critical' }
  ];

  return (
    <div>
      <ConfigField
        label="Queue Type"
        type="select"
        field="queueType"
        value={data.config?.queueType}
        onChange={handleChange}
        options={queueTypeOptions}
        required
      />

      {['redis', 'rabbitmq', 'kafka'].includes(data.config?.queueType) && (
        <>
          <ConfigField
            label="Host"
            type="text"
            field="host"
            value={data.config?.host}
            onChange={handleChange}
            placeholder="localhost"
            required
          />
          <ConfigField
            label="Port"
            type="number"
            field="port"
            value={data.config?.port}
            onChange={handleChange}
            min={1}
            max={65535}
            validation="number"
            required
          />
          <ConfigField
            label="Username"
            type="text"
            field="username"
            value={data.config?.username}
            onChange={handleChange}
          />
          <ConfigField
            label="Password"
            type="password"
            field="password"
            value={data.config?.password}
            onChange={handleChange}
            secure
          />
        </>
      )}

      {data.config?.queueType === 'sqs' && (
        <>
          <ConfigField
            label="AWS Region"
            type="text"
            field="awsRegion"
            value={data.config?.awsRegion}
            onChange={handleChange}
            placeholder="us-east-1"
            required
          />
          <ConfigField
            label="Queue URL"
            type="text"
            field="queueUrl"
            value={data.config?.queueUrl}
            onChange={handleChange}
            placeholder="https://sqs.region.amazonaws.com/account/queue"
            required
          />
          <ConfigField
            label="Access Key ID"
            type="text"
            field="accessKeyId"
            value={data.config?.accessKeyId}
            onChange={handleChange}
            secure
          />
          <ConfigField
            label="Secret Access Key"
            type="password"
            field="secretAccessKey"
            value={data.config?.secretAccessKey}
            onChange={handleChange}
            secure
          />
        </>
      )}

      {data.config?.queueType === 'custom' && (
        <ConfigField
          label="Custom Provider"
          type="textarea"
          field="customProvider"
          value={data.config?.customProvider}
          onChange={handleChange}
          placeholder={`class CustomQueueProvider {
  async enqueue(message, options) {
    // Implementation
  }
  async dequeue() {
    // Implementation
  }
  async peek() {
    // Implementation
  }
}`}
          rows={10}
          required
        />
      )}

      <ConfigField
        label="Queue Name"
        type="text"
        field="queueName"
        value={data.config?.queueName}
        onChange={handleChange}
        placeholder="my-queue"
        required
      />

      <ConfigField
        label="Delivery Mode"
        type="select"
        field="deliveryMode"
        value={data.config?.deliveryMode}
        onChange={handleChange}
        options={deliveryModeOptions}
        required
      />

      <ConfigField
        label="Priority"
        type="select"
        field="priority"
        value={data.config?.priority}
        onChange={handleChange}
        options={priorityOptions}
      />

      <ConfigField
        label="Maximum Queue Size"
        type="number"
        field="maxQueueSize"
        value={data.config?.maxQueueSize}
        onChange={handleChange}
        min={0}
        validation="number"
      />

      <ConfigField
        label="Message TTL (seconds)"
        type="number"
        field="messageTTL"
        value={data.config?.messageTTL}
        onChange={handleChange}
        min={0}
        validation="number"
      />

      <ConfigField
        label="Dead Letter Queue"
        type="checkbox"
        field="enableDeadLetterQueue"
        value={data.config?.enableDeadLetterQueue}
        onChange={handleChange}
      />

      {data.config?.enableDeadLetterQueue && (
        <>
          <ConfigField
            label="Dead Letter Queue Name"
            type="text"
            field="deadLetterQueueName"
            value={data.config?.deadLetterQueueName}
            onChange={handleChange}
            placeholder="my-dlq"
            required
          />
          <ConfigField
            label="Max Retries"
            type="number"
            field="maxRetries"
            value={data.config?.maxRetries}
            onChange={handleChange}
            min={1}
            max={10}
            validation="number"
            required
          />
        </>
      )}

      <ConfigField
        label="Batch Processing"
        type="checkbox"
        field="enableBatchProcessing"
        value={data.config?.enableBatchProcessing}
        onChange={handleChange}
      />

      {data.config?.enableBatchProcessing && (
        <>
          <ConfigField
            label="Batch Size"
            type="number"
            field="batchSize"
            value={data.config?.batchSize}
            onChange={handleChange}
            min={1}
            max={10000}
            validation="number"
            required
          />
          <ConfigField
            label="Batch Timeout (ms)"
            type="number"
            field="batchTimeout"
            value={data.config?.batchTimeout}
            onChange={handleChange}
            min={0}
            max={60000}
            validation="number"
            required
          />
        </>
      )}

      <ConfigField
        label="Enable Persistence"
        type="checkbox"
        field="enablePersistence"
        value={data.config?.enablePersistence}
        onChange={handleChange}
      />

      {data.config?.enablePersistence && (
        <ConfigField
          label="Storage Path"
          type="text"
          field="storagePath"
          value={data.config?.storagePath}
          onChange={handleChange}
          placeholder="/path/to/queue/storage"
          required
        />
      )}

      <ConfigField
        label="Enable Monitoring"
        type="checkbox"
        field="enableMonitoring"
        value={data.config?.enableMonitoring}
        onChange={handleChange}
      />

      {data.config?.enableMonitoring && (
        <ConfigField
          label="Metrics"
          type="textarea"
          field="metrics"
          value={data.config?.metrics}
          onChange={handleChange}
          placeholder={`[
  "queue_size",
  "enqueue_rate",
  "dequeue_rate",
  "processing_time"
]`}
          rows={4}
        />
      )}

      <ConfigField
        label="Error Handling"
        type="select"
        field="errorHandling"
        value={data.config?.errorHandling}
        onChange={handleChange}
        options={[
          { value: 'retry', label: 'Retry Operation' },
          { value: 'dlq', label: 'Move to DLQ' },
          { value: 'ignore', label: 'Ignore Error' },
          { value: 'throw', label: 'Throw Error' }
        ]}
      />

      {data.config?.errorHandling === 'retry' && (
        <>
          <ConfigField
            label="Retry Count"
            type="number"
            field="retryCount"
            value={data.config?.retryCount}
            onChange={handleChange}
            min={1}
            max={5}
            validation="number"
          />
          <ConfigField
            label="Retry Delay (ms)"
            type="number"
            field="retryDelay"
            value={data.config?.retryDelay}
            onChange={handleChange}
            min={0}
            max={60000}
            validation="number"
          />
          <ConfigField
            label="Exponential Backoff"
            type="checkbox"
            field="exponentialBackoff"
            value={data.config?.exponentialBackoff}
            onChange={handleChange}
          />
        </>
      )}

      <ConfigField
        label="Description"
        type="textarea"
        field="description"
        value={data.config?.description}
        onChange={handleChange}
        placeholder="Describe the purpose of this queue"
        rows={2}
      />
    </div>
  );
}
