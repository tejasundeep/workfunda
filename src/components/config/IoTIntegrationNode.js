import React from 'react';
import { MenuItem } from '@mui/material';
import ConfigField from './ConfigField';

const IoTIntegrationNode = ({ config, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="node-config">
      <ConfigField
        label="IoT Platform"
        value={config.platform || 'aws'}
        onChange={(value) => handleChange('platform', value)}
        select
      >
        <MenuItem value="aws">AWS IoT</MenuItem>
        <MenuItem value="azure">Azure IoT Hub</MenuItem>
        <MenuItem value="google">Google Cloud IoT</MenuItem>
        <MenuItem value="thingsboard">ThingsBoard</MenuItem>
        <MenuItem value="particle">Particle</MenuItem>
        <MenuItem value="arduino">Arduino IoT Cloud</MenuItem>
      </ConfigField>
      <ConfigField
        label="Operation Type"
        value={config.operationType || 'telemetry'}
        onChange={(value) => handleChange('operationType', value)}
        select
      >
        <MenuItem value="telemetry">Read Telemetry</MenuItem>
        <MenuItem value="command">Send Command</MenuItem>
        <MenuItem value="provision">Device Provisioning</MenuItem>
        <MenuItem value="shadow">Update Device Shadow</MenuItem>
        <MenuItem value="rules">Rule Engine</MenuItem>
      </ConfigField>
      <ConfigField
        label="Device Type"
        value={config.deviceType || 'sensor'}
        onChange={(value) => handleChange('deviceType', value)}
        select
      >
        <MenuItem value="sensor">Sensor</MenuItem>
        <MenuItem value="actuator">Actuator</MenuItem>
        <MenuItem value="gateway">Gateway</MenuItem>
        <MenuItem value="camera">Camera</MenuItem>
        <MenuItem value="display">Display</MenuItem>
      </ConfigField>
      <ConfigField
        label="Protocol"
        value={config.protocol || 'mqtt'}
        onChange={(value) => handleChange('protocol', value)}
        select
      >
        <MenuItem value="mqtt">MQTT</MenuItem>
        <MenuItem value="http">HTTP</MenuItem>
        <MenuItem value="coap">CoAP</MenuItem>
        <MenuItem value="websocket">WebSocket</MenuItem>
        <MenuItem value="modbus">Modbus</MenuItem>
      </ConfigField>
      <ConfigField
        label="Device ID"
        value={config.deviceId || ''}
        onChange={(value) => handleChange('deviceId', value)}
      />
      <ConfigField
        label="Authentication"
        value={config.authentication || ''}
        onChange={(value) => handleChange('authentication', value)}
        multiline
        rows={2}
        helperText="Device credentials or certificates"
      />
      <ConfigField
        label="Data Format"
        value={config.dataFormat || 'json'}
        onChange={(value) => handleChange('dataFormat', value)}
        select
      >
        <MenuItem value="json">JSON</MenuItem>
        <MenuItem value="xml">XML</MenuItem>
        <MenuItem value="binary">Binary</MenuItem>
        <MenuItem value="protobuf">Protocol Buffers</MenuItem>
      </ConfigField>
      <ConfigField
        label="Message Properties"
        value={config.messageProperties || ''}
        onChange={(value) => handleChange('messageProperties', value)}
        multiline
        rows={3}
        helperText="JSON object for message configuration"
      />
      <ConfigField
        label="QoS Level"
        value={config.qosLevel || '1'}
        onChange={(value) => handleChange('qosLevel', value)}
        select
      >
        <MenuItem value="0">At most once (0)</MenuItem>
        <MenuItem value="1">At least once (1)</MenuItem>
        <MenuItem value="2">Exactly once (2)</MenuItem>
      </ConfigField>
    </div>
  );
};

export default IoTIntegrationNode;
