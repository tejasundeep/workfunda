import React from 'react';
import { MenuItem } from '@mui/material';
import ConfigField from './ConfigField';

const MessagingNode = ({ config, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="node-config">
      <ConfigField
        label="Provider"
        value={config.provider || 'twilio'}
        onChange={(value) => handleChange('provider', value)}
        select
      >
        <MenuItem value="twilio">Twilio</MenuItem>
        <MenuItem value="messagebird">MessageBird</MenuItem>
        <MenuItem value="vonage">Vonage (Nexmo)</MenuItem>
        <MenuItem value="plivo">Plivo</MenuItem>
        <MenuItem value="whatsapp">WhatsApp Business</MenuItem>
      </ConfigField>
      <ConfigField
        label="Message Type"
        value={config.messageType || 'sms'}
        onChange={(value) => handleChange('messageType', value)}
        select
      >
        <MenuItem value="sms">SMS</MenuItem>
        <MenuItem value="mms">MMS</MenuItem>
        <MenuItem value="whatsapp">WhatsApp</MenuItem>
        <MenuItem value="voice">Voice Call</MenuItem>
        <MenuItem value="verify">Verification Code</MenuItem>
      </ConfigField>
      <ConfigField
        label="From Number"
        value={config.from || ''}
        onChange={(value) => handleChange('from', value)}
      />
      <ConfigField
        label="To Number(s)"
        value={config.to || ''}
        onChange={(value) => handleChange('to', value)}
        multiline
        rows={2}
        helperText="Comma-separated phone numbers"
      />
      <ConfigField
        label="Message Content"
        value={config.content || ''}
        onChange={(value) => handleChange('content', value)}
        multiline
        rows={3}
      />
      <ConfigField
        label="Media URL"
        value={config.mediaUrl || ''}
        onChange={(value) => handleChange('mediaUrl', value)}
        helperText="URL for MMS attachments"
      />
      <ConfigField
        label="Schedule"
        value={config.schedule || ''}
        onChange={(value) => handleChange('schedule', value)}
        type="datetime-local"
      />
      <ConfigField
        label="Delivery Status Webhook"
        value={config.statusWebhook || ''}
        onChange={(value) => handleChange('statusWebhook', value)}
      />
    </div>
  );
};

export default MessagingNode;
