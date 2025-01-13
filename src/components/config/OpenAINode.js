import React from 'react';
import ConfigField from '../common/ConfigField';

export default function OpenAINode({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange(field, value);
  };

  const modelOptions = [
    { value: 'gpt-4', label: 'GPT-4' },
    { value: 'gpt-4-turbo', label: 'GPT-4 Turbo' },
    { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
    { value: 'text-davinci-003', label: 'Davinci' },
    { value: 'text-curie-001', label: 'Curie' },
    { value: 'text-babbage-001', label: 'Babbage' },
    { value: 'text-ada-001', label: 'Ada' }
  ];

  const functionTypeOptions = [
    { value: 'completion', label: 'Text Completion' },
    { value: 'chat', label: 'Chat Completion' },
    { value: 'embedding', label: 'Text Embedding' },
    { value: 'edit', label: 'Text Edit' },
    { value: 'moderation', label: 'Content Moderation' },
    { value: 'image', label: 'Image Generation' },
    { value: 'speech', label: 'Speech to Text' }
  ];

  return (
    <div>
      <ConfigField
        label="API Key"
        type="password"
        field="apiKey"
        value={data.config?.apiKey}
        onChange={handleChange}
        secure
        required
      />

      <ConfigField
        label="Function Type"
        type="select"
        field="functionType"
        value={data.config?.functionType}
        onChange={handleChange}
        options={functionTypeOptions}
        required
      />

      <ConfigField
        label="Model"
        type="select"
        field="model"
        value={data.config?.model}
        onChange={handleChange}
        options={modelOptions}
        required
      />

      {['completion', 'chat'].includes(data.config?.functionType) && (
        <>
          <ConfigField
            label="System Message"
            type="textarea"
            field="systemMessage"
            value={data.config?.systemMessage}
            onChange={handleChange}
            placeholder="You are a helpful assistant..."
            rows={3}
          />
          <ConfigField
            label="Temperature"
            type="number"
            field="temperature"
            value={data.config?.temperature}
            onChange={handleChange}
            min={0}
            max={2}
            step={0.1}
            validation="number"
          />
          <ConfigField
            label="Max Tokens"
            type="number"
            field="maxTokens"
            value={data.config?.maxTokens}
            onChange={handleChange}
            min={1}
            max={4096}
            validation="number"
          />
          <ConfigField
            label="Top P"
            type="number"
            field="topP"
            value={data.config?.topP}
            onChange={handleChange}
            min={0}
            max={1}
            step={0.1}
            validation="number"
          />
          <ConfigField
            label="Frequency Penalty"
            type="number"
            field="frequencyPenalty"
            value={data.config?.frequencyPenalty}
            onChange={handleChange}
            min={-2}
            max={2}
            step={0.1}
            validation="number"
          />
          <ConfigField
            label="Presence Penalty"
            type="number"
            field="presencePenalty"
            value={data.config?.presencePenalty}
            onChange={handleChange}
            min={-2}
            max={2}
            step={0.1}
            validation="number"
          />
          <ConfigField
            label="Stop Sequences"
            type="textarea"
            field="stopSequences"
            value={data.config?.stopSequences}
            onChange={handleChange}
            placeholder={`[
  "\\n",
  "User:",
  "Assistant:"
]`}
            rows={4}
          />
        </>
      )}

      {data.config?.functionType === 'embedding' && (
        <ConfigField
          label="Embedding Model"
          type="select"
          field="embeddingModel"
          value={data.config?.embeddingModel}
          onChange={handleChange}
          options={[
            { value: 'text-embedding-ada-002', label: 'Ada V2' },
            { value: 'text-embedding-ada-001', label: 'Ada V1' }
          ]}
          required
        />
      )}

      {data.config?.functionType === 'edit' && (
        <>
          <ConfigField
            label="Edit Model"
            type="select"
            field="editModel"
            value={data.config?.editModel}
            onChange={handleChange}
            options={[
              { value: 'text-davinci-edit-001', label: 'Davinci Edit' },
              { value: 'code-davinci-edit-001', label: 'Code Edit' }
            ]}
            required
          />
          <ConfigField
            label="Instruction"
            type="textarea"
            field="instruction"
            value={data.config?.instruction}
            onChange={handleChange}
            placeholder="Fix the spelling mistakes"
            rows={2}
            required
          />
        </>
      )}

      {data.config?.functionType === 'image' && (
        <>
          <ConfigField
            label="Image Size"
            type="select"
            field="imageSize"
            value={data.config?.imageSize}
            onChange={handleChange}
            options={[
              { value: '256x256', label: '256x256' },
              { value: '512x512', label: '512x512' },
              { value: '1024x1024', label: '1024x1024' }
            ]}
            required
          />
          <ConfigField
            label="Number of Images"
            type="number"
            field="numberOfImages"
            value={data.config?.numberOfImages}
            onChange={handleChange}
            min={1}
            max={10}
            validation="number"
            required
          />
          <ConfigField
            label="Response Format"
            type="select"
            field="responseFormat"
            value={data.config?.responseFormat}
            onChange={handleChange}
            options={[
              { value: 'url', label: 'Image URL' },
              { value: 'b64_json', label: 'Base64 JSON' }
            ]}
            required
          />
        </>
      )}

      {data.config?.functionType === 'speech' && (
        <>
          <ConfigField
            label="Audio Model"
            type="select"
            field="audioModel"
            value={data.config?.audioModel}
            onChange={handleChange}
            options={[
              { value: 'whisper-1', label: 'Whisper v1' }
            ]}
            required
          />
          <ConfigField
            label="Language"
            type="text"
            field="language"
            value={data.config?.language}
            onChange={handleChange}
            placeholder="en"
          />
          <ConfigField
            label="Temperature"
            type="number"
            field="temperature"
            value={data.config?.temperature}
            onChange={handleChange}
            min={0}
            max={1}
            step={0.1}
            validation="number"
          />
        </>
      )}

      <ConfigField
        label="Enable Streaming"
        type="checkbox"
        field="enableStreaming"
        value={data.config?.enableStreaming}
        onChange={handleChange}
      />

      {data.config?.enableStreaming && (
        <ConfigField
          label="Chunk Size"
          type="number"
          field="chunkSize"
          value={data.config?.chunkSize}
          onChange={handleChange}
          min={1}
          validation="number"
          required
        />
      )}

      <ConfigField
        label="Enable Caching"
        type="checkbox"
        field="enableCaching"
        value={data.config?.enableCaching}
        onChange={handleChange}
      />

      {data.config?.enableCaching && (
        <>
          <ConfigField
            label="Cache TTL (seconds)"
            type="number"
            field="cacheTTL"
            value={data.config?.cacheTTL}
            onChange={handleChange}
            min={0}
            validation="number"
            required
          />
          <ConfigField
            label="Cache Key Function"
            type="textarea"
            field="cacheKeyFunction"
            value={data.config?.cacheKeyFunction}
            onChange={handleChange}
            placeholder={`function generateCacheKey(input) {
  return \`\${input.trim().toLowerCase()}\`;
}`}
            rows={4}
          />
        </>
      )}

      <ConfigField
        label="Enable Rate Limiting"
        type="checkbox"
        field="enableRateLimit"
        value={data.config?.enableRateLimit}
        onChange={handleChange}
      />

      {data.config?.enableRateLimit && (
        <>
          <ConfigField
            label="Requests Per Minute"
            type="number"
            field="requestsPerMinute"
            value={data.config?.requestsPerMinute}
            onChange={handleChange}
            min={1}
            validation="number"
            required
          />
          <ConfigField
            label="Burst Size"
            type="number"
            field="burstSize"
            value={data.config?.burstSize}
            onChange={handleChange}
            min={1}
            validation="number"
          />
        </>
      )}

      <ConfigField
        label="Error Handling"
        type="select"
        field="errorHandling"
        value={data.config?.errorHandling}
        onChange={handleChange}
        options={[
          { value: 'throw', label: 'Throw Error' },
          { value: 'retry', label: 'Retry Request' },
          { value: 'fallback', label: 'Use Fallback' }
        ]}
      />

      {data.config?.errorHandling === 'retry' && (
        <>
          <ConfigField
            label="Retry Count"
            type="number"
            field="retryCount"
            value={data.config?.retryCount}
            onChange={handleChange}
            min={1}
            max={5}
            validation="number"
          />
          <ConfigField
            label="Retry Delay (ms)"
            type="number"
            field="retryDelay"
            value={data.config?.retryDelay}
            onChange={handleChange}
            min={0}
            max={60000}
            validation="number"
          />
        </>
      )}

      {data.config?.errorHandling === 'fallback' && (
        <ConfigField
          label="Fallback Response"
          type="textarea"
          field="fallbackResponse"
          value={data.config?.fallbackResponse}
          onChange={handleChange}
          placeholder="Default response when API call fails"
          rows={3}
          required
        />
      )}

      <ConfigField
        label="Description"
        type="textarea"
        field="description"
        value={data.config?.description}
        onChange={handleChange}
        placeholder="Describe the purpose of this OpenAI integration"
        rows={2}
      />
    </div>
  );
}
