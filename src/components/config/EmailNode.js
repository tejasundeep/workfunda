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
    if (key === 'cc' && !validateEmail(value)) {
      alert('Invalid CC email address');
      return;
    }
    if (key === 'bcc' && !validateEmail(value)) {
      alert('Invalid BCC email address');
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
        <Form.Label>CC</Form.Label>
        <Form.Control
          type="email"
          value={data.config?.cc || ''}
          onChange={(e) => handleInputChange('cc', e.target.value)}
          placeholder="cc@example.com"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>BCC</Form.Label>
        <Form.Control
          type="email"
          value={data.config?.bcc || ''}
          onChange={(e) => handleInputChange('bcc', e.target.value)}
          placeholder="bcc@example.com"
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
      <Form.Group className="mb-3">
        <Form.Label>Email Priority</Form.Label>
        <Form.Select
          value={data.config?.emailPriority || 'Normal'}
          onChange={(e) => handleInputChange('emailPriority', e.target.value)}
        >
          <option value="High">High</option>
          <option value="Normal">Normal</option>
          <option value="Low">Low</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Attachments</Form.Label>
        <Form.Control
          type="text"
          value={data.config?.attachments || ''}
          onChange={(e) => handleInputChange('attachments', e.target.value)}
          placeholder="Enter file paths for attachments"
        />
      </Form.Group>
    </div>
  );
}
