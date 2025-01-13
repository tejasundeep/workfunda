import React from 'react';
import ConfigField from '../common/ConfigField';

export default function RateLimitNode({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange(field, value);
  };

  const rateLimitTypeOptions = [
    { value: 'fixed', label: 'Fixed Window' },
    { value: 'sliding', label: 'Sliding Window' },
    { value: 'token', label: 'Token Bucket' },
    { value: 'leaky', label: 'Leaky Bucket' },
    { value: 'distributed', label: 'Distributed Rate Limit' },
    { value: 'custom', label: 'Custom Algorithm' }
  ];

  const storageTypeOptions = [
    { value: 'memory', label: 'In-Memory' },
    { value: 'redis', label: 'Redis' },
    { value: 'memcached', label: 'Memcached' },
    { value: 'database', label: 'Database' }
  ];

  const keyGeneratorOptions = [
    { value: 'ip', label: 'IP Address' },
    { value: 'user', label: 'User ID' },
    { value: 'api', label: 'API Key' },
    { value: 'custom', label: 'Custom Key' }
  ];

  return (
    <div>
      <ConfigField
        label="Enable Rate Limiting"
        type="switch"
        field="enabled"
        value={data.config?.enabled}
        onChange={handleChange}
      />

      {data.config?.enabled && (
        <>
          <ConfigField
            label="Rate Limit Type"
            type="select"
            field="rateLimitType"
            value={data.config?.rateLimitType}
            onChange={handleChange}
            options={rateLimitTypeOptions}
            required
          />

          <ConfigField
            label="Max Requests"
            type="number"
            field="maxRequests"
            value={data.config?.maxRequests}
            onChange={handleChange}
            min={1}
            validation="number"
            required
          />

          <ConfigField
            label="Time Window (seconds)"
            type="number"
            field="timeWindow"
            value={data.config?.timeWindow}
            onChange={handleChange}
            min={1}
            validation="number"
            required
          />

          <ConfigField
            label="Storage Type"
            type="select"
            field="storageType"
            value={data.config?.storageType}
            onChange={handleChange}
            options={storageTypeOptions}
            required
          />

          <ConfigField
            label="Key Generator"
            type="select"
            field="keyGenerator"
            value={data.config?.keyGenerator}
            onChange={handleChange}
            options={keyGeneratorOptions}
            required
          />

          {data.config?.keyGenerator === 'custom' && (
            <ConfigField
              label="Custom Key Function"
              type="textarea"
              field="customKeyFunction"
              value={data.config?.customKeyFunction}
              onChange={handleChange}
              placeholder={`function generateKey(request) {
  // Generate a unique key for rate limiting
  return \`\${request.ip}_\${request.userId}\`;
}`}
              rows={6}
              required
            />
          )}

          {['token', 'leaky'].includes(data.config?.rateLimitType) && (
            <>
              <ConfigField
                label="Token Refill Rate"
                type="number"
                field="refillRate"
                value={data.config?.refillRate}
                onChange={handleChange}
                min={1}
                validation="number"
                required
              />
              <ConfigField
                label="Bucket Size"
                type="number"
                field="bucketSize"
                value={data.config?.bucketSize}
                onChange={handleChange}
                min={1}
                validation="number"
                required
              />
            </>
          )}

          {data.config?.rateLimitType === 'distributed' && (
            <>
              <ConfigField
                label="Cluster Size"
                type="number"
                field="clusterSize"
                value={data.config?.clusterSize}
                onChange={handleChange}
                min={1}
                validation="number"
                required
              />
              <ConfigField
                label="Sync Interval (ms)"
                type="number"
                field="syncInterval"
                value={data.config?.syncInterval}
                onChange={handleChange}
                min={100}
                validation="number"
                required
              />
            </>
          )}

          <ConfigField
            label="Enable Response Headers"
            type="switch"
            field="enableHeaders"
            value={data.config?.enableHeaders}
            onChange={handleChange}
          />

          <ConfigField
            label="Enable Retry-After"
            type="switch"
            field="enableRetryAfter"
            value={data.config?.enableRetryAfter}
            onChange={handleChange}
          />

          <ConfigField
            label="Enable Burst"
            type="switch"
            field="enableBurst"
            value={data.config?.enableBurst}
            onChange={handleChange}
          />

          {data.config?.enableBurst && (
            <>
              <ConfigField
                label="Burst Size"
                type="number"
                field="burstSize"
                value={data.config?.burstSize}
                onChange={handleChange}
                min={1}
                validation="number"
                required
              />
              <ConfigField
                label="Burst TTL (seconds)"
                type="number"
                field="burstTtl"
                value={data.config?.burstTtl}
                onChange={handleChange}
                min={1}
                validation="number"
                required
              />
            </>
          )}

          {data.config?.storageType === 'redis' && (
            <>
              <ConfigField
                label="Redis Host"
                type="text"
                field="redisHost"
                value={data.config?.redisHost}
                onChange={handleChange}
                placeholder="localhost"
                required
              />
              <ConfigField
                label="Redis Port"
                type="number"
                field="redisPort"
                value={data.config?.redisPort}
                onChange={handleChange}
                min={1}
                max={65535}
                validation="number"
                required
              />
              <ConfigField
                label="Enable TLS"
                type="switch"
                field="enableTls"
                value={data.config?.enableTls}
                onChange={handleChange}
              />
            </>
          )}

          <ConfigField
            label="Error Handling"
            type="select"
            field="errorHandling"
            value={data.config?.errorHandling}
            onChange={handleChange}
            options={[
              { value: 'reject', label: 'Reject Request' },
              { value: 'queue', label: 'Queue Request' },
              { value: 'throttle', label: 'Throttle Request' }
            ]}
          />

          <ConfigField
            label="Description"
            type="textarea"
            field="description"
            value={data.config?.description}
            onChange={handleChange}
            placeholder="Describe the purpose of this rate limiter"
            rows={3}
          />
        </>
      )}
    </div>
  );
}
