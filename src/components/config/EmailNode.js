import React from 'react';
import { Form } from 'react-bootstrap';

export default function EmailNodeConfig({ data, onChange }) {
  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Label>To Email</Form.Label>
        <Form.Control
          type="email"
          value={data.config?.to || ''}
          onChange={(e) => onChange('to', e.target.value)}
          placeholder="recipient@example.com"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Subject</Form.Label>
        <Form.Control
          type="text"
          value={data.config?.subject || ''}
          onChange={(e) => onChange('subject', e.target.value)}
          placeholder="Email subject"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Message</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={data.config?.message || ''}
          onChange={(e) => onChange('message', e.target.value)}
          placeholder="Email message"
        />
      </Form.Group>
    </div>
  );
}
