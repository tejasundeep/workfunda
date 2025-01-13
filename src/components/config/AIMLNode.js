import React from 'react';
import { MenuItem } from '@mui/material';
import ConfigField from './ConfigField';

const AIMLNode = ({ config, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="node-config">
      <ConfigField
        label="AI Service"
        value={config.service || 'openai'}
        onChange={(value) => handleChange('service', value)}
        select
      >
        <MenuItem value="openai">OpenAI</MenuItem>
        <MenuItem value="huggingface">Hugging Face</MenuItem>
        <MenuItem value="aws">AWS AI Services</MenuItem>
        <MenuItem value="google">Google Cloud AI</MenuItem>
        <MenuItem value="azure">Azure Cognitive Services</MenuItem>
        <MenuItem value="anthropic">Anthropic</MenuItem>
      </ConfigField>
      <ConfigField
        label="Task Type"
        value={config.taskType || 'text'}
        onChange={(value) => handleChange('taskType', value)}
        select
      >
        <MenuItem value="text">Text Generation</MenuItem>
        <MenuItem value="image">Image Generation/Analysis</MenuItem>
        <MenuItem value="audio">Speech Processing</MenuItem>
        <MenuItem value="vision">Computer Vision</MenuItem>
        <MenuItem value="nlp">Natural Language Processing</MenuItem>
        <MenuItem value="classification">Classification</MenuItem>
        <MenuItem value="recommendation">Recommendation</MenuItem>
      </ConfigField>
      <ConfigField
        label="Model"
        value={config.model || ''}
        onChange={(value) => handleChange('model', value)}
        select
      >
        <MenuItem value="gpt-4">GPT-4</MenuItem>
        <MenuItem value="gpt-3.5">GPT-3.5</MenuItem>
        <MenuItem value="claude">Claude</MenuItem>
        <MenuItem value="stable-diffusion">Stable Diffusion</MenuItem>
        <MenuItem value="custom">Custom Model</MenuItem>
      </ConfigField>
      <ConfigField
        label="Input Configuration"
        value={config.inputConfig || ''}
        onChange={(value) => handleChange('inputConfig', value)}
        multiline
        rows={3}
        helperText="JSON object for input parameters"
      />
      <ConfigField
        label="Model Parameters"
        value={config.modelParams || ''}
        onChange={(value) => handleChange('modelParams', value)}
        multiline
        rows={3}
        helperText="Model-specific parameters"
      />
      <ConfigField
        label="Output Processing"
        value={config.outputProcessing || ''}
        onChange={(value) => handleChange('outputProcessing', value)}
        multiline
        rows={2}
        helperText="Output formatting and post-processing"
      />
      <ConfigField
        label="Error Handling"
        value={config.errorHandling || 'stop'}
        onChange={(value) => handleChange('errorHandling', value)}
        select
      >
        <MenuItem value="stop">Stop on Error</MenuItem>
        <MenuItem value="retry">Retry</MenuItem>
        <MenuItem value="fallback">Use Fallback</MenuItem>
        <MenuItem value="ignore">Ignore Error</MenuItem>
      </ConfigField>
    </div>
  );
};

export default AIMLNode;
