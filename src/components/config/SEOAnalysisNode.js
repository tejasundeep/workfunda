import React from 'react';
import { MenuItem } from '@mui/material';
import ConfigField from './ConfigField';

const SEOAnalysisNode = ({ config, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="node-config">
      <ConfigField
        label="Analysis Type"
        value={config.analysisType || 'onpage'}
        onChange={(value) => handleChange('analysisType', value)}
        select
      >
        <MenuItem value="onpage">On-Page SEO</MenuItem>
        <MenuItem value="technical">Technical SEO</MenuItem>
        <MenuItem value="backlinks">Backlink Analysis</MenuItem>
        <MenuItem value="keywords">Keyword Research</MenuItem>
        <MenuItem value="competitors">Competitor Analysis</MenuItem>
      </ConfigField>
      <ConfigField
        label="SEO Tool"
        value={config.tool || 'semrush'}
        onChange={(value) => handleChange('tool', value)}
        select
      >
        <MenuItem value="semrush">SEMrush</MenuItem>
        <MenuItem value="ahrefs">Ahrefs</MenuItem>
        <MenuItem value="moz">Moz</MenuItem>
        <MenuItem value="screaming-frog">Screaming Frog</MenuItem>
        <MenuItem value="google">Google Search Console</MenuItem>
      </ConfigField>
      <ConfigField
        label="Target URL"
        value={config.targetUrl || ''}
        onChange={(value) => handleChange('targetUrl', value)}
      />
      <ConfigField
        label="Metrics"
        value={config.metrics || []}
        onChange={(value) => handleChange('metrics', value)}
        select
        multiple
      >
        <MenuItem value="rankings">Rankings</MenuItem>
        <MenuItem value="traffic">Traffic</MenuItem>
        <MenuItem value="authority">Domain Authority</MenuItem>
        <MenuItem value="speed">Page Speed</MenuItem>
        <MenuItem value="mobile">Mobile Friendliness</MenuItem>
      </ConfigField>
      <ConfigField
        label="Keywords"
        value={config.keywords || ''}
        onChange={(value) => handleChange('keywords', value)}
        multiline
        rows={2}
        helperText="Comma-separated keywords to track"
      />
      <ConfigField
        label="Content Analysis"
        value={config.contentAnalysis || true}
        onChange={(value) => handleChange('contentAnalysis', value)}
        type="boolean"
      />
      <ConfigField
        label="Advanced Settings"
        value={config.advancedSettings || ''}
        onChange={(value) => handleChange('advancedSettings', value)}
        multiline
        rows={3}
        helperText="JSON object for advanced analysis settings"
      />
      <ConfigField
        label="Report Format"
        value={config.reportFormat || 'pdf'}
        onChange={(value) => handleChange('reportFormat', value)}
        select
      >
        <MenuItem value="pdf">PDF Report</MenuItem>
        <MenuItem value="html">HTML Report</MenuItem>
        <MenuItem value="json">JSON Data</MenuItem>
        <MenuItem value="csv">CSV Export</MenuItem>
      </ConfigField>
    </div>
  );
};

export default SEOAnalysisNode;
