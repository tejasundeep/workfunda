import React from 'react';
import { Form } from 'react-bootstrap';

export default function MergeNode({ data, onChange }) {
  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Label>Merge Type</Form.Label>
        <Form.Select
          value={data.config?.mergeType || 'concat'}
          onChange={(e) => onChange('mergeType', e.target.value)}
        >
          <option value="concat">Concatenate</option>
          <option value="combine">Combine Objects</option>
        </Form.Select>
      </Form.Group>

      {data.config?.mergeType === 'combine' && (
        <Form.Group className="mb-3">
          <Form.Label>Combine Strategy</Form.Label>
          <Form.Select
            value={data.config?.combineStrategy || 'merge'}
            onChange={(e) => onChange('combineStrategy', e.target.value)}
          >
            <option value="merge">Merge</option>
            <option value="override">Override</option>
          </Form.Select>
        </Form.Group>
      )}
    </div>
  );
}
