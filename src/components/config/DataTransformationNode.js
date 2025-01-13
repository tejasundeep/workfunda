import React from 'react';
import { MenuItem } from '@mui/material';
import ConfigField from './ConfigField';

const DataTransformationNode = ({ config, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="node-config">
      <ConfigField
        label="Transform Type"
        value={config.type || 'map'}
        onChange={(value) => handleChange('type', value)}
        select
      >
        <MenuItem value="map">Map Fields</MenuItem>
        <MenuItem value="filter">Filter Data</MenuItem>
        <MenuItem value="aggregate">Aggregate</MenuItem>
        <MenuItem value="sort">Sort</MenuItem>
        <MenuItem value="enrich">Data Enrichment</MenuItem>
      </ConfigField>
      <ConfigField
        label="Input Format"
        value={config.inputFormat || 'json'}
        onChange={(value) => handleChange('inputFormat', value)}
        select
      >
        <MenuItem value="json">JSON</MenuItem>
        <MenuItem value="xml">XML</MenuItem>
        <MenuItem value="csv">CSV</MenuItem>
        <MenuItem value="yaml">YAML</MenuItem>
      </ConfigField>
      <ConfigField
        label="Transformation Rules"
        value={config.rules || ''}
        onChange={(value) => handleChange('rules', value)}
        multiline
        rows={4}
      />
      <ConfigField
        label="Output Format"
        value={config.outputFormat || 'json'}
        onChange={(value) => handleChange('outputFormat', value)}
        select
      >
        <MenuItem value="json">JSON</MenuItem>
        <MenuItem value="xml">XML</MenuItem>
        <MenuItem value="csv">CSV</MenuItem>
        <MenuItem value="yaml">YAML</MenuItem>
      </ConfigField>
    </div>
  );
};

export default DataTransformationNode;
