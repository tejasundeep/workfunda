import React from 'react';
import ConfigField from '../common/ConfigField';

export default function DatabaseNode({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange(field, value);
  };

  const dbTypeOptions = [
    { value: 'mysql', label: 'MySQL' },
    { value: 'postgresql', label: 'PostgreSQL' },
    { value: 'mongodb', label: 'MongoDB' },
    { value: 'redis', label: 'Redis' },
    { value: 'sqlite', label: 'SQLite' },
    { value: 'mssql', label: 'Microsoft SQL Server' },
    { value: 'oracle', label: 'Oracle' },
    { value: 'cassandra', label: 'Cassandra' }
  ];

  const poolingOptions = [
    { value: 'fixed', label: 'Fixed Size' },
    { value: 'dynamic', label: 'Dynamic' },
    { value: 'adaptive', label: 'Adaptive' }
  ];

  const sslModeOptions = [
    { value: 'disable', label: 'Disable' },
    { value: 'prefer', label: 'Prefer' },
    { value: 'require', label: 'Require' },
    { value: 'verify-ca', label: 'Verify CA' },
    { value: 'verify-full', label: 'Verify Full' }
  ];

  return (
    <div>
      <ConfigField
        label="Enable Database"
        type="switch"
        field="enabled"
        value={data.config?.enabled}
        onChange={handleChange}
      />

      {data.config?.enabled && (
        <>
          <ConfigField
            label="Database Type"
            type="select"
            field="dbType"
            value={data.config?.dbType}
            onChange={handleChange}
            options={dbTypeOptions}
            required
          />

          <ConfigField
            label="Host"
            type="text"
            field="host"
            value={data.config?.host}
            onChange={handleChange}
            placeholder="localhost"
            required
          />

          <ConfigField
            label="Port"
            type="number"
            field="port"
            value={data.config?.port}
            onChange={handleChange}
            min={1}
            max={65535}
            validation="number"
            required
          />

          <ConfigField
            label="Database Name"
            type="text"
            field="database"
            value={data.config?.database}
            onChange={handleChange}
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
            required
          />

          <ConfigField
            label="Enable Connection Pooling"
            type="switch"
            field="enablePooling"
            value={data.config?.enablePooling}
            onChange={handleChange}
          />

          {data.config?.enablePooling && (
            <>
              <ConfigField
                label="Pool Type"
                type="select"
                field="poolType"
                value={data.config?.poolType}
                onChange={handleChange}
                options={poolingOptions}
                required
              />
              <ConfigField
                label="Min Pool Size"
                type="number"
                field="minPoolSize"
                value={data.config?.minPoolSize}
                onChange={handleChange}
                min={1}
                validation="number"
                required
              />
              <ConfigField
                label="Max Pool Size"
                type="number"
                field="maxPoolSize"
                value={data.config?.maxPoolSize}
                onChange={handleChange}
                min={1}
                validation="number"
                required
              />
              <ConfigField
                label="Connection Timeout (ms)"
                type="number"
                field="connectionTimeout"
                value={data.config?.connectionTimeout}
                onChange={handleChange}
                min={100}
                validation="number"
                required
              />
              <ConfigField
                label="Idle Timeout (ms)"
                type="number"
                field="idleTimeout"
                value={data.config?.idleTimeout}
                onChange={handleChange}
                min={1000}
                validation="number"
                required
              />
            </>
          )}

          <ConfigField
            label="Enable SSL"
            type="switch"
            field="enableSsl"
            value={data.config?.enableSsl}
            onChange={handleChange}
          />

          {data.config?.enableSsl && (
            <>
              <ConfigField
                label="SSL Mode"
                type="select"
                field="sslMode"
                value={data.config?.sslMode}
                onChange={handleChange}
                options={sslModeOptions}
                required
              />
              <ConfigField
                label="CA Certificate"
                type="textarea"
                field="caCert"
                value={data.config?.caCert}
                onChange={handleChange}
                placeholder="-----BEGIN CERTIFICATE-----\n...\n-----END CERTIFICATE-----"
                rows={6}
              />
              <ConfigField
                label="Client Certificate"
                type="textarea"
                field="clientCert"
                value={data.config?.clientCert}
                onChange={handleChange}
                placeholder="-----BEGIN CERTIFICATE-----\n...\n-----END CERTIFICATE-----"
                rows={6}
              />
              <ConfigField
                label="Client Key"
                type="textarea"
                field="clientKey"
                value={data.config?.clientKey}
                onChange={handleChange}
                placeholder="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
                rows={6}
              />
            </>
          )}

          <ConfigField
            label="Enable Query Logging"
            type="switch"
            field="enableQueryLogging"
            value={data.config?.enableQueryLogging}
            onChange={handleChange}
          />

          {data.config?.enableQueryLogging && (
            <>
              <ConfigField
                label="Log Level"
                type="select"
                field="logLevel"
                value={data.config?.logLevel}
                onChange={handleChange}
                options={[
                  { value: 'debug', label: 'Debug' },
                  { value: 'info', label: 'Info' },
                  { value: 'warn', label: 'Warning' },
                  { value: 'error', label: 'Error' }
                ]}
                required
              />
              <ConfigField
                label="Log Slow Queries"
                type="switch"
                field="logSlowQueries"
                value={data.config?.logSlowQueries}
                onChange={handleChange}
              />
              {data.config?.logSlowQueries && (
                <ConfigField
                  label="Slow Query Threshold (ms)"
                  type="number"
                  field="slowQueryThreshold"
                  value={data.config?.slowQueryThreshold}
                  onChange={handleChange}
                  min={100}
                  validation="number"
                  required
                />
              )}
            </>
          )}

          <ConfigField
            label="Enable Query Cache"
            type="switch"
            field="enableQueryCache"
            value={data.config?.enableQueryCache}
            onChange={handleChange}
          />

          {data.config?.enableQueryCache && (
            <>
              <ConfigField
                label="Cache Size (MB)"
                type="number"
                field="cacheSize"
                value={data.config?.cacheSize}
                onChange={handleChange}
                min={1}
                validation="number"
                required
              />
              <ConfigField
                label="Cache TTL (seconds)"
                type="number"
                field="cacheTtl"
                value={data.config?.cacheTtl}
                onChange={handleChange}
                min={1}
                validation="number"
                required
              />
            </>
          )}

          <ConfigField
            label="Enable Migrations"
            type="switch"
            field="enableMigrations"
            value={data.config?.enableMigrations}
            onChange={handleChange}
          />

          {data.config?.enableMigrations && (
            <>
              <ConfigField
                label="Migrations Directory"
                type="text"
                field="migrationsDir"
                value={data.config?.migrationsDir}
                onChange={handleChange}
                placeholder="./migrations"
                required
              />
              <ConfigField
                label="Auto Run Migrations"
                type="switch"
                field="autoRunMigrations"
                value={data.config?.autoRunMigrations}
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
              { value: 'throw', label: 'Throw Error' },
              { value: 'retry', label: 'Retry Operation' },
              { value: 'fallback', label: 'Use Fallback' },
              { value: 'ignore', label: 'Ignore Error' }
            ]}
          />

          {data.config?.errorHandling === 'retry' && (
            <>
              <ConfigField
                label="Max Retries"
                type="number"
                field="maxRetries"
                value={data.config?.maxRetries}
                onChange={handleChange}
                min={1}
                validation="number"
                required
              />
              <ConfigField
                label="Retry Interval (ms)"
                type="number"
                field="retryInterval"
                value={data.config?.retryInterval}
                onChange={handleChange}
                min={100}
                validation="number"
                required
              />
            </>
          )}

          <ConfigField
            label="Description"
            type="textarea"
            field="description"
            value={data.config?.description}
            onChange={handleChange}
            placeholder="Describe the purpose of this database connection"
            rows={3}
          />
        </>
      )}
    </div>
  );
}
