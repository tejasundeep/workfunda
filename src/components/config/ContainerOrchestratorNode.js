import React from 'react';
import { MenuItem } from '@mui/material';
import ConfigField from './ConfigField';

const ContainerOrchestratorNode = ({ config, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="node-config">
      <ConfigField
        label="Orchestrator"
        value={config.orchestrator || 'kubernetes'}
        onChange={(value) => handleChange('orchestrator', value)}
        select
      >
        <MenuItem value="kubernetes">Kubernetes</MenuItem>
        <MenuItem value="docker-swarm">Docker Swarm</MenuItem>
        <MenuItem value="ecs">AWS ECS</MenuItem>
        <MenuItem value="gke">Google GKE</MenuItem>
        <MenuItem value="aks">Azure AKS</MenuItem>
      </ConfigField>
      <ConfigField
        label="Deployment Type"
        value={config.deploymentType || 'deployment'}
        onChange={(value) => handleChange('deploymentType', value)}
        select
      >
        <MenuItem value="deployment">Deployment</MenuItem>
        <MenuItem value="statefulset">StatefulSet</MenuItem>
        <MenuItem value="daemonset">DaemonSet</MenuItem>
        <MenuItem value="job">Job</MenuItem>
        <MenuItem value="cronjob">CronJob</MenuItem>
      </ConfigField>
      <ConfigField
        label="Replicas"
        value={config.replicas || '3'}
        onChange={(value) => handleChange('replicas', value)}
        type="number"
      />
      <ConfigField
        label="Resource Limits"
        value={config.resourceLimits || ''}
        onChange={(value) => handleChange('resourceLimits', value)}
        multiline
        rows={2}
        helperText="CPU and Memory limits in YAML format"
      />
      <ConfigField
        label="Auto Scaling"
        value={config.autoScaling || false}
        onChange={(value) => handleChange('autoScaling', value)}
        type="boolean"
      />
      <ConfigField
        label="Rolling Update Strategy"
        value={config.updateStrategy || 'rolling'}
        onChange={(value) => handleChange('updateStrategy', value)}
        select
      >
        <MenuItem value="rolling">Rolling Update</MenuItem>
        <MenuItem value="recreate">Recreate</MenuItem>
        <MenuItem value="blue-green">Blue-Green</MenuItem>
        <MenuItem value="canary">Canary</MenuItem>
      </ConfigField>
    </div>
  );
};

export default ContainerOrchestratorNode;
