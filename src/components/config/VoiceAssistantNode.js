import React from 'react';
import { MenuItem } from '@mui/material';
import ConfigField from './ConfigField';

const VoiceAssistantNode = ({ config, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="node-config">
      <ConfigField
        label="Service Provider"
        value={config.provider || 'google'}
        onChange={(value) => handleChange('provider', value)}
        select
      >
        <MenuItem value="google">Google Speech-to-Text</MenuItem>
        <MenuItem value="amazon">Amazon Transcribe</MenuItem>
        <MenuItem value="azure">Azure Speech Services</MenuItem>
        <MenuItem value="watson">IBM Watson Speech</MenuItem>
        <MenuItem value="elevenlabs">ElevenLabs</MenuItem>
      </ConfigField>
      <ConfigField
        label="Operation Type"
        value={config.operationType || 'stt'}
        onChange={(value) => handleChange('operationType', value)}
        select
      >
        <MenuItem value="stt">Speech to Text</MenuItem>
        <MenuItem value="tts">Text to Speech</MenuItem>
        <MenuItem value="dialog">Dialog Management</MenuItem>
        <MenuItem value="intent">Intent Recognition</MenuItem>
      </ConfigField>
      <ConfigField
        label="Language"
        value={config.language || 'en-US'}
        onChange={(value) => handleChange('language', value)}
        select
      >
        <MenuItem value="en-US">English (US)</MenuItem>
        <MenuItem value="en-GB">English (UK)</MenuItem>
        <MenuItem value="es">Spanish</MenuItem>
        <MenuItem value="fr">French</MenuItem>
        <MenuItem value="de">German</MenuItem>
        <MenuItem value="ja">Japanese</MenuItem>
      </ConfigField>
      <ConfigField
        label="Voice Settings"
        value={config.voiceSettings || ''}
        onChange={(value) => handleChange('voiceSettings', value)}
        multiline
        rows={3}
        helperText="JSON object for voice configuration"
      />
      <ConfigField
        label="Audio Format"
        value={config.audioFormat || 'wav'}
        onChange={(value) => handleChange('audioFormat', value)}
        select
      >
        <MenuItem value="wav">WAV</MenuItem>
        <MenuItem value="mp3">MP3</MenuItem>
        <MenuItem value="ogg">OGG</MenuItem>
        <MenuItem value="flac">FLAC</MenuItem>
      </ConfigField>
      <ConfigField
        label="Sample Rate"
        value={config.sampleRate || '16000'}
        onChange={(value) => handleChange('sampleRate', value)}
        select
      >
        <MenuItem value="8000">8 kHz</MenuItem>
        <MenuItem value="16000">16 kHz</MenuItem>
        <MenuItem value="44100">44.1 kHz</MenuItem>
        <MenuItem value="48000">48 kHz</MenuItem>
      </ConfigField>
      <ConfigField
        label="Recognition Settings"
        value={config.recognitionSettings || ''}
        onChange={(value) => handleChange('recognitionSettings', value)}
        multiline
        rows={3}
        helperText="Advanced recognition configuration"
      />
      <ConfigField
        label="Custom Vocabulary"
        value={config.customVocabulary || ''}
        onChange={(value) => handleChange('customVocabulary', value)}
        multiline
        rows={2}
        helperText="Domain-specific terms and phrases"
      />
    </div>
  );
};

export default VoiceAssistantNode;
