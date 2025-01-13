import React from 'react';
import { Form } from 'react-bootstrap';

export default function OpenAINodeConfig({ data, onChange }) {
  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Label>Prompt</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={data.config?.prompt || ''}
          onChange={(e) => onChange('prompt', e.target.value)}
          placeholder="Enter the prompt for OpenAI"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Model</Form.Label>
        <Form.Select
          value={data.config?.model || 'gpt-4'}
          onChange={(e) => onChange('model', e.target.value)}
        >
          <option value="gpt-4">gpt-4</option>
          <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Max Tokens</Form.Label>
        <Form.Control
          type="number"
          value={data.config?.maxTokens || 100}
          onChange={(e) => onChange('maxTokens', parseInt(e.target.value, 10))}
          placeholder="Enter max tokens"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Temperature</Form.Label>
        <Form.Control
          type="number"
          step="0.1"
          min="0"
          max="1"
          value={data.config?.temperature || 0.7}
          onChange={(e) => onChange('temperature', parseFloat(e.target.value))}
          placeholder="Enter temperature"
        />
        <Form.Text className="text-muted">
          Controls randomness: 0 (deterministic) to 1 (more random)
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Top-p</Form.Label>
        <Form.Control
          type="number"
          step="0.1"
          min="0"
          max="1"
          value={data.config?.topP || 1.0}
          onChange={(e) => onChange('topP', parseFloat(e.target.value))}
          placeholder="Enter top-p"
        />
        <Form.Text className="text-muted">
          Nucleus sampling: 0.1 (only top tokens) to 1 (all tokens)
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Frequency Penalty</Form.Label>
        <Form.Control
          type="number"
          step="0.1"
          min="0"
          max="2"
          value={data.config?.frequencyPenalty || 0.0}
          onChange={(e) => onChange('frequencyPenalty', parseFloat(e.target.value))}
          placeholder="Enter frequency penalty"
        />
        <Form.Text className="text-muted">
          Reduces repetition: -2 (less) to 2 (more)
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Presence Penalty</Form.Label>
        <Form.Control
          type="number"
          step="0.1"
          min="0"
          max="2"
          value={data.config?.presencePenalty || 0.0}
          onChange={(e) => onChange('presencePenalty', parseFloat(e.target.value))}
          placeholder="Enter presence penalty"
        />
        <Form.Text className="text-muted">
          Encourages new topics: -2 (less) to 2 (more)
        </Form.Text>
      </Form.Group>
    </div>
  );
}
