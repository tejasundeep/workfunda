import React from 'react';
import { Form } from 'react-bootstrap';

export default function FileSystemNode({ data, onChange }) {
  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Label>Directory Path</Form.Label>
        <Form.Control
          type="text"
          value={data.config?.directory || ''}
          onChange={(e) => onChange('directory', e.target.value)}
          placeholder="Enter directory path to watch"
        />
        <Form.Text className="text-muted">
          Specify the directory to monitor for file changes.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>File Type Filter</Form.Label>
        <Form.Control
          type="text"
          value={data.config?.fileType || ''}
          onChange={(e) => onChange('fileType', e.target.value)}
          placeholder="Enter file types to monitor (e.g., .txt, .log)"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Event Types</Form.Label>
        <Form.Check
          type="checkbox"
          label="Creation"
          checked={data.config?.eventCreation || false}
          onChange={(e) => onChange('eventCreation', e.target.checked)}
        />
        <Form.Check
          type="checkbox"
          label="Modification"
          checked={data.config?.eventModification || false}
          onChange={(e) => onChange('eventModification', e.target.checked)}
        />
        <Form.Check
          type="checkbox"
          label="Deletion"
          checked={data.config?.eventDeletion || false}
          onChange={(e) => onChange('eventDeletion', e.target.checked)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Notifications</Form.Label>
        <Form.Check
          type="checkbox"
          label="Enable Notifications"
          checked={data.config?.enableNotifications || false}
          onChange={(e) => onChange('enableNotifications', e.target.checked)}
        />
      </Form.Group>
    </div>
  );
}
