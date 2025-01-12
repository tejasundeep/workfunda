import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

export default function HTTPNode({ data, onChange }) {
  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Label>Request Method</Form.Label>
        <Form.Select
          value={data.config?.method || 'GET'}
          onChange={(e) => onChange('method', e.target.value)}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
          <option value="PATCH">PATCH</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>URL</Form.Label>
        <Form.Control
          type="text"
          value={data.config?.url || ''}
          onChange={(e) => onChange('url', e.target.value)}
          placeholder="https://api.example.com/endpoint"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Headers</Form.Label>
        {(data.config?.headers || []).map((header, index) => (
          <Row key={index} className="mb-2">
            <Col>
              <Form.Control
                placeholder="Key"
                value={header.key}
                onChange={(e) => {
                  const newHeaders = [...(data.config?.headers || [])];
                  newHeaders[index] = { ...header, key: e.target.value };
                  onChange('headers', newHeaders);
                }}
              />
            </Col>
            <Col>
              <Form.Control
                placeholder="Value"
                value={header.value}
                onChange={(e) => {
                  const newHeaders = [...(data.config?.headers || [])];
                  newHeaders[index] = { ...header, value: e.target.value };
                  onChange('headers', newHeaders);
                }}
              />
            </Col>
          </Row>
        ))}
        <button
          type="button"
          className="btn btn-sm btn-secondary mt-2"
          onClick={() => {
            const newHeaders = [...(data.config?.headers || []), { key: '', value: '' }];
            onChange('headers', newHeaders);
          }}
        >
          Add Header
        </button>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Request Body</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          value={data.config?.body || ''}
          onChange={(e) => onChange('body', e.target.value)}
          placeholder="Request body (JSON)"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Authentication</Form.Label>
        <Form.Select
          value={data.config?.authType || 'none'}
          onChange={(e) => onChange('authType', e.target.value)}
        >
          <option value="none">None</option>
          <option value="basic">Basic Auth</option>
          <option value="bearer">Bearer Token</option>
        </Form.Select>
      </Form.Group>

      {data.config?.authType === 'basic' && (
        <>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={data.config?.username || ''}
              onChange={(e) => onChange('username', e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={data.config?.password || ''}
              onChange={(e) => onChange('password', e.target.value)}
            />
          </Form.Group>
        </>
      )}

      {data.config?.authType === 'bearer' && (
        <Form.Group className="mb-3">
          <Form.Label>Token</Form.Label>
          <Form.Control
            type="text"
            value={data.config?.token || ''}
            onChange={(e) => onChange('token', e.target.value)}
          />
        </Form.Group>
      )}
    </div>
  );
}
