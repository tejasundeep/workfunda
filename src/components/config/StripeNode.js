import React from 'react';
import { Form } from 'react-bootstrap';

export default function StripeNode({ data, onChange }) {
  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Label>Stripe Action</Form.Label>
        <Form.Control
          type="text"
          value={data.config?.action || ''}
          onChange={(e) => onChange('action', e.target.value)}
          placeholder="Enter Stripe action (e.g., charge, subscribe)"
        />
        <Form.Text className="text-muted">
          Specify the action to perform with Stripe.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>API Key</Form.Label>
        <Form.Control
          type="text"
          value={data.config?.apiKey || ''}
          onChange={(e) => onChange('apiKey', e.target.value)}
          placeholder="Enter Stripe API key"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Event</Form.Label>
        <Form.Select
          value={data.config?.event || ''}
          onChange={(e) => onChange('event', e.target.value)}
        >
          <option value="">Select an event</option>
          <option value="Payment Succeeded">Payment Succeeded</option>
          <option value="Subscription Created">Subscription Created</option>
          <option value="Invoice Paid">Invoice Paid</option>
        </Form.Select>
      </Form.Group>

      {data.config?.event === 'Payment Succeeded' && (
        <>
          <Form.Group className="mb-3">
            <Form.Label>Payment ID</Form.Label>
            <Form.Control
              type="text"
              value={data.config?.paymentId || ''}
              onChange={(e) => onChange('paymentId', e.target.value)}
              placeholder="Enter payment ID"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="text"
              value={data.config?.amount || ''}
              onChange={(e) => onChange('amount', e.target.value)}
              placeholder="Enter amount"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Currency</Form.Label>
            <Form.Control
              type="text"
              value={data.config?.currency || ''}
              onChange={(e) => onChange('currency', e.target.value)}
              placeholder="Enter currency"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Payment Method</Form.Label>
            <Form.Control
              type="text"
              value={data.config?.paymentMethod || ''}
              onChange={(e) => onChange('paymentMethod', e.target.value)}
              placeholder="Enter payment method"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Payment Status</Form.Label>
            <Form.Control
              type="text"
              value={data.config?.paymentStatus || ''}
              onChange={(e) => onChange('paymentStatus', e.target.value)}
              placeholder="Enter payment status"
            />
          </Form.Group>
        </>
      )}

      {data.config?.event === 'Subscription Created' && (
        <>
          <Form.Group className="mb-3">
            <Form.Label>Subscription ID</Form.Label>
            <Form.Control
              type="text"
              value={data.config?.subscriptionId || ''}
              onChange={(e) => onChange('subscriptionId', e.target.value)}
              placeholder="Enter subscription ID"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Plan Details</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={data.config?.planDetails || ''}
              onChange={(e) => onChange('planDetails', e.target.value)}
              placeholder="Enter plan details as JSON"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Subscription Status</Form.Label>
            <Form.Control
              type="text"
              value={data.config?.subscriptionStatus || ''}
              onChange={(e) => onChange('subscriptionStatus', e.target.value)}
              placeholder="Enter subscription status"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Customer ID</Form.Label>
            <Form.Control
              type="text"
              value={data.config?.customerId || ''}
              onChange={(e) => onChange('customerId', e.target.value)}
              placeholder="Enter customer ID"
            />
          </Form.Group>
        </>
      )}

      {data.config?.event === 'Invoice Paid' && (
        <>
          <Form.Group className="mb-3">
            <Form.Label>Invoice ID</Form.Label>
            <Form.Control
              type="text"
              value={data.config?.invoiceId || ''}
              onChange={(e) => onChange('invoiceId', e.target.value)}
              placeholder="Enter invoice ID"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Payment Method</Form.Label>
            <Form.Control
              type="text"
              value={data.config?.paymentMethod || ''}
              onChange={(e) => onChange('paymentMethod', e.target.value)}
              placeholder="Enter payment method"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Invoice Status</Form.Label>
            <Form.Control
              type="text"
              value={data.config?.invoiceStatus || ''}
              onChange={(e) => onChange('invoiceStatus', e.target.value)}
              placeholder="Enter invoice status"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Amount Paid</Form.Label>
            <Form.Control
              type="text"
              value={data.config?.amountPaid || ''}
              onChange={(e) => onChange('amountPaid', e.target.value)}
              placeholder="Enter amount paid"
            />
          </Form.Group>
        </>
      )}

      <Form.Group className="mb-3">
        <Form.Label>Operation</Form.Label>
        <Form.Select
          value={data.config?.operation || 'charge'}
          onChange={(e) => onChange('operation', e.target.value)}
        >
          <option value="charge">Charge</option>
          <option value="subscribe">Subscribe</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Payment/Subscription Details</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={data.config?.details || ''}
          onChange={(e) => onChange('details', e.target.value)}
          placeholder="Enter details as JSON"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Webhook URL</Form.Label>
        <Form.Control
          type="text"
          value={data.config?.webhookUrl || ''}
          onChange={(e) => onChange('webhookUrl', e.target.value)}
          placeholder="Enter webhook URL"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Currency Conversion</Form.Label>
        <Form.Check
          type="checkbox"
          label="Enable Currency Conversion"
          checked={data.config?.enableCurrencyConversion || false}
          onChange={(e) => onChange('enableCurrencyConversion', e.target.checked)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Customer Management</Form.Label>
        <Form.Check
          type="checkbox"
          label="Enable Customer Management"
          checked={data.config?.enableCustomerManagement || false}
          onChange={(e) => onChange('enableCustomerManagement', e.target.checked)}
        />
      </Form.Group>
    </div>
  );
}
