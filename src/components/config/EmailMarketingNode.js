import React from 'react';
import { MenuItem } from '@mui/material';
import ConfigField from './ConfigField';

const EmailMarketingNode = ({ config, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="node-config">
      <ConfigField
        label="Platform"
        value={config.platform || 'mailchimp'}
        onChange={(value) => handleChange('platform', value)}
        select
      >
        <MenuItem value="mailchimp">Mailchimp</MenuItem>
        <MenuItem value="sendgrid">SendGrid</MenuItem>
        <MenuItem value="constantcontact">Constant Contact</MenuItem>
        <MenuItem value="activecampaign">ActiveCampaign</MenuItem>
        <MenuItem value="klaviyo">Klaviyo</MenuItem>
        <MenuItem value="hubspot">HubSpot Email</MenuItem>
      </ConfigField>
      <ConfigField
        label="Operation"
        value={config.operation || 'send'}
        onChange={(value) => handleChange('operation', value)}
        select
      >
        <MenuItem value="send">Send Campaign</MenuItem>
        <MenuItem value="schedule">Schedule Campaign</MenuItem>
        <MenuItem value="template">Manage Templates</MenuItem>
        <MenuItem value="list">Manage Lists</MenuItem>
        <MenuItem value="subscriber">Manage Subscribers</MenuItem>
        <MenuItem value="analytics">View Analytics</MenuItem>
      </ConfigField>
      <ConfigField
        label="List/Audience ID"
        value={config.listId || ''}
        onChange={(value) => handleChange('listId', value)}
      />
      <ConfigField
        label="Template ID"
        value={config.templateId || ''}
        onChange={(value) => handleChange('templateId', value)}
      />
      <ConfigField
        label="Campaign Settings"
        value={config.campaignSettings || ''}
        onChange={(value) => handleChange('campaignSettings', value)}
        multiline
        rows={3}
        helperText="JSON object for campaign configuration"
      />
      <ConfigField
        label="Personalization"
        value={config.personalization || ''}
        onChange={(value) => handleChange('personalization', value)}
        multiline
        rows={2}
        helperText="Merge tags or personalization variables"
      />
      <ConfigField
        label="Schedule Time"
        value={config.scheduleTime || ''}
        onChange={(value) => handleChange('scheduleTime', value)}
        type="datetime-local"
      />
    </div>
  );
};

export default EmailMarketingNode;
