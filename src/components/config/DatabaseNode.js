import React from 'react';
import ConfigField from '../common/ConfigField';

export default function DatabaseNode({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange(field, value);
  };

  const databaseTypeOptions = [
    { value: 'postgresql', label: 'PostgreSQL' },
    { value: 'mysql', label: 'MySQL' },
    { value: 'mongodb', label: 'MongoDB' },
    { value: 'redis', label: 'Redis' },
    { value: 'elasticsearch', label: 'Elasticsearch' },
    { value: 'sqlite', label: 'SQLite' },
    { value: 'mssql', label: 'Microsoft SQL Server' },
    { value: 'oracle', label: 'Oracle' }
  ];

  const operationTypeOptions = [
    { value: 'query', label: 'Query' },
    { value: 'insert', label: 'Insert' },
    { value: 'update', label: 'Update' },
    { value: 'delete', label: 'Delete' },
    { value: 'bulk', label: 'Bulk Operation' },
    { value: 'transaction', label: 'Transaction' },
    { value: 'aggregate', label: 'Aggregate' }
  ];

  const indexTypeOptions = [
    { value: 'btree', label: 'B-Tree' },
    { value: 'hash', label: 'Hash' },
    { value: 'gist', label: 'GiST' },
    { value: 'gin', label: 'GIN' },
    { value: 'brin', label: 'BRIN' }
  ];

  return (
    <div>
      <ConfigField
        label="Database Type"
        type="select"
        field="databaseType"
        value={data.config?.databaseType}
        onChange={handleChange}
        options={databaseTypeOptions}
        required
      />

      <ConfigField
        label="Operation Type"
        type="select"
        field="operationType"
        value={data.config?.operationType}
        onChange={handleChange}
        options={operationTypeOptions}
        required
      />

      {data.config?.databaseType !== 'sqlite' && (
        <>
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
            secure
            required
          />
        </>
      )}

      {data.config?.databaseType === 'sqlite' && (
        <ConfigField
          label="Database Path"
          type="text"
          field="databasePath"
          value={data.config?.databasePath}
          onChange={handleChange}
          placeholder="/path/to/database.sqlite"
          required
        />
      )}

      {['postgresql', 'mysql', 'mssql', 'oracle'].includes(data.config?.databaseType) && (
        <>
          <ConfigField
            label="Schema"
            type="text"
            field="schema"
            value={data.config?.schema}
            onChange={handleChange}
            placeholder="public"
          />
          <ConfigField
            label="SSL Mode"
            type="select"
            field="sslMode"
            value={data.config?.sslMode}
            onChange={handleChange}
            options={[
              { value: 'disable', label: 'Disable' },
              { value: 'require', label: 'Require' },
              { value: 'verify-ca', label: 'Verify CA' },
              { value: 'verify-full', label: 'Verify Full' }
            ]}
          />
        </>
      )}

      {data.config?.operationType === 'query' && (
        <>
          <ConfigField
            label="Query"
            type="textarea"
            field="query"
            value={data.config?.query}
            onChange={handleChange}
            placeholder="SELECT * FROM table WHERE condition"
            rows={4}
            required
          />
          <ConfigField
            label="Parameters"
            type="textarea"
            field="parameters"
            value={data.config?.parameters}
            onChange={handleChange}
            placeholder={`[
  "param1",
  "param2"
]`}
            rows={4}
          />
        </>
      )}

      {data.config?.operationType === 'insert' && (
        <>
          <ConfigField
            label="Table Name"
            type="text"
            field="tableName"
            value={data.config?.tableName}
            onChange={handleChange}
            required
          />
          <ConfigField
            label="Data"
            type="textarea"
            field="data"
            value={data.config?.data}
            onChange={handleChange}
            placeholder={`{
  "column1": "value1",
  "column2": "value2"
}`}
            rows={6}
            required
          />
        </>
      )}

      {data.config?.operationType === 'update' && (
        <>
          <ConfigField
            label="Table Name"
            type="text"
            field="tableName"
            value={data.config?.tableName}
            onChange={handleChange}
            required
          />
          <ConfigField
            label="Set Values"
            type="textarea"
            field="setValues"
            value={data.config?.setValues}
            onChange={handleChange}
            placeholder={`{
  "column1": "newValue1",
  "column2": "newValue2"
}`}
            rows={6}
            required
          />
          <ConfigField
            label="Where Condition"
            type="textarea"
            field="whereCondition"
            value={data.config?.whereCondition}
            onChange={handleChange}
            placeholder={`{
  "id": 1
}`}
            rows={4}
            required
          />
        </>
      )}

      {data.config?.operationType === 'delete' && (
        <>
          <ConfigField
            label="Table Name"
            type="text"
            field="tableName"
            value={data.config?.tableName}
            onChange={handleChange}
            required
          />
          <ConfigField
            label="Where Condition"
            type="textarea"
            field="whereCondition"
            value={data.config?.whereCondition}
            onChange={handleChange}
            placeholder={`{
  "id": 1
}`}
            rows={4}
            required
          />
        </>
      )}

      {data.config?.operationType === 'bulk' && (
        <>
          <ConfigField
            label="Table Name"
            type="text"
            field="tableName"
            value={data.config?.tableName}
            onChange={handleChange}
            required
          />
          <ConfigField
            label="Bulk Operation Type"
            type="select"
            field="bulkOperationType"
            value={data.config?.bulkOperationType}
            onChange={handleChange}
            options={[
              { value: 'insert', label: 'Bulk Insert' },
              { value: 'update', label: 'Bulk Update' },
              { value: 'delete', label: 'Bulk Delete' }
            ]}
            required
          />
          <ConfigField
            label="Batch Size"
            type="number"
            field="batchSize"
            value={data.config?.batchSize}
            onChange={handleChange}
            min={1}
            validation="number"
            required
          />
          <ConfigField
            label="Data"
            type="textarea"
            field="data"
            value={data.config?.data}
            onChange={handleChange}
            placeholder={`[
  {
    "column1": "value1",
    "column2": "value2"
  }
]`}
            rows={8}
            required
          />
        </>
      )}

      {data.config?.operationType === 'transaction' && (
        <>
          <ConfigField
            label="Transaction Queries"
            type="textarea"
            field="transactionQueries"
            value={data.config?.transactionQueries}
            onChange={handleChange}
            placeholder={`[
  {
    "query": "INSERT INTO table1 VALUES ($1, $2)",
    "parameters": ["value1", "value2"]
  },
  {
    "query": "UPDATE table2 SET column = $1",
    "parameters": ["newValue"]
  }
]`}
            rows={10}
            required
          />
          <ConfigField
            label="Isolation Level"
            type="select"
            field="isolationLevel"
            value={data.config?.isolationLevel}
            onChange={handleChange}
            options={[
              { value: 'read_uncommitted', label: 'Read Uncommitted' },
              { value: 'read_committed', label: 'Read Committed' },
              { value: 'repeatable_read', label: 'Repeatable Read' },
              { value: 'serializable', label: 'Serializable' }
            ]}
          />
        </>
      )}

      {data.config?.operationType === 'aggregate' && (
        <>
          <ConfigField
            label="Collection/Table"
            type="text"
            field="collection"
            value={data.config?.collection}
            onChange={handleChange}
            required
          />
          <ConfigField
            label="Pipeline"
            type="textarea"
            field="pipeline"
            value={data.config?.pipeline}
            onChange={handleChange}
            placeholder={`[
  {
    "$match": { "status": "active" }
  },
  {
    "$group": {
      "_id": "$category",
      "total": { "$sum": "$amount" }
    }
  }
]`}
            rows={10}
            required
          />
        </>
      )}

      <ConfigField
        label="Enable Connection Pool"
        type="checkbox"
        field="enablePool"
        value={data.config?.enablePool}
        onChange={handleChange}
      />

      {data.config?.enablePool && (
        <>
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
            label="Idle Timeout (ms)"
            type="number"
            field="idleTimeout"
            value={data.config?.idleTimeout}
            onChange={handleChange}
            min={0}
            validation="number"
          />
        </>
      )}

      <ConfigField
        label="Enable Indexing"
        type="checkbox"
        field="enableIndexing"
        value={data.config?.enableIndexing}
        onChange={handleChange}
      />

      {data.config?.enableIndexing && (
        <>
          <ConfigField
            label="Index Type"
            type="select"
            field="indexType"
            value={data.config?.indexType}
            onChange={handleChange}
            options={indexTypeOptions}
            required
          />
          <ConfigField
            label="Index Fields"
            type="textarea"
            field="indexFields"
            value={data.config?.indexFields}
            onChange={handleChange}
            placeholder={`[
  {
    "field": "column1",
    "order": "ASC"
  }
]`}
            rows={6}
            required
          />
        </>
      )}

      <ConfigField
        label="Enable Caching"
        type="checkbox"
        field="enableCaching"
        value={data.config?.enableCaching}
        onChange={handleChange}
      />

      {data.config?.enableCaching && (
        <>
          <ConfigField
            label="Cache TTL (seconds)"
            type="number"
            field="cacheTTL"
            value={data.config?.cacheTTL}
            onChange={handleChange}
            min={0}
            validation="number"
            required
          />
          <ConfigField
            label="Cache Key Prefix"
            type="text"
            field="cacheKeyPrefix"
            value={data.config?.cacheKeyPrefix}
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
          { value: 'ignore', label: 'Ignore Error' }
        ]}
      />

      {data.config?.errorHandling === 'retry' && (
        <>
          <ConfigField
            label="Retry Count"
            type="number"
            field="retryCount"
            value={data.config?.retryCount}
            onChange={handleChange}
            min={1}
            max={5}
            validation="number"
          />
          <ConfigField
            label="Retry Delay (ms)"
            type="number"
            field="retryDelay"
            value={data.config?.retryDelay}
            onChange={handleChange}
            min={0}
            max={60000}
            validation="number"
          />
        </>
      )}

      <ConfigField
        label="Description"
        type="textarea"
        field="description"
        value={data.config?.description}
        onChange={handleChange}
        placeholder="Describe the purpose of this database operation"
        rows={2}
      />
    </div>
  );
}
