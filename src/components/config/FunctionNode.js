import React from 'react';
import { Form } from 'react-bootstrap';

export default function FunctionNode({ data, onChange }) {
  const validateJavaScript = (code) => {
    try {
      new Function(code);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleCodeChange = (value) => {
    if (!validateJavaScript(value)) {
      alert('Invalid JavaScript code');
      return;
    }
    onChange('code', value);
  };

  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Label>Function Code</Form.Label>
        <Form.Control
          as="textarea"
          rows={15}
          value={data.config?.code || defaultFunctionCode}
          onChange={(e) => handleCodeChange(e.target.value)}
          style={{ fontFamily: 'monospace' }}
        />
        <Form.Text className="text-muted">
          Write a JavaScript function that processes the input data. The function receives 'items' and 'context' parameters.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          label="Return All Items"
          checked={data.config?.returnAll || false}
          onChange={(e) => onChange('returnAll', e.target.checked)}
        />
        <Form.Text className="text-muted">
          If checked, returns all items. If unchecked, returns only the first item.
        </Form.Text>
      </Form.Group>
    </div>
  );
}

const defaultFunctionCode = `// Code here will run once per item
// Item is the current item being processed
// Context contains workflow data and helper functions

function processItem(item, context) {
  // Add your code here
  // Example: Add a new field to the item
  item.newField = "processed";
  
  return item;
}

// Don't edit below this line
return processItem(item, context);`;
