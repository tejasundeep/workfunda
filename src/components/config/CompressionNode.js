import React from 'react';
import ConfigField from '../common/ConfigField';

export default function CompressionNode({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange(field, value);
  };

  const compressionTypeOptions = [
    { value: 'gzip', label: 'GZIP' },
    { value: 'bzip2', label: 'BZIP2' },
    { value: 'zip', label: 'ZIP' },
    { value: 'lz4', label: 'LZ4' },
    { value: 'zstd', label: 'Zstandard' },
    { value: 'custom', label: 'Custom Algorithm' }
  ];

  const strategyOptions = [
    { value: 'default', label: 'Default' },
    { value: 'filtered', label: 'Filtered' },
    { value: 'huffman', label: 'Huffman Only' },
    { value: 'rle', label: 'RLE' },
    { value: 'fixed', label: 'Fixed' }
  ];

  return (
    <div>
      <ConfigField
        label="Compression Type"
        type="select"
        field="compressionType"
        value={data.config?.compressionType}
        onChange={handleChange}
        options={compressionTypeOptions}
        required
      />

      <ConfigField
        label="Compression Level"
        type="number"
        field="compressionLevel"
        value={data.config?.compressionLevel}
        onChange={handleChange}
        min={1}
        max={9}
        validation="number"
        required
      />

      <ConfigField
        label="Strategy"
        type="select"
        field="strategy"
        value={data.config?.strategy}
        onChange={handleChange}
        options={strategyOptions}
      />

      {data.config?.compressionType === 'zip' && (
        <>
          <ConfigField
            label="Password Protection"
            type="checkbox"
            field="enablePassword"
            value={data.config?.enablePassword}
            onChange={handleChange}
          />
          {data.config?.enablePassword && (
            <ConfigField
              label="Password"
              type="password"
              field="password"
              value={data.config?.password}
              onChange={handleChange}
              secure
              required
            />
          )}
          <ConfigField
            label="Create Directory Structure"
            type="checkbox"
            field="createDirs"
            value={data.config?.createDirs}
            onChange={handleChange}
          />
        </>
      )}

      {data.config?.compressionType === 'custom' && (
        <ConfigField
          label="Custom Algorithm"
          type="textarea"
          field="customAlgorithm"
          value={data.config?.customAlgorithm}
          onChange={handleChange}
          placeholder={`class CustomCompression {
  compress(data, options) {
    // Compression implementation
  }
  decompress(data, options) {
    // Decompression implementation
  }
}`}
          rows={10}
          required
        />
      )}

      <ConfigField
        label="Memory Level"
        type="number"
        field="memLevel"
        value={data.config?.memLevel}
        onChange={handleChange}
        min={1}
        max={9}
        validation="number"
      />

      <ConfigField
        label="Window Bits"
        type="number"
        field="windowBits"
        value={data.config?.windowBits}
        onChange={handleChange}
        min={8}
        max={15}
        validation="number"
      />

      <ConfigField
        label="Dictionary"
        type="textarea"
        field="dictionary"
        value={data.config?.dictionary}
        onChange={handleChange}
        placeholder="Custom compression dictionary data"
        rows={4}
      />

      <ConfigField
        label="File Extensions"
        type="textarea"
        field="fileExtensions"
        value={data.config?.fileExtensions}
        onChange={handleChange}
        placeholder={`[
  ".txt",
  ".log",
  ".json"
]`}
        rows={4}
      />

      <ConfigField
        label="Minimum Size (bytes)"
        type="number"
        field="minSize"
        value={data.config?.minSize}
        onChange={handleChange}
        min={0}
        validation="number"
      />

      <ConfigField
        label="Maximum Size (bytes)"
        type="number"
        field="maxSize"
        value={data.config?.maxSize}
        onChange={handleChange}
        min={0}
        validation="number"
      />

      <ConfigField
        label="Concurrent Compression"
        type="checkbox"
        field="concurrent"
        value={data.config?.concurrent}
        onChange={handleChange}
      />

      {data.config?.concurrent && (
        <ConfigField
          label="Thread Count"
          type="number"
          field="threadCount"
          value={data.config?.threadCount}
          onChange={handleChange}
          min={1}
          max={32}
          validation="number"
          required
        />
      )}

      <ConfigField
        label="Enable Cache"
        type="checkbox"
        field="enableCache"
        value={data.config?.enableCache}
        onChange={handleChange}
      />

      {data.config?.enableCache && (
        <>
          <ConfigField
            label="Cache Size (MB)"
            type="number"
            field="cacheSize"
            value={data.config?.cacheSize}
            onChange={handleChange}
            min={1}
            validation="number"
            required
          />
          <ConfigField
            label="Cache TTL (seconds)"
            type="number"
            field="cacheTTL"
            value={data.config?.cacheTTL}
            onChange={handleChange}
            min={0}
            validation="number"
          />
        </>
      )}

      <ConfigField
        label="Progress Tracking"
        type="checkbox"
        field="enableProgress"
        value={data.config?.enableProgress}
        onChange={handleChange}
      />

      {data.config?.enableProgress && (
        <ConfigField
          label="Progress Callback"
          type="textarea"
          field="progressCallback"
          value={data.config?.progressCallback}
          onChange={handleChange}
          placeholder={`function onProgress(progress) {
  // Handle progress update
  console.log(\`Progress: \${progress}%\`);
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
          { value: 'skip', label: 'Skip File' },
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
        placeholder="Describe the purpose of this compression"
        rows={2}
      />
    </div>
  );
}
