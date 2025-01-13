import React from 'react';
import ConfigField from '../common/ConfigField';

export default function FileSystemNode({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange(field, value);
  };

  const operationTypeOptions = [
    { value: 'read', label: 'Read File' },
    { value: 'write', label: 'Write File' },
    { value: 'append', label: 'Append to File' },
    { value: 'delete', label: 'Delete File' },
    { value: 'copy', label: 'Copy File' },
    { value: 'move', label: 'Move File' },
    { value: 'list', label: 'List Directory' },
    { value: 'watch', label: 'Watch Directory' }
  ];

  const encodingOptions = [
    { value: 'utf8', label: 'UTF-8' },
    { value: 'ascii', label: 'ASCII' },
    { value: 'base64', label: 'Base64' },
    { value: 'binary', label: 'Binary' },
    { value: 'hex', label: 'Hexadecimal' }
  ];

  const watchEventOptions = [
    { value: 'add', label: 'File Added' },
    { value: 'change', label: 'File Changed' },
    { value: 'unlink', label: 'File Deleted' },
    { value: 'addDir', label: 'Directory Added' },
    { value: 'unlinkDir', label: 'Directory Deleted' }
  ];

  return (
    <div>
      <ConfigField
        label="Operation Type"
        type="select"
        field="operationType"
        value={data.config?.operationType}
        onChange={handleChange}
        options={operationTypeOptions}
        required
      />

      {['read', 'write', 'append', 'delete', 'copy', 'move'].includes(data.config?.operationType) && (
        <ConfigField
          label="File Path"
          type="text"
          field="filePath"
          value={data.config?.filePath}
          onChange={handleChange}
          placeholder="/path/to/file.txt"
          required
        />
      )}

      {['copy', 'move'].includes(data.config?.operationType) && (
        <ConfigField
          label="Destination Path"
          type="text"
          field="destinationPath"
          value={data.config?.destinationPath}
          onChange={handleChange}
          placeholder="/path/to/destination.txt"
          required
        />
      )}

      {['list', 'watch'].includes(data.config?.operationType) && (
        <>
          <ConfigField
            label="Directory Path"
            type="text"
            field="directoryPath"
            value={data.config?.directoryPath}
            onChange={handleChange}
            placeholder="/path/to/directory"
            required
          />
          <ConfigField
            label="Pattern"
            type="text"
            field="pattern"
            value={data.config?.pattern}
            onChange={handleChange}
            placeholder="*.txt"
          />
          <ConfigField
            label="Recursive"
            type="checkbox"
            field="recursive"
            value={data.config?.recursive}
            onChange={handleChange}
          />
        </>
      )}

      {['read', 'write', 'append'].includes(data.config?.operationType) && (
        <ConfigField
          label="Encoding"
          type="select"
          field="encoding"
          value={data.config?.encoding}
          onChange={handleChange}
          options={encodingOptions}
          required
        />
      )}

      {['write', 'append'].includes(data.config?.operationType) && (
        <ConfigField
          label="Content"
          type="textarea"
          field="content"
          value={data.config?.content}
          onChange={handleChange}
          placeholder="File content to write"
          rows={4}
          required
        />
      )}

      {data.config?.operationType === 'watch' && (
        <>
          <ConfigField
            label="Watch Events"
            type="select"
            field="watchEvents"
            value={data.config?.watchEvents}
            onChange={handleChange}
            options={watchEventOptions}
            multiple
            required
          />
          <ConfigField
            label="Ignore Pattern"
            type="text"
            field="ignorePattern"
            value={data.config?.ignorePattern}
            onChange={handleChange}
            placeholder="node_modules/**"
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
          { value: 'throw', label: 'Throw Error' },
          { value: 'skip', label: 'Skip Operation' },
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
        placeholder="Describe the purpose of this file system operation"
        rows={2}
      />
    </div>
  );
}
