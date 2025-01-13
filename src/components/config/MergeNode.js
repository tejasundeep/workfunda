import React from 'react';
import ConfigField from '../common/ConfigField';

export default function MergeNode({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange(field, value);
  };

  const mergeTypeOptions = [
    { value: 'concat', label: 'Concatenate' },
    { value: 'union', label: 'Union' },
    { value: 'intersection', label: 'Intersection' },
    { value: 'diff', label: 'Difference' },
    { value: 'join', label: 'Join' },
    { value: 'zip', label: 'Zip' },
    { value: 'custom', label: 'Custom Function' }
  ];

  const joinTypeOptions = [
    { value: 'inner', label: 'Inner Join' },
    { value: 'left', label: 'Left Join' },
    { value: 'right', label: 'Right Join' },
    { value: 'full', label: 'Full Join' },
    { value: 'cross', label: 'Cross Join' }
  ];

  const sortOrderOptions = [
    { value: 'asc', label: 'Ascending' },
    { value: 'desc', label: 'Descending' }
  ];

  return (
    <div>
      <ConfigField
        label="Merge Type"
        type="select"
        field="mergeType"
        value={data.config?.mergeType}
        onChange={handleChange}
        options={mergeTypeOptions}
        required
      />

      {data.config?.mergeType === 'join' && (
        <>
          <ConfigField
            label="Join Type"
            type="select"
            field="joinType"
            value={data.config?.joinType}
            onChange={handleChange}
            options={joinTypeOptions}
            required
          />
          <ConfigField
            label="Join Keys"
            type="textarea"
            field="joinKeys"
            value={data.config?.joinKeys}
            onChange={handleChange}
            placeholder={`{
  "left": "id",
  "right": "userId"
}`}
            rows={4}
            required
          />
        </>
      )}

      {data.config?.mergeType === 'custom' && (
        <ConfigField
          label="Custom Function"
          type="textarea"
          field="customFunction"
          value={data.config?.customFunction}
          onChange={handleChange}
          placeholder={`function merge(inputs) {
  // inputs is an array of input data
  return mergedOutput;
}`}
          rows={10}
          required
        />
      )}

      <ConfigField
        label="Input Sources"
        type="textarea"
        field="inputSources"
        value={data.config?.inputSources}
        onChange={handleChange}
        placeholder={`[
  "source1",
  "source2"
]`}
        rows={4}
        required
      />

      <ConfigField
        label="Field Mappings"
        type="textarea"
        field="fieldMappings"
        value={data.config?.fieldMappings}
        onChange={handleChange}
        placeholder={`{
  "outputField": {
    "source": "source1",
    "field": "inputField"
  }
}`}
        rows={6}
      />

      <ConfigField
        label="Enable Sorting"
        type="checkbox"
        field="enableSorting"
        value={data.config?.enableSorting}
        onChange={handleChange}
      />

      {data.config?.enableSorting && (
        <>
          <ConfigField
            label="Sort Field"
            type="text"
            field="sortField"
            value={data.config?.sortField}
            onChange={handleChange}
            required
          />
          <ConfigField
            label="Sort Order"
            type="select"
            field="sortOrder"
            value={data.config?.sortOrder}
            onChange={handleChange}
            options={sortOrderOptions}
            required
          />
        </>
      )}

      <ConfigField
        label="Enable Filtering"
        type="checkbox"
        field="enableFiltering"
        value={data.config?.enableFiltering}
        onChange={handleChange}
      />

      {data.config?.enableFiltering && (
        <ConfigField
          label="Filter Function"
          type="textarea"
          field="filterFunction"
          value={data.config?.filterFunction}
          onChange={handleChange}
          placeholder={`function filter(item) {
  return item.value > 0;
}`}
          rows={4}
          required
        />
      )}

      <ConfigField
        label="Enable Deduplication"
        type="checkbox"
        field="enableDeduplication"
        value={data.config?.enableDeduplication}
        onChange={handleChange}
      />

      {data.config?.enableDeduplication && (
        <>
          <ConfigField
            label="Deduplication Key"
            type="text"
            field="deduplicationKey"
            value={data.config?.deduplicationKey}
            onChange={handleChange}
            required
          />
          <ConfigField
            label="Keep Strategy"
            type="select"
            field="keepStrategy"
            value={data.config?.keepStrategy}
            onChange={handleChange}
            options={[
              { value: 'first', label: 'Keep First' },
              { value: 'last', label: 'Keep Last' },
              { value: 'all', label: 'Keep All' }
            ]}
            required
          />
        </>
      )}

      <ConfigField
        label="Enable Aggregation"
        type="checkbox"
        field="enableAggregation"
        value={data.config?.enableAggregation}
        onChange={handleChange}
      />

      {data.config?.enableAggregation && (
        <>
          <ConfigField
            label="Group By Fields"
            type="textarea"
            field="groupByFields"
            value={data.config?.groupByFields}
            onChange={handleChange}
            placeholder={`[
  "category",
  "region"
]`}
            rows={4}
            required
          />
          <ConfigField
            label="Aggregations"
            type="textarea"
            field="aggregations"
            value={data.config?.aggregations}
            onChange={handleChange}
            placeholder={`{
  "total": {
    "field": "amount",
    "function": "sum"
  },
  "average": {
    "field": "price",
    "function": "avg"
  }
}`}
            rows={8}
            required
          />
        </>
      )}

      <ConfigField
        label="Enable Validation"
        type="checkbox"
        field="enableValidation"
        value={data.config?.enableValidation}
        onChange={handleChange}
      />

      {data.config?.enableValidation && (
        <ConfigField
          label="Validation Schema"
          type="textarea"
          field="validationSchema"
          value={data.config?.validationSchema}
          onChange={handleChange}
          placeholder={`{
  "type": "object",
  "required": ["id", "name"],
  "properties": {
    "id": { "type": "string" },
    "name": { "type": "string" }
  }
}`}
          rows={10}
          required
        />
      )}

      <ConfigField
        label="Error Handling"
        type="select"
        field="errorHandling"
        value={data.config?.errorHandling}
        onChange={handleChange}
        options={[
          { value: 'skip', label: 'Skip Failed Items' },
          { value: 'fail', label: 'Fail Entire Merge' },
          { value: 'default', label: 'Use Default Value' }
        ]}
      />

      {data.config?.errorHandling === 'default' && (
        <ConfigField
          label="Default Value"
          type="textarea"
          field="defaultValue"
          value={data.config?.defaultValue}
          onChange={handleChange}
          placeholder="Default value for failed merges"
          rows={2}
        />
      )}

      <ConfigField
        label="Description"
        type="textarea"
        field="description"
        value={data.config?.description}
        onChange={handleChange}
        placeholder="Describe the purpose of this merge operation"
        rows={2}
      />
    </div>
  );
}
