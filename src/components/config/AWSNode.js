import React from 'react';
import { Form } from 'react-bootstrap';

export default function AWSNode({ data, onChange }) {
  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Label>Access Key</Form.Label>
        <Form.Control
          type="text"
          value={data.config?.accessKey || ''}
          onChange={(e) => onChange('accessKey', e.target.value)}
          placeholder="Enter AWS access key"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Secret Key</Form.Label>
        <Form.Control
          type="password"
          value={data.config?.secretKey || ''}
          onChange={(e) => onChange('secretKey', e.target.value)}
          placeholder="Enter AWS secret key"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Service</Form.Label>
        <Form.Select
          value={data.config?.service || 'S3'}
          onChange={(e) => onChange('service', e.target.value)}
        >
          <option value="S3">S3</option>
          <option value="Lambda">Lambda</option>
          <option value="DynamoDB">DynamoDB</option>
          <option value="EC2">EC2</option>
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
        <Form.Label>Service-Specific Settings</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={data.config?.serviceSettings || ''}
          onChange={(e) => onChange('serviceSettings', e.target.value)}
          placeholder="Enter settings as JSON"
        />
      </Form.Group>

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
        <Form.Label>IAM Role</Form.Label>
        <Form.Control
          type="text"
          value={data.config?.iamRole || ''}
          onChange={(e) => onChange('iamRole', e.target.value)}
          placeholder="Enter IAM role"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>CloudWatch Logging</Form.Label>
        <Form.Check
          type="checkbox"
          label="Enable CloudWatch Logging"
          checked={data.config?.enableCloudWatchLogging || false}
          onChange={(e) => onChange('enableCloudWatchLogging', e.target.checked)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>VPC Settings</Form.Label>
        <Form.Control
          type="text"
          value={data.config?.vpcSettings || ''}
          onChange={(e) => onChange('vpcSettings', e.target.value)}
          placeholder="Enter VPC settings"
        />
      </Form.Group>
    </div>
  );
}
