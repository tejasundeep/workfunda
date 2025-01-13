import React from 'react';
import ConfigField from '../common/ConfigField';

export default function TransformNode({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange(field, value);
  };

  const transformTypeOptions = [
    { value: 'map', label: 'Map Fields' },
    { value: 'filter', label: 'Filter Data' },
    { value: 'aggregate', label: 'Aggregate Data' },
    { value: 'sort', label: 'Sort Data' },
    { value: 'custom', label: 'Custom Transform' }
  ];

  return (
    <div>
      <ConfigField
        label="Enable Transform"
        type="switch"
        field="enabled"
        value={data.config?.enabled}
        onChange={handleChange}
      />

      {data.config?.enabled && (
        <>
          <ConfigField
            label="Transform Type"
            type="select"
            field="transformType"
            value={data.config?.transformType}
            onChange={handleChange}
            options={transformTypeOptions}
            required
          />

          <ConfigField
            label="Preserve Original"
            type="switch"
            field="preserveOriginal"
            value={data.config?.preserveOriginal}
            onChange={handleChange}
          />

          {data.config?.transformType === 'map' && (
            <>
              <ConfigField
                label="Field Mapping"
                type="textarea"
                field="fieldMapping"
                value={data.config?.fieldMapping}
                onChange={handleChange}
                placeholder={`{
  "sourceField": "targetField",
  "nested.field": "flattened_field",
  "array[0]": "first_item"
}`}
                rows={8}
                required
              />
              <ConfigField
                label="Remove Unmapped Fields"
                type="switch"
                field="removeUnmapped"
                value={data.config?.removeUnmapped}
                onChange={handleChange}
              />
            </>
          )}

          {data.config?.transformType === 'filter' && (
            <>
              <ConfigField
                label="Filter Condition"
                type="textarea"
                field="filterCondition"
                value={data.config?.filterCondition}
                onChange={handleChange}
                placeholder={`function filter(item) {
  // Return true to keep the item
  // Return false to remove it
  return item.value > 0;
}`}
                rows={8}
                required
              />
              <ConfigField
                label="Keep Nulls"
                type="switch"
                field="keepNulls"
                value={data.config?.keepNulls}
                onChange={handleChange}
              />
            </>
          )}

          {data.config?.transformType === 'aggregate' && (
            <>
              <ConfigField
                label="Group By Field"
                type="text"
                field="groupByField"
                value={data.config?.groupByField}
                onChange={handleChange}
                placeholder="field.name"
                required
              />
              <ConfigField
                label="Aggregation Function"
                type="textarea"
                field="aggregationFunction"
                value={data.config?.aggregationFunction}
                onChange={handleChange}
                placeholder={`function aggregate(group) {
  return {
    sum: group.reduce((a, b) => a + b.value, 0),
    count: group.length,
    average: group.reduce((a, b) => a + b.value, 0) / group.length
  };
}`}
                rows={8}
                required
              />
              <ConfigField
                label="Include Group Metadata"
                type="switch"
                field="includeGroupMetadata"
                value={data.config?.includeGroupMetadata}
                onChange={handleChange}
              />
            </>
          )}

          {data.config?.transformType === 'sort' && (
            <>
              <ConfigField
                label="Sort Field"
                type="text"
                field="sortField"
                value={data.config?.sortField}
                onChange={handleChange}
                placeholder="field.to.sort.by"
                required
              />
              <ConfigField
                label="Sort Direction"
                type="select"
                field="sortDirection"
                value={data.config?.sortDirection}
                onChange={handleChange}
                options={[
                  { value: 'asc', label: 'Ascending' },
                  { value: 'desc', label: 'Descending' }
                ]}
                required
              />
              <ConfigField
                label="Case Sensitive"
                type="switch"
                field="caseSensitive"
                value={data.config?.caseSensitive}
                onChange={handleChange}
              />
              <ConfigField
                label="Natural Sort"
                type="switch"
                field="naturalSort"
                value={data.config?.naturalSort}
                onChange={handleChange}
              />
            </>
          )}

          {data.config?.transformType === 'custom' && (
            <>
              <ConfigField
                label="Transform Function"
                type="textarea"
                field="customTransform"
                value={data.config?.customTransform}
                onChange={handleChange}
                placeholder={`function transform(data) {
  // Your custom transformation logic
  return transformedData;
}`}
                rows={8}
                required
              />
              <ConfigField
                label="Enable Caching"
                type="switch"
                field="enableCaching"
                value={data.config?.enableCaching}
                onChange={handleChange}
              />
              <ConfigField
                label="Cache Duration (seconds)"
                type="number"
                field="cacheDuration"
                value={data.config?.cacheDuration}
                onChange={handleChange}
                min={0}
                placeholder="3600"
                validation="number"
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
              { value: 'skip', label: 'Skip Failed Items' },
              { value: 'null', label: 'Replace with Null' },
              { value: 'throw', label: 'Throw Error' }
            ]}
          />

          <ConfigField
            label="Description"
            type="textarea"
            field="description"
            value={data.config?.description}
            onChange={handleChange}
            placeholder="Describe the purpose of this transformation"
            rows={3}
          />
        </>
      )}
    </div>
  );
}
