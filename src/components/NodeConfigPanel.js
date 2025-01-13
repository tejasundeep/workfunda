import React, { useMemo } from 'react';
import { Card, Form } from 'react-bootstrap';
import EmailNodeConfig from './config/EmailNode';
import SchedulerNode from './config/SchedulerNode';
import HTTPNode from './config/HTTPNode';
import TransformNode from './config/TransformNode';
import SplitNode from './config/SplitNode';
import MergeNode from './config/MergeNode';
import CompareNode from './config/CompareNode';
import SwitchNode from './config/SwitchNode';
import FunctionNode from './config/FunctionNode';
import SetNode from './config/SetNode';
import WebhookNode from './config/WebhookNode';
import FileSystemNode from './config/FileSystemNode';
import DatabaseNode from './config/DatabaseNode';
import EmailTriggerNode from './config/EmailTriggerNode';
import MySQLNode from './config/MySQLNode';
import AWSNode from './config/AWSNode';
import SlackNode from './config/SlackNode';
import GoogleCloudNode from './config/GoogleCloudNode';
import AzureNode from './config/AzureNode';
import TwilioNode from './config/TwilioNode';
import StripeNode from './config/StripeNode';
import GitHubNode from './config/GitHubNode';
import JiraNode from './config/JiraNode';
import OpenAINodeConfig from './config/OpenAINode';

export default function NodeConfigPanel({ nodes, setNodes, selectedNodeId }) {
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

  const updateNodeConfig = (key, value) => {
    setNodes((prev) =>
      prev.map((n) => {
        if (n.id === selectedNode.id) {
          return {
            ...n,
            data: {
              ...n.data,
              config: {
                ...n.data.config,
                [key]: value,
              },
            },
          };
        }
        return n;
      })
    );
  };

  const renderConfig = () => {
    switch (selectedNode.data.nodeType) {
      case 'email':
        return (
          <EmailNodeConfig
            data={selectedNode.data}
            onChange={updateNodeConfig}
          />
        );
      case 'scheduler':
        return (
          <SchedulerNode
            data={selectedNode.data}
            onChange={updateNodeConfig}
          />
        );
      case 'slack':
        return (
          <SlackNode
            data={selectedNode.data}
            onChange={updateNodeConfig}
          />
        );
      case 'telegram':
        return (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Chat ID</Form.Label>
              <Form.Control
                type="text"
                value={selectedNode.data.config?.chatId || ''}
                onChange={(e) => updateNodeConfig('chatId', e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                type="text"
                value={selectedNode.data.config?.text || ''}
                onChange={(e) => updateNodeConfig('text', e.target.value)}
              />
            </Form.Group>
          </>
        );
      case 'http':
        return (
          <HTTPNode
            data={selectedNode.data}
            onChange={updateNodeConfig}
          />
        );
      case 'transform':
        return (
          <TransformNode
            data={selectedNode.data}
            onChange={updateNodeConfig}
          />
        );
      case 'split':
        return (
          <SplitNode
            data={selectedNode.data}
            onChange={updateNodeConfig}
          />
        );
      case 'merge':
        return (
          <MergeNode
            data={selectedNode.data}
            onChange={updateNodeConfig}
          />
        );
      case 'compare':
        return (
          <CompareNode
            data={selectedNode.data}
            onChange={updateNodeConfig}
          />
        );
      case 'switch':
        return (
          <SwitchNode
            data={selectedNode.data}
            onChange={updateNodeConfig}
          />
        );
      case 'function':
        return (
          <FunctionNode
            data={selectedNode.data}
            onChange={updateNodeConfig}
          />
        );
      case 'set':
        return (
          <SetNode
            data={selectedNode.data}
            onChange={updateNodeConfig}
          />
        );
      case 'webhook':
        return <WebhookNode data={selectedNode.data} onChange={updateNodeConfig} />;
      case 'filesystem':
        return <FileSystemNode data={selectedNode.data} onChange={updateNodeConfig} />;
      case 'database':
        return <DatabaseNode data={selectedNode.data} onChange={updateNodeConfig} />;
      case 'emailtrigger':
        return <EmailTriggerNode data={selectedNode.data} onChange={updateNodeConfig} />;
      case 'mysql':
        return <MySQLNode data={selectedNode.data} onChange={updateNodeConfig} />;
      case 'aws':
        return <AWSNode data={selectedNode.data} onChange={updateNodeConfig} />;
      case 'googlecloud':
        return <GoogleCloudNode data={selectedNode.data} onChange={updateNodeConfig} />;
      case 'azure':
        return <AzureNode data={selectedNode.data} onChange={updateNodeConfig} />;
      case 'twilio':
        return <TwilioNode data={selectedNode.data} onChange={updateNodeConfig} />;
      case 'stripe':
        return <StripeNode data={selectedNode.data} onChange={updateNodeConfig} />;
      case 'github':
        return <GitHubNode data={selectedNode.data} onChange={updateNodeConfig} />;
      case 'jira':
        return <JiraNode data={selectedNode.data} onChange={updateNodeConfig} />;
      case 'openai':
        return (
          <OpenAINodeConfig
            data={selectedNode.data}
            onChange={updateNodeConfig}
          />
        );
      default:
        return <p>No configuration available for this node type.</p>;
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
