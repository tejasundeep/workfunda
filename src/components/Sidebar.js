import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { SiSlack, SiTelegram } from 'react-icons/si';
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
  FaDatabase
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
    { label: 'Slack Message', type: 'slack', icon: <SiSlack /> },
    { label: 'Telegram Message', type: 'telegram', icon: <SiTelegram /> },
    { label: 'Email', type: 'email', icon: <FaEnvelope /> },
    { label: 'Scheduler', type: 'scheduler', icon: <FaClock /> },
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
