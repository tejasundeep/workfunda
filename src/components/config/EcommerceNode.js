import React from 'react';
import { MenuItem } from '@mui/material';
import ConfigField from './ConfigField';

const EcommerceNode = ({ config, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="node-config">
      <ConfigField
        label="Platform"
        value={config.platform || 'shopify'}
        onChange={(value) => handleChange('platform', value)}
        select
      >
        <MenuItem value="shopify">Shopify</MenuItem>
        <MenuItem value="woocommerce">WooCommerce</MenuItem>
        <MenuItem value="magento">Magento</MenuItem>
        <MenuItem value="bigcommerce">BigCommerce</MenuItem>
        <MenuItem value="prestashop">PrestaShop</MenuItem>
      </ConfigField>
      <ConfigField
        label="Operation"
        value={config.operation || 'products'}
        onChange={(value) => handleChange('operation', value)}
        select
      >
        <MenuItem value="products">Manage Products</MenuItem>
        <MenuItem value="orders">Manage Orders</MenuItem>
        <MenuItem value="customers">Manage Customers</MenuItem>
        <MenuItem value="inventory">Manage Inventory</MenuItem>
        <MenuItem value="discounts">Manage Discounts</MenuItem>
        <MenuItem value="shipping">Manage Shipping</MenuItem>
      </ConfigField>
      <ConfigField
        label="Action"
        value={config.action || 'read'}
        onChange={(value) => handleChange('action', value)}
        select
      >
        <MenuItem value="read">Read</MenuItem>
        <MenuItem value="create">Create</MenuItem>
        <MenuItem value="update">Update</MenuItem>
        <MenuItem value="delete">Delete</MenuItem>
        <MenuItem value="list">List</MenuItem>
      </ConfigField>
      <ConfigField
        label="Filters"
        value={config.filters || ''}
        onChange={(value) => handleChange('filters', value)}
        multiline
        rows={2}
        helperText="JSON object for filtering results"
      />
      <ConfigField
        label="Webhook Events"
        value={config.webhookEvents || []}
        onChange={(value) => handleChange('webhookEvents', value)}
        select
        multiple
      >
        <MenuItem value="order.created">Order Created</MenuItem>
        <MenuItem value="order.updated">Order Updated</MenuItem>
        <MenuItem value="product.created">Product Created</MenuItem>
        <MenuItem value="product.updated">Product Updated</MenuItem>
        <MenuItem value="customer.created">Customer Created</MenuItem>
      </ConfigField>
      <ConfigField
        label="Sync Settings"
        value={config.syncSettings || ''}
        onChange={(value) => handleChange('syncSettings', value)}
        multiline
        rows={2}
        helperText="JSON object for sync configuration"
      />
    </div>
  );
};

export default EcommerceNode;
