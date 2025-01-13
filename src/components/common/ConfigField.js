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
  required,
  className = ''
}) {
  const handleChange = (e) => {
    let newValue;
    
    if (type === 'checkbox') {
      newValue = e.target.checked;
    } else if (type === 'number') {
      newValue = e.target.value === '' ? '' : Number(e.target.value);
    } else {
      newValue = e.target.value;
    }
    
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
    onChange: handleChange,
    required,
    className: `form-control-${type} ${className}`,
  };

  if (type === 'checkbox') {
    return (
      <Form.Group className="mb-3 d-flex align-items-center">
        <Form.Check
          {...commonProps}
          type="checkbox"
          label={label}
          checked={Boolean(value)}
          className="form-check-input me-2"
        />
      </Form.Group>
    );
  }

  if (type === 'switch') {
    return (
      <Form.Group className="mb-3 d-flex align-items-center">
        <Form.Check
          {...commonProps}
          type="switch"
          label={label}
          checked={Boolean(value)}
          className="form-switch-input me-2"
        />
      </Form.Group>
    );
  }

  return (
    <Form.Group className="mb-3">
      <Form.Label htmlFor={`config-${field}`}>{label}</Form.Label>
      {type === 'select' ? (
        <Form.Select {...commonProps} value={value ?? ''}>
          <option value="">Select...</option>
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
          value={value ?? ''}
          placeholder={placeholder}
        />
      ) : (
        <Form.Control
          {...commonProps}
          type={type}
          min={min}
          max={max}
          step={step}
          value={value ?? ''}
          placeholder={placeholder}
        />
      )}
    </Form.Group>
  );
}
