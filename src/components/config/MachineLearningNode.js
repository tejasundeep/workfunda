import React from 'react';
import { MenuItem } from '@mui/material';
import ConfigField from './ConfigField';

const MachineLearningNode = ({ config, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="node-config">
      <ConfigField
        label="ML Service"
        value={config.service || 'custom'}
        onChange={(value) => handleChange('service', value)}
        select
      >
        <MenuItem value="tensorflow">TensorFlow</MenuItem>
        <MenuItem value="pytorch">PyTorch</MenuItem>
        <MenuItem value="huggingface">Hugging Face</MenuItem>
        <MenuItem value="custom">Custom Model</MenuItem>
      </ConfigField>
      <ConfigField
        label="Model Name/Path"
        value={config.modelPath || ''}
        onChange={(value) => handleChange('modelPath', value)}
      />
      <ConfigField
        label="Input Format"
        value={config.inputFormat || 'json'}
        onChange={(value) => handleChange('inputFormat', value)}
        select
      >
        <MenuItem value="json">JSON</MenuItem>
        <MenuItem value="csv">CSV</MenuItem>
        <MenuItem value="text">Plain Text</MenuItem>
      </ConfigField>
    </div>
  );
};

export default MachineLearningNode;
