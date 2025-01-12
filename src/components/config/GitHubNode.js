import React from 'react';
import { Form } from 'react-bootstrap';

export default function GitHubNode({ data, onChange }) {
  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Label>GitHub Repository</Form.Label>
        <Form.Control
          type="text"
          value={data.config?.repository || ''}
          onChange={(e) => onChange('repository', e.target.value)}
          placeholder="Enter GitHub repository name"
        />
        <Form.Text className="text-muted">
          Specify the GitHub repository to interact with.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Action</Form.Label>
        <Form.Control
          type="text"
          value={data.config?.action || ''}
          onChange={(e) => onChange('action', e.target.value)}
          placeholder="Enter action to perform (e.g., commit, pull)"
        />
        <Form.Text className="text-muted">
          Specify the action to perform on the GitHub repository.
        </Form.Text>
      </Form.Group>
    </div>
  );
}
