import React from 'react';
import { MenuItem } from '@mui/material';
import ConfigField from './ConfigField';

const SocialMediaNode = ({ config, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="node-config">
      <ConfigField
        label="Platform"
        value={config.platform || 'twitter'}
        onChange={(value) => handleChange('platform', value)}
        select
      >
        <MenuItem value="twitter">Twitter</MenuItem>
        <MenuItem value="facebook">Facebook</MenuItem>
        <MenuItem value="instagram">Instagram</MenuItem>
        <MenuItem value="linkedin">LinkedIn</MenuItem>
        <MenuItem value="youtube">YouTube</MenuItem>
        <MenuItem value="tiktok">TikTok</MenuItem>
      </ConfigField>
      <ConfigField
        label="Operation"
        value={config.operation || 'post'}
        onChange={(value) => handleChange('operation', value)}
        select
      >
        <MenuItem value="post">Create Post</MenuItem>
        <MenuItem value="read">Read Posts/Comments</MenuItem>
        <MenuItem value="engage">Engage (Like/Comment)</MenuItem>
        <MenuItem value="monitor">Monitor Mentions</MenuItem>
        <MenuItem value="analyze">Analyze Metrics</MenuItem>
        <MenuItem value="schedule">Schedule Post</MenuItem>
      </ConfigField>
      <ConfigField
        label="Content Type"
        value={config.contentType || 'text'}
        onChange={(value) => handleChange('contentType', value)}
        select
      >
        <MenuItem value="text">Text</MenuItem>
        <MenuItem value="image">Image</MenuItem>
        <MenuItem value="video">Video</MenuItem>
        <MenuItem value="link">Link</MenuItem>
        <MenuItem value="poll">Poll</MenuItem>
      </ConfigField>
      <ConfigField
        label="Content"
        value={config.content || ''}
        onChange={(value) => handleChange('content', value)}
        multiline
        rows={3}
      />
      <ConfigField
        label="Schedule Time"
        value={config.scheduleTime || ''}
        onChange={(value) => handleChange('scheduleTime', value)}
        type="datetime-local"
      />
      <ConfigField
        label="Target Audience"
        value={config.targetAudience || ''}
        onChange={(value) => handleChange('targetAudience', value)}
        multiline
        rows={2}
        helperText="JSON object for targeting options"
      />
    </div>
  );
};

export default SocialMediaNode;
