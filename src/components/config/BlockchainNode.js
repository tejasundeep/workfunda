import React from 'react';
import { MenuItem } from '@mui/material';
import ConfigField from './ConfigField';

const BlockchainNode = ({ config, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="node-config">
      <ConfigField
        label="Blockchain Platform"
        value={config.platform || 'ethereum'}
        onChange={(value) => handleChange('platform', value)}
        select
      >
        <MenuItem value="ethereum">Ethereum</MenuItem>
        <MenuItem value="solana">Solana</MenuItem>
        <MenuItem value="polygon">Polygon</MenuItem>
        <MenuItem value="binance">Binance Smart Chain</MenuItem>
        <MenuItem value="hyperledger">Hyperledger Fabric</MenuItem>
        <MenuItem value="cardano">Cardano</MenuItem>
      </ConfigField>
      <ConfigField
        label="Network"
        value={config.network || 'mainnet'}
        onChange={(value) => handleChange('network', value)}
        select
      >
        <MenuItem value="mainnet">Mainnet</MenuItem>
        <MenuItem value="testnet">Testnet</MenuItem>
        <MenuItem value="local">Local Network</MenuItem>
      </ConfigField>
      <ConfigField
        label="Operation Type"
        value={config.operationType || 'transaction'}
        onChange={(value) => handleChange('operationType', value)}
        select
      >
        <MenuItem value="transaction">Send Transaction</MenuItem>
        <MenuItem value="contract">Smart Contract Interaction</MenuItem>
        <MenuItem value="token">Token Operations</MenuItem>
        <MenuItem value="nft">NFT Operations</MenuItem>
        <MenuItem value="query">Query Blockchain</MenuItem>
      </ConfigField>
      <ConfigField
        label="Contract Address"
        value={config.contractAddress || ''}
        onChange={(value) => handleChange('contractAddress', value)}
      />
      <ConfigField
        label="Contract ABI"
        value={config.contractAbi || ''}
        onChange={(value) => handleChange('contractAbi', value)}
        multiline
        rows={4}
        helperText="JSON ABI for smart contract interaction"
      />
      <ConfigField
        label="Method Name"
        value={config.methodName || ''}
        onChange={(value) => handleChange('methodName', value)}
      />
      <ConfigField
        label="Method Parameters"
        value={config.methodParams || ''}
        onChange={(value) => handleChange('methodParams', value)}
        multiline
        rows={3}
        helperText="Parameters for contract method call"
      />
      <ConfigField
        label="Gas Settings"
        value={config.gasSettings || ''}
        onChange={(value) => handleChange('gasSettings', value)}
        multiline
        rows={2}
        helperText="Gas limit and price configuration"
      />
      <ConfigField
        label="Authentication"
        value={config.authentication || 'wallet'}
        onChange={(value) => handleChange('authentication', value)}
        select
      >
        <MenuItem value="wallet">Web3 Wallet</MenuItem>
        <MenuItem value="privateKey">Private Key</MenuItem>
        <MenuItem value="keystore">Keystore File</MenuItem>
      </ConfigField>
      <ConfigField
        label="Transaction Options"
        value={config.txOptions || ''}
        onChange={(value) => handleChange('txOptions', value)}
        multiline
        rows={3}
        helperText="Additional transaction options"
      />
    </div>
  );
};

export default BlockchainNode;
