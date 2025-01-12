import React from 'react';
import { Form } from 'react-bootstrap';

export default function FileSystemNode({ data, onChange }) {
  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Label>Directory Path</Form.Label>
        <Form.Control
          type="text"
          value={data.config?.directory || ''}
          onChange={(e) => onChange('directory', e.target.value)}
          placeholder="Enter directory path to watch"
        />
        <Form.Text className="text-muted">
          Specify the directory to monitor for file changes.
        </Form.Text>
      </Form.Group>
    </div>
  );
}
