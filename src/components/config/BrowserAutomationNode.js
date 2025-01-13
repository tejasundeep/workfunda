import React from 'react';
import { MenuItem } from '@mui/material';
import ConfigField from './ConfigField';

const BrowserAutomationNode = ({ config, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="node-config">
      <ConfigField
        label="Automation Tool"
        value={config.tool || 'playwright'}
        onChange={(value) => handleChange('tool', value)}
        select
      >
        <MenuItem value="playwright">Playwright</MenuItem>
        <MenuItem value="puppeteer">Puppeteer</MenuItem>
        <MenuItem value="selenium">Selenium</MenuItem>
        <MenuItem value="cypress">Cypress</MenuItem>
      </ConfigField>
      <ConfigField
        label="Action Type"
        value={config.actionType || 'navigation'}
        onChange={(value) => handleChange('actionType', value)}
        select
      >
        <MenuItem value="navigation">Navigation</MenuItem>
        <MenuItem value="input">Form Input</MenuItem>
        <MenuItem value="click">Click Action</MenuItem>
        <MenuItem value="scrape">Data Scraping</MenuItem>
        <MenuItem value="screenshot">Screenshot</MenuItem>
        <MenuItem value="pdf">PDF Export</MenuItem>
      </ConfigField>
      <ConfigField
        label="Target URL"
        value={config.targetUrl || ''}
        onChange={(value) => handleChange('targetUrl', value)}
      />
      <ConfigField
        label="Browser"
        value={config.browser || 'chromium'}
        onChange={(value) => handleChange('browser', value)}
        select
      >
        <MenuItem value="chromium">Chromium</MenuItem>
        <MenuItem value="firefox">Firefox</MenuItem>
        <MenuItem value="webkit">WebKit</MenuItem>
      </ConfigField>
      <ConfigField
        label="Selectors"
        value={config.selectors || ''}
        onChange={(value) => handleChange('selectors', value)}
        multiline
        rows={3}
        helperText="JSON object mapping selector types and values"
      />
      <ConfigField
        label="Actions Sequence"
        value={config.actions || ''}
        onChange={(value) => handleChange('actions', value)}
        multiline
        rows={4}
        helperText="JSON array of actions to perform"
      />
      <ConfigField
        label="Wait Conditions"
        value={config.waitConditions || []}
        onChange={(value) => handleChange('waitConditions', value)}
        select
        multiple
      >
        <MenuItem value="load">Page Load</MenuItem>
        <MenuItem value="network">Network Idle</MenuItem>
        <MenuItem value="element">Element Visible</MenuItem>
        <MenuItem value="animation">Animation Complete</MenuItem>
      </ConfigField>
      <ConfigField
        label="Authentication"
        value={config.authentication || ''}
        onChange={(value) => handleChange('authentication', value)}
        multiline
        rows={2}
        helperText="Login credentials or session data"
      />
      <ConfigField
        label="Error Handling"
        value={config.errorHandling || 'stop'}
        onChange={(value) => handleChange('errorHandling', value)}
        select
      >
        <MenuItem value="stop">Stop on Error</MenuItem>
        <MenuItem value="continue">Continue on Error</MenuItem>
        <MenuItem value="retry">Retry Action</MenuItem>
        <MenuItem value="screenshot">Take Screenshot</MenuItem>
      </ConfigField>
    </div>
  );
};

export default BrowserAutomationNode;
