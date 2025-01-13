import React from 'react';
import { MenuItem } from '@mui/material';
import ConfigField from './ConfigField';

const DataVisualizationNode = ({ config, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="node-config">
      <ConfigField
        label="Chart Type"
        value={config.chartType || 'line'}
        onChange={(value) => handleChange('chartType', value)}
        select
      >
        <MenuItem value="line">Line Chart</MenuItem>
        <MenuItem value="bar">Bar Chart</MenuItem>
        <MenuItem value="pie">Pie Chart</MenuItem>
        <MenuItem value="scatter">Scatter Plot</MenuItem>
        <MenuItem value="heatmap">Heat Map</MenuItem>
        <MenuItem value="gauge">Gauge Chart</MenuItem>
        <MenuItem value="radar">Radar Chart</MenuItem>
        <MenuItem value="sankey">Sankey Diagram</MenuItem>
      </ConfigField>
      <ConfigField
        label="Library"
        value={config.library || 'chartjs'}
        onChange={(value) => handleChange('library', value)}
        select
      >
        <MenuItem value="chartjs">Chart.js</MenuItem>
        <MenuItem value="d3">D3.js</MenuItem>
        <MenuItem value="plotly">Plotly</MenuItem>
        <MenuItem value="echarts">ECharts</MenuItem>
        <MenuItem value="highcharts">Highcharts</MenuItem>
      </ConfigField>
      <ConfigField
        label="Data Source"
        value={config.dataSource || 'json'}
        onChange={(value) => handleChange('dataSource', value)}
        select
      >
        <MenuItem value="json">JSON</MenuItem>
        <MenuItem value="csv">CSV</MenuItem>
        <MenuItem value="api">API Endpoint</MenuItem>
        <MenuItem value="database">Database Query</MenuItem>
      </ConfigField>
      <ConfigField
        label="Data Configuration"
        value={config.dataConfig || ''}
        onChange={(value) => handleChange('dataConfig', value)}
        multiline
        rows={3}
        helperText="Data mapping and transformation settings"
      />
      <ConfigField
        label="Chart Options"
        value={config.chartOptions || ''}
        onChange={(value) => handleChange('chartOptions', value)}
        multiline
        rows={4}
        helperText="JSON object for chart customization"
      />
      <ConfigField
        label="Dimensions"
        value={config.dimensions || ''}
        onChange={(value) => handleChange('dimensions', value)}
        multiline
        rows={2}
        helperText="Width and height settings"
      />
      <ConfigField
        label="Interactivity"
        value={config.interactivity || []}
        onChange={(value) => handleChange('interactivity', value)}
        select
        multiple
      >
        <MenuItem value="tooltip">Tooltips</MenuItem>
        <MenuItem value="zoom">Zoom</MenuItem>
        <MenuItem value="pan">Pan</MenuItem>
        <MenuItem value="drill">Drill Down</MenuItem>
        <MenuItem value="filter">Filtering</MenuItem>
      </ConfigField>
      <ConfigField
        label="Export Options"
        value={config.exportOptions || []}
        onChange={(value) => handleChange('exportOptions', value)}
        select
        multiple
      >
        <MenuItem value="png">PNG</MenuItem>
        <MenuItem value="svg">SVG</MenuItem>
        <MenuItem value="pdf">PDF</MenuItem>
        <MenuItem value="csv">CSV Data</MenuItem>
      </ConfigField>
    </div>
  );
};

export default DataVisualizationNode;
