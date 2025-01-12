import React from 'react';
import { Form } from 'react-bootstrap';

export default function DatabaseNode({ data, onChange }) {
  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Label>Database Connection</Form.Label>
        <Form.Control
          type="text"
          value={data.config?.connection || ''}
          onChange={(e) => onChange('connection', e.target.value)}
          placeholder="Enter database connection string"
        />
        <Form.Text className="text-muted">
          Provide the connection string for the database.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Table Name</Form.Label>
        <Form.Control
          type="text"
          value={data.config?.table || ''}
          onChange={(e) => onChange('table', e.target.value)}
          placeholder="Enter table name to monitor"
        />
        <Form.Text className="text-muted">
          Specify the table to watch for changes.
        </Form.Text>
      </Form.Group>
    </div>
  );
}
