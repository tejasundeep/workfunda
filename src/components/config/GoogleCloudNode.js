import React from 'react';
import { Form } from 'react-bootstrap';

export default function GoogleCloudNode({ data, onChange }) {
  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Label>Service Account Key</Form.Label>
        <Form.Control
          type="text"
          value={data.config?.serviceAccountKey || ''}
          onChange={(e) => onChange('serviceAccountKey', e.target.value)}
          placeholder="Enter service account key"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Service</Form.Label>
        <Form.Select
          value={data.config?.service || 'Cloud Storage'}
          onChange={(e) => onChange('service', e.target.value)}
        >
          <option value="Cloud Storage">Cloud Storage</option>
          <option value="Pub/Sub">Pub/Sub</option>
          <option value="Compute Engine">Compute Engine</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Action</Form.Label>
        <Form.Control
          type="text"
          value={data.config?.action || ''}
          onChange={(e) => onChange('action', e.target.value)}
          placeholder="Enter action to perform"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Event</Form.Label>
        <Form.Select
          value={data.config?.event || ''}
          onChange={(e) => onChange('event', e.target.value)}
        >
          <option value="">Select an event</option>
          <option value="Storage Upload">Storage Upload</option>
          <option value="Pub/Sub Message">Pub/Sub Message</option>
          <option value="Compute Instance Start">Compute Instance Start</option>
        </Form.Select>
      </Form.Group>

      {data.config?.event === 'Storage Upload' && (
        <>
          <Form.Group className="mb-3">
            <Form.Label>Bucket Name</Form.Label>
            <Form.Control
              type="text"
              value={data.config?.bucketName || ''}
              onChange={(e) => onChange('bucketName', e.target.value)}
              placeholder="Enter bucket name"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>File Path</Form.Label>
            <Form.Control
              type="text"
              value={data.config?.filePath || ''}
              onChange={(e) => onChange('filePath', e.target.value)}
              placeholder="Enter file path"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Storage Class</Form.Label>
            <Form.Select
              value={data.config?.storageClass || 'Standard'}
              onChange={(e) => onChange('storageClass', e.target.value)}
            >
              <option value="Standard">Standard</option>
              <option value="Nearline">Nearline</option>
              <option value="Coldline">Coldline</option>
              <option value="Archive">Archive</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Metadata</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={data.config?.metadata || ''}
              onChange={(e) => onChange('metadata', e.target.value)}
              placeholder="Enter metadata as JSON"
            />
          </Form.Group>
        </>
      )}

      {data.config?.event === 'Pub/Sub Message' && (
        <>
          <Form.Group className="mb-3">
            <Form.Label>Topic Name</Form.Label>
            <Form.Control
              type="text"
              value={data.config?.topicName || ''}
              onChange={(e) => onChange('topicName', e.target.value)}
              placeholder="Enter topic name"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Message Attributes</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={data.config?.messageAttributes || ''}
              onChange={(e) => onChange('messageAttributes', e.target.value)}
              placeholder="Enter message attributes as JSON"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Ordering Key</Form.Label>
            <Form.Control
              type="text"
              value={data.config?.orderingKey || ''}
              onChange={(e) => onChange('orderingKey', e.target.value)}
              placeholder="Enter ordering key"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Message Encoding</Form.Label>
            <Form.Select
              value={data.config?.messageEncoding || 'JSON'}
              onChange={(e) => onChange('messageEncoding', e.target.value)}
            >
              <option value="JSON">JSON</option>
              <option value="Binary">Binary</option>
            </Form.Select>
          </Form.Group>
        </>
      )}

      {data.config?.event === 'Compute Instance Start' && (
        <>
          <Form.Group className="mb-3">
            <Form.Label>Instance ID</Form.Label>
            <Form.Control
              type="text"
              value={data.config?.instanceId || ''}
              onChange={(e) => onChange('instanceId', e.target.value)}
              placeholder="Enter instance ID"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Zone</Form.Label>
            <Form.Control
              type="text"
              value={data.config?.zone || ''}
              onChange={(e) => onChange('zone', e.target.value)}
              placeholder="Enter zone"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Startup Script</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={data.config?.startupScript || ''}
              onChange={(e) => onChange('startupScript', e.target.value)}
              placeholder="Enter startup script"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tags</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={data.config?.tags || ''}
              onChange={(e) => onChange('tags', e.target.value)}
              placeholder="Enter tags as JSON"
            />
          </Form.Group>
        </>
      )}

      <Form.Group className="mb-3">
        <Form.Label>Region</Form.Label>
        <Form.Control
          type="text"
          value={data.config?.region || ''}
          onChange={(e) => onChange('region', e.target.value)}
          placeholder="Enter region"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Zone</Form.Label>
        <Form.Control
          type="text"
          value={data.config?.zone || ''}
          onChange={(e) => onChange('zone', e.target.value)}
          placeholder="Enter zone"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>IAM Role</Form.Label>
        <Form.Control
          type="text"
          value={data.config?.iamRole || ''}
          onChange={(e) => onChange('iamRole', e.target.value)}
          placeholder="Enter IAM role"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Logging</Form.Label>
        <Form.Check
          type="checkbox"
          label="Enable Logging"
          checked={data.config?.enableLogging || false}
          onChange={(e) => onChange('enableLogging', e.target.checked)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Service-Specific Settings</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={data.config?.serviceSettings || ''}
          onChange={(e) => onChange('serviceSettings', e.target.value)}
          placeholder="Enter settings as JSON"
        />
      </Form.Group>
    </div>
  );
}
