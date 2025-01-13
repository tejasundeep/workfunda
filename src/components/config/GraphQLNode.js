import React from 'react';
import ConfigField from './ConfigField';

const GraphQLNode = ({ config, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="node-config">
      <ConfigField
        label="GraphQL Endpoint"
        value={config.endpoint || ''}
        onChange={(value) => handleChange('endpoint', value)}
      />
      <ConfigField
        label="Query/Mutation"
        value={config.query || ''}
        onChange={(value) => handleChange('query', value)}
        multiline
        rows={4}
      />
      <ConfigField
        label="Headers"
        value={config.headers || '{}'}
        onChange={(value) => handleChange('headers', value)}
        multiline
        rows={2}
      />
      <ConfigField
        label="Variables"
        value={config.variables || '{}'}
        onChange={(value) => handleChange('variables', value)}
        multiline
        rows={2}
      />
    </div>
  );
};

export default GraphQLNode;
