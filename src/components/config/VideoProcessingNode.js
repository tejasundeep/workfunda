import React from 'react';
import { MenuItem } from '@mui/material';
import ConfigField from './ConfigField';

const VideoProcessingNode = ({ config, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="node-config">
      <ConfigField
        label="Operation Type"
        value={config.operationType || 'transcode'}
        onChange={(value) => handleChange('operationType', value)}
        select
      >
        <MenuItem value="transcode">Transcode</MenuItem>
        <MenuItem value="compress">Compress</MenuItem>
        <MenuItem value="thumbnail">Generate Thumbnails</MenuItem>
        <MenuItem value="watermark">Add Watermark</MenuItem>
        <MenuItem value="trim">Trim Video</MenuItem>
        <MenuItem value="merge">Merge Videos</MenuItem>
        <MenuItem value="subtitle">Add Subtitles</MenuItem>
      </ConfigField>
      <ConfigField
        label="Input Format"
        value={config.inputFormat || 'mp4'}
        onChange={(value) => handleChange('inputFormat', value)}
        select
      >
        <MenuItem value="mp4">MP4</MenuItem>
        <MenuItem value="mov">MOV</MenuItem>
        <MenuItem value="avi">AVI</MenuItem>
        <MenuItem value="mkv">MKV</MenuItem>
        <MenuItem value="webm">WebM</MenuItem>
      </ConfigField>
      <ConfigField
        label="Output Format"
        value={config.outputFormat || 'mp4'}
        onChange={(value) => handleChange('outputFormat', value)}
        select
      >
        <MenuItem value="mp4">MP4</MenuItem>
        <MenuItem value="webm">WebM</MenuItem>
        <MenuItem value="hls">HLS</MenuItem>
        <MenuItem value="dash">DASH</MenuItem>
      </ConfigField>
      <ConfigField
        label="Resolution"
        value={config.resolution || '1080p'}
        onChange={(value) => handleChange('resolution', value)}
        select
      >
        <MenuItem value="2160p">4K (2160p)</MenuItem>
        <MenuItem value="1080p">Full HD (1080p)</MenuItem>
        <MenuItem value="720p">HD (720p)</MenuItem>
        <MenuItem value="480p">SD (480p)</MenuItem>
        <MenuItem value="360p">360p</MenuItem>
      </ConfigField>
      <ConfigField
        label="Codec Settings"
        value={config.codecSettings || ''}
        onChange={(value) => handleChange('codecSettings', value)}
        multiline
        rows={3}
        helperText="JSON object for codec configuration"
      />
      <ConfigField
        label="Processing Options"
        value={config.processingOptions || ''}
        onChange={(value) => handleChange('processingOptions', value)}
        multiline
        rows={3}
        helperText="Additional processing parameters"
      />
      <ConfigField
        label="Output Storage"
        value={config.outputStorage || 'local'}
        onChange={(value) => handleChange('outputStorage', value)}
        select
      >
        <MenuItem value="local">Local Storage</MenuItem>
        <MenuItem value="s3">Amazon S3</MenuItem>
        <MenuItem value="gcs">Google Cloud Storage</MenuItem>
        <MenuItem value="azure">Azure Blob Storage</MenuItem>
      </ConfigField>
    </div>
  );
};

export default VideoProcessingNode;
