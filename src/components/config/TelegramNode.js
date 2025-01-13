import React from 'react';
import { Form } from 'react-bootstrap';

export default function TelegramNodeConfig({ data, onChange }) {
  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Label>Chat ID</Form.Label>
        <Form.Control
          type="text"
          value={data.config?.chatId || ''}
          onChange={(e) => onChange('chatId', e.target.value)}
          placeholder="Enter Telegram Chat ID"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Message Text</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={data.config?.text || ''}
          onChange={(e) => onChange('text', e.target.value)}
          placeholder="Enter the message text"
        />
      </Form.Group>

      <Form.Text className="text-muted">
        Ensure the Chat ID is correct and the bot has permission to send messages.
      </Form.Text>
    </div>
  );
}
