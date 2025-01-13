import React from 'react';
import { Form } from 'react-bootstrap';
import { validateEmail, validateUrl, validateNumber } from '../../utils/validation';

export default function ConfigField({ 
  label, 
  type = 'text', 
  field, 
  value, 
  onChange, 
  placeholder, 
  options,
  min,
  max,
  step,
  rows,
  validation,
  required
}) {
  const handleChange = (e) => {
    const newValue = e.target.value;
    
    // Validation
    if (validation) {
      switch(validation) {
        case 'email':
          if (!validateEmail(newValue)) {
            alert('Invalid email address');
            return;
          }
          break;
        case 'url':
          if (!validateUrl(newValue)) {
            alert('Invalid URL');
            return;
          }
          break;
        case 'number':
          if (!validateNumber(newValue, min, max)) {
            alert(`Invalid number. Must be between ${min} and ${max}`);
            return;
          }
          break;
      }
    }
    
    onChange(field, newValue);
  };

  const commonProps = {
    id: `config-${field}`,
    value: value || '',
    onChange: handleChange,
    placeholder,
    required,
  };

  return (
    <Form.Group className="mb-3">
      <Form.Label htmlFor={`config-${field}`}>{label}</Form.Label>
      {type === 'select' ? (
        <Form.Select {...commonProps}>
          {options?.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </Form.Select>
      ) : type === 'textarea' ? (
        <Form.Control
          {...commonProps}
          as="textarea"
          rows={rows || 3}
        />
      ) : (
        <Form.Control
          {...commonProps}
          type={type}
          min={min}
          max={max}
          step={step}
        />
      )}
    </Form.Group>
  );
}
