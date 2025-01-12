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
        <Form.Label>Message Type</Form.Label>
        <Form.Select
          value={data.config?.messageType || 'text'}
          onChange={(e) => onChange('messageType', e.target.value)}
        >
          <option value="text">Text</option>
          <option value="file">File</option>
          <option value="block">Block Kit</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Message Formatting</Form.Label>
        <Form.Check
          type="checkbox"
          label="Bold"
          checked={data.config?.bold || false}
          onChange={(e) => onChange('bold', e.target.checked)}
        />
        <Form.Check
          type="checkbox"
          label="Italic"
          checked={data.config?.italic || false}
          onChange={(e) => onChange('italic', e.target.checked)}
        />
        <Form.Check
          type="checkbox"
          label="Code Block"
          checked={data.config?.codeBlock || false}
          onChange={(e) => onChange('codeBlock', e.target.checked)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Interactive Components</Form.Label>
        <Form.Check
          type="checkbox"
          label="Buttons"
          checked={data.config?.buttons || false}
          onChange={(e) => onChange('buttons', e.target.checked)}
        />
        <Form.Check
          type="checkbox"
          label="Menus"
          checked={data.config?.menus || false}
          onChange={(e) => onChange('menus', e.target.checked)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Event</Form.Label>
        <Form.Select
          value={data.config?.event || ''}
          onChange={(e) => onChange('event', e.target.value)}
        >
          <option value="">Select an event</option>
          <option value="Message Sent">Message Sent</option>
          <option value="Reaction Added">Reaction Added</option>
          <option value="User Mentioned">User Mentioned</option>
        </Form.Select>
      </Form.Group>

      {data.config?.event === 'Message Sent' && (
        <>
          <Form.Group className="mb-3">
            <Form.Label>Channel ID</Form.Label>
            <Form.Control
              type="text"
              value={data.config?.channelId || ''}
              onChange={(e) => onChange('channelId', e.target.value)}
              placeholder="Enter channel ID"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Message Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={data.config?.messageContent || ''}
              onChange={(e) => onChange('messageContent', e.target.value)}
              placeholder="Enter message content"
            />
          </Form.Group>
        </>
      )}

      {data.config?.event === 'Reaction Added' && (
        <>
          <Form.Group className="mb-3">
            <Form.Label>Emoji</Form.Label>
            <Form.Control
              type="text"
              value={data.config?.emoji || ''}
              onChange={(e) => onChange('emoji', e.target.value)}
              placeholder="Enter emoji"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Message ID</Form.Label>
            <Form.Control
              type="text"
              value={data.config?.messageId || ''}
              onChange={(e) => onChange('messageId', e.target.value)}
              placeholder="Enter message ID"
            />
          </Form.Group>
        </>
      )}

      {data.config?.event === 'User Mentioned' && (
        <>
          <Form.Group className="mb-3">
            <Form.Label>User ID</Form.Label>
            <Form.Control
              type="text"
              value={data.config?.userId || ''}
              onChange={(e) => onChange('userId', e.target.value)}
              placeholder="Enter user ID"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Message Context</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={data.config?.messageContext || ''}
              onChange={(e) => onChange('messageContext', e.target.value)}
              placeholder="Enter message context"
            />
          </Form.Group>
        </>
      )}

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

      <Form.Group className="mb-3">
        <Form.Label>Bot Permissions</Form.Label>
        <Form.Control
          type="text"
          value={data.config?.botPermissions || ''}
          onChange={(e) => onChange('botPermissions', e.target.value)}
          placeholder="Enter bot permissions"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Message Scheduling</Form.Label>
        <Form.Check
          type="checkbox"
          label="Enable Message Scheduling"
          checked={data.config?.enableMessageScheduling || false}
          onChange={(e) => onChange('enableMessageScheduling', e.target.checked)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>App Settings</Form.Label>
        <Form.Control
          type="text"
          value={data.config?.appSettings || ''}
          onChange={(e) => onChange('appSettings', e.target.value)}
          placeholder="Enter Slack app settings"
        />
      </Form.Group>
    </div>
  );
}
