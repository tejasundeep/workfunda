import React from 'react';
import { MenuItem } from '@mui/material';
import ConfigField from './ConfigField';

const PDFGenerationNode = ({ config, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="node-config">
      <ConfigField
        label="Generation Type"
        value={config.generationType || 'template'}
        onChange={(value) => handleChange('generationType', value)}
        select
      >
        <MenuItem value="template">From Template</MenuItem>
        <MenuItem value="html">From HTML</MenuItem>
        <MenuItem value="markdown">From Markdown</MenuItem>
        <MenuItem value="merge">Merge PDFs</MenuItem>
        <MenuItem value="form">Fill PDF Form</MenuItem>
      </ConfigField>
      <ConfigField
        label="Template ID"
        value={config.templateId || ''}
        onChange={(value) => handleChange('templateId', value)}
      />
      <ConfigField
        label="Content"
        value={config.content || ''}
        onChange={(value) => handleChange('content', value)}
        multiline
        rows={4}
        helperText="Template content or data to fill"
      />
      <ConfigField
        label="Page Settings"
        value={config.pageSettings || ''}
        onChange={(value) => handleChange('pageSettings', value)}
        multiline
        rows={2}
        helperText="JSON object for page size, orientation, margins"
      />
      <ConfigField
        label="Header/Footer"
        value={config.headerFooter || ''}
        onChange={(value) => handleChange('headerFooter', value)}
        multiline
        rows={2}
        helperText="Header and footer configuration"
      />
      <ConfigField
        label="Styling"
        value={config.styling || ''}
        onChange={(value) => handleChange('styling', value)}
        multiline
        rows={2}
        helperText="CSS styles for PDF generation"
      />
      <ConfigField
        label="Protection"
        value={config.protection || ''}
        onChange={(value) => handleChange('protection', value)}
        multiline
        rows={2}
        helperText="Password and permission settings"
      />
      <ConfigField
        label="Output Settings"
        value={config.outputSettings || ''}
        onChange={(value) => handleChange('outputSettings', value)}
        multiline
        rows={2}
        helperText="Compression, metadata, and other settings"
      />
    </div>
  );
};

export default PDFGenerationNode;
