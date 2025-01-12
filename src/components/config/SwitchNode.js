import React from 'react';
import { Form, Button } from 'react-bootstrap';

export default function SwitchNode({ data, onChange }) {
  const cases = data.config?.cases || [];

  const addCase = () => {
    onChange('cases', [...cases, {
      value: '',
      label: `Case ${cases.length + 1}`
    }]);
  };

  const removeCase = (index) => {
    const newCases = [...cases];
    newCases.splice(index, 1);
    onChange('cases', newCases);
  };

  const updateCase = (index, field, value) => {
    const newCases = [...cases];
    newCases[index] = { ...newCases[index], [field]: value };
    onChange('cases', newCases);
  };

  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Label>Input Field</Form.Label>
        <Form.Control
          type="text"
          value={data.config?.inputField || ''}
          onChange={(e) => onChange('inputField', e.target.value)}
          placeholder="data.fieldName"
        />
        <Form.Text className="text-muted">
          Specify the field to switch on
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Mode</Form.Label>
        <Form.Select
          value={data.config?.mode || 'equals'}
          onChange={(e) => onChange('mode', e.target.value)}
        >
          <option value="equals">Equals</option>
          <option value="contains">Contains</option>
          <option value="regex">Matches Regex</option>
        </Form.Select>
      </Form.Group>

      <div className="mb-3">
        <h6>Cases</h6>
        {cases.map((caseItem, index) => (
          <div key={index} className="border p-3 mb-2 rounded">
            <Form.Group className="mb-2">
              <Form.Label>Label</Form.Label>
              <Form.Control
                type="text"
                value={caseItem.label}
                onChange={(e) => updateCase(index, 'label', e.target.value)}
                placeholder={`Case ${index + 1}`}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Value</Form.Label>
              <Form.Control
                type="text"
                value={caseItem.value}
                onChange={(e) => updateCase(index, 'value', e.target.value)}
                placeholder="Case value"
              />
            </Form.Group>

            <Button
              variant="danger"
              size="sm"
              onClick={() => removeCase(index)}
            >
              Remove Case
            </Button>
          </div>
        ))}
      </div>

      <Button
        variant="secondary"
        onClick={addCase}
        className="w-100 mb-3"
      >
        Add Case
      </Button>

      <Form.Group>
        <Form.Check
          type="checkbox"
          label="Include Default Output"
          checked={data.config?.includeDefault || false}
          onChange={(e) => onChange('includeDefault', e.target.checked)}
        />
        <Form.Text className="text-muted">
          Create an output for unmatched cases
        </Form.Text>
      </Form.Group>
    </div>
  );
}
