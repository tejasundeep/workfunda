import React from 'react';
import ConfigField from '../common/ConfigField';

export default function AuthenticationNode({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange(field, value);
  };

  const authTypeOptions = [
    { value: 'basic', label: 'Basic Auth' },
    { value: 'jwt', label: 'JWT' },
    { value: 'oauth2', label: 'OAuth 2.0' },
    { value: 'apiKey', label: 'API Key' },
    { value: 'ldap', label: 'LDAP' },
    { value: 'saml', label: 'SAML' },
    { value: 'custom', label: 'Custom Auth' }
  ];

  const oauth2GrantTypes = [
    { value: 'authorization_code', label: 'Authorization Code' },
    { value: 'client_credentials', label: 'Client Credentials' },
    { value: 'password', label: 'Password' },
    { value: 'implicit', label: 'Implicit' },
    { value: 'refresh_token', label: 'Refresh Token' }
  ];

  const apiKeyLocations = [
    { value: 'header', label: 'Header' },
    { value: 'query', label: 'Query Parameter' },
    { value: 'cookie', label: 'Cookie' }
  ];

  return (
    <div>
      <ConfigField
        label="Authentication Type"
        type="select"
        field="authType"
        value={data.config?.authType}
        onChange={handleChange}
        options={authTypeOptions}
        required
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
          <ConfigField
            label="Realm"
            type="text"
            field="realm"
            value={data.config?.realm}
            onChange={handleChange}
          />
        </>
      )}

      {data.config?.authType === 'jwt' && (
        <>
          <ConfigField
            label="Secret Key"
            type="password"
            field="secretKey"
            value={data.config?.secretKey}
            onChange={handleChange}
            secure
            required
          />
          <ConfigField
            label="Algorithm"
            type="select"
            field="algorithm"
            value={data.config?.algorithm}
            onChange={handleChange}
            options={[
              { value: 'HS256', label: 'HS256' },
              { value: 'HS384', label: 'HS384' },
              { value: 'HS512', label: 'HS512' },
              { value: 'RS256', label: 'RS256' },
              { value: 'RS384', label: 'RS384' },
              { value: 'RS512', label: 'RS512' }
            ]}
            required
          />
          <ConfigField
            label="Token Expiry (seconds)"
            type="number"
            field="expiryTime"
            value={data.config?.expiryTime}
            onChange={handleChange}
            min={0}
            validation="number"
            required
          />
          <ConfigField
            label="Issuer"
            type="text"
            field="issuer"
            value={data.config?.issuer}
            onChange={handleChange}
          />
          <ConfigField
            label="Audience"
            type="text"
            field="audience"
            value={data.config?.audience}
            onChange={handleChange}
          />
          <ConfigField
            label="Custom Claims"
            type="textarea"
            field="customClaims"
            value={data.config?.customClaims}
            onChange={handleChange}
            placeholder={`{
  "role": "admin",
  "permissions": ["read", "write"]
}`}
            rows={4}
          />
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
            options={oauth2GrantTypes}
            required
          />
          <ConfigField
            label="Authorization URL"
            type="text"
            field="authorizationUrl"
            value={data.config?.authorizationUrl}
            onChange={handleChange}
            placeholder="https://auth.example.com/authorize"
            required
          />
          <ConfigField
            label="Token URL"
            type="text"
            field="tokenUrl"
            value={data.config?.tokenUrl}
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
          <ConfigField
            label="Redirect URI"
            type="text"
            field="redirectUri"
            value={data.config?.redirectUri}
            onChange={handleChange}
            placeholder="https://app.example.com/callback"
          />
        </>
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
            options={apiKeyLocations}
            required
          />
        </>
      )}

      {data.config?.authType === 'ldap' && (
        <>
          <ConfigField
            label="LDAP URL"
            type="text"
            field="ldapUrl"
            value={data.config?.ldapUrl}
            onChange={handleChange}
            placeholder="ldap://ldap.example.com:389"
            required
          />
          <ConfigField
            label="Bind DN"
            type="text"
            field="bindDn"
            value={data.config?.bindDn}
            onChange={handleChange}
            placeholder="cn=admin,dc=example,dc=com"
            required
          />
          <ConfigField
            label="Bind Password"
            type="password"
            field="bindPassword"
            value={data.config?.bindPassword}
            onChange={handleChange}
            secure
            required
          />
          <ConfigField
            label="Search Base"
            type="text"
            field="searchBase"
            value={data.config?.searchBase}
            onChange={handleChange}
            placeholder="dc=example,dc=com"
            required
          />
          <ConfigField
            label="Search Filter"
            type="text"
            field="searchFilter"
            value={data.config?.searchFilter}
            onChange={handleChange}
            placeholder="(uid={{username}})"
            required
          />
        </>
      )}

      {data.config?.authType === 'saml' && (
        <>
          <ConfigField
            label="Identity Provider URL"
            type="text"
            field="idpUrl"
            value={data.config?.idpUrl}
            onChange={handleChange}
            placeholder="https://idp.example.com/saml2/sso"
            required
          />
          <ConfigField
            label="Identity Provider Certificate"
            type="textarea"
            field="idpCertificate"
            value={data.config?.idpCertificate}
            onChange={handleChange}
            placeholder="-----BEGIN CERTIFICATE-----\n...\n-----END CERTIFICATE-----"
            rows={6}
            required
          />
          <ConfigField
            label="Service Provider Entity ID"
            type="text"
            field="spEntityId"
            value={data.config?.spEntityId}
            onChange={handleChange}
            placeholder="https://app.example.com"
            required
          />
          <ConfigField
            label="Assertion Consumer Service URL"
            type="text"
            field="acsUrl"
            value={data.config?.acsUrl}
            onChange={handleChange}
            placeholder="https://app.example.com/saml/acs"
            required
          />
          <ConfigField
            label="Private Key"
            type="textarea"
            field="privateKey"
            value={data.config?.privateKey}
            onChange={handleChange}
            placeholder="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
            rows={6}
            secure
            required
          />
        </>
      )}

      {data.config?.authType === 'custom' && (
        <ConfigField
          label="Custom Authentication Logic"
          type="textarea"
          field="customAuth"
          value={data.config?.customAuth}
          onChange={handleChange}
          placeholder={`async function authenticate(credentials) {
  // Your authentication logic here
  return {
    success: true,
    user: { id: '123', name: 'John' }
  };
}`}
          rows={10}
          required
        />
      )}

      <ConfigField
        label="Session Management"
        type="checkbox"
        field="enableSession"
        value={data.config?.enableSession}
        onChange={handleChange}
      />

      {data.config?.enableSession && (
        <>
          <ConfigField
            label="Session Duration (seconds)"
            type="number"
            field="sessionDuration"
            value={data.config?.sessionDuration}
            onChange={handleChange}
            min={0}
            validation="number"
            required
          />
          <ConfigField
            label="Session Store"
            type="select"
            field="sessionStore"
            value={data.config?.sessionStore}
            onChange={handleChange}
            options={[
              { value: 'memory', label: 'In-Memory' },
              { value: 'redis', label: 'Redis' },
              { value: 'database', label: 'Database' }
            ]}
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
            min={0}
            validation="number"
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
          { value: 'redirect', label: 'Redirect to Login' },
          { value: 'callback', label: 'Use Error Callback' }
        ]}
      />

      {data.config?.errorHandling === 'redirect' && (
        <ConfigField
          label="Login URL"
          type="text"
          field="loginUrl"
          value={data.config?.loginUrl}
          onChange={handleChange}
          placeholder="https://app.example.com/login"
          required
        />
      )}

      {data.config?.errorHandling === 'callback' && (
        <ConfigField
          label="Error Callback"
          type="textarea"
          field="errorCallback"
          value={data.config?.errorCallback}
          onChange={handleChange}
          placeholder={`function handleAuthError(error) {
  // Handle authentication error
  console.error(error);
}`}
          rows={6}
          required
        />
      )}

      <ConfigField
        label="Description"
        type="textarea"
        field="description"
        value={data.config?.description}
        onChange={handleChange}
        placeholder="Describe the purpose of this authentication"
        rows={2}
      />
    </div>
  );
}
