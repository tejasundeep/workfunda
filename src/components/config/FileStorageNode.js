import React from 'react';
import { MenuItem } from '@mui/material';
import ConfigField from './ConfigField';

const FileStorageNode = ({ config, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="node-config">
      <ConfigField
        label="Storage Provider"
        value={config.provider || 's3'}
        onChange={(value) => handleChange('provider', value)}
        select
      >
        <MenuItem value="s3">Amazon S3</MenuItem>
        <MenuItem value="gcs">Google Cloud Storage</MenuItem>
        <MenuItem value="azure">Azure Blob Storage</MenuItem>
        <MenuItem value="dropbox">Dropbox</MenuItem>
        <MenuItem value="local">Local Storage</MenuItem>
        <MenuItem value="ftp">FTP/SFTP</MenuItem>
      </ConfigField>
      <ConfigField
        label="Operation"
        value={config.operation || 'upload'}
        onChange={(value) => handleChange('operation', value)}
        select
      >
        <MenuItem value="upload">Upload File</MenuItem>
        <MenuItem value="download">Download File</MenuItem>
        <MenuItem value="delete">Delete File</MenuItem>
        <MenuItem value="list">List Files</MenuItem>
        <MenuItem value="move">Move/Copy Files</MenuItem>
        <MenuItem value="sync">Sync Directory</MenuItem>
      </ConfigField>
      <ConfigField
        label="Bucket/Container"
        value={config.bucket || ''}
        onChange={(value) => handleChange('bucket', value)}
        helperText="Storage bucket or container name"
      />
      <ConfigField
        label="File Path"
        value={config.filePath || ''}
        onChange={(value) => handleChange('filePath', value)}
        helperText="Path to file or directory"
      />
      <ConfigField
        label="File Pattern"
        value={config.filePattern || '*.*'}
        onChange={(value) => handleChange('filePattern', value)}
        helperText="File matching pattern (e.g., *.pdf)"
      />
      <ConfigField
        label="Storage Options"
        value={config.storageOptions || ''}
        onChange={(value) => handleChange('storageOptions', value)}
        multiline
        rows={3}
        helperText="Provider-specific storage options"
      />
      <ConfigField
        label="Access Control"
        value={config.accessControl || 'private'}
        onChange={(value) => handleChange('accessControl', value)}
        select
      >
        <MenuItem value="private">Private</MenuItem>
        <MenuItem value="public-read">Public Read</MenuItem>
        <MenuItem value="public-write">Public Write</MenuItem>
        <MenuItem value="authenticated">Authenticated Users</MenuItem>
      </ConfigField>
      <ConfigField
        label="Encryption"
        value={config.encryption || 'none'}
        onChange={(value) => handleChange('encryption', value)}
        select
      >
        <MenuItem value="none">None</MenuItem>
        <MenuItem value="aes">AES</MenuItem>
        <MenuItem value="kms">KMS</MenuItem>
        <MenuItem value="custom">Custom</MenuItem>
      </ConfigField>
      <ConfigField
        label="Versioning"
        value={config.versioning || false}
        onChange={(value) => handleChange('versioning', value)}
        type="boolean"
        helperText="Enable version control"
      />
      <ConfigField
        label="Transfer Options"
        value={config.transferOptions || ''}
        onChange={(value) => handleChange('transferOptions', value)}
        multiline
        rows={2}
        helperText="Transfer configuration and optimization"
      />
    </div>
  );
};

export default FileStorageNode;
