import React from 'react';
import { MenuItem } from '@mui/material';
import ConfigField from './ConfigField';

const ImageProcessingNode = ({ config, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="node-config">
      <ConfigField
        label="Operation Type"
        value={config.operationType || 'transform'}
        onChange={(value) => handleChange('operationType', value)}
        select
      >
        <MenuItem value="transform">Transform</MenuItem>
        <MenuItem value="filter">Apply Filters</MenuItem>
        <MenuItem value="analyze">Analyze Image</MenuItem>
        <MenuItem value="detect">Object Detection</MenuItem>
        <MenuItem value="ocr">Text Recognition</MenuItem>
        <MenuItem value="face">Face Detection</MenuItem>
      </ConfigField>
      <ConfigField
        label="Service Provider"
        value={config.provider || 'sharp'}
        onChange={(value) => handleChange('provider', value)}
        select
      >
        <MenuItem value="sharp">Sharp</MenuItem>
        <MenuItem value="cloudinary">Cloudinary</MenuItem>
        <MenuItem value="aws">AWS Rekognition</MenuItem>
        <MenuItem value="google">Google Cloud Vision</MenuItem>
        <MenuItem value="azure">Azure Computer Vision</MenuItem>
      </ConfigField>
      <ConfigField
        label="Input Format"
        value={config.inputFormat || 'jpeg'}
        onChange={(value) => handleChange('inputFormat', value)}
        select
      >
        <MenuItem value="jpeg">JPEG</MenuItem>
        <MenuItem value="png">PNG</MenuItem>
        <MenuItem value="webp">WebP</MenuItem>
        <MenuItem value="gif">GIF</MenuItem>
        <MenuItem value="tiff">TIFF</MenuItem>
      </ConfigField>
      <ConfigField
        label="Output Format"
        value={config.outputFormat || 'jpeg'}
        onChange={(value) => handleChange('outputFormat', value)}
        select
      >
        <MenuItem value="jpeg">JPEG</MenuItem>
        <MenuItem value="png">PNG</MenuItem>
        <MenuItem value="webp">WebP</MenuItem>
        <MenuItem value="avif">AVIF</MenuItem>
      </ConfigField>
      <ConfigField
        label="Resize Options"
        value={config.resizeOptions || ''}
        onChange={(value) => handleChange('resizeOptions', value)}
        multiline
        rows={3}
        helperText="Width, height, and fit options"
      />
      <ConfigField
        label="Quality"
        value={config.quality || 80}
        onChange={(value) => handleChange('quality', value)}
        type="number"
        helperText="Output quality (1-100)"
      />
      <ConfigField
        label="Filters"
        value={config.filters || []}
        onChange={(value) => handleChange('filters', value)}
        select
        multiple
      >
        <MenuItem value="blur">Blur</MenuItem>
        <MenuItem value="sharpen">Sharpen</MenuItem>
        <MenuItem value="grayscale">Grayscale</MenuItem>
        <MenuItem value="rotate">Rotate</MenuItem>
        <MenuItem value="flip">Flip</MenuItem>
      </ConfigField>
      <ConfigField
        label="Detection Options"
        value={config.detectionOptions || ''}
        onChange={(value) => handleChange('detectionOptions', value)}
        multiline
        rows={3}
        helperText="Configuration for detection tasks"
      />
      <ConfigField
        label="Metadata"
        value={config.preserveMetadata || true}
        onChange={(value) => handleChange('preserveMetadata', value)}
        type="boolean"
        helperText="Preserve image metadata"
      />
    </div>
  );
};

export default ImageProcessingNode;
