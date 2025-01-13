import React from 'react';
import ConfigField from '../common/ConfigField';

export default function CacheNode({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange(field, value);
  };

  const cacheTypeOptions = [
    { value: 'memory', label: 'In-Memory' },
    { value: 'redis', label: 'Redis' },
    { value: 'memcached', label: 'Memcached' },
    { value: 'file', label: 'File System' },
    { value: 'custom', label: 'Custom Provider' }
  ];

  const evictionPolicyOptions = [
    { value: 'lru', label: 'Least Recently Used (LRU)' },
    { value: 'lfu', label: 'Least Frequently Used (LFU)' },
    { value: 'fifo', label: 'First In First Out (FIFO)' },
    { value: 'random', label: 'Random' },
    { value: 'custom', label: 'Custom Policy' }
  ];

  const serializationOptions = [
    { value: 'json', label: 'JSON' },
    { value: 'msgpack', label: 'MessagePack' },
    { value: 'protobuf', label: 'Protocol Buffers' },
    { value: 'custom', label: 'Custom Format' }
  ];

  return (
    <div>
      <ConfigField
        label="Cache Type"
        type="select"
        field="cacheType"
        value={data.config?.cacheType}
        onChange={handleChange}
        options={cacheTypeOptions}
        required
      />

      {['redis', 'memcached'].includes(data.config?.cacheType) && (
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
          <ConfigField
            label="Database Number"
            type="number"
            field="database"
            value={data.config?.database}
            onChange={handleChange}
            min={0}
            max={15}
            validation="number"
          />
          <ConfigField
            label="Connection Pool Size"
            type="number"
            field="poolSize"
            value={data.config?.poolSize}
            onChange={handleChange}
            min={1}
            max={1000}
            validation="number"
          />
        </>
      )}

      {data.config?.cacheType === 'file' && (
        <>
          <ConfigField
            label="Cache Directory"
            type="text"
            field="cacheDir"
            value={data.config?.cacheDir}
            onChange={handleChange}
            placeholder="/path/to/cache"
            required
          />
          <ConfigField
            label="File Extension"
            type="text"
            field="fileExtension"
            value={data.config?.fileExtension}
            onChange={handleChange}
            placeholder=".cache"
          />
        </>
      )}

      {data.config?.cacheType === 'custom' && (
        <ConfigField
          label="Custom Provider"
          type="textarea"
          field="customProvider"
          value={data.config?.customProvider}
          onChange={handleChange}
          placeholder={`class CustomCacheProvider {
  async get(key) {
    // Implementation
  }
  async set(key, value, ttl) {
    // Implementation
  }
  async delete(key) {
    // Implementation
  }
}`}
          rows={10}
          required
        />
      )}

      <ConfigField
        label="Key Prefix"
        type="text"
        field="keyPrefix"
        value={data.config?.keyPrefix}
        onChange={handleChange}
        placeholder="app:cache:"
      />

      <ConfigField
        label="Default TTL (seconds)"
        type="number"
        field="defaultTTL"
        value={data.config?.defaultTTL}
        onChange={handleChange}
        min={0}
        validation="number"
      />

      <ConfigField
        label="Maximum Size (MB)"
        type="number"
        field="maxSize"
        value={data.config?.maxSize}
        onChange={handleChange}
        min={0}
        validation="number"
      />

      <ConfigField
        label="Eviction Policy"
        type="select"
        field="evictionPolicy"
        value={data.config?.evictionPolicy}
        onChange={handleChange}
        options={evictionPolicyOptions}
        required
      />

      {data.config?.evictionPolicy === 'custom' && (
        <ConfigField
          label="Custom Eviction Policy"
          type="textarea"
          field="customEvictionPolicy"
          value={data.config?.customEvictionPolicy}
          onChange={handleChange}
          placeholder={`function evictItems(cache, requiredSpace) {
  // Implementation
  return itemsToEvict;
}`}
          rows={6}
          required
        />
      )}

      <ConfigField
        label="Serialization Format"
        type="select"
        field="serializationFormat"
        value={data.config?.serializationFormat}
        onChange={handleChange}
        options={serializationOptions}
        required
      />

      {data.config?.serializationFormat === 'custom' && (
        <ConfigField
          label="Custom Serializer"
          type="textarea"
          field="customSerializer"
          value={data.config?.customSerializer}
          onChange={handleChange}
          placeholder={`{
  serialize: (value) => {
    // Implementation
    return serialized;
  },
  deserialize: (data) => {
    // Implementation
    return deserialized;
  }
}`}
          rows={8}
          required
        />
      )}

      <ConfigField
        label="Enable Compression"
        type="checkbox"
        field="enableCompression"
        value={data.config?.enableCompression}
        onChange={handleChange}
      />

      {data.config?.enableCompression && (
        <ConfigField
          label="Compression Level"
          type="number"
          field="compressionLevel"
          value={data.config?.compressionLevel}
          onChange={handleChange}
          min={1}
          max={9}
          validation="number"
        />
      )}

      <ConfigField
        label="Enable Stats"
        type="checkbox"
        field="enableStats"
        value={data.config?.enableStats}
        onChange={handleChange}
      />

      {data.config?.enableStats && (
        <ConfigField
          label="Stats Fields"
          type="textarea"
          field="statsFields"
          value={data.config?.statsFields}
          onChange={handleChange}
          placeholder={`[
  "hits",
  "misses",
  "size",
  "evictions"
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
          { value: 'throw', label: 'Throw Error' },
          { value: 'ignore', label: 'Ignore Error' },
          { value: 'fallback', label: 'Use Fallback Value' }
        ]}
      />

      {data.config?.errorHandling === 'fallback' && (
        <ConfigField
          label="Fallback Strategy"
          type="textarea"
          field="fallbackStrategy"
          value={data.config?.fallbackStrategy}
          onChange={handleChange}
          placeholder={`async function getFallbackValue(key, error) {
  // Implementation
  return fallbackValue;
}`}
          rows={6}
          required
        />
      )}

      <ConfigField
        label="Description"
        type="textarea"
        field="description"
        value={data.config?.description}
        onChange={handleChange}
        placeholder="Describe the purpose of this cache"
        rows={2}
      />
    </div>
  );
}
