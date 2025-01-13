import React from 'react';
import { MenuItem } from '@mui/material';
import ConfigField from './ConfigField';

const CalendarNode = ({ config, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="node-config">
      <ConfigField
        label="Calendar Service"
        value={config.service || 'google'}
        onChange={(value) => handleChange('service', value)}
        select
      >
        <MenuItem value="google">Google Calendar</MenuItem>
        <MenuItem value="outlook">Microsoft Outlook</MenuItem>
        <MenuItem value="apple">Apple Calendar</MenuItem>
        <MenuItem value="zoom">Zoom Meetings</MenuItem>
        <MenuItem value="teams">Microsoft Teams</MenuItem>
      </ConfigField>
      <ConfigField
        label="Operation"
        value={config.operation || 'create'}
        onChange={(value) => handleChange('operation', value)}
        select
      >
        <MenuItem value="create">Create Event</MenuItem>
        <MenuItem value="update">Update Event</MenuItem>
        <MenuItem value="delete">Delete Event</MenuItem>
        <MenuItem value="list">List Events</MenuItem>
        <MenuItem value="availability">Check Availability</MenuItem>
        <MenuItem value="schedule">Schedule Meeting</MenuItem>
      </ConfigField>
      <ConfigField
        label="Event Type"
        value={config.eventType || 'meeting'}
        onChange={(value) => handleChange('eventType', value)}
        select
      >
        <MenuItem value="meeting">Meeting</MenuItem>
        <MenuItem value="appointment">Appointment</MenuItem>
        <MenuItem value="reminder">Reminder</MenuItem>
        <MenuItem value="task">Task</MenuItem>
        <MenuItem value="out-of-office">Out of Office</MenuItem>
      </ConfigField>
      <ConfigField
        label="Start Time"
        value={config.startTime || ''}
        onChange={(value) => handleChange('startTime', value)}
        type="datetime-local"
      />
      <ConfigField
        label="Duration (minutes)"
        value={config.duration || '60'}
        onChange={(value) => handleChange('duration', value)}
        type="number"
      />
      <ConfigField
        label="Attendees"
        value={config.attendees || ''}
        onChange={(value) => handleChange('attendees', value)}
        multiline
        rows={2}
        helperText="Comma-separated email addresses"
      />
      <ConfigField
        label="Meeting Settings"
        value={config.meetingSettings || ''}
        onChange={(value) => handleChange('meetingSettings', value)}
        multiline
        rows={3}
        helperText="JSON object for meeting configuration"
      />
      <ConfigField
        label="Recurrence"
        value={config.recurrence || 'none'}
        onChange={(value) => handleChange('recurrence', value)}
        select
      >
        <MenuItem value="none">None</MenuItem>
        <MenuItem value="daily">Daily</MenuItem>
        <MenuItem value="weekly">Weekly</MenuItem>
        <MenuItem value="monthly">Monthly</MenuItem>
        <MenuItem value="custom">Custom</MenuItem>
      </ConfigField>
      <ConfigField
        label="Notifications"
        value={config.notifications || []}
        onChange={(value) => handleChange('notifications', value)}
        select
        multiple
      >
        <MenuItem value="email">Email</MenuItem>
        <MenuItem value="popup">Pop-up</MenuItem>
        <MenuItem value="sms">SMS</MenuItem>
        <MenuItem value="slack">Slack</MenuItem>
      </ConfigField>
    </div>
  );
};

export default CalendarNode;
