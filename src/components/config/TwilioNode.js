import React from 'react';
import { Form } from 'react-bootstrap';

export default function TwilioNode({ data, onChange }) {
  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Label>Account SID</Form.Label>
        <Form.Control
          type="text"
          value={data.config?.accountSid || ''}
          onChange={(e) => onChange('accountSid', e.target.value)}
          placeholder="Enter Twilio account SID"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Auth Token</Form.Label>
        <Form.Control
          type="password"
          value={data.config?.authToken || ''}
          onChange={(e) => onChange('authToken', e.target.value)}
          placeholder="Enter Twilio auth token"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Service</Form.Label>
        <Form.Select
          value={data.config?.service || 'SMS'}
          onChange={(e) => onChange('service', e.target.value)}
        >
          <option value="SMS">SMS</option>
          <option value="Voice">Voice</option>
        </Form.Select>
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

      <Form.Group className="mb-3">
        <Form.Label>Event</Form.Label>
        <Form.Select
          value={data.config?.event || ''}
          onChange={(e) => onChange('event', e.target.value)}
        >
          <option value="">Select an event</option>
          <option value="Incoming SMS">Incoming SMS</option>
          <option value="Outgoing Call">Outgoing Call</option>
          <option value="Incoming Call">Incoming Call</option>
        </Form.Select>
      </Form.Group>

      {data.config?.event === 'Incoming SMS' && (
        <>
          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              value={data.config?.phoneNumber || ''}
              onChange={(e) => onChange('phoneNumber', e.target.value)}
              placeholder="Enter phone number"
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

          <Form.Group className="mb-3">
            <Form.Label>Message SID</Form.Label>
            <Form.Control
              type="text"
              value={data.config?.messageSid || ''}
              onChange={(e) => onChange('messageSid', e.target.value)}
              placeholder="Enter message SID"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Message Status</Form.Label>
            <Form.Control
              type="text"
              value={data.config?.messageStatus || ''}
              onChange={(e) => onChange('messageStatus', e.target.value)}
              placeholder="Enter message status"
            />
          </Form.Group>
        </>
      )}

      {data.config?.event === 'Outgoing Call' && (
        <>
          <Form.Group className="mb-3">
            <Form.Label>Recipient Number</Form.Label>
            <Form.Control
              type="text"
              value={data.config?.recipientNumber || ''}
              onChange={(e) => onChange('recipientNumber', e.target.value)}
              placeholder="Enter recipient number"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Call Duration</Form.Label>
            <Form.Control
              type="text"
              value={data.config?.callDuration || ''}
              onChange={(e) => onChange('callDuration', e.target.value)}
              placeholder="Enter call duration"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Call SID</Form.Label>
            <Form.Control
              type="text"
              value={data.config?.callSid || ''}
              onChange={(e) => onChange('callSid', e.target.value)}
              placeholder="Enter call SID"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Call Status</Form.Label>
            <Form.Control
              type="text"
              value={data.config?.callStatus || ''}
              onChange={(e) => onChange('callStatus', e.target.value)}
              placeholder="Enter call status"
            />
          </Form.Group>
        </>
      )}

      {data.config?.event === 'Incoming Call' && (
        <>
          <Form.Group className="mb-3">
            <Form.Label>Caller ID</Form.Label>
            <Form.Control
              type="text"
              value={data.config?.callerId || ''}
              onChange={(e) => onChange('callerId', e.target.value)}
              placeholder="Enter caller ID"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Call Recording</Form.Label>
            <Form.Control
              type="text"
              value={data.config?.callRecording || ''}
              onChange={(e) => onChange('callRecording', e.target.value)}
              placeholder="Enter call recording URL"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Call SID</Form.Label>
            <Form.Control
              type="text"
              value={data.config?.callSid || ''}
              onChange={(e) => onChange('callSid', e.target.value)}
              placeholder="Enter call SID"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Call Status</Form.Label>
            <Form.Control
              type="text"
              value={data.config?.callStatus || ''}
              onChange={(e) => onChange('callStatus', e.target.value)}
              placeholder="Enter call status"
            />
          </Form.Group>
        </>
      )}

      <Form.Group className="mb-3">
        <Form.Label>Caller ID</Form.Label>
        <Form.Control
          type="text"
          value={data.config?.callerId || ''}
          onChange={(e) => onChange('callerId', e.target.value)}
          placeholder="Enter caller ID"
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
        <Form.Label>Delivery Reports</Form.Label>
        <Form.Check
          type="checkbox"
          label="Enable Delivery Reports"
          checked={data.config?.enableDeliveryReports || false}
          onChange={(e) => onChange('enableDeliveryReports', e.target.checked)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Message/Call Settings</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={data.config?.settings || ''}
          onChange={(e) => onChange('settings', e.target.value)}
          placeholder="Enter settings as JSON"
        />
      </Form.Group>
    </div>
  );
}
