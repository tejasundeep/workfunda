import React from 'react';
import { MenuItem } from '@mui/material';
import ConfigField from './ConfigField';

const DataMigrationNode = ({ config, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="node-config">
      <ConfigField
        label="Migration Type"
        value={config.migrationType || 'database'}
        onChange={(value) => handleChange('migrationType', value)}
        select
      >
        <MenuItem value="database">Database Migration</MenuItem>
        <MenuItem value="storage">Storage Migration</MenuItem>
        <MenuItem value="content">Content Migration</MenuItem>
        <MenuItem value="schema">Schema Migration</MenuItem>
        <MenuItem value="etl">ETL Process</MenuItem>
      </ConfigField>
      <ConfigField
        label="Source Type"
        value={config.sourceType || ''}
        onChange={(value) => handleChange('sourceType', value)}
        select
      >
        <MenuItem value="mysql">MySQL</MenuItem>
        <MenuItem value="postgres">PostgreSQL</MenuItem>
        <MenuItem value="mongodb">MongoDB</MenuItem>
        <MenuItem value="s3">S3</MenuItem>
        <MenuItem value="filesystem">File System</MenuItem>
      </ConfigField>
      <ConfigField
        label="Target Type"
        value={config.targetType || ''}
        onChange={(value) => handleChange('targetType', value)}
        select
      >
        <MenuItem value="mysql">MySQL</MenuItem>
        <MenuItem value="postgres">PostgreSQL</MenuItem>
        <MenuItem value="mongodb">MongoDB</MenuItem>
        <MenuItem value="s3">S3</MenuItem>
        <MenuItem value="filesystem">File System</MenuItem>
      </ConfigField>
      <ConfigField
        label="Data Validation"
        value={config.validation || true}
        onChange={(value) => handleChange('validation', value)}
        type="boolean"
      />
      <ConfigField
        label="Batch Size"
        value={config.batchSize || '1000'}
        onChange={(value) => handleChange('batchSize', value)}
        type="number"
      />
      <ConfigField
        label="Migration Strategy"
        value={config.strategy || 'full'}
        onChange={(value) => handleChange('strategy', value)}
        select
      >
        <MenuItem value="full">Full Migration</MenuItem>
        <MenuItem value="incremental">Incremental</MenuItem>
        <MenuItem value="differential">Differential</MenuItem>
        <MenuItem value="streaming">Streaming</MenuItem>
      </ConfigField>
      <ConfigField
        label="Rollback Strategy"
        value={config.rollbackStrategy || 'snapshot'}
        onChange={(value) => handleChange('rollbackStrategy', value)}
        select
      >
        <MenuItem value="snapshot">Snapshot</MenuItem>
        <MenuItem value="reverse">Reverse Migration</MenuItem>
        <MenuItem value="none">No Rollback</MenuItem>
      </ConfigField>
    </div>
  );
};

export default DataMigrationNode;
