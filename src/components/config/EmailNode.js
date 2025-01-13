import React from 'react';
import ConfigField from '../common/ConfigField';

export default function EmailNode({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange(field, value);
  };

  const transportTypeOptions = [
    { value: 'smtp', label: 'SMTP' },
    { value: 'sendgrid', label: 'SendGrid' },
    { value: 'mailgun', label: 'Mailgun' },
    { value: 'ses', label: 'Amazon SES' }
  ];

  const emailTemplateOptions = [
    { value: 'custom', label: 'Custom Template' },
    { value: 'html', label: 'HTML Content' },
    { value: 'text', label: 'Plain Text' }
  ];

  const priorityOptions = [
    { value: 'high', label: 'High' },
    { value: 'normal', label: 'Normal' },
    { value: 'low', label: 'Low' }
  ];

  return (
    <div>
      <ConfigField
        label="Transport Type"
        type="select"
        field="transportType"
        value={data.config?.transportType}
        onChange={handleChange}
        options={transportTypeOptions}
        required
      />

      {data.config?.transportType === 'smtp' && (
        <>
          <ConfigField
            label="SMTP Host"
            type="text"
            field="smtpHost"
            value={data.config?.smtpHost}
            onChange={handleChange}
            placeholder="smtp.example.com"
            required
          />
          <ConfigField
            label="SMTP Port"
            type="number"
            field="smtpPort"
            value={data.config?.smtpPort}
            onChange={handleChange}
            placeholder="587"
            min={1}
            max={65535}
            validation="number"
            required
          />
          <ConfigField
            label="Use SSL"
            type="checkbox"
            field="useSSL"
            value={data.config?.useSSL}
            onChange={handleChange}
          />
          <ConfigField
            label="Username"
            type="text"
            field="username"
            value={data.config?.username}
            onChange={handleChange}
            placeholder="user@example.com"
            required
          />
          <ConfigField
            label="Password"
            type="password"
            field="password"
            value={data.config?.password}
            onChange={handleChange}
            secure
            required
          />
        </>
      )}

      {['sendgrid', 'mailgun', 'ses'].includes(data.config?.transportType) && (
        <ConfigField
          label="API Key"
          type="password"
          field="apiKey"
          value={data.config?.apiKey}
          onChange={handleChange}
          secure
          required
        />
      )}

      <ConfigField
        label="From Address"
        type="text"
        field="fromAddress"
        value={data.config?.fromAddress}
        onChange={handleChange}
        placeholder="sender@example.com"
        required
      />

      <ConfigField
        label="From Name"
        type="text"
        field="fromName"
        value={data.config?.fromName}
        onChange={handleChange}
        placeholder="Sender Name"
      />

      <ConfigField
        label="To Addresses"
        type="textarea"
        field="toAddresses"
        value={data.config?.toAddresses}
        onChange={handleChange}
        placeholder={`[
  "recipient1@example.com",
  "recipient2@example.com"
]`}
        rows={4}
        required
      />

      <ConfigField
        label="CC Addresses"
        type="textarea"
        field="ccAddresses"
        value={data.config?.ccAddresses}
        onChange={handleChange}
        placeholder={`[
  "cc1@example.com",
  "cc2@example.com"
]`}
        rows={3}
      />

      <ConfigField
        label="BCC Addresses"
        type="textarea"
        field="bccAddresses"
        value={data.config?.bccAddresses}
        onChange={handleChange}
        placeholder={`[
  "bcc1@example.com",
  "bcc2@example.com"
]`}
        rows={3}
      />

      <ConfigField
        label="Subject"
        type="text"
        field="subject"
        value={data.config?.subject}
        onChange={handleChange}
        placeholder="Email Subject"
        required
      />

      <ConfigField
        label="Template Type"
        type="select"
        field="templateType"
        value={data.config?.templateType}
        onChange={handleChange}
        options={emailTemplateOptions}
        required
      />

      {data.config?.templateType === 'custom' && (
        <ConfigField
          label="Template ID"
          type="text"
          field="templateId"
          value={data.config?.templateId}
          onChange={handleChange}
          placeholder="template_id"
          required
        />
      )}

      {['html', 'custom'].includes(data.config?.templateType) && (
        <ConfigField
          label="Template Variables"
          type="textarea"
          field="templateVariables"
          value={data.config?.templateVariables}
          onChange={handleChange}
          placeholder={`{
  "name": "John Doe",
  "resetLink": "https://example.com/reset"
}`}
          rows={6}
        />
      )}

      {data.config?.templateType !== 'custom' && (
        <ConfigField
          label="Email Content"
          type="textarea"
          field="content"
          value={data.config?.content}
          onChange={handleChange}
          placeholder={data.config?.templateType === 'html' ? 
            '<h1>Hello {{name}}</h1><p>Your content here</p>' : 
            'Hello {{name}},\n\nYour content here'}
          rows={10}
          required
        />
      )}

      <ConfigField
        label="Attachments"
        type="textarea"
        field="attachments"
        value={data.config?.attachments}
        onChange={handleChange}
        placeholder={`[
  {
    "filename": "document.pdf",
    "path": "/path/to/document.pdf"
  }
]`}
        rows={6}
      />

      <ConfigField
        label="Priority"
        type="select"
        field="priority"
        value={data.config?.priority}
        onChange={handleChange}
        options={priorityOptions}
      />

      <ConfigField
        label="Error Handling"
        type="select"
        field="errorHandling"
        value={data.config?.errorHandling}
        onChange={handleChange}
        options={[
          { value: 'throw', label: 'Throw Error' },
          { value: 'retry', label: 'Retry Sending' },
          { value: 'queue', label: 'Queue for Later' }
        ]}
      />

      {data.config?.errorHandling === 'retry' && (
        <>
          <ConfigField
            label="Retry Count"
            type="number"
            field="retryCount"
            value={data.config?.retryCount}
            onChange={handleChange}
            min={1}
            max={5}
            validation="number"
          />
          <ConfigField
            label="Retry Delay (ms)"
            type="number"
            field="retryDelay"
            value={data.config?.retryDelay}
            onChange={handleChange}
            min={0}
            max={60000}
            validation="number"
          />
        </>
      )}

      <ConfigField
        label="Description"
        type="textarea"
        field="description"
        value={data.config?.description}
        onChange={handleChange}
        placeholder="Describe the purpose of this email"
        rows={2}
      />
    </div>
  );
}
