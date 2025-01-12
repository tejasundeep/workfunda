import React from 'react';
import { Form } from 'react-bootstrap';

export default function StripeNode({ data, onChange }) {
  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Label>Stripe Action</Form.Label>
        <Form.Control
          type="text"
          value={data.config?.action || ''}
          onChange={(e) => onChange('action', e.target.value)}
          placeholder="Enter Stripe action (e.g., charge, subscribe)"
        />
        <Form.Text className="text-muted">
          Specify the action to perform with Stripe.
        </Form.Text>
      </Form.Group>
    </div>
  );
}
