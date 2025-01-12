import React from 'react';
import { Form } from 'react-bootstrap';

export default function AzureNode({ data, onChange }) {
  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Label>Client ID</Form.Label>
        <Form.Control
          type="text"
          value={data.config?.clientId || ''}
          onChange={(e) => onChange('clientId', e.target.value)}
          placeholder="Enter Azure client ID"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Client Secret</Form.Label>
        <Form.Control
          type="password"
          value={data.config?.clientSecret || ''}
          onChange={(e) => onChange('clientSecret', e.target.value)}
          placeholder="Enter Azure client secret"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Tenant ID</Form.Label>
        <Form.Control
          type="text"
          value={data.config?.tenantId || ''}
          onChange={(e) => onChange('tenantId', e.target.value)}
          placeholder="Enter Azure tenant ID"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Service</Form.Label>
        <Form.Select
          value={data.config?.service || 'Blob Storage'}
          onChange={(e) => onChange('service', e.target.value)}
        >
          <option value="Blob Storage">Blob Storage</option>
          <option value="Functions">Functions</option>
          <option value="VM">VM</option>
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

      {data.config?.event === 'Blob Upload' && (
        <>
          <Form.Group className="mb-3">
            <Form.Label>Container Name</Form.Label>
            <Form.Control
              type="text"
              value={data.config?.containerName || ''}
              onChange={(e) => onChange('containerName', e.target.value)}
              placeholder="Enter container name"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Blob Path</Form.Label>
            <Form.Control
              type="text"
              value={data.config?.blobPath || ''}
              onChange={(e) => onChange('blobPath', e.target.value)}
              placeholder="Enter blob path"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Access Tier</Form.Label>
            <Form.Select
              value={data.config?.accessTier || 'Hot'}
              onChange={(e) => onChange('accessTier', e.target.value)}
            >
              <option value="Hot">Hot</option>
              <option value="Cool">Cool</option>
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

      {data.config?.event === 'Function Execution' && (
        <>
          <Form.Group className="mb-3">
            <Form.Label>Function Name</Form.Label>
            <Form.Control
              type="text"
              value={data.config?.functionName || ''}
              onChange={(e) => onChange('functionName', e.target.value)}
              placeholder="Enter function name"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Input Parameters</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={data.config?.inputParameters || ''}
              onChange={(e) => onChange('inputParameters', e.target.value)}
              placeholder="Enter input parameters as JSON"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Timeout</Form.Label>
            <Form.Control
              type="text"
              value={data.config?.timeout || ''}
              onChange={(e) => onChange('timeout', e.target.value)}
              placeholder="Enter timeout in seconds"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Retry Policy</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={data.config?.retryPolicy || ''}
              onChange={(e) => onChange('retryPolicy', e.target.value)}
              placeholder="Enter retry policy as JSON"
            />
          </Form.Group>
        </>
      )}

      {data.config?.event === 'VM Start' && (
        <>
          <Form.Group className="mb-3">
            <Form.Label>VM Name</Form.Label>
            <Form.Control
              type="text"
              value={data.config?.vmName || ''}
              onChange={(e) => onChange('vmName', e.target.value)}
              placeholder="Enter VM name"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Resource Group</Form.Label>
            <Form.Control
              type="text"
              value={data.config?.resourceGroup || ''}
              onChange={(e) => onChange('resourceGroup', e.target.value)}
              placeholder="Enter resource group"
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
        <Form.Label>Resource Group</Form.Label>
        <Form.Control
          type="text"
          value={data.config?.resourceGroup || ''}
          onChange={(e) => onChange('resourceGroup', e.target.value)}
          placeholder="Enter resource group"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Alerts</Form.Label>
        <Form.Check
          type="checkbox"
          label="Enable Alerts"
          checked={data.config?.enableAlerts || false}
          onChange={(e) => onChange('enableAlerts', e.target.checked)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Virtual Network</Form.Label>
        <Form.Control
          type="text"
          value={data.config?.virtualNetwork || ''}
          onChange={(e) => onChange('virtualNetwork', e.target.value)}
          placeholder="Enter virtual network settings"
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
