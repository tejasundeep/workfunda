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
  FaBrain,
  FaChartBar,
  FaStopwatch,
  FaLock,
  FaCompress,
  FaCheckCircle,
  FaMemory,
  FaStream,
  FaUserLock,
  FaBell,
  FaFileAlt
} from 'react-icons/fa';

export default function Sidebar() {
  const nodeTypes = [
    // Data Processing
    { label: 'Transform', type: 'transform', icon: <FaCode /> },
    { label: 'Compare', type: 'compare', icon: <FaBalanceScale /> },
    { label: 'Switch', type: 'switch', icon: <FaExchangeAlt /> },
    { label: 'Function', type: 'function', icon: <FaJsSquare /> },
    { label: 'Set', type: 'set', icon: <FaDatabase /> },
    { label: 'Split', type: 'split', icon: <FaRandom /> },
    { label: 'Merge', type: 'merge', icon: <FaObjectGroup /> },
    { label: 'Validation', type: 'validation', icon: <FaCheckCircle /> },

    // Data Storage & Caching
    { label: 'Database', type: 'database', icon: <FaDatabase />, subItems: [
      { label: 'PostgreSQL', type: 'database_postgresql' },
      { label: 'MySQL', type: 'database_mysql' },
      { label: 'MongoDB', type: 'database_mongodb' },
      { label: 'Redis', type: 'database_redis' },
      { label: 'Elasticsearch', type: 'database_elasticsearch' },
      { label: 'SQLite', type: 'database_sqlite' },
      { label: 'MSSQL', type: 'database_mssql' },
      { label: 'Oracle', type: 'database_oracle' }
    ] },
    { label: 'Cache', type: 'cache', icon: <FaMemory /> },
    { label: 'Queue', type: 'queue', icon: <FaStream /> },

    // Security & Performance
    { label: 'Authentication', type: 'authentication', icon: <FaUserLock /> },
    { label: 'Encryption', type: 'encryption', icon: <FaLock />, subItems: [
      { label: 'AES', type: 'encryption_aes' },
      { label: 'RSA', type: 'encryption_rsa' },
      { label: 'DES', type: 'encryption_des' },
      { label: 'Blowfish', type: 'encryption_blowfish' },
      { label: 'PGP', type: 'encryption_pgp' }
    ] },
    { label: 'Rate Limit', type: 'ratelimit', icon: <FaStopwatch />, subItems: [
      { label: 'Fixed Window', type: 'ratelimit_fixed' },
      { label: 'Sliding Window', type: 'ratelimit_sliding' },
      { label: 'Token Bucket', type: 'ratelimit_token' }
    ] },

    // Communication & Notifications
    { label: 'HTTP Request', type: 'http', icon: <FaGlobe /> },
    { label: 'Webhook', type: 'webhook', icon: <FaExchangeAlt /> },
    { label: 'Email', type: 'email', icon: <FaEnvelope /> },
    { label: 'Notification', type: 'notification', icon: <FaBell /> },
    { label: 'Slack', type: 'slack', icon: <SiSlack /> },
    { label: 'Telegram', type: 'telegram', icon: <SiTelegram /> },
    { label: 'Twilio', type: 'twilio', icon: <FaPhone /> },

    // Monitoring & Logging
    { label: 'Logger', type: 'logger', icon: <FaFileAlt /> },
    { label: 'Metrics', type: 'metrics', icon: <FaChartBar />, subItems: [
      { label: 'Prometheus', type: 'metrics_prometheus' },
      { label: 'StatsD', type: 'metrics_statsd' },
      { label: 'InfluxDB', type: 'metrics_influxdb' },
      { label: 'Datadog', type: 'metrics_datadog' },
      { label: 'New Relic', type: 'metrics_newrelic' }
    ] },

    // Cloud Services
    { label: 'AWS', type: 'aws', icon: <FaCloud />, subItems: [
      { label: 'S3', type: 'aws_s3' },
      { label: 'Lambda', type: 'aws_lambda' },
      { label: 'SQS', type: 'aws_sqs' },
      { label: 'SNS', type: 'aws_sns' }
    ] },
    { label: 'Google Cloud', type: 'googlecloud', icon: <FaCloud />, subItems: [
      { label: 'Storage', type: 'googlecloud_storage' },
      { label: 'Pub/Sub', type: 'googlecloud_pubsub' },
      { label: 'Functions', type: 'googlecloud_functions' }
    ] },
    { label: 'Azure', type: 'azure', icon: <FaCloud />, subItems: [
      { label: 'Blob Storage', type: 'azure_blob' },
      { label: 'Functions', type: 'azure_functions' },
      { label: 'Service Bus', type: 'azure_servicebus' }
    ] },

    // File Operations
    { label: 'File System', type: 'filesystem', icon: <FaFolderOpen /> },
    { label: 'Compression', type: 'compression', icon: <FaCompress />, subItems: [
      { label: 'GZIP', type: 'compression_gzip' },
      { label: 'BZIP2', type: 'compression_bzip2' },
      { label: 'ZIP', type: 'compression_zip' },
      { label: 'LZ4', type: 'compression_lz4' },
      { label: 'Zstandard', type: 'compression_zstd' }
    ] },

    // External Services
    { label: 'OpenAI', type: 'openai', icon: <FaBrain />, subItems: [
      { label: 'Completion', type: 'openai_completion' },
      { label: 'Chat', type: 'openai_chat' },
      { label: 'Embedding', type: 'openai_embedding' },
      { label: 'Edit', type: 'openai_edit' },
      { label: 'Moderation', type: 'openai_moderation' },
      { label: 'Image Generation', type: 'openai_image' },
      { label: 'Speech to Text', type: 'openai_speech' }
    ] },
    { label: 'GitHub', type: 'github', icon: <FaGithub />, subItems: [
      { label: 'Push', type: 'github_push' },
      { label: 'Pull Request', type: 'github_pull_request' },
      { label: 'Issues', type: 'github_issues' }
    ] },
    { label: 'Jira', type: 'jira', icon: <SiJira />, subItems: [
      { label: 'Issue', type: 'jira_issue' },
      { label: 'Project', type: 'jira_project' },
      { label: 'Sprint', type: 'jira_sprint' }
    ] },
    { label: 'Stripe', type: 'stripe', icon: <FaCreditCard />, subItems: [
      { label: 'Payment', type: 'stripe_payment' },
      { label: 'Subscription', type: 'stripe_subscription' },
      { label: 'Refund', type: 'stripe_refund' }
    ] },

    // Triggers & Scheduling
    { label: 'Trigger', type: 'trigger', icon: <FaBolt /> },
    { label: 'Scheduler', type: 'scheduler', icon: <FaClock /> },
    { label: 'Email Trigger', type: 'emailtrigger', icon: <FaEnvelopeOpenText /> }
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
    'Data Processing': ['Transform', 'Compare', 'Switch', 'Function', 'Set', 'Split', 'Merge', 'Validation'],
    'Data Storage & Caching': ['Database', 'Cache', 'Queue'],
    'Security & Performance': ['Authentication', 'Encryption', 'Rate Limit'],
    'Communication & Notifications': ['HTTP Request', 'Webhook', 'Email', 'Notification', 'Slack', 'Telegram', 'Twilio'],
    'Monitoring & Logging': ['Logger', 'Metrics'],
    'Cloud Services': ['AWS', 'Google Cloud', 'Azure'],
    'File Operations': ['File System', 'Compression'],
    'External Services': ['OpenAI', 'GitHub', 'Jira', 'Stripe'],
    'Triggers & Scheduling': ['Trigger', 'Scheduler', 'Email Trigger']
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
