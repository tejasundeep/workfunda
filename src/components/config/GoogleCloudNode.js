import React from 'react';
import { Form } from 'react-bootstrap';

export default function GoogleCloudNode({ data, onChange }) {
  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Label>Google Cloud Service</Form.Label>
        <Form.Control
          type="text"
          value={data.config?.service || ''}
          onChange={(e) => onChange('service', e.target.value)}
          placeholder="Enter Google Cloud service name (e.g., Storage, Pub/Sub)"
        />
        <Form.Text className="text-muted">
          Specify the Google Cloud service to interact with.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Action</Form.Label>
        <Form.Control
          type="text"
          value={data.config?.action || ''}
          onChange={(e) => onChange('action', e.target.value)}
          placeholder="Enter action to perform (e.g., upload, publish)"
        />
        <Form.Text className="text-muted">
          Specify the action to perform on the Google Cloud service.
        </Form.Text>
      </Form.Group>
    </div>
  );
}
