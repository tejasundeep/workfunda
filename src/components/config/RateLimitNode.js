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

      {data.config?.rateLimitType === 'custom' && (
        <ConfigField
          label="Custom Algorithm"
          type="textarea"
          field="customAlgorithm"
          value={data.config?.customAlgorithm}
          onChange={handleChange}
          placeholder={`class CustomRateLimiter {
  isAllowed(key) {
    // Implementation
    return true;
  }
  updateCounter(key) {
    // Implementation
  }
}`}
          rows={10}
          required
        />
      )}

      <ConfigField
        label="Storage Type"
        type="select"
        field="storageType"
        value={data.config?.storageType}
        onChange={handleChange}
        options={storageTypeOptions}
        required
      />

      {['redis', 'memcached'].includes(data.config?.storageType) && (
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
            label="Password"
            type="password"
            field="password"
            value={data.config?.password}
            onChange={handleChange}
            secure
          />
        </>
      )}

      {data.config?.storageType === 'database' && (
        <>
          <ConfigField
            label="Connection String"
            type="text"
            field="connectionString"
            value={data.config?.connectionString}
            onChange={handleChange}
            placeholder="postgresql://user:pass@localhost/db"
            required
            secure
          />
          <ConfigField
            label="Table Name"
            type="text"
            field="tableName"
            value={data.config?.tableName}
            onChange={handleChange}
            placeholder="rate_limits"
            required
          />
        </>
      )}

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
          label="Key Generator Function"
          type="textarea"
          field="keyGeneratorFunction"
          value={data.config?.keyGeneratorFunction}
          onChange={handleChange}
          placeholder={`function generateKey(request) {
  // Generate unique key for rate limiting
  return \`\${request.ip}-\${request.path}\`;
}`}
          rows={6}
          required
        />
      )}

      <ConfigField
        label="Enable Quota"
        type="checkbox"
        field="enableQuota"
        value={data.config?.enableQuota}
        onChange={handleChange}
      />

      {data.config?.enableQuota && (
        <>
          <ConfigField
            label="Quota Period (hours)"
            type="number"
            field="quotaPeriod"
            value={data.config?.quotaPeriod}
            onChange={handleChange}
            min={1}
            validation="number"
            required
          />
          <ConfigField
            label="Quota Limit"
            type="number"
            field="quotaLimit"
            value={data.config?.quotaLimit}
            onChange={handleChange}
            min={1}
            validation="number"
            required
          />
        </>
      )}

      <ConfigField
        label="Headers"
        type="textarea"
        field="headers"
        value={data.config?.headers}
        onChange={handleChange}
        placeholder={`{
  "X-RateLimit-Limit": "{{limit}}",
  "X-RateLimit-Remaining": "{{remaining}}",
  "X-RateLimit-Reset": "{{reset}}"
}`}
        rows={6}
      />

      <ConfigField
        label="Enable Override"
        type="checkbox"
        field="enableOverride"
        value={data.config?.enableOverride}
        onChange={handleChange}
      />

      {data.config?.enableOverride && (
        <ConfigField
          label="Override Rules"
          type="textarea"
          field="overrideRules"
          value={data.config?.overrideRules}
          onChange={handleChange}
          placeholder={`[
  {
    "condition": "user.role === 'premium'",
    "limit": 1000,
    "window": 3600
  }
]`}
          rows={6}
          required
        />
      )}

      <ConfigField
        label="Enable Burst"
        type="checkbox"
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
            field="burstTTL"
            value={data.config?.burstTTL}
            onChange={handleChange}
            min={1}
            validation="number"
            required
          />
        </>
      )}

      <ConfigField
        label="Error Response"
        type="textarea"
        field="errorResponse"
        value={data.config?.errorResponse}
        onChange={handleChange}
        placeholder={`{
  "status": 429,
  "message": "Too Many Requests",
  "retryAfter": "{{reset}}"
}`}
        rows={6}
      />

      <ConfigField
        label="Error Handling"
        type="select"
        field="errorHandling"
        value={data.config?.errorHandling}
        onChange={handleChange}
        options={[
          { value: 'block', label: 'Block Request' },
          { value: 'queue', label: 'Queue Request' },
          { value: 'throttle', label: 'Throttle Request' }
        ]}
      />

      {data.config?.errorHandling === 'queue' && (
        <>
          <ConfigField
            label="Queue Size"
            type="number"
            field="queueSize"
            value={data.config?.queueSize}
            onChange={handleChange}
            min={1}
            validation="number"
            required
          />
          <ConfigField
            label="Queue Timeout (ms)"
            type="number"
            field="queueTimeout"
            value={data.config?.queueTimeout}
            onChange={handleChange}
            min={0}
            validation="number"
            required
          />
        </>
      )}

      {data.config?.errorHandling === 'throttle' && (
        <ConfigField
          label="Throttle Factor"
          type="number"
          field="throttleFactor"
          value={data.config?.throttleFactor}
          onChange={handleChange}
          min={0}
          max={1}
          step={0.1}
          validation="number"
          required
        />
      )}

      <ConfigField
        label="Description"
        type="textarea"
        field="description"
        value={data.config?.description}
        onChange={handleChange}
        placeholder="Describe the purpose of this rate limit"
        rows={2}
      />
    </div>
  );
}
