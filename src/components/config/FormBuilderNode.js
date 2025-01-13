import React from 'react';
import { MenuItem } from '@mui/material';
import ConfigField from './ConfigField';

const FormBuilderNode = ({ config, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="node-config">
      <ConfigField
        label="Form Type"
        value={config.formType || 'contact'}
        onChange={(value) => handleChange('formType', value)}
        select
      >
        <MenuItem value="contact">Contact Form</MenuItem>
        <MenuItem value="survey">Survey</MenuItem>
        <MenuItem value="registration">Registration</MenuItem>
        <MenuItem value="feedback">Feedback</MenuItem>
        <MenuItem value="application">Application Form</MenuItem>
      </ConfigField>
      <ConfigField
        label="Form Fields"
        value={config.fields || ''}
        onChange={(value) => handleChange('fields', value)}
        multiline
        rows={4}
        helperText="JSON array of form field configurations"
      />
      <ConfigField
        label="Validation Rules"
        value={config.validation || ''}
        onChange={(value) => handleChange('validation', value)}
        multiline
        rows={3}
        helperText="JSON object for field validation rules"
      />
      <ConfigField
        label="Submission Handler"
        value={config.submissionHandler || 'email'}
        onChange={(value) => handleChange('submissionHandler', value)}
        select
      >
        <MenuItem value="email">Email Notification</MenuItem>
        <MenuItem value="database">Database Storage</MenuItem>
        <MenuItem value="api">API Endpoint</MenuItem>
        <MenuItem value="webhook">Webhook</MenuItem>
        <MenuItem value="sheet">Google Sheet</MenuItem>
      </ConfigField>
      <ConfigField
        label="Success Message"
        value={config.successMessage || ''}
        onChange={(value) => handleChange('successMessage', value)}
        multiline
        rows={2}
      />
      <ConfigField
        label="Form Settings"
        value={config.settings || ''}
        onChange={(value) => handleChange('settings', value)}
        multiline
        rows={3}
        helperText="JSON object for form settings (CAPTCHA, redirect, etc.)"
      />
      <ConfigField
        label="Styling"
        value={config.styling || ''}
        onChange={(value) => handleChange('styling', value)}
        multiline
        rows={2}
        helperText="CSS or theme configuration"
      />
    </div>
  );
};

export default FormBuilderNode;
