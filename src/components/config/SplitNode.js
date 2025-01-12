import React from 'react';
import { Form } from 'react-bootstrap';

export default function SplitNode({ data, onChange }) {
  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Label>Split Type</Form.Label>
        <Form.Select
          value={data.config?.splitType || 'array'}
          onChange={(e) => onChange('splitType', e.target.value)}
        >
          <option value="array">Array</option>
          <option value="condition">Condition</option>
        </Form.Select>
      </Form.Group>

      {data.config?.splitType === 'condition' && (
        <Form.Group className="mb-3">
          <Form.Label>Condition</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={data.config?.condition || ''}
            onChange={(e) => onChange('condition', e.target.value)}
            placeholder="item => item.value > 10"
          />
          <Form.Text className="text-muted">
            Write a JavaScript condition that returns true/false to split the data
          </Form.Text>
        </Form.Group>
      )}
    </div>
  );
}
