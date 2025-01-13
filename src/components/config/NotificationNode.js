import React from 'react';
import ConfigField from '../common/ConfigField';

export default function NotificationNode({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange(field, value);
  };

  const notificationTypeOptions = [
    { value: 'email', label: 'Email' },
    { value: 'slack', label: 'Slack' },
    { value: 'teams', label: 'Microsoft Teams' },
    { value: 'webhook', label: 'Webhook' },
    { value: 'sms', label: 'SMS' },
    { value: 'push', label: 'Push Notification' },
    { value: 'custom', label: 'Custom Provider' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'normal', label: 'Normal' },
    { value: 'high', label: 'High' },
    { value: 'critical', label: 'Critical' }
  ];

  return (
    <div>
      <ConfigField
        label="Notification Type"
        type="select"
        field="notificationType"
        value={data.config?.notificationType}
        onChange={handleChange}
        options={notificationTypeOptions}
        required
      />

      {data.config?.notificationType === 'email' && (
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
            min={1}
            max={65535}
            validation="number"
            required
          />
          <ConfigField
            label="Username"
            type="text"
            field="username"
            value={data.config?.username}
            onChange={handleChange}
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
          <ConfigField
            label="From Address"
            type="text"
            field="fromAddress"
            value={data.config?.fromAddress}
            onChange={handleChange}
            placeholder="sender@example.com"
            required
          />
        </>
      )}

      {data.config?.notificationType === 'slack' && (
        <>
          <ConfigField
            label="Webhook URL"
            type="text"
            field="webhookUrl"
            value={data.config?.webhookUrl}
            onChange={handleChange}
            placeholder="https://hooks.slack.com/services/..."
            required
            secure
          />
          <ConfigField
            label="Channel"
            type="text"
            field="channel"
            value={data.config?.channel}
            onChange={handleChange}
            placeholder="#general"
          />
          <ConfigField
            label="Username"
            type="text"
            field="username"
            value={data.config?.username}
            onChange={handleChange}
            placeholder="Bot Name"
          />
          <ConfigField
            label="Icon URL"
            type="text"
            field="iconUrl"
            value={data.config?.iconUrl}
            onChange={handleChange}
            placeholder="https://example.com/icon.png"
          />
        </>
      )}

      {data.config?.notificationType === 'teams' && (
        <ConfigField
          label="Webhook URL"
          type="text"
          field="webhookUrl"
          value={data.config?.webhookUrl}
          onChange={handleChange}
          placeholder="https://outlook.office.com/webhook/..."
          required
          secure
        />
      )}

      {data.config?.notificationType === 'webhook' && (
        <>
          <ConfigField
            label="Webhook URL"
            type="text"
            field="webhookUrl"
            value={data.config?.webhookUrl}
            onChange={handleChange}
            placeholder="https://api.example.com/webhook"
            required
          />
          <ConfigField
            label="HTTP Method"
            type="select"
            field="httpMethod"
            value={data.config?.httpMethod}
            onChange={handleChange}
            options={[
              { value: 'POST', label: 'POST' },
              { value: 'PUT', label: 'PUT' }
            ]}
            required
          />
          <ConfigField
            label="Headers"
            type="textarea"
            field="headers"
            value={data.config?.headers}
            onChange={handleChange}
            placeholder={`{
  "Content-Type": "application/json",
  "Authorization": "Bearer token"
}`}
            rows={4}
          />
        </>
      )}

      {data.config?.notificationType === 'sms' && (
        <>
          <ConfigField
            label="Provider"
            type="select"
            field="smsProvider"
            value={data.config?.smsProvider}
            onChange={handleChange}
            options={[
              { value: 'twilio', label: 'Twilio' },
              { value: 'aws-sns', label: 'AWS SNS' },
              { value: 'messagebird', label: 'MessageBird' }
            ]}
            required
          />
          <ConfigField
            label="API Key"
            type="password"
            field="apiKey"
            value={data.config?.apiKey}
            onChange={handleChange}
            secure
            required
          />
          <ConfigField
            label="From Number"
            type="text"
            field="fromNumber"
            value={data.config?.fromNumber}
            onChange={handleChange}
            placeholder="+1234567890"
            required
          />
        </>
      )}

      {data.config?.notificationType === 'push' && (
        <>
          <ConfigField
            label="Provider"
            type="select"
            field="pushProvider"
            value={data.config?.pushProvider}
            onChange={handleChange}
            options={[
              { value: 'firebase', label: 'Firebase Cloud Messaging' },
              { value: 'onesignal', label: 'OneSignal' },
              { value: 'apn', label: 'Apple Push Notification' }
            ]}
            required
          />
          <ConfigField
            label="API Key"
            type="password"
            field="apiKey"
            value={data.config?.apiKey}
            onChange={handleChange}
            secure
            required
          />
          <ConfigField
            label="App ID"
            type="text"
            field="appId"
            value={data.config?.appId}
            onChange={handleChange}
            required
          />
        </>
      )}

      {data.config?.notificationType === 'custom' && (
        <ConfigField
          label="Custom Provider"
          type="textarea"
          field="customProvider"
          value={data.config?.customProvider}
          onChange={handleChange}
          placeholder={`class CustomNotificationProvider {
  async send(notification) {
    // Implementation
  }
}`}
          rows={8}
          required
        />
      )}

      <ConfigField
        label="Recipients"
        type="textarea"
        field="recipients"
        value={data.config?.recipients}
        onChange={handleChange}
        placeholder={`[
  "recipient1@example.com",
  "recipient2@example.com"
]`}
        rows={4}
        required
      />

      <ConfigField
        label="Template"
        type="textarea"
        field="template"
        value={data.config?.template}
        onChange={handleChange}
        placeholder={`{
  "subject": "Notification: {{title}}",
  "body": "Hello {{name}},\\n\\n{{message}}\\n\\nBest regards,\\nSystem"
}`}
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
        label="Batch Notifications"
        type="checkbox"
        field="enableBatching"
        value={data.config?.enableBatching}
        onChange={handleChange}
      />

      {data.config?.enableBatching && (
        <>
          <ConfigField
            label="Batch Size"
            type="number"
            field="batchSize"
            value={data.config?.batchSize}
            onChange={handleChange}
            min={1}
            max={1000}
            validation="number"
            required
          />
          <ConfigField
            label="Batch Interval (ms)"
            type="number"
            field="batchInterval"
            value={data.config?.batchInterval}
            onChange={handleChange}
            min={0}
            max={3600000}
            validation="number"
            required
          />
        </>
      )}

      <ConfigField
        label="Rate Limiting"
        type="checkbox"
        field="enableRateLimit"
        value={data.config?.enableRateLimit}
        onChange={handleChange}
      />

      {data.config?.enableRateLimit && (
        <>
          <ConfigField
            label="Max Requests"
            type="number"
            field="maxRequests"
            value={data.config?.maxRequests}
            onChange={handleChange}
            min={1}
            validation="number"
            required
          />
          <ConfigField
            label="Time Window (ms)"
            type="number"
            field="timeWindow"
            value={data.config?.timeWindow}
            onChange={handleChange}
            min={1000}
            validation="number"
            required
          />
        </>
      )}

      <ConfigField
        label="Error Handling"
        type="select"
        field="errorHandling"
        value={data.config?.errorHandling}
        onChange={handleChange}
        options={[
          { value: 'retry', label: 'Retry' },
          { value: 'fallback', label: 'Use Fallback Provider' },
          { value: 'queue', label: 'Queue for Later' },
          { value: 'ignore', label: 'Ignore Error' }
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

      {data.config?.errorHandling === 'fallback' && (
        <ConfigField
          label="Fallback Provider"
          type="select"
          field="fallbackProvider"
          value={data.config?.fallbackProvider}
          onChange={handleChange}
          options={notificationTypeOptions}
          required
        />
      )}

      <ConfigField
        label="Description"
        type="textarea"
        field="description"
        value={data.config?.description}
        onChange={handleChange}
        placeholder="Describe the purpose of this notification"
        rows={2}
      />
    </div>
  );
}
