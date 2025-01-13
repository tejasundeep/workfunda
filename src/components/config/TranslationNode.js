import React from 'react';
import { MenuItem } from '@mui/material';
import ConfigField from './ConfigField';

const TranslationNode = ({ config, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="node-config">
      <ConfigField
        label="Translation Service"
        value={config.service || 'google'}
        onChange={(value) => handleChange('service', value)}
        select
      >
        <MenuItem value="google">Google Translate</MenuItem>
        <MenuItem value="deepl">DeepL</MenuItem>
        <MenuItem value="azure">Azure Translator</MenuItem>
        <MenuItem value="aws">AWS Translate</MenuItem>
        <MenuItem value="ibm">IBM Watson Language Translator</MenuItem>
      </ConfigField>
      <ConfigField
        label="Source Language"
        value={config.sourceLanguage || 'auto'}
        onChange={(value) => handleChange('sourceLanguage', value)}
        select
      >
        <MenuItem value="auto">Auto Detect</MenuItem>
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="es">Spanish</MenuItem>
        <MenuItem value="fr">French</MenuItem>
        <MenuItem value="de">German</MenuItem>
        <MenuItem value="zh">Chinese</MenuItem>
        <MenuItem value="ja">Japanese</MenuItem>
      </ConfigField>
      <ConfigField
        label="Target Language"
        value={config.targetLanguage || 'en'}
        onChange={(value) => handleChange('targetLanguage', value)}
        select
      >
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="es">Spanish</MenuItem>
        <MenuItem value="fr">French</MenuItem>
        <MenuItem value="de">German</MenuItem>
        <MenuItem value="zh">Chinese</MenuItem>
        <MenuItem value="ja">Japanese</MenuItem>
      </ConfigField>
      <ConfigField
        label="Content Type"
        value={config.contentType || 'text'}
        onChange={(value) => handleChange('contentType', value)}
        select
      >
        <MenuItem value="text">Plain Text</MenuItem>
        <MenuItem value="html">HTML</MenuItem>
        <MenuItem value="markdown">Markdown</MenuItem>
        <MenuItem value="json">JSON</MenuItem>
      </ConfigField>
      <ConfigField
        label="Glossary ID"
        value={config.glossaryId || ''}
        onChange={(value) => handleChange('glossaryId', value)}
        helperText="Custom terminology glossary"
      />
      <ConfigField
        label="Memory ID"
        value={config.memoryId || ''}
        onChange={(value) => handleChange('memoryId', value)}
        helperText="Translation memory database"
      />
      <ConfigField
        label="Advanced Options"
        value={config.options || ''}
        onChange={(value) => handleChange('options', value)}
        multiline
        rows={3}
        helperText="JSON object for additional translation options"
      />
    </div>
  );
};

export default TranslationNode;
