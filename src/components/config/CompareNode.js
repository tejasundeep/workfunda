import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

export default function CompareNode({ data, onChange }) {
  const conditions = data.config?.conditions || [];

  const addCondition = () => {
    onChange('conditions', [...conditions, {
      field: '',
      operator: 'equals',
      value: '',
      combineOperator: 'and'
    }]);
  };

  const removeCondition = (index) => {
    const newConditions = [...conditions];
    newConditions.splice(index, 1);
    onChange('conditions', newConditions);
  };

  const updateCondition = (index, field, value) => {
    const newConditions = [...conditions];
    newConditions[index] = { ...newConditions[index], [field]: value };
    onChange('conditions', newConditions);
  };

  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Label>Output Mode</Form.Label>
        <Form.Select
          value={data.config?.outputMode || 'boolean'}
          onChange={(e) => onChange('outputMode', e.target.value)}
        >
          <option value="boolean">Boolean (true/false)</option>
          <option value="branch">Branch (split workflow)</option>
        </Form.Select>
      </Form.Group>

      {conditions.map((condition, index) => (
        <div key={index} className="border p-3 mb-3 rounded">
          <Row className="mb-2">
            <Col>
              <Form.Group>
                <Form.Label>Field</Form.Label>
                <Form.Control
                  type="text"
                  value={condition.field}
                  onChange={(e) => updateCondition(index, 'field', e.target.value)}
                  placeholder="data.fieldName"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Operator</Form.Label>
                <Form.Select
                  value={condition.operator}
                  onChange={(e) => updateCondition(index, 'operator', e.target.value)}
                >
                  <option value="equals">Equals</option>
                  <option value="notEquals">Not Equals</option>
                  <option value="contains">Contains</option>
                  <option value="greaterThan">Greater Than</option>
                  <option value="lessThan">Less Than</option>
                  <option value="regex">Matches Regex</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-2">
            <Col>
              <Form.Group>
                <Form.Label>Value</Form.Label>
                <Form.Control
                  type="text"
                  value={condition.value}
                  onChange={(e) => updateCondition(index, 'value', e.target.value)}
                  placeholder="Comparison value"
                />
              </Form.Group>
            </Col>
            {index < conditions.length - 1 && (
              <Col>
                <Form.Group>
                  <Form.Label>Combine With</Form.Label>
                  <Form.Select
                    value={condition.combineOperator}
                    onChange={(e) => updateCondition(index, 'combineOperator', e.target.value)}
                  >
                    <option value="and">AND</option>
                    <option value="or">OR</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            )}
          </Row>

          <Button
            variant="danger"
            size="sm"
            onClick={() => removeCondition(index)}
          >
            Remove Condition
          </Button>
        </div>
      ))}

      <Button
        variant="secondary"
        onClick={addCondition}
        className="w-100"
      >
        Add Condition
      </Button>
    </div>
  );
}
