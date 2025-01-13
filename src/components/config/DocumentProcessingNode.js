import React from 'react';
import { MenuItem } from '@mui/material';
import ConfigField from './ConfigField';

const DocumentProcessingNode = ({ config, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="node-config">
      <ConfigField
        label="Document Type"
        value={config.docType || 'pdf'}
        onChange={(value) => handleChange('docType', value)}
        select
      >
        <MenuItem value="pdf">PDF</MenuItem>
        <MenuItem value="word">Word Document</MenuItem>
        <MenuItem value="excel">Excel Spreadsheet</MenuItem>
        <MenuItem value="image">Image</MenuItem>
      </ConfigField>
      <ConfigField
        label="Operation"
        value={config.operation || 'extract'}
        onChange={(value) => handleChange('operation', value)}
        select
      >
        <MenuItem value="extract">Extract Text</MenuItem>
        <MenuItem value="convert">Convert Format</MenuItem>
        <MenuItem value="ocr">OCR</MenuItem>
        <MenuItem value="merge">Merge Documents</MenuItem>
        <MenuItem value="split">Split Document</MenuItem>
      </ConfigField>
      <ConfigField
        label="Output Format"
        value={config.outputFormat || 'text'}
        onChange={(value) => handleChange('outputFormat', value)}
        select
      >
        <MenuItem value="text">Plain Text</MenuItem>
        <MenuItem value="json">JSON</MenuItem>
        <MenuItem value="pdf">PDF</MenuItem>
        <MenuItem value="image">Image</MenuItem>
      </ConfigField>
      <ConfigField
        label="Language (for OCR)"
        value={config.language || 'eng'}
        onChange={(value) => handleChange('language', value)}
      />
    </div>
  );
};

export default DocumentProcessingNode;
