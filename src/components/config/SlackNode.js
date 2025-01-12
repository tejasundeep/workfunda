import React from 'react';
import { Form } from 'react-bootstrap';

export default function SlackNode({ data, onChange }) {
  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Label>Slack Channel</Form.Label>
        <Form.Control
          type="text"
          value={data.config?.channel || ''}
          onChange={(e) => onChange('channel', e.target.value)}
          placeholder="Enter Slack channel name"
        />
        <Form.Text className="text-muted">
          Specify the Slack channel to send messages to.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Message</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={data.config?.message || ''}
          onChange={(e) => onChange('message', e.target.value)}
          placeholder="Enter message to send"
        />
        <Form.Text className="text-muted">
          Specify the message content to send to the channel.
        </Form.Text>
      </Form.Group>
    </div>
  );
}
