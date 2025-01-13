import React, { useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { SiSlack, SiTelegram, SiJira } from 'react-icons/si';
import { 
  FaBolt, 
  FaTools, 
  FaRetweet, 
  FaEnvelope, 
  FaClock, 
  FaGlobe, 
  FaCode,
  FaRandom,
  FaObjectGroup,
  FaBalanceScale,
  FaExchangeAlt,
  FaJsSquare,
  FaDatabase,
  FaFolderOpen,
  FaEnvelopeOpenText,
  FaCloud,
  FaPhone,
  FaCreditCard,
  FaGithub,
  FaBrain
} from 'react-icons/fa';

export default function Sidebar() {
  const nodeTypes = [
    { label: 'Trigger', type: 'trigger', icon: <FaBolt /> },
    { label: 'Action', type: 'action', icon: <FaTools /> },
    { label: 'HTTP Request', type: 'http', icon: <FaGlobe /> },
    { label: 'Transform', type: 'transform', icon: <FaCode /> },
    { label: 'Compare', type: 'compare', icon: <FaBalanceScale /> },
    { label: 'Switch', type: 'switch', icon: <FaExchangeAlt /> },
    { label: 'Function', type: 'function', icon: <FaJsSquare /> },
    { label: 'Set', type: 'set', icon: <FaDatabase /> },
    { label: 'Split', type: 'split', icon: <FaRandom /> },
    { label: 'Merge', type: 'merge', icon: <FaObjectGroup /> },
    { label: 'MySQL', type: 'mysql', icon: <FaDatabase /> },
    { label: 'AWS', type: 'aws', icon: <FaCloud /> },
    { label: 'Slack', type: 'slack', icon: <SiSlack />, subItems: [
      { label: 'Message Sent', type: 'slack_message_sent' },
      { label: 'Reaction Added', type: 'slack_reaction_added' },
      { label: 'User Mentioned', type: 'slack_user_mentioned' }
    ] },
    { label: 'Telegram Message', type: 'telegram', icon: <SiTelegram /> },
    { label: 'Email', type: 'email', icon: <FaEnvelope /> },
    { label: 'Scheduler', type: 'scheduler', icon: <FaClock /> },
    { label: 'Webhook', type: 'webhook', icon: <FaExchangeAlt /> },
    { label: 'File System', type: 'filesystem', icon: <FaFolderOpen /> },
    { label: 'Database', type: 'database', icon: <FaDatabase /> },
    { label: 'Email', type: 'emailtrigger', icon: <FaEnvelopeOpenText /> },
    { label: 'Google Cloud', type: 'googlecloud', icon: <FaCloud />, subItems: [
      { label: 'Storage Upload', type: 'googlecloud_storage_upload' },
      { label: 'Pub/Sub Message', type: 'googlecloud_pubsub_message' },
      { label: 'Compute Instance Start', type: 'googlecloud_compute_start' }
    ] },
    { label: 'Azure', type: 'azure', icon: <FaCloud />, subItems: [
      { label: 'Blob Upload', type: 'azure_blob_upload' },
      { label: 'Function Execution', type: 'azure_function_execution' },
      { label: 'VM Start', type: 'azure_vm_start' }
    ] },
    { label: 'Twilio', type: 'twilio', icon: <FaPhone />, subItems: [
      { label: 'Incoming SMS', type: 'twilio_incoming_sms' },
      { label: 'Outgoing Call', type: 'twilio_outgoing_call' },
      { label: 'Incoming Call', type: 'twilio_incoming_call' }
    ] },
    { label: 'Stripe', type: 'stripe', icon: <FaCreditCard />, subItems: [
      { label: 'Payment Succeeded', type: 'stripe_payment_succeeded' },
      { label: 'Subscription Created', type: 'stripe_subscription_created' },
      { label: 'Invoice Paid', type: 'stripe_invoice_paid' }
    ] },
    { label: 'GitHub', type: 'github', icon: <FaGithub />, subItems: [
      { label: 'Push', type: 'github_push' },
      { label: 'Pull Request', type: 'github_pull_request' },
      { label: 'Issues', type: 'github_issues' },
      { label: 'Star', type: 'github_star' },
      { label: 'Fork', type: 'github_fork' }
    ] },
    { label: 'Jira', type: 'jira', icon: <SiJira />, subItems: [
      { label: 'Issue Created', type: 'jira_issue_created' },
      { label: 'Issue Updated', type: 'jira_issue_updated' },
      { label: 'Comment Added', type: 'jira_comment_added' }
    ] },
    { label: 'OpenAI', type: 'openai', icon: <FaBrain /> },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [collapsedCategories, setCollapsedCategories] = useState({});
  const [expandedNodes, setExpandedNodes] = useState({});

  const toggleCategory = (category) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const toggleNode = (nodeType) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [nodeType]: !prev[nodeType],
    }));
  };

  const filteredNodeTypes = nodeTypes.filter((nt) =>
    nt.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = {
    'Workflow Triggers': ['Trigger', 'Webhook', 'Scheduler', 'Email', 'Google Cloud', 'Azure', 'Twilio', 'Stripe', 'Slack', 'Jira'],
    'Data Operations': ['HTTP Request', 'Function', 'Set', 'Transform', 'Compare', 'Switch', 'Split', 'Merge'],
    'External Integrations': ['Slack', 'Telegram Message', 'MySQL', 'AWS', 'GitHub', 'Jira', 'OpenAI']
  };

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="bg-secondary text-light p-2" style={{ minWidth: '250px', maxHeight: '100vh', overflowY: 'auto' }}>
      <h4 className="mb-3">Node Library</h4>
      <input
        type="text"
        placeholder="Search nodes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="form-control mb-3"
      />
      {Object.keys(categories).map((category) => (
        <div key={category} className="mb-3">
          <h5 onClick={() => toggleCategory(category)} style={{ cursor: 'pointer' }}>
            {category} {collapsedCategories[category] ? '+' : '-'}
          </h5>
          {!collapsedCategories[category] && (
            <ListGroup>
              {filteredNodeTypes
                .filter((nt) => categories[category].includes(nt.label))
                .map((nt) => (
                  <div key={nt.type}>
                    <ListGroup.Item
                      className="d-flex align-items-center text-dark mb-2"
                      style={{ cursor: 'grab' }}
                      draggable
                      onDragStart={(e) => onDragStart(e, nt.type)}
                      onClick={() => toggleNode(nt.type)}
                    >
                      <span className="me-2">{nt.icon}</span>
                      {nt.label} {nt.subItems && (expandedNodes[nt.type] ? '-' : '+')}
                    </ListGroup.Item>
                    {nt.subItems && expandedNodes[nt.type] && (
                      <ListGroup className="ms-3">
                        {nt.subItems.map((subItem) => (
                          <ListGroup.Item
                            key={subItem.type}
                            className="text-dark mb-2"
                            style={{ cursor: 'grab' }}
                            draggable
                            onDragStart={(e) => onDragStart(e, subItem.type)}
                          >
                            {subItem.label}
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    )}
                  </div>
                ))}
            </ListGroup>
          )}
        </div>
      ))}
      <div className="mt-4">
        <a href="/" className="text-decoration-none text-light">
          &larr; Home
        </a>
      </div>
    </div>
  );
}
