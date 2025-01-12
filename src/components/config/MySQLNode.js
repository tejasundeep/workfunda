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
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          value={data.config?.username || ''}
          onChange={(e) => onChange('username', e.target.value)}
          placeholder="Enter MySQL username"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={data.config?.password || ''}
          onChange={(e) => onChange('password', e.target.value)}
          placeholder="Enter MySQL password"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Operation</Form.Label>
        <Form.Select
          value={data.config?.operation || 'SELECT'}
          onChange={(e) => onChange('operation', e.target.value)}
        >
          <option value="SELECT">SELECT</option>
          <option value="INSERT">INSERT</option>
          <option value="UPDATE">UPDATE</option>
          <option value="DELETE">DELETE</option>
        </Form.Select>
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

      <Form.Group className="mb-3">
        <Form.Label>Query Parameters</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={data.config?.queryParams || ''}
          onChange={(e) => onChange('queryParams', e.target.value)}
          placeholder="Enter query parameters as JSON"
        />
      </Form.Group>
    </div>
  );
}
