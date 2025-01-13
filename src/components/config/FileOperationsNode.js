import React from 'react';
import { MenuItem } from '@mui/material';
import ConfigField from './ConfigField';

const FileOperationsNode = ({ config, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="node-config">
      <ConfigField
        label="Storage Type"
        value={config.storageType || 'local'}
        onChange={(value) => handleChange('storageType', value)}
        select
      >
        <MenuItem value="local">Local Storage</MenuItem>
        <MenuItem value="s3">Amazon S3</MenuItem>
        <MenuItem value="gcs">Google Cloud Storage</MenuItem>
        <MenuItem value="azure">Azure Blob Storage</MenuItem>
        <MenuItem value="dropbox">Dropbox</MenuItem>
        <MenuItem value="gdrive">Google Drive</MenuItem>
      </ConfigField>
      <ConfigField
        label="Operation"
        value={config.operation || 'read'}
        onChange={(value) => handleChange('operation', value)}
        select
      >
        <MenuItem value="read">Read File</MenuItem>
        <MenuItem value="write">Write File</MenuItem>
        <MenuItem value="copy">Copy File</MenuItem>
        <MenuItem value="move">Move File</MenuItem>
        <MenuItem value="delete">Delete File</MenuItem>
        <MenuItem value="list">List Files</MenuItem>
        <MenuItem value="watch">Watch Directory</MenuItem>
      </ConfigField>
      <ConfigField
        label="File Path"
        value={config.filePath || ''}
        onChange={(value) => handleChange('filePath', value)}
      />
      <ConfigField
        label="File Pattern"
        value={config.filePattern || '*.*'}
        onChange={(value) => handleChange('filePattern', value)}
        helperText="Glob pattern for file matching"
      />
      <ConfigField
        label="Recursive"
        value={config.recursive || false}
        onChange={(value) => handleChange('recursive', value)}
        type="boolean"
      />
      <ConfigField
        label="File Options"
        value={config.fileOptions || ''}
        onChange={(value) => handleChange('fileOptions', value)}
        multiline
        rows={3}
        helperText="JSON object for additional options (encoding, permissions, etc.)"
      />
      <ConfigField
        label="Error Handling"
        value={config.errorHandling || 'stop'}
        onChange={(value) => handleChange('errorHandling', value)}
        select
      >
        <MenuItem value="stop">Stop on Error</MenuItem>
        <MenuItem value="continue">Continue on Error</MenuItem>
        <MenuItem value="retry">Retry on Error</MenuItem>
      </ConfigField>
    </div>
  );
};

export default FileOperationsNode;
