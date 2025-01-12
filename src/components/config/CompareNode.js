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

  const validateCondition = (condition) => {
    if (!condition.field || !condition.operator || condition.value === undefined) {
      return false;
    }
    return true;
  };

  const handleConditionChange = (index, key, value) => {
    const newConditions = [...conditions];
    newConditions[index] = { ...newConditions[index], [key]: value };
    if (!validateCondition(newConditions[index])) {
      alert('Invalid condition');
      return;
    }
    onChange('conditions', newConditions);
  };

  const operators = ['equals', 'not equals', 'greater than', 'less than'];

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
        <Row key={index} className="mb-3">
          <Col>
            <Form.Control
              type="text"
              value={condition.field}
              onChange={(e) => handleConditionChange(index, 'field', e.target.value)}
              placeholder="Field"
            />
          </Col>
          <Col>
            <Form.Select
              value={condition.operator}
              onChange={(e) => handleConditionChange(index, 'operator', e.target.value)}
            >
              {operators.map(op => <option key={op} value={op}>{op}</option>)}
            </Form.Select>
          </Col>
          <Col>
            <Form.Control
              type="text"
              value={condition.value}
              onChange={(e) => handleConditionChange(index, 'value', e.target.value)}
              placeholder="Value"
            />
          </Col>
          <Col>
            <Button variant="danger" onClick={() => removeCondition(index)}>Remove</Button>
          </Col>
        </Row>
      ))}
      <Button variant="primary" onClick={addCondition}>Add Condition</Button>
    </div>
  );
}
