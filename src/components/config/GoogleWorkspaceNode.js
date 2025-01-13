import React from 'react';
import { MenuItem } from '@mui/material';
import ConfigField from './ConfigField';

const GoogleWorkspaceNode = ({ config, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="node-config">
      <ConfigField
        label="Service Type"
        value={config.serviceType || 'sheets'}
        onChange={(value) => handleChange('serviceType', value)}
        select
      >
        <MenuItem value="sheets">Google Sheets</MenuItem>
        <MenuItem value="docs">Google Docs</MenuItem>
        <MenuItem value="drive">Google Drive</MenuItem>
        <MenuItem value="gmail">Gmail</MenuItem>
        <MenuItem value="calendar">Google Calendar</MenuItem>
        <MenuItem value="slides">Google Slides</MenuItem>
        <MenuItem value="forms">Google Forms</MenuItem>
      </ConfigField>
      <ConfigField
        label="Operation"
        value={config.operation || 'read'}
        onChange={(value) => handleChange('operation', value)}
        select
      >
        <MenuItem value="read">Read Data</MenuItem>
        <MenuItem value="write">Write Data</MenuItem>
        <MenuItem value="update">Update</MenuItem>
        <MenuItem value="delete">Delete</MenuItem>
        <MenuItem value="share">Share</MenuItem>
        <MenuItem value="search">Search</MenuItem>
      </ConfigField>
      <ConfigField
        label="Document ID"
        value={config.documentId || ''}
        onChange={(value) => handleChange('documentId', value)}
        helperText="Google Document/Sheet/Drive ID"
      />
      <ConfigField
        label="Range/Path"
        value={config.range || ''}
        onChange={(value) => handleChange('range', value)}
        helperText="Sheet range or file path"
      />
      <ConfigField
        label="Data Format"
        value={config.dataFormat || 'json'}
        onChange={(value) => handleChange('dataFormat', value)}
        select
      >
        <MenuItem value="json">JSON</MenuItem>
        <MenuItem value="csv">CSV</MenuItem>
        <MenuItem value="raw">Raw Text</MenuItem>
        <MenuItem value="html">HTML</MenuItem>
      </ConfigField>
      <ConfigField
        label="Formatting Options"
        value={config.formatting || ''}
        onChange={(value) => handleChange('formatting', value)}
        multiline
        rows={3}
        helperText="Document formatting settings"
      />
      <ConfigField
        label="Sharing Settings"
        value={config.sharingSettings || ''}
        onChange={(value) => handleChange('sharingSettings', value)}
        multiline
        rows={2}
        helperText="Permissions and sharing options"
      />
      <ConfigField
        label="Filter Criteria"
        value={config.filterCriteria || ''}
        onChange={(value) => handleChange('filterCriteria', value)}
        multiline
        rows={2}
        helperText="Search/filter conditions"
      />
      <ConfigField
        label="Batch Options"
        value={config.batchOptions || ''}
        onChange={(value) => handleChange('batchOptions', value)}
        multiline
        rows={2}
        helperText="Batch processing settings"
      />
      <ConfigField
        label="Version Control"
        value={config.versionControl || false}
        onChange={(value) => handleChange('versionControl', value)}
        type="boolean"
        helperText="Enable version history"
      />
    </div>
  );
};

export default GoogleWorkspaceNode;
