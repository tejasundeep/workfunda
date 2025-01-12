import React from 'react';
import { Form } from 'react-bootstrap';

export default function AWSNode({ data, onChange }) {
  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Label>AWS Service</Form.Label>
        <Form.Control
          type="text"
          value={data.config?.service || ''}
          onChange={(e) => onChange('service', e.target.value)}
          placeholder="Enter AWS service name (e.g., S3, Lambda)"
        />
        <Form.Text className="text-muted">
          Specify the AWS service to interact with.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Action</Form.Label>
        <Form.Control
          type="text"
          value={data.config?.action || ''}
          onChange={(e) => onChange('action', e.target.value)}
          placeholder="Enter action to perform (e.g., upload, invoke)"
        />
        <Form.Text className="text-muted">
          Specify the action to perform on the AWS service.
        </Form.Text>
      </Form.Group>
    </div>
  );
}
