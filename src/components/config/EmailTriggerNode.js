import React from 'react';
import { Form } from 'react-bootstrap';

export default function EmailTriggerNode({ data, onChange }) {
  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Label>Email Address</Form.Label>
        <Form.Control
          type="email"
          value={data.config?.email || ''}
          onChange={(e) => onChange('email', e.target.value)}
          placeholder="Enter email address to monitor"
        />
        <Form.Text className="text-muted">
          Specify the email address to watch for incoming emails.
        </Form.Text>
      </Form.Group>
    </div>
  );
}
