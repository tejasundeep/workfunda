import React from 'react';
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
  FaGithub
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
    { label: 'Slack', type: 'slack', icon: <SiSlack /> },
    { label: 'Telegram Message', type: 'telegram', icon: <SiTelegram /> },
    { label: 'Email', type: 'email', icon: <FaEnvelope /> },
    { label: 'Scheduler', type: 'scheduler', icon: <FaClock /> },
    { label: 'Webhook', type: 'webhook', icon: <FaExchangeAlt /> },
    { label: 'File System', type: 'filesystem', icon: <FaFolderOpen /> },
    { label: 'Database', type: 'database', icon: <FaDatabase /> },
    { label: 'Email', type: 'emailtrigger', icon: <FaEnvelopeOpenText /> },
    { label: 'Google Cloud', type: 'googlecloud', icon: <FaCloud /> },
    { label: 'Azure', type: 'azure', icon: <FaCloud /> },
    { label: 'Twilio', type: 'twilio', icon: <FaPhone /> },
    { label: 'Stripe', type: 'stripe', icon: <FaCreditCard /> },
    { label: 'GitHub', type: 'github', icon: <FaGithub /> },
    { label: 'Jira', type: 'jira', icon: <SiJira /> },
  ];

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="bg-secondary text-light p-2" style={{ minWidth: '200px' }}>
      <h4 className="mb-3">Nodes</h4>
      <ListGroup>
        {nodeTypes.map((nt) => (
          <ListGroup.Item
            key={nt.type}
            className="d-flex align-items-center text-dark mb-2"
            style={{ cursor: 'grab' }}
            draggable
            onDragStart={(e) => onDragStart(e, nt.type)}
          >
            <span className="me-2">{nt.icon}</span>
            {nt.label}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <div className="mt-4">
        <a href="/" className="text-decoration-none text-light">
          &larr; Home
        </a>
      </div>
    </div>
  );
}
