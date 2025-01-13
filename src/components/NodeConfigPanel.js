import React, { useMemo } from 'react';
import { Card, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { updateNodeConfig } from '../store/store';

// Data Processing
import TransformNode from './config/TransformNode';
import CompareNode from './config/CompareNode';
import SwitchNode from './config/SwitchNode';
import FunctionNode from './config/FunctionNode';
import SetNode from './config/SetNode';
import SplitNode from './config/SplitNode';
import MergeNode from './config/MergeNode';
import ValidationNode from './config/ValidationNode';

// Data Storage & Caching
import DatabaseNode from './config/DatabaseNode';
import CacheNode from './config/CacheNode';
import QueueNode from './config/QueueNode';
import MySQLNode from './config/MySQLNode';

// Security & Performance
import AuthenticationNode from './config/AuthenticationNode';
import EncryptionNode from './config/EncryptionNode';
import RateLimitNode from './config/RateLimitNode';

// Communication & Notifications
import HTTPNode from './config/HTTPNode';
import WebhookNode from './config/WebhookNode';
import EmailNode from './config/EmailNode';
import NotificationNode from './config/NotificationNode';
import SlackNode from './config/SlackNode';
import TelegramNode from './config/TelegramNode';
import TwilioNode from './config/TwilioNode';

// Monitoring & Logging
import LoggerNode from './config/LoggerNode';
import MetricsNode from './config/MetricsNode';

// Cloud Services
import AWSNode from './config/AWSNode';
import GoogleCloudNode from './config/GoogleCloudNode';
import AzureNode from './config/AzureNode';

// File Operations
import FileSystemNode from './config/FileSystemNode';
import CompressionNode from './config/CompressionNode';

// External Services
import OpenAINode from './config/OpenAINode';
import GitHubNode from './config/GitHubNode';
import JiraNode from './config/JiraNode';
import StripeNode from './config/StripeNode';

// Triggers & Scheduling
import SchedulerNode from './config/SchedulerNode';
import EmailTriggerNode from './config/EmailTriggerNode';

export default function NodeConfigPanel({ nodes, setNodes, selectedNodeId }) {
  const dispatch = useDispatch();
  const selectedNode = useMemo(
    () => nodes.find((node) => node.id === selectedNodeId),
    [selectedNodeId, nodes]
  );

  if (!selectedNode) {
    return (
      <div className="bg-secondary text-light p-3" style={{ minWidth: '300px' }}>
        <h4>Node Config</h4>
        <p>No node selected.</p>
      </div>
    );
  }

  // Ensure node.data and node.data.config exist
  if (!selectedNode.data) {
    selectedNode.data = {};
  }
  if (!selectedNode.data.config) {
    selectedNode.data.config = {};
  }

  const updateNodeData = (key, value) => {
    setNodes((prev) =>
      prev.map((n) => {
        if (n.id === selectedNode.id) {
          return {
            ...n,
            data: {
              ...n.data,
              [key]: value,
            },
          };
        }
        return n;
      })
    );
  };

  const handleConfigChange = (field, value) => {
    dispatch(updateNodeConfig({ nodeId: selectedNode.id, field, value }));
  };

  const renderConfig = () => {
    // Ensure config exists before passing to components
    const config = selectedNode.data?.config || {};
    const nodeProps = {
      data: {
        ...selectedNode.data,
        config,
      },
      onChange: handleConfigChange,
    };

    switch (selectedNode.data.nodeType) {
      // Data Processing
      case 'transform':
        return <TransformNode {...nodeProps} />;
      case 'compare':
        return <CompareNode {...nodeProps} />;
      case 'switch':
        return <SwitchNode {...nodeProps} />;
      case 'function':
        return <FunctionNode {...nodeProps} />;
      case 'set':
        return <SetNode {...nodeProps} />;
      case 'split':
        return <SplitNode {...nodeProps} />;
      case 'merge':
        return <MergeNode {...nodeProps} />;
      case 'validation':
        return <ValidationNode {...nodeProps} />;

      // Data Storage & Caching
      case 'database':
        return <DatabaseNode {...nodeProps} />;
      case 'mysql':
        return <MySQLNode {...nodeProps} />;
      case 'cache':
        return <CacheNode {...nodeProps} />;
      case 'queue':
        return <QueueNode {...nodeProps} />;

      // Security & Performance
      case 'authentication':
        return <AuthenticationNode {...nodeProps} />;
      case 'encryption':
        return <EncryptionNode {...nodeProps} />;
      case 'ratelimit':
        return <RateLimitNode {...nodeProps} />;

      // Communication & Notifications
      case 'http':
        return <HTTPNode {...nodeProps} />;
      case 'webhook':
        return <WebhookNode {...nodeProps} />;
      case 'email':
        return <EmailNode {...nodeProps} />;
      case 'notification':
        return <NotificationNode {...nodeProps} />;
      case 'slack':
        return <SlackNode {...nodeProps} />;
      case 'telegram':
        return <TelegramNode {...nodeProps} />;
      case 'twilio':
        return <TwilioNode {...nodeProps} />;

      // Monitoring & Logging
      case 'logger':
        return <LoggerNode {...nodeProps} />;
      case 'metrics':
        return <MetricsNode {...nodeProps} />;

      // Cloud Services
      case 'aws':
        return <AWSNode {...nodeProps} />;
      case 'googlecloud':
        return <GoogleCloudNode {...nodeProps} />;
      case 'azure':
        return <AzureNode {...nodeProps} />;

      // File Operations
      case 'filesystem':
        return <FileSystemNode {...nodeProps} />;
      case 'compression':
        return <CompressionNode {...nodeProps} />;

      // External Services
      case 'openai':
        return <OpenAINode {...nodeProps} />;
      case 'github':
        return <GitHubNode {...nodeProps} />;
      case 'jira':
        return <JiraNode {...nodeProps} />;
      case 'stripe':
        return <StripeNode {...nodeProps} />;

      // Triggers & Scheduling
      case 'scheduler':
        return <SchedulerNode {...nodeProps} />;
      case 'emailtrigger':
        return <EmailTriggerNode {...nodeProps} />;
      case 'trigger':
        return (
          <div className="p-3">
            <p>Basic trigger node - no configuration needed</p>
          </div>
        );

      default:
        return (
          <div className="p-3">
            <p>No configuration available for this node type: {selectedNode.data.nodeType}</p>
          </div>
        );
    }
  };

  return (
    <Card className="text-dark" style={{ minWidth: '300px', borderRadius: 0 }}>
      <Card.Header>
        <strong>Node Config</strong>
      </Card.Header>
      <Card.Body>
        <Form.Group className="mb-3">
          <Form.Label>ID:</Form.Label>
          <Form.Control type="text" value={selectedNode.id} disabled />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Label:</Form.Label>
          <Form.Control
            type="text"
            value={selectedNode.data.label || ''}
            onChange={(e) => updateNodeData('label', e.target.value)}
          />
        </Form.Group>

        <p>
          <strong>Type:</strong> {selectedNode.data.nodeType}
        </p>

        {renderConfig()}
      </Card.Body>
    </Card>
  );
}
