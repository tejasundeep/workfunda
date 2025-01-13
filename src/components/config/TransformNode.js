import React from 'react';
import { Form } from 'react-bootstrap';

export default function TransformNode({ data, onChange }) {
  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Label>Transform Type</Form.Label>
        <Form.Select
          value={data.config?.transformType || 'map'}
          onChange={(e) => onChange('transformType', e.target.value)}
        >
          <option value="map">Map</option>
          <option value="filter">Filter</option>
          <option value="reduce">Reduce</option>
          <option value="custom">Custom</option>
        </Form.Select>
      </Form.Group>

      {data.config?.transformType === 'map' && (
        <Form.Group className="mb-3">
          <Form.Label>Map Expression</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={data.config?.mapExpression || ''}
            onChange={(e) => onChange('mapExpression', e.target.value)}
            placeholder="item => ({ ...item, newField: item.oldField })"
          />
          <Form.Text className="text-muted">
            Write a JavaScript arrow function that transforms each item. Example: {'<code>item => ({ ...item, newField: item.oldField })</code>'}
          </Form.Text>
        </Form.Group>
      )}

      {data.config?.transformType === 'filter' && (
        <Form.Group className="mb-3">
          <Form.Label>Filter Expression</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={data.config?.filterExpression || ''}
            onChange={(e) => onChange('filterExpression', e.target.value)}
            placeholder="item => item.value > 10"
          />
          <Form.Text className="text-muted">
            Write a JavaScript arrow function that returns true/false. Example: <code>{'item => item.value > 10'}</code>
          </Form.Text>
        </Form.Group>
      )}

      {data.config?.transformType === 'reduce' && (
        <>
          <Form.Group className="mb-3">
            <Form.Label>Reduce Expression</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={data.config?.reduceExpression || ''}
              onChange={(e) => onChange('reduceExpression', e.target.value)}
              placeholder="(acc, item) => acc + item.value"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Initial Value</Form.Label>
            <Form.Control
              type="text"
              value={data.config?.initialValue || ''}
              onChange={(e) => onChange('initialValue', e.target.value)}
              placeholder="0"
            />
          </Form.Group>
        </>
      )}

      {data.config?.transformType === 'custom' && (
        <Form.Group className="mb-3">
          <Form.Label>Custom Code</Form.Label>
          <Form.Control
            as="textarea"
            rows={8}
            value={data.config?.customCode || ''}
            onChange={(e) => onChange('customCode', e.target.value)}
            placeholder="function transform(data) {
  // Your custom transformation logic here
  return transformedData;
}"
          />
          <Form.Text className="text-muted">
            Write a JavaScript function that takes input data and returns transformed data
          </Form.Text>
        </Form.Group>
      )}
    </div>
  );
}
