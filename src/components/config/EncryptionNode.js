import React from 'react';
import ConfigField from '../common/ConfigField';

export default function EncryptionNode({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange(field, value);
  };

  const encryptionTypeOptions = [
    { value: 'aes', label: 'AES' },
    { value: 'rsa', label: 'RSA' },
    { value: 'des', label: 'DES' },
    { value: 'blowfish', label: 'Blowfish' },
    { value: 'pgp', label: 'PGP/GPG' },
    { value: 'custom', label: 'Custom Algorithm' }
  ];

  const aesOptions = [
    { value: 'aes-128-cbc', label: 'AES-128-CBC' },
    { value: 'aes-192-cbc', label: 'AES-192-CBC' },
    { value: 'aes-256-cbc', label: 'AES-256-CBC' },
    { value: 'aes-128-gcm', label: 'AES-128-GCM' },
    { value: 'aes-192-gcm', label: 'AES-192-GCM' },
    { value: 'aes-256-gcm', label: 'AES-256-GCM' }
  ];

  const keySourceOptions = [
    { value: 'manual', label: 'Manual Entry' },
    { value: 'file', label: 'Key File' },
    { value: 'kms', label: 'Key Management Service' },
    { value: 'hsm', label: 'Hardware Security Module' },
    { value: 'vault', label: 'Secret Vault' }
  ];

  return (
    <div>
      <ConfigField
        label="Encryption Type"
        type="select"
        field="encryptionType"
        value={data.config?.encryptionType}
        onChange={handleChange}
        options={encryptionTypeOptions}
        required
      />

      {data.config?.encryptionType === 'aes' && (
        <>
          <ConfigField
            label="AES Mode"
            type="select"
            field="aesMode"
            value={data.config?.aesMode}
            onChange={handleChange}
            options={aesOptions}
            required
          />
          <ConfigField
            label="Key Source"
            type="select"
            field="keySource"
            value={data.config?.keySource}
            onChange={handleChange}
            options={keySourceOptions}
            required
          />
          {data.config?.keySource === 'manual' && (
            <ConfigField
              label="Encryption Key"
              type="password"
              field="encryptionKey"
              value={data.config?.encryptionKey}
              onChange={handleChange}
              secure
              required
            />
          )}
          {data.config?.keySource === 'file' && (
            <ConfigField
              label="Key File Path"
              type="text"
              field="keyFilePath"
              value={data.config?.keyFilePath}
              onChange={handleChange}
              placeholder="/path/to/key.pem"
              required
            />
          )}
          {['kms', 'vault'].includes(data.config?.keySource) && (
            <>
              <ConfigField
                label="Service URL"
                type="text"
                field="serviceUrl"
                value={data.config?.serviceUrl}
                onChange={handleChange}
                placeholder="https://kms.example.com"
                required
              />
              <ConfigField
                label="Key ID"
                type="text"
                field="keyId"
                value={data.config?.keyId}
                onChange={handleChange}
                required
              />
              <ConfigField
                label="Service Credentials"
                type="password"
                field="serviceCredentials"
                value={data.config?.serviceCredentials}
                onChange={handleChange}
                secure
                required
              />
            </>
          )}
          <ConfigField
            label="IV (Initialization Vector)"
            type="text"
            field="iv"
            value={data.config?.iv}
            onChange={handleChange}
            placeholder="16 bytes hex string"
          />
        </>
      )}

      {data.config?.encryptionType === 'rsa' && (
        <>
          <ConfigField
            label="Key Size"
            type="select"
            field="keySize"
            value={data.config?.keySize}
            onChange={handleChange}
            options={[
              { value: '1024', label: '1024 bits' },
              { value: '2048', label: '2048 bits' },
              { value: '4096', label: '4096 bits' }
            ]}
            required
          />
          <ConfigField
            label="Public Key"
            type="textarea"
            field="publicKey"
            value={data.config?.publicKey}
            onChange={handleChange}
            placeholder="-----BEGIN PUBLIC KEY-----\n...\n-----END PUBLIC KEY-----"
            rows={6}
            required
          />
          <ConfigField
            label="Private Key"
            type="textarea"
            field="privateKey"
            value={data.config?.privateKey}
            onChange={handleChange}
            placeholder="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
            rows={6}
            secure
            required
          />
          <ConfigField
            label="Padding Scheme"
            type="select"
            field="padding"
            value={data.config?.padding}
            onChange={handleChange}
            options={[
              { value: 'pkcs1', label: 'PKCS#1' },
              { value: 'oaep', label: 'OAEP' }
            ]}
            required
          />
        </>
      )}

      {data.config?.encryptionType === 'pgp' && (
        <>
          <ConfigField
            label="Public Key Ring"
            type="textarea"
            field="publicKeyRing"
            value={data.config?.publicKeyRing}
            onChange={handleChange}
            placeholder="-----BEGIN PGP PUBLIC KEY BLOCK-----\n...\n-----END PGP PUBLIC KEY BLOCK-----"
            rows={6}
            required
          />
          <ConfigField
            label="Private Key Ring"
            type="textarea"
            field="privateKeyRing"
            value={data.config?.privateKeyRing}
            onChange={handleChange}
            placeholder="-----BEGIN PGP PRIVATE KEY BLOCK-----\n...\n-----END PGP PRIVATE KEY BLOCK-----"
            rows={6}
            secure
            required
          />
          <ConfigField
            label="Passphrase"
            type="password"
            field="passphrase"
            value={data.config?.passphrase}
            onChange={handleChange}
            secure
          />
        </>
      )}

      {data.config?.encryptionType === 'custom' && (
        <ConfigField
          label="Custom Algorithm"
          type="textarea"
          field="customAlgorithm"
          value={data.config?.customAlgorithm}
          onChange={handleChange}
          placeholder={`class CustomEncryption {
  encrypt(data, key) {
    // Encryption implementation
  }
  decrypt(data, key) {
    // Decryption implementation
  }
}`}
          rows={10}
          required
        />
      )}

      <ConfigField
        label="Key Rotation"
        type="checkbox"
        field="enableKeyRotation"
        value={data.config?.enableKeyRotation}
        onChange={handleChange}
      />

      {data.config?.enableKeyRotation && (
        <>
          <ConfigField
            label="Rotation Interval (days)"
            type="number"
            field="rotationInterval"
            value={data.config?.rotationInterval}
            onChange={handleChange}
            min={1}
            validation="number"
            required
          />
          <ConfigField
            label="Key Version"
            type="number"
            field="keyVersion"
            value={data.config?.keyVersion}
            onChange={handleChange}
            min={1}
            validation="number"
          />
        </>
      )}

      <ConfigField
        label="Data Compression"
        type="checkbox"
        field="enableCompression"
        value={data.config?.enableCompression}
        onChange={handleChange}
      />

      {data.config?.enableCompression && (
        <ConfigField
          label="Compression Level"
          type="number"
          field="compressionLevel"
          value={data.config?.compressionLevel}
          onChange={handleChange}
          min={1}
          max={9}
          validation="number"
        />
      )}

      <ConfigField
        label="Enable Audit"
        type="checkbox"
        field="enableAudit"
        value={data.config?.enableAudit}
        onChange={handleChange}
      />

      {data.config?.enableAudit && (
        <ConfigField
          label="Audit Fields"
          type="textarea"
          field="auditFields"
          value={data.config?.auditFields}
          onChange={handleChange}
          placeholder={`[
  "timestamp",
  "user",
  "operation",
  "keyVersion"
]`}
          rows={4}
        />
      )}

      <ConfigField
        label="Error Handling"
        type="select"
        field="errorHandling"
        value={data.config?.errorHandling}
        onChange={handleChange}
        options={[
          { value: 'throw', label: 'Throw Error' },
          { value: 'return', label: 'Return Error Object' },
          { value: 'retry', label: 'Retry Operation' }
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

      <ConfigField
        label="Description"
        type="textarea"
        field="description"
        value={data.config?.description}
        onChange={handleChange}
        placeholder="Describe the purpose of this encryption"
        rows={2}
      />
    </div>
  );
}
