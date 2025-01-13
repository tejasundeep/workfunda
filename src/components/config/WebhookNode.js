import React from 'react';
import ConfigField from '../common/ConfigField';

export default function WebhookNode({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange(field, value);
  };

  const webhookTypeOptions = [
    { value: 'incoming', label: 'Incoming Webhook' },
    { value: 'outgoing', label: 'Outgoing Webhook' }
  ];

  const authTypeOptions = [
    { value: 'none', label: 'No Authentication' },
    { value: 'basic', label: 'Basic Auth' },
    { value: 'bearer', label: 'Bearer Token' },
    { value: 'apiKey', label: 'API Key' },
    { value: 'oauth2', label: 'OAuth 2.0' }
  ];

  const methodOptions = [
    { value: 'GET', label: 'GET' },
    { value: 'POST', label: 'POST' },
    { value: 'PUT', label: 'PUT' },
    { value: 'PATCH', label: 'PATCH' },
    { value: 'DELETE', label: 'DELETE' }
  ];

  return (
    <div>
      <ConfigField
        label="Webhook Type"
        type="select"
        field="webhookType"
        value={data.config?.webhookType}
        onChange={handleChange}
        options={webhookTypeOptions}
        required
      />

      {data.config?.webhookType === 'outgoing' && (
        <>
          <ConfigField
            label="URL"
            type="text"
            field="url"
            value={data.config?.url}
            onChange={handleChange}
            placeholder="https://api.example.com/webhook"
            required
          />

          <ConfigField
            label="Method"
            type="select"
            field="method"
            value={data.config?.method}
            onChange={handleChange}
            options={methodOptions}
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
  "Accept": "application/json"
}`}
            rows={4}
          />

          <ConfigField
            label="Authentication Type"
            type="select"
            field="authType"
            value={data.config?.authType}
            onChange={handleChange}
            options={authTypeOptions}
          />

          {data.config?.authType === 'basic' && (
            <>
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
                required
              />
            </>
          )}

          {data.config?.authType === 'bearer' && (
            <ConfigField
              label="Bearer Token"
              type="password"
              field="bearerToken"
              value={data.config?.bearerToken}
              onChange={handleChange}
              required
            />
          )}

          {data.config?.authType === 'apiKey' && (
            <>
              <ConfigField
                label="API Key Name"
                type="text"
                field="apiKeyName"
                value={data.config?.apiKeyName}
                onChange={handleChange}
                placeholder="X-API-Key"
                required
              />
              <ConfigField
                label="API Key Value"
                type="password"
                field="apiKeyValue"
                value={data.config?.apiKeyValue}
                onChange={handleChange}
                required
              />
              <ConfigField
                label="API Key Location"
                type="select"
                field="apiKeyLocation"
                value={data.config?.apiKeyLocation}
                onChange={handleChange}
                options={[
                  { value: 'header', label: 'Header' },
                  { value: 'query', label: 'Query Parameter' }
                ]}
                required
              />
            </>
          )}

          {data.config?.authType === 'oauth2' && (
            <>
              <ConfigField
                label="Token URL"
                type="text"
                field="tokenUrl"
                value={data.config?.tokenUrl}
                onChange={handleChange}
                placeholder="https://auth.example.com/oauth/token"
                required
              />
              <ConfigField
                label="Client ID"
                type="text"
                field="clientId"
                value={data.config?.clientId}
                onChange={handleChange}
                required
              />
              <ConfigField
                label="Client Secret"
                type="password"
                field="clientSecret"
                value={data.config?.clientSecret}
                onChange={handleChange}
                required
              />
              <ConfigField
                label="Scope"
                type="text"
                field="scope"
                value={data.config?.scope}
                onChange={handleChange}
                placeholder="read write"
              />
            </>
          )}

          <ConfigField
            label="Timeout (ms)"
            type="number"
            field="timeout"
            value={data.config?.timeout}
            onChange={handleChange}
            min={0}
            max={60000}
            validation="number"
          />

          <ConfigField
            label="Retry Count"
            type="number"
            field="retryCount"
            value={data.config?.retryCount}
            onChange={handleChange}
            min={0}
            max={5}
            validation="number"
          />
        </>
      )}

      {data.config?.webhookType === 'incoming' && (
        <>
          <ConfigField
            label="Path"
            type="text"
            field="path"
            value={data.config?.path}
            onChange={handleChange}
            placeholder="/webhook"
            required
          />

          <ConfigField
            label="Secret"
            type="password"
            field="secret"
            value={data.config?.secret}
            onChange={handleChange}
            placeholder="Webhook secret for signature verification"
          />

          <ConfigField
            label="Response Template"
            type="textarea"
            field="responseTemplate"
            value={data.config?.responseTemplate}
            onChange={handleChange}
            placeholder={`{
  "status": "success",
  "message": "Webhook received"
}`}
            rows={4}
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
          { value: 'throw', label: 'Throw Error' },
          { value: 'return', label: 'Return Error Response' },
          { value: 'retry', label: 'Retry Request' }
        ]}
      />
    </div>
  );
}
