import React from 'react';
import { Form } from 'react-bootstrap';

export default function GitHubNode({ data, onChange }) {
  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Label>Personal Access Token</Form.Label>
        <Form.Control
          type="password"
          value={data.config?.accessToken || ''}
          onChange={(e) => onChange('accessToken', e.target.value)}
          placeholder="Enter GitHub personal access token"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Repository</Form.Label>
        <Form.Control
          type="text"
          value={data.config?.repository || ''}
          onChange={(e) => onChange('repository', e.target.value)}
          placeholder="Enter repository name"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Action</Form.Label>
        <Form.Select
          value={data.config?.action || 'commit'}
          onChange={(e) => onChange('action', e.target.value)}
        >
          <option value="commit">Commit</option>
          <option value="pull_request">Pull Request</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Event</Form.Label>
        <Form.Select
          value={data.config?.event || 'push'}
          onChange={(e) => onChange('event', e.target.value)}
        >
          <option value="push">Push</option>
          <option value="pull_request">Pull Request</option>
          <option value="issues">Issues</option>
          <option value="star">Star</option>
          <option value="fork">Fork</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Repository-Specific Settings</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={data.config?.repoSettings || ''}
          onChange={(e) => onChange('repoSettings', e.target.value)}
          placeholder="Enter settings as JSON"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Branch</Form.Label>
        <Form.Control
          type="text"
          value={data.config?.branch || ''}
          onChange={(e) => onChange('branch', e.target.value)}
          placeholder="Enter branch name"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Commit Message</Form.Label>
        <Form.Control
          type="text"
          value={data.config?.commitMessage || ''}
          onChange={(e) => onChange('commitMessage', e.target.value)}
          placeholder="Enter commit message"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Webhook Configuration</Form.Label>
        <Form.Check
          type="checkbox"
          label="Enable Webhook"
          checked={data.config?.enableWebhook || false}
          onChange={(e) => onChange('enableWebhook', e.target.checked)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Collaborator Permissions</Form.Label>
        <Form.Control
          type="text"
          value={data.config?.collaboratorPermissions || ''}
          onChange={(e) => onChange('collaboratorPermissions', e.target.value)}
          placeholder="Enter collaborator permissions"
        />
      </Form.Group>
    </div>
  );
}
