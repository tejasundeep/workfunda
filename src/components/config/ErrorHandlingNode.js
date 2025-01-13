import React from 'react';
import { MenuItem } from '@mui/material';
import ConfigField from './ConfigField';

const ErrorHandlingNode = ({ config, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="node-config">
      <ConfigField
        label="Error Strategy"
        value={config.strategy || 'retry'}
        onChange={(value) => handleChange('strategy', value)}
        select
      >
        <MenuItem value="retry">Retry Operation</MenuItem>
        <MenuItem value="fallback">Use Fallback</MenuItem>
        <MenuItem value="circuit-breaker">Circuit Breaker</MenuItem>
        <MenuItem value="dead-letter">Dead Letter Queue</MenuItem>
        <MenuItem value="ignore">Ignore Error</MenuItem>
        <MenuItem value="abort">Abort Workflow</MenuItem>
      </ConfigField>
      <ConfigField
        label="Error Types"
        value={config.errorTypes || []}
        onChange={(value) => handleChange('errorTypes', value)}
        select
        multiple
      >
        <MenuItem value="network">Network Errors</MenuItem>
        <MenuItem value="timeout">Timeouts</MenuItem>
        <MenuItem value="validation">Validation Errors</MenuItem>
        <MenuItem value="authentication">Authentication Errors</MenuItem>
        <MenuItem value="authorization">Authorization Errors</MenuItem>
        <MenuItem value="resource">Resource Errors</MenuItem>
        <MenuItem value="business">Business Logic Errors</MenuItem>
        <MenuItem value="system">System Errors</MenuItem>
      </ConfigField>
      <ConfigField
        label="Retry Configuration"
        value={config.retryConfig || ''}
        onChange={(value) => handleChange('retryConfig', value)}
        multiline
        rows={3}
        helperText="JSON object for retry settings (attempts, delays, backoff)"
      />
      <ConfigField
        label="Circuit Breaker Settings"
        value={config.circuitBreakerConfig || ''}
        onChange={(value) => handleChange('circuitBreakerConfig', value)}
        multiline
        rows={3}
        helperText="Failure threshold, recovery time, half-open state"
      />
      <ConfigField
        label="Fallback Action"
        value={config.fallbackAction || 'none'}
        onChange={(value) => handleChange('fallbackAction', value)}
        select
      >
        <MenuItem value="none">No Fallback</MenuItem>
        <MenuItem value="alternative">Use Alternative Service</MenuItem>
        <MenuItem value="cache">Use Cached Data</MenuItem>
        <MenuItem value="default">Return Default Value</MenuItem>
        <MenuItem value="custom">Custom Action</MenuItem>
      </ConfigField>
      <ConfigField
        label="Fallback Configuration"
        value={config.fallbackConfig || ''}
        onChange={(value) => handleChange('fallbackConfig', value)}
        multiline
        rows={3}
        helperText="Configuration for fallback action"
      />
      <ConfigField
        label="Error Notification"
        value={config.notification || []}
        onChange={(value) => handleChange('notification', value)}
        select
        multiple
      >
        <MenuItem value="email">Email</MenuItem>
        <MenuItem value="slack">Slack</MenuItem>
        <MenuItem value="webhook">Webhook</MenuItem>
        <MenuItem value="log">Log Entry</MenuItem>
        <MenuItem value="monitoring">Monitoring Alert</MenuItem>
      </ConfigField>
      <ConfigField
        label="Error Context"
        value={config.errorContext || []}
        onChange={(value) => handleChange('errorContext', value)}
        select
        multiple
      >
        <MenuItem value="stack">Stack Trace</MenuItem>
        <MenuItem value="input">Input Data</MenuItem>
        <MenuItem value="state">Workflow State</MenuItem>
        <MenuItem value="timestamp">Timestamp</MenuItem>
        <MenuItem value="user">User Context</MenuItem>
      </ConfigField>
      <ConfigField
        label="Recovery Actions"
        value={config.recoveryActions || ''}
        onChange={(value) => handleChange('recoveryActions', value)}
        multiline
        rows={3}
        helperText="Custom recovery steps or cleanup actions"
      />
      <ConfigField
        label="Logging Level"
        value={config.loggingLevel || 'error'}
        onChange={(value) => handleChange('loggingLevel', value)}
        select
      >
        <MenuItem value="debug">Debug</MenuItem>
        <MenuItem value="info">Info</MenuItem>
        <MenuItem value="warn">Warning</MenuItem>
        <MenuItem value="error">Error</MenuItem>
        <MenuItem value="fatal">Fatal</MenuItem>
      </ConfigField>
      <ConfigField
        label="Error Aggregation"
        value={config.errorAggregation || false}
        onChange={(value) => handleChange('errorAggregation', value)}
        type="boolean"
        helperText="Aggregate similar errors"
      />
      <ConfigField
        label="Custom Error Handler"
        value={config.customHandler || ''}
        onChange={(value) => handleChange('customHandler', value)}
        multiline
        rows={4}
        helperText="Custom error handling logic (JavaScript)"
      />
    </div>
  );
};

export default ErrorHandlingNode;
