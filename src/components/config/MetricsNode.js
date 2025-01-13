import React from 'react';
import ConfigField from '../common/ConfigField';

export default function MetricsNode({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange(field, value);
  };

  const metricsTypeOptions = [
    { value: 'prometheus', label: 'Prometheus' },
    { value: 'statsd', label: 'StatsD' },
    { value: 'influxdb', label: 'InfluxDB' },
    { value: 'datadog', label: 'Datadog' },
    { value: 'newrelic', label: 'New Relic' },
    { value: 'custom', label: 'Custom Provider' }
  ];

  const metricTypeOptions = [
    { value: 'counter', label: 'Counter' },
    { value: 'gauge', label: 'Gauge' },
    { value: 'histogram', label: 'Histogram' },
    { value: 'summary', label: 'Summary' },
    { value: 'timer', label: 'Timer' }
  ];

  const aggregationOptions = [
    { value: 'sum', label: 'Sum' },
    { value: 'avg', label: 'Average' },
    { value: 'min', label: 'Minimum' },
    { value: 'max', label: 'Maximum' },
    { value: 'count', label: 'Count' },
    { value: 'percentile', label: 'Percentile' }
  ];

  return (
    <div>
      <ConfigField
        label="Metrics Type"
        type="select"
        field="metricsType"
        value={data.config?.metricsType}
        onChange={handleChange}
        options={metricsTypeOptions}
        required
      />

      {data.config?.metricsType === 'prometheus' && (
        <>
          <ConfigField
            label="Endpoint Path"
            type="text"
            field="endpointPath"
            value={data.config?.endpointPath}
            onChange={handleChange}
            placeholder="/metrics"
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
            label="Default Labels"
            type="textarea"
            field="defaultLabels"
            value={data.config?.defaultLabels}
            onChange={handleChange}
            placeholder={`{
  "environment": "production",
  "service": "api"
}`}
            rows={4}
          />
        </>
      )}

      {data.config?.metricsType === 'statsd' && (
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
            label="Prefix"
            type="text"
            field="prefix"
            value={data.config?.prefix}
            onChange={handleChange}
            placeholder="app.service"
          />
        </>
      )}

      {data.config?.metricsType === 'influxdb' && (
        <>
          <ConfigField
            label="URL"
            type="text"
            field="url"
            value={data.config?.url}
            onChange={handleChange}
            placeholder="http://localhost:8086"
            required
          />
          <ConfigField
            label="Token"
            type="password"
            field="token"
            value={data.config?.token}
            onChange={handleChange}
            secure
            required
          />
          <ConfigField
            label="Organization"
            type="text"
            field="org"
            value={data.config?.org}
            onChange={handleChange}
            required
          />
          <ConfigField
            label="Bucket"
            type="text"
            field="bucket"
            value={data.config?.bucket}
            onChange={handleChange}
            required
          />
        </>
      )}

      {data.config?.metricsType === 'datadog' && (
        <>
          <ConfigField
            label="API Key"
            type="password"
            field="apiKey"
            value={data.config?.apiKey}
            onChange={handleChange}
            secure
            required
          />
          <ConfigField
            label="Application Key"
            type="password"
            field="appKey"
            value={data.config?.appKey}
            onChange={handleChange}
            secure
            required
          />
          <ConfigField
            label="Service Name"
            type="text"
            field="serviceName"
            value={data.config?.serviceName}
            onChange={handleChange}
            required
          />
          <ConfigField
            label="Environment"
            type="text"
            field="environment"
            value={data.config?.environment}
            onChange={handleChange}
            required
          />
        </>
      )}

      {data.config?.metricsType === 'newrelic' && (
        <>
          <ConfigField
            label="License Key"
            type="password"
            field="licenseKey"
            value={data.config?.licenseKey}
            onChange={handleChange}
            secure
            required
          />
          <ConfigField
            label="Application Name"
            type="text"
            field="appName"
            value={data.config?.appName}
            onChange={handleChange}
            required
          />
          <ConfigField
            label="Environment"
            type="text"
            field="environment"
            value={data.config?.environment}
            onChange={handleChange}
            required
          />
        </>
      )}

      {data.config?.metricsType === 'custom' && (
        <ConfigField
          label="Custom Provider"
          type="textarea"
          field="customProvider"
          value={data.config?.customProvider}
          onChange={handleChange}
          placeholder={`class CustomMetricsProvider {
  recordMetric(name, value, tags) {
    // Implementation
  }
  getMetrics() {
    // Implementation
  }
}`}
          rows={10}
          required
        />
      )}

      <ConfigField
        label="Metric Definitions"
        type="textarea"
        field="metricDefinitions"
        value={data.config?.metricDefinitions}
        onChange={handleChange}
        placeholder={`[
  {
    "name": "request_duration",
    "type": "histogram",
    "description": "Request duration in milliseconds",
    "labels": ["method", "path", "status"]
  },
  {
    "name": "active_users",
    "type": "gauge",
    "description": "Number of active users"
  }
]`}
        rows={10}
        required
      />

      <ConfigField
        label="Default Tags"
        type="textarea"
        field="defaultTags"
        value={data.config?.defaultTags}
        onChange={handleChange}
        placeholder={`{
  "region": "us-east-1",
  "environment": "production"
}`}
        rows={4}
      />

      <ConfigField
        label="Aggregation"
        type="select"
        field="aggregation"
        value={data.config?.aggregation}
        onChange={handleChange}
        options={aggregationOptions}
      />

      {data.config?.aggregation === 'percentile' && (
        <ConfigField
          label="Percentiles"
          type="textarea"
          field="percentiles"
          value={data.config?.percentiles}
          onChange={handleChange}
          placeholder={`[50, 75, 90, 95, 99]`}
          rows={2}
          required
        />
      )}

      <ConfigField
        label="Collection Interval (seconds)"
        type="number"
        field="collectionInterval"
        value={data.config?.collectionInterval}
        onChange={handleChange}
        min={1}
        validation="number"
        required
      />

      <ConfigField
        label="Buffer Size"
        type="number"
        field="bufferSize"
        value={data.config?.bufferSize}
        onChange={handleChange}
        min={1}
        validation="number"
      />

      <ConfigField
        label="Enable Batching"
        type="checkbox"
        field="enableBatching"
        value={data.config?.enableBatching}
        onChange={handleChange}
      />

      {data.config?.enableBatching && (
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
        label="Enable Filtering"
        type="checkbox"
        field="enableFiltering"
        value={data.config?.enableFiltering}
        onChange={handleChange}
      />

      {data.config?.enableFiltering && (
        <ConfigField
          label="Filter Function"
          type="textarea"
          field="filterFunction"
          value={data.config?.filterFunction}
          onChange={handleChange}
          placeholder={`function filterMetric(metric) {
  // Return true to include metric, false to exclude
  return metric.value > 0;
}`}
          rows={6}
          required
        />
      )}

      <ConfigField
        label="Error Handling"
        type="select"
        field="errorHandling"
        value={data.config?.errorHandling}
        onChange={handleChange}
        options={[
          { value: 'throw', label: 'Throw Error' },
          { value: 'ignore', label: 'Ignore Error' },
          { value: 'retry', label: 'Retry Operation' }
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
        </>
      )}

      <ConfigField
        label="Description"
        type="textarea"
        field="description"
        value={data.config?.description}
        onChange={handleChange}
        placeholder="Describe the purpose of these metrics"
        rows={2}
      />
    </div>
  );
}
