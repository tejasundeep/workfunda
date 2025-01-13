import React from 'react';
import ConfigField from '../common/ConfigField';

export default function LoggerNode({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange(field, value);
  };

  const logLevelOptions = [
    { value: 'error', label: 'Error' },
    { value: 'warn', label: 'Warning' },
    { value: 'info', label: 'Info' },
    { value: 'debug', label: 'Debug' },
    { value: 'trace', label: 'Trace' }
  ];

  const outputTypeOptions = [
    { value: 'console', label: 'Console' },
    { value: 'file', label: 'File' },
    { value: 'database', label: 'Database' },
    { value: 'http', label: 'HTTP Endpoint' },
    { value: 'custom', label: 'Custom Handler' }
  ];

  const formatOptions = [
    { value: 'json', label: 'JSON' },
    { value: 'text', label: 'Plain Text' },
    { value: 'csv', label: 'CSV' },
    { value: 'custom', label: 'Custom Format' }
  ];

  const rotationUnitOptions = [
    { value: 'size', label: 'Size Based' },
    { value: 'time', label: 'Time Based' }
  ];

  return (
    <div>
      <ConfigField
        label="Log Level"
        type="select"
        field="logLevel"
        value={data.config?.logLevel}
        onChange={handleChange}
        options={logLevelOptions}
        required
      />

      <ConfigField
        label="Output Type"
        type="select"
        field="outputType"
        value={data.config?.outputType}
        onChange={handleChange}
        options={outputTypeOptions}
        required
      />

      <ConfigField
        label="Format"
        type="select"
        field="format"
        value={data.config?.format}
        onChange={handleChange}
        options={formatOptions}
        required
      />

      {data.config?.format === 'custom' && (
        <ConfigField
          label="Format Template"
          type="textarea"
          field="formatTemplate"
          value={data.config?.formatTemplate}
          onChange={handleChange}
          placeholder="%timestamp% [%level%] %message%"
          rows={3}
          required
        />
      )}

      {data.config?.outputType === 'file' && (
        <>
          <ConfigField
            label="File Path"
            type="text"
            field="filePath"
            value={data.config?.filePath}
            onChange={handleChange}
            placeholder="/path/to/logfile.log"
            required
          />
          <ConfigField
            label="Enable Rotation"
            type="checkbox"
            field="enableRotation"
            value={data.config?.enableRotation}
            onChange={handleChange}
          />
          {data.config?.enableRotation && (
            <>
              <ConfigField
                label="Rotation Unit"
                type="select"
                field="rotationUnit"
                value={data.config?.rotationUnit}
                onChange={handleChange}
                options={rotationUnitOptions}
                required
              />
              {data.config?.rotationUnit === 'size' && (
                <ConfigField
                  label="Max File Size (MB)"
                  type="number"
                  field="maxFileSize"
                  value={data.config?.maxFileSize}
                  onChange={handleChange}
                  min={1}
                  max={1024}
                  validation="number"
                  required
                />
              )}
              {data.config?.rotationUnit === 'time' && (
                <ConfigField
                  label="Rotation Interval"
                  type="select"
                  field="rotationInterval"
                  value={data.config?.rotationInterval}
                  onChange={handleChange}
                  options={[
                    { value: 'hourly', label: 'Hourly' },
                    { value: 'daily', label: 'Daily' },
                    { value: 'weekly', label: 'Weekly' },
                    { value: 'monthly', label: 'Monthly' }
                  ]}
                  required
                />
              )}
              <ConfigField
                label="Max Files"
                type="number"
                field="maxFiles"
                value={data.config?.maxFiles}
                onChange={handleChange}
                min={1}
                max={100}
                validation="number"
              />
              <ConfigField
                label="Compress Old Files"
                type="checkbox"
                field="compressOldFiles"
                value={data.config?.compressOldFiles}
                onChange={handleChange}
              />
            </>
          )}
        </>
      )}

      {data.config?.outputType === 'database' && (
        <>
          <ConfigField
            label="Database URL"
            type="text"
            field="databaseUrl"
            value={data.config?.databaseUrl}
            onChange={handleChange}
            placeholder="mysql://user:pass@host/db"
            required
            secure
          />
          <ConfigField
            label="Table Name"
            type="text"
            field="tableName"
            value={data.config?.tableName}
            onChange={handleChange}
            placeholder="logs"
            required
          />
          <ConfigField
            label="Batch Size"
            type="number"
            field="batchSize"
            value={data.config?.batchSize}
            onChange={handleChange}
            min={1}
            max={1000}
            validation="number"
          />
        </>
      )}

      {data.config?.outputType === 'http' && (
        <>
          <ConfigField
            label="Endpoint URL"
            type="text"
            field="endpointUrl"
            value={data.config?.endpointUrl}
            onChange={handleChange}
            placeholder="https://logging.example.com/logs"
            required
          />
          <ConfigField
            label="Authentication Token"
            type="password"
            field="authToken"
            value={data.config?.authToken}
            onChange={handleChange}
            secure
          />
          <ConfigField
            label="Batch Size"
            type="number"
            field="batchSize"
            value={data.config?.batchSize}
            onChange={handleChange}
            min={1}
            max={1000}
            validation="number"
          />
        </>
      )}

      {data.config?.outputType === 'custom' && (
        <ConfigField
          label="Custom Handler"
          type="textarea"
          field="customHandler"
          value={data.config?.customHandler}
          onChange={handleChange}
          placeholder={`function handleLog(logEntry) {
  // Your custom logging logic here
  console.log(logEntry);
}`}
          rows={10}
          required
        />
      )}

      <ConfigField
        label="Include Metadata"
        type="checkbox"
        field="includeMetadata"
        value={data.config?.includeMetadata}
        onChange={handleChange}
      />

      {data.config?.includeMetadata && (
        <ConfigField
          label="Metadata Fields"
          type="textarea"
          field="metadataFields"
          value={data.config?.metadataFields}
          onChange={handleChange}
          placeholder={`[
  "timestamp",
  "level",
  "source",
  "thread",
  "user"
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
          { value: 'retry', label: 'Retry Operation' },
          { value: 'fallback', label: 'Use Fallback Logger' }
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

      {data.config?.errorHandling === 'fallback' && (
        <ConfigField
          label="Fallback Output"
          type="select"
          field="fallbackOutput"
          value={data.config?.fallbackOutput}
          onChange={handleChange}
          options={outputTypeOptions}
          required
        />
      )}

      <ConfigField
        label="Description"
        type="textarea"
        field="description"
        value={data.config?.description}
        onChange={handleChange}
        placeholder="Describe the purpose of this logger"
        rows={2}
      />
    </div>
  );
}
