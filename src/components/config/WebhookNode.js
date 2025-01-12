import React from 'react';
import { Form } from 'react-bootstrap';

export default function WebhookNode({ data, onChange }) {
  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Label>Webhook URL</Form.Label>
        <Form.Control
          type="text"
          value={data.config?.webhookUrl || ''}
          readOnly
          placeholder="Webhook URL will be generated automatically"
        />
        <Form.Text className="text-muted">
          This URL will be used to trigger the workflow.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Secret Token</Form.Label>
        <Form.Control
          type="text"
          value={data.config?.secretToken || ''}
          onChange={(e) => onChange('secretToken', e.target.value)}
          placeholder="Enter a secret token for validation"
        />
        <Form.Text className="text-muted">
          Optional: Use a secret token to verify incoming requests.
        </Form.Text>
      </Form.Group>
    </div>
  );
}
