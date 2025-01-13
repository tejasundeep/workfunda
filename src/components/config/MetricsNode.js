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

  return (
    <div>
      <ConfigField
        label="Enable Metrics"
        type="switch"
        field="enabled"
        value={data.config?.enabled}
        onChange={handleChange}
      />

      {data.config?.enabled && (
        <>
          <ConfigField
            label="Metrics Type"
            type="select"
            field="metricsType"
            value={data.config?.metricsType}
            onChange={handleChange}
            options={metricsTypeOptions}
            required
          />

          <ConfigField
            label="Metric Name"
            type="text"
            field="metricName"
            value={data.config?.metricName}
            onChange={handleChange}
            placeholder="my_app_metric"
            required
          />

          <ConfigField
            label="Metric Type"
            type="select"
            field="metricType"
            value={data.config?.metricType}
            onChange={handleChange}
            options={metricTypeOptions}
            required
          />

          <ConfigField
            label="Description"
            type="textarea"
            field="description"
            value={data.config?.description}
            onChange={handleChange}
            placeholder="Describe what this metric measures"
            rows={2}
          />

          <ConfigField
            label="Enable Labels"
            type="switch"
            field="enableLabels"
            value={data.config?.enableLabels}
            onChange={handleChange}
          />

          {data.config?.enableLabels && (
            <ConfigField
              label="Labels"
              type="textarea"
              field="labels"
              value={data.config?.labels}
              onChange={handleChange}
              placeholder={`{
  "environment": "production",
  "service": "api",
  "version": "1.0.0"
}`}
              rows={6}
            />
          )}

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
                label="Enable Basic Auth"
                type="switch"
                field="enableAuth"
                value={data.config?.enableAuth}
                onChange={handleChange}
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
                label="Enable UDP"
                type="switch"
                field="enableUdp"
                value={data.config?.enableUdp}
                onChange={handleChange}
              />
              <ConfigField
                label="Sample Rate"
                type="number"
                field="sampleRate"
                value={data.config?.sampleRate}
                onChange={handleChange}
                min={0}
                max={1}
                step={0.1}
                validation="number"
              />
            </>
          )}

          {['histogram', 'summary'].includes(data.config?.metricType) && (
            <>
              <ConfigField
                label="Buckets/Quantiles"
                type="textarea"
                field="buckets"
                value={data.config?.buckets}
                onChange={handleChange}
                placeholder={`[0.1, 0.5, 0.9, 0.99]`}
                rows={3}
                required
              />
              <ConfigField
                label="Max Age (seconds)"
                type="number"
                field="maxAge"
                value={data.config?.maxAge}
                onChange={handleChange}
                min={1}
                validation="number"
              />
            </>
          )}

          <ConfigField
            label="Enable Aggregation"
            type="switch"
            field="enableAggregation"
            value={data.config?.enableAggregation}
            onChange={handleChange}
          />

          {data.config?.enableAggregation && (
            <>
              <ConfigField
                label="Aggregation Interval (seconds)"
                type="number"
                field="aggregationInterval"
                value={data.config?.aggregationInterval}
                onChange={handleChange}
                min={1}
                validation="number"
                required
              />
              <ConfigField
                label="Flush on Interval"
                type="switch"
                field="flushOnInterval"
                value={data.config?.flushOnInterval}
                onChange={handleChange}
              />
            </>
          )}

          <ConfigField
            label="Enable Buffering"
            type="switch"
            field="enableBuffering"
            value={data.config?.enableBuffering}
            onChange={handleChange}
          />

          {data.config?.enableBuffering && (
            <>
              <ConfigField
                label="Buffer Size"
                type="number"
                field="bufferSize"
                value={data.config?.bufferSize}
                onChange={handleChange}
                min={1}
                validation="number"
                required
              />
              <ConfigField
                label="Flush on Full"
                type="switch"
                field="flushOnFull"
                value={data.config?.flushOnFull}
                onChange={handleChange}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}
