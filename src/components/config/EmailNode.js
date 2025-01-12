import React from 'react';
import { Form } from 'react-bootstrap';

export default function EmailNodeConfig({ data, onChange }) {
  const validateEmail = (email) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (key, value) => {
    if (key === 'to' && !validateEmail(value)) {
      alert('Invalid email address');
      return;
    }
    onChange(key, value);
  };

  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Label>To Email</Form.Label>
        <Form.Control
          type="email"
          value={data.config?.to || ''}
          onChange={(e) => handleInputChange('to', e.target.value)}
          placeholder="recipient@example.com"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Subject</Form.Label>
        <Form.Control
          type="text"
          value={data.config?.subject || ''}
          onChange={(e) => handleInputChange('subject', e.target.value)}
          placeholder="Email subject"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Message</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={data.config?.message || ''}
          onChange={(e) => handleInputChange('message', e.target.value)}
          placeholder="Email message"
        />
      </Form.Group>
    </div>
  );
}
