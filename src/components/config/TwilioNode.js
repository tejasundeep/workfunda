import React from 'react';
import { Form } from 'react-bootstrap';

export default function TwilioNode({ data, onChange }) {
  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Label>Twilio Service</Form.Label>
        <Form.Control
          type="text"
          value={data.config?.service || ''}
          onChange={(e) => onChange('service', e.target.value)}
          placeholder="Enter Twilio service name (e.g., SMS, Voice)"
        />
        <Form.Text className="text-muted">
          Specify the Twilio service to interact with.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Action</Form.Label>
        <Form.Control
          type="text"
          value={data.config?.action || ''}
          onChange={(e) => onChange('action', e.target.value)}
          placeholder="Enter action to perform (e.g., send, call)"
        />
        <Form.Text className="text-muted">
          Specify the action to perform on the Twilio service.
        </Form.Text>
      </Form.Group>
    </div>
  );
}
