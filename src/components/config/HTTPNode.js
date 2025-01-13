import React from 'react';
import ConfigField from '../common/ConfigField';

export default function HTTPNode({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange(field, value);
  };

  const methodOptions = [
    { value: 'GET', label: 'GET' },
    { value: 'POST', label: 'POST' },
    { value: 'PUT', label: 'PUT' },
    { value: 'PATCH', label: 'PATCH' },
    { value: 'DELETE', label: 'DELETE' },
    { value: 'HEAD', label: 'HEAD' },
    { value: 'OPTIONS', label: 'OPTIONS' }
  ];

  const authTypeOptions = [
    { value: 'none', label: 'No Auth' },
    { value: 'basic', label: 'Basic Auth' },
    { value: 'bearer', label: 'Bearer Token' },
    { value: 'apiKey', label: 'API Key' },
    { value: 'oauth2', label: 'OAuth 2.0' }
  ];

  const responseTypeOptions = [
    { value: 'json', label: 'JSON' },
    { value: 'text', label: 'Text' },
    { value: 'blob', label: 'Binary' },
    { value: 'arraybuffer', label: 'Array Buffer' }
  ];

  const proxyTypeOptions = [
    { value: 'none', label: 'No Proxy' },
    { value: 'http', label: 'HTTP Proxy' },
    { value: 'https', label: 'HTTPS Proxy' },
    { value: 'socks', label: 'SOCKS Proxy' }
  ];

  return (
    <div>
      <ConfigField
        label="URL"
        type="text"
        field="url"
        value={data.config?.url}
        onChange={handleChange}
        placeholder="https://api.example.com/endpoint"
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

      {['POST', 'PUT', 'PATCH'].includes(data.config?.method) && (
        <>
          <ConfigField
            label="Request Body"
            type="textarea"
            field="body"
            value={data.config?.body}
            onChange={handleChange}
            placeholder={`{
  "key": "value",
  "array": [1, 2, 3]
}`}
            rows={6}
          />
          <ConfigField
            label="Content Type"
            type="text"
            field="contentType"
            value={data.config?.contentType}
            onChange={handleChange}
            placeholder="application/json"
          />
        </>
      )}

      <ConfigField
        label="Query Parameters"
        type="textarea"
        field="queryParams"
        value={data.config?.queryParams}
        onChange={handleChange}
        placeholder={`{
  "page": 1,
  "limit": 10,
  "sort": "desc"
}`}
        rows={4}
      />

      <ConfigField
        label="Headers"
        type="textarea"
        field="headers"
        value={data.config?.headers}
        onChange={handleChange}
        placeholder={`{
  "Accept": "application/json",
  "User-Agent": "MyApp/1.0"
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
            secure
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
          secure
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
            secure
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
            label="OAuth2 Token URL"
            type="text"
            field="oauth2TokenUrl"
            value={data.config?.oauth2TokenUrl}
            onChange={handleChange}
            placeholder="https://auth.example.com/token"
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
            secure
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
        label="Response Type"
        type="select"
        field="responseType"
        value={data.config?.responseType}
        onChange={handleChange}
        options={responseTypeOptions}
        required
      />

      <ConfigField
        label="Timeout (ms)"
        type="number"
        field="timeout"
        value={data.config?.timeout}
        onChange={handleChange}
        min={0}
        max={300000}
        validation="number"
      />

      <ConfigField
        label="Follow Redirects"
        type="checkbox"
        field="followRedirects"
        value={data.config?.followRedirects}
        onChange={handleChange}
      />

      <ConfigField
        label="Maximum Redirects"
        type="number"
        field="maxRedirects"
        value={data.config?.maxRedirects}
        onChange={handleChange}
        min={0}
        max={10}
        validation="number"
      />

      <ConfigField
        label="Proxy Type"
        type="select"
        field="proxyType"
        value={data.config?.proxyType}
        onChange={handleChange}
        options={proxyTypeOptions}
      />

      {data.config?.proxyType !== 'none' && (
        <>
          <ConfigField
            label="Proxy Host"
            type="text"
            field="proxyHost"
            value={data.config?.proxyHost}
            onChange={handleChange}
            placeholder="proxy.example.com"
            required
          />
          <ConfigField
            label="Proxy Port"
            type="number"
            field="proxyPort"
            value={data.config?.proxyPort}
            onChange={handleChange}
            min={1}
            max={65535}
            validation="number"
            required
          />
          <ConfigField
            label="Proxy Auth"
            type="checkbox"
            field="proxyAuth"
            value={data.config?.proxyAuth}
            onChange={handleChange}
          />
          {data.config?.proxyAuth && (
            <>
              <ConfigField
                label="Proxy Username"
                type="text"
                field="proxyUsername"
                value={data.config?.proxyUsername}
                onChange={handleChange}
                required
              />
              <ConfigField
                label="Proxy Password"
                type="password"
                field="proxyPassword"
                value={data.config?.proxyPassword}
                onChange={handleChange}
                secure
                required
              />
            </>
          )}
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
          { value: 'retry', label: 'Retry Request' },
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
          <ConfigField
            label="Retry Status Codes"
            type="textarea"
            field="retryStatusCodes"
            value={data.config?.retryStatusCodes}
            onChange={handleChange}
            placeholder={`[
  408,
  429,
  500,
  502,
  503,
  504
]`}
            rows={4}
          />
        </>
      )}

      <ConfigField
        label="Description"
        type="textarea"
        field="description"
        value={data.config?.description}
        onChange={handleChange}
        placeholder="Describe the purpose of this HTTP request"
        rows={2}
      />
    </div>
  );
}
