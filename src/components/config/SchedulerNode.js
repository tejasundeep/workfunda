import React from 'react';
import { Form } from 'react-bootstrap';

export default function SchedulerNode({ data, onChange }) {
  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Label>Schedule Type</Form.Label>
        <Form.Select
          value={data.config?.scheduleType || 'interval'}
          onChange={(e) => onChange('scheduleType', e.target.value)}
        >
          <option value="interval">Interval</option>
          <option value="cron">Cron Expression</option>
          <option value="specific">Specific Time</option>
        </Form.Select>
      </Form.Group>

      {data.config?.scheduleType === 'interval' && (
        <>
          <Form.Group className="mb-3">
            <Form.Label>Interval Value</Form.Label>
            <Form.Control
              type="number"
              value={data.config?.intervalValue || ''}
              onChange={(e) => onChange('intervalValue', e.target.value)}
              min="1"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Interval Unit</Form.Label>
            <Form.Select
              value={data.config?.intervalUnit || 'minutes'}
              onChange={(e) => onChange('intervalUnit', e.target.value)}
            >
              <option value="minutes">Minutes</option>
              <option value="hours">Hours</option>
              <option value="days">Days</option>
            </Form.Select>
          </Form.Group>
        </>
      )}

      {data.config?.scheduleType === 'cron' && (
        <Form.Group className="mb-3">
          <Form.Label>Cron Expression</Form.Label>
          <Form.Control
            type="text"
            value={data.config?.cronExpression || ''}
            onChange={(e) => onChange('cronExpression', e.target.value)}
            placeholder="* * * * *"
          />
          <Form.Text className="text-muted">
            Format: minute hour day-of-month month day-of-week
          </Form.Text>
        </Form.Group>
      )}

      {data.config?.scheduleType === 'specific' && (
        <>
          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={data.config?.specificDate || ''}
              onChange={(e) => onChange('specificDate', e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Time</Form.Label>
            <Form.Control
              type="time"
              value={data.config?.specificTime || ''}
              onChange={(e) => onChange('specificTime', e.target.value)}
            />
          </Form.Group>
        </>
      )}
    </div>
  );
}
