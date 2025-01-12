import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

export default function SetNode({ data, onChange }) {
  const variables = data.config?.variables || [];

  const addVariable = () => {
    onChange('variables', [...variables, {
      name: '',
      value: '',
      type: 'string',
      scope: 'workflow'
    }]);
  };

  const removeVariable = (index) => {
    const newVariables = [...variables];
    newVariables.splice(index, 1);
    onChange('variables', newVariables);
  };

  const updateVariable = (index, field, value) => {
    const newVariables = [...variables];
    newVariables[index] = { ...newVariables[index], [field]: value };
    onChange('variables', newVariables);
  };

  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Label>Keep Only Set Variables</Form.Label>
        <Form.Check
          type="switch"
          checked={data.config?.keepOnlySet || false}
          onChange={(e) => onChange('keepOnlySet', e.target.checked)}
        />
        <Form.Text className="text-muted">
          If enabled, only set variables will be passed to the next node
        </Form.Text>
      </Form.Group>

      <div className="mb-3">
        <h6>Variables</h6>
        {variables.map((variable, index) => (
          <div key={index} className="border p-3 mb-2 rounded">
            <Row className="mb-2">
              <Col>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={variable.name}
                    onChange={(e) => updateVariable(index, 'name', e.target.value)}
                    placeholder="Variable name"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Type</Form.Label>
                  <Form.Select
                    value={variable.type}
                    onChange={(e) => updateVariable(index, 'type', e.target.value)}
                  >
                    <option value="string">String</option>
                    <option value="number">Number</option>
                    <option value="boolean">Boolean</option>
                    <option value="array">Array</option>
                    <option value="object">Object</option>
                    <option value="expression">Expression</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-2">
              <Form.Label>Value</Form.Label>
              {variable.type === 'boolean' ? (
                <Form.Select
                  value={variable.value}
                  onChange={(e) => updateVariable(index, 'value', e.target.value)}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </Form.Select>
              ) : variable.type === 'expression' ? (
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={variable.value}
                  onChange={(e) => updateVariable(index, 'value', e.target.value)}
                  placeholder="$input.data.field"
                />
              ) : (
                <Form.Control
                  type={variable.type === 'number' ? 'number' : 'text'}
                  value={variable.value}
                  onChange={(e) => updateVariable(index, 'value', e.target.value)}
                  placeholder="Variable value"
                />
              )}
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Scope</Form.Label>
              <Form.Select
                value={variable.scope}
                onChange={(e) => updateVariable(index, 'scope', e.target.value)}
              >
                <option value="workflow">Workflow</option>
                <option value="node">Node</option>
              </Form.Select>
            </Form.Group>

            <Button
              variant="danger"
              size="sm"
              onClick={() => removeVariable(index)}
            >
              Remove Variable
            </Button>
          </div>
        ))}
      </div>

      <Button
        variant="secondary"
        onClick={addVariable}
        className="w-100"
      >
        Add Variable
      </Button>
    </div>
  );
}
