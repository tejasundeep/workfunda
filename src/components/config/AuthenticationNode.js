import React from 'react';
import ConfigField from '../common/ConfigField';

export default function AuthenticationNode({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange(field, value);
  };

  const authTypeOptions = [
    { value: 'jwt', label: 'JWT' },
    { value: 'oauth2', label: 'OAuth 2.0' },
    { value: 'basic', label: 'Basic Auth' },
    { value: 'apikey', label: 'API Key' },
    { value: 'custom', label: 'Custom Auth' }
  ];

  const oauth2GrantOptions = [
    { value: 'authorization_code', label: 'Authorization Code' },
    { value: 'client_credentials', label: 'Client Credentials' },
    { value: 'password', label: 'Password' },
    { value: 'implicit', label: 'Implicit' }
  ];

  const apiKeyLocationOptions = [
    { value: 'header', label: 'Header' },
    { value: 'query', label: 'Query Parameter' },
    { value: 'cookie', label: 'Cookie' }
  ];

  return (
    <div>
      <ConfigField
        label="Enable Authentication"
        type="switch"
        field="enabled"
        value={data.config?.enabled}
        onChange={handleChange}
      />

      {data.config?.enabled && (
        <>
          <ConfigField
            label="Authentication Type"
            type="select"
            field="authType"
            value={data.config?.authType}
            onChange={handleChange}
            options={authTypeOptions}
            required
          />

          {data.config?.authType === 'jwt' && (
            <>
              <ConfigField
                label="Secret Key"
                type="password"
                field="secretKey"
                value={data.config?.secretKey}
                onChange={handleChange}
                required
              />
              <ConfigField
                label="Token Expiry (seconds)"
                type="number"
                field="tokenExpiry"
                value={data.config?.tokenExpiry}
                onChange={handleChange}
                min={1}
                validation="number"
                required
              />
              <ConfigField
                label="Enable Refresh Token"
                type="switch"
                field="enableRefreshToken"
                value={data.config?.enableRefreshToken}
                onChange={handleChange}
              />
              {data.config?.enableRefreshToken && (
                <ConfigField
                  label="Refresh Token Expiry (seconds)"
                  type="number"
                  field="refreshTokenExpiry"
                  value={data.config?.refreshTokenExpiry}
                  onChange={handleChange}
                  min={1}
                  validation="number"
                  required
                />
              )}
              <ConfigField
                label="Include Claims"
                type="switch"
                field="includeClaims"
                value={data.config?.includeClaims}
                onChange={handleChange}
              />
              {data.config?.includeClaims && (
                <ConfigField
                  label="Claims"
                  type="textarea"
                  field="claims"
                  value={data.config?.claims}
                  onChange={handleChange}
                  placeholder={`{
  "iss": "example.com",
  "aud": "api.example.com",
  "roles": ["user", "admin"]
}`}
                  rows={6}
                  required
                />
              )}
            </>
          )}

          {data.config?.authType === 'oauth2' && (
            <>
              <ConfigField
                label="Grant Type"
                type="select"
                field="grantType"
                value={data.config?.grantType}
                onChange={handleChange}
                options={oauth2GrantOptions}
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
                label="Authorization URL"
                type="text"
                field="authUrl"
                value={data.config?.authUrl}
                onChange={handleChange}
                placeholder="https://auth.example.com/authorize"
                validation="url"
                required
              />
              <ConfigField
                label="Token URL"
                type="text"
                field="tokenUrl"
                value={data.config?.tokenUrl}
                onChange={handleChange}
                placeholder="https://auth.example.com/token"
                validation="url"
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
              <ConfigField
                label="Enable PKCE"
                type="switch"
                field="enablePkce"
                value={data.config?.enablePkce}
                onChange={handleChange}
              />
            </>
          )}

          {data.config?.authType === 'basic' && (
            <>
              <ConfigField
                label="Username Field"
                type="text"
                field="usernameField"
                value={data.config?.usernameField}
                onChange={handleChange}
                placeholder="username"
                required
              />
              <ConfigField
                label="Password Field"
                type="text"
                field="passwordField"
                value={data.config?.passwordField}
                onChange={handleChange}
                placeholder="password"
                required
              />
              <ConfigField
                label="Enable Hashing"
                type="switch"
                field="enableHashing"
                value={data.config?.enableHashing}
                onChange={handleChange}
              />
              {data.config?.enableHashing && (
                <ConfigField
                  label="Hash Algorithm"
                  type="select"
                  field="hashAlgorithm"
                  value={data.config?.hashAlgorithm}
                  onChange={handleChange}
                  options={[
                    { value: 'bcrypt', label: 'BCrypt' },
                    { value: 'argon2', label: 'Argon2' },
                    { value: 'pbkdf2', label: 'PBKDF2' }
                  ]}
                  required
                />
              )}
            </>
          )}

          {data.config?.authType === 'apikey' && (
            <>
              <ConfigField
                label="Key Name"
                type="text"
                field="keyName"
                value={data.config?.keyName}
                onChange={handleChange}
                placeholder="X-API-Key"
                required
              />
              <ConfigField
                label="Key Location"
                type="select"
                field="keyLocation"
                value={data.config?.keyLocation}
                onChange={handleChange}
                options={apiKeyLocationOptions}
                required
              />
              <ConfigField
                label="Enable Key Rotation"
                type="switch"
                field="enableKeyRotation"
                value={data.config?.enableKeyRotation}
                onChange={handleChange}
              />
              {data.config?.enableKeyRotation && (
                <ConfigField
                  label="Rotation Interval (days)"
                  type="number"
                  field="rotationInterval"
                  value={data.config?.rotationInterval}
                  onChange={handleChange}
                  min={1}
                  validation="number"
                  required
                />
              )}
            </>
          )}

          {data.config?.authType === 'custom' && (
            <ConfigField
              label="Custom Authentication"
              type="textarea"
              field="customAuth"
              value={data.config?.customAuth}
              onChange={handleChange}
              placeholder={`function authenticate(request) {
  // Your custom authentication logic
  return {
    isAuthenticated: true,
    user: { id: '123', role: 'admin' }
  };
}`}
              rows={8}
              required
            />
          )}

          <ConfigField
            label="Enable Rate Limiting"
            type="switch"
            field="enableRateLimit"
            value={data.config?.enableRateLimit}
            onChange={handleChange}
          />

          {data.config?.enableRateLimit && (
            <>
              <ConfigField
                label="Max Attempts"
                type="number"
                field="maxAttempts"
                value={data.config?.maxAttempts}
                onChange={handleChange}
                min={1}
                validation="number"
                required
              />
              <ConfigField
                label="Time Window (seconds)"
                type="number"
                field="timeWindow"
                value={data.config?.timeWindow}
                onChange={handleChange}
                min={1}
                validation="number"
                required
              />
              <ConfigField
                label="Block Duration (seconds)"
                type="number"
                field="blockDuration"
                value={data.config?.blockDuration}
                onChange={handleChange}
                min={1}
                validation="number"
                required
              />
            </>
          )}

          <ConfigField
            label="Enable Session Management"
            type="switch"
            field="enableSessions"
            value={data.config?.enableSessions}
            onChange={handleChange}
          />

          {data.config?.enableSessions && (
            <>
              <ConfigField
                label="Session Duration (seconds)"
                type="number"
                field="sessionDuration"
                value={data.config?.sessionDuration}
                onChange={handleChange}
                min={1}
                validation="number"
                required
              />
              <ConfigField
                label="Max Sessions Per User"
                type="number"
                field="maxSessions"
                value={data.config?.maxSessions}
                onChange={handleChange}
                min={1}
                validation="number"
              />
              <ConfigField
                label="Enable Session Renewal"
                type="switch"
                field="enableSessionRenewal"
                value={data.config?.enableSessionRenewal}
                onChange={handleChange}
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
              { value: '401', label: '401 Unauthorized' },
              { value: '403', label: '403 Forbidden' },
              { value: 'redirect', label: 'Redirect to Login' },
              { value: 'custom', label: 'Custom Handler' }
            ]}
          />

          <ConfigField
            label="Description"
            type="textarea"
            field="description"
            value={data.config?.description}
            onChange={handleChange}
            placeholder="Describe the purpose of this authentication configuration"
            rows={3}
          />
        </>
      )}
    </div>
  );
}
