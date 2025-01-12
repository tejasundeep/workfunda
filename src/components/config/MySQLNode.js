import React from 'react';
import { Form } from 'react-bootstrap';

export default function MySQLNode({ data, onChange }) {
  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Label>MySQL Connection</Form.Label>
        <Form.Control
          type="text"
          value={data.config?.connection || ''}
          onChange={(e) => onChange('connection', e.target.value)}
          placeholder="Enter MySQL connection string"
        />
        <Form.Text className="text-muted">
          Provide the connection string for the MySQL database.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Query</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={data.config?.query || ''}
          onChange={(e) => onChange('query', e.target.value)}
          placeholder="Enter SQL query to execute"
        />
        <Form.Text className="text-muted">
          Specify the SQL query to run against the database.
        </Form.Text>
      </Form.Group>
    </div>
  );
}
