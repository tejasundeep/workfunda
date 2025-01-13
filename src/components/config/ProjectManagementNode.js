import React from 'react';
import { MenuItem } from '@mui/material';
import ConfigField from './ConfigField';

const ProjectManagementNode = ({ config, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="node-config">
      <ConfigField
        label="Platform"
        value={config.platform || 'jira'}
        onChange={(value) => handleChange('platform', value)}
        select
      >
        <MenuItem value="jira">Jira</MenuItem>
        <MenuItem value="trello">Trello</MenuItem>
        <MenuItem value="asana">Asana</MenuItem>
        <MenuItem value="clickup">ClickUp</MenuItem>
        <MenuItem value="monday">Monday.com</MenuItem>
        <MenuItem value="notion">Notion</MenuItem>
      </ConfigField>
      <ConfigField
        label="Operation"
        value={config.operation || 'issue'}
        onChange={(value) => handleChange('operation', value)}
        select
      >
        <MenuItem value="issue">Manage Issues/Tasks</MenuItem>
        <MenuItem value="project">Manage Projects</MenuItem>
        <MenuItem value="board">Manage Boards</MenuItem>
        <MenuItem value="sprint">Manage Sprints</MenuItem>
        <MenuItem value="comment">Manage Comments</MenuItem>
        <MenuItem value="attachment">Manage Attachments</MenuItem>
      </ConfigField>
      <ConfigField
        label="Action"
        value={config.action || 'create'}
        onChange={(value) => handleChange('action', value)}
        select
      >
        <MenuItem value="create">Create</MenuItem>
        <MenuItem value="update">Update</MenuItem>
        <MenuItem value="delete">Delete</MenuItem>
        <MenuItem value="search">Search</MenuItem>
        <MenuItem value="assign">Assign</MenuItem>
        <MenuItem value="transition">Change Status</MenuItem>
      </ConfigField>
      <ConfigField
        label="Project/Board ID"
        value={config.projectId || ''}
        onChange={(value) => handleChange('projectId', value)}
      />
      <ConfigField
        label="Issue Type"
        value={config.issueType || 'task'}
        onChange={(value) => handleChange('issueType', value)}
        select
      >
        <MenuItem value="task">Task</MenuItem>
        <MenuItem value="bug">Bug</MenuItem>
        <MenuItem value="story">Story</MenuItem>
        <MenuItem value="epic">Epic</MenuItem>
      </ConfigField>
      <ConfigField
        label="Fields"
        value={config.fields || ''}
        onChange={(value) => handleChange('fields', value)}
        multiline
        rows={3}
        helperText="JSON object for issue/task fields"
      />
      <ConfigField
        label="Watchers"
        value={config.watchers || ''}
        onChange={(value) => handleChange('watchers', value)}
        multiline
        rows={2}
        helperText="Comma-separated usernames"
      />
    </div>
  );
};

export default ProjectManagementNode;
