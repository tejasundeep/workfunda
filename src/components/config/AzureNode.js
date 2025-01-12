import React from 'react';
import { Form } from 'react-bootstrap';

export default function AzureNode({ data, onChange }) {
  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Label>Azure Service</Form.Label>
        <Form.Control
          type="text"
          value={data.config?.service || ''}
          onChange={(e) => onChange('service', e.target.value)}
          placeholder="Enter Azure service name (e.g., Blob Storage, Functions)"
        />
        <Form.Text className="text-muted">
          Specify the Azure service to interact with.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Action</Form.Label>
        <Form.Control
          type="text"
          value={data.config?.action || ''}
          onChange={(e) => onChange('action', e.target.value)}
          placeholder="Enter action to perform (e.g., store, execute)"
        />
        <Form.Text className="text-muted">
          Specify the action to perform on the Azure service.
        </Form.Text>
      </Form.Group>
    </div>
  );
}
