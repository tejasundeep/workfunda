import React from 'react';
import { Form } from 'react-bootstrap';

export default function JiraNode({ data, onChange }) {
  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Label>Jira Project</Form.Label>
        <Form.Control
          type="text"
          value={data.config?.project || ''}
          onChange={(e) => onChange('project', e.target.value)}
          placeholder="Enter Jira project key"
        />
        <Form.Text className="text-muted">
          Specify the Jira project to interact with.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Action</Form.Label>
        <Form.Control
          type="text"
          value={data.config?.action || ''}
          onChange={(e) => onChange('action', e.target.value)}
          placeholder="Enter action to perform (e.g., create issue, update)"
        />
        <Form.Text className="text-muted">
          Specify the action to perform on the Jira project.
        </Form.Text>
      </Form.Group>
    </div>
  );
}
