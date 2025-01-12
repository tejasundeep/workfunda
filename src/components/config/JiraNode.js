import React from 'react';
import { Form } from 'react-bootstrap';

export default function JiraNode({ data, onChange }) {
  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Label>Jira Project</Form.Label>
        <Form.Control
          type="text"
          value={data.config?.project || ''}
          onChange={(e) => onChange('project', e.target.value)}
          placeholder="Enter Jira project key"
        />
        <Form.Text className="text-muted">
          Specify the Jira project to interact with.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Action</Form.Label>
        <Form.Control
          type="text"
          value={data.config?.action || ''}
          onChange={(e) => onChange('action', e.target.value)}
          placeholder="Enter action to perform (e.g., create issue, update)"
        />
        <Form.Text className="text-muted">
          Specify the action to perform on the Jira project.
        </Form.Text>
      </Form.Group>

      {data.config?.event === 'Issue Created' && (
        <>
          <Form.Group className="mb-3">
            <Form.Label>Project Key</Form.Label>
            <Form.Control
              type="text"
              value={data.config?.projectKey || ''}
              onChange={(e) => onChange('projectKey', e.target.value)}
              placeholder="Enter project key"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Issue Type</Form.Label>
            <Form.Control
              type="text"
              value={data.config?.issueType || ''}
              onChange={(e) => onChange('issueType', e.target.value)}
              placeholder="Enter issue type"
            />
          </Form.Group>
        </>
      )}

      {data.config?.event === 'Issue Updated' && (
        <>
          <Form.Group className="mb-3">
            <Form.Label>Issue ID</Form.Label>
            <Form.Control
              type="text"
              value={data.config?.issueId || ''}
              onChange={(e) => onChange('issueId', e.target.value)}
              placeholder="Enter issue ID"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Updated Fields</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={data.config?.updatedFields || ''}
              onChange={(e) => onChange('updatedFields', e.target.value)}
              placeholder="Enter updated fields as JSON"
            />
          </Form.Group>
        </>
      )}

      {data.config?.event === 'Comment Added' && (
        <>
          <Form.Group className="mb-3">
            <Form.Label>Issue ID</Form.Label>
            <Form.Control
              type="text"
              value={data.config?.issueId || ''}
              onChange={(e) => onChange('issueId', e.target.value)}
              placeholder="Enter issue ID"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Comment Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={data.config?.commentContent || ''}
              onChange={(e) => onChange('commentContent', e.target.value)}
              placeholder="Enter comment content"
            />
          </Form.Group>
        </>
      )}

      <h5>Advanced Configuration</h5>

      <Form.Group className="mb-3">
        <Form.Label>Custom Fields</Form.Label>
        <Form.Control
          type="text"
          value={data.config?.customFields || ''}
          onChange={(e) => onChange('customFields', e.target.value)}
          placeholder="Enter custom fields"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Workflow Configuration</Form.Label>
        <Form.Control
          type="text"
          value={data.config?.workflowConfiguration || ''}
          onChange={(e) => onChange('workflowConfiguration', e.target.value)}
          placeholder="Enter workflow configuration"
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
