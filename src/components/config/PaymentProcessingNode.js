import React from 'react';
import { MenuItem } from '@mui/material';
import ConfigField from './ConfigField';

const PaymentProcessingNode = ({ config, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="node-config">
      <ConfigField
        label="Payment Provider"
        value={config.provider || 'stripe'}
        onChange={(value) => handleChange('provider', value)}
        select
      >
        <MenuItem value="stripe">Stripe</MenuItem>
        <MenuItem value="paypal">PayPal</MenuItem>
        <MenuItem value="square">Square</MenuItem>
        <MenuItem value="razorpay">Razorpay</MenuItem>
        <MenuItem value="adyen">Adyen</MenuItem>
        <MenuItem value="mollie">Mollie</MenuItem>
      </ConfigField>
      <ConfigField
        label="Operation"
        value={config.operation || 'charge'}
        onChange={(value) => handleChange('operation', value)}
        select
      >
        <MenuItem value="charge">Process Payment</MenuItem>
        <MenuItem value="refund">Process Refund</MenuItem>
        <MenuItem value="subscription">Manage Subscription</MenuItem>
        <MenuItem value="payout">Manage Payout</MenuItem>
        <MenuItem value="customer">Manage Customer</MenuItem>
        <MenuItem value="dispute">Handle Dispute</MenuItem>
      </ConfigField>
      <ConfigField
        label="Amount"
        value={config.amount || ''}
        onChange={(value) => handleChange('amount', value)}
        type="number"
      />
      <ConfigField
        label="Currency"
        value={config.currency || 'USD'}
        onChange={(value) => handleChange('currency', value)}
        select
      >
        <MenuItem value="USD">USD</MenuItem>
        <MenuItem value="EUR">EUR</MenuItem>
        <MenuItem value="GBP">GBP</MenuItem>
        <MenuItem value="JPY">JPY</MenuItem>
        <MenuItem value="INR">INR</MenuItem>
      </ConfigField>
      <ConfigField
        label="Payment Method"
        value={config.paymentMethod || 'card'}
        onChange={(value) => handleChange('paymentMethod', value)}
        select
      >
        <MenuItem value="card">Credit/Debit Card</MenuItem>
        <MenuItem value="bank">Bank Transfer</MenuItem>
        <MenuItem value="wallet">Digital Wallet</MenuItem>
        <MenuItem value="crypto">Cryptocurrency</MenuItem>
      </ConfigField>
      <ConfigField
        label="Metadata"
        value={config.metadata || ''}
        onChange={(value) => handleChange('metadata', value)}
        multiline
        rows={2}
        helperText="JSON object for additional payment data"
      />
      <ConfigField
        label="Webhook Settings"
        value={config.webhookSettings || ''}
        onChange={(value) => handleChange('webhookSettings', value)}
        multiline
        rows={2}
        helperText="Configuration for payment webhooks"
      />
    </div>
  );
};

export default PaymentProcessingNode;
