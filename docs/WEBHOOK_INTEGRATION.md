# Webhook Integration Guide

## Overview

This application uses a generic webhook system that formats all form submissions into a consistent structure, allowing you to use a single webhook endpoint for all service quote forms.

## Webhook Payload Structure

All forms send data in the following standardized format:

```json
{
  "meta": {
    "timestamp": "2024-01-20T10:30:00Z",
    "formVersion": "1.0.0",
    "source": "website",
    "formType": "quote_request"
  },
  "service": {
    "id": "roofing",
    "name": "Roofing Services",
    "category": "home_services"
  },
  "contact": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "(509) 555-1234",
    "address": "123 Main St",
    "city": "Spokane",
    "state": "WA",
    "zipCode": "99201"
  },
  "serviceDetails": {
    "serviceType": "repair",
    "hasLeak": "yes",
    // ... other service-specific fields
  },
  "summary": {
    "urgency": "urgent",
    "estimatedValue": "medium",
    "preferredContact": "phone",
    "text": "URGENT: New Roofing Services quote request from John Doe in Spokane. Needs repair. Contact via phone."
  }
}
```

## Setup Instructions

### 1. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Primary webhook URL
NEXT_PUBLIC_WEBHOOK_URL=https://your-webhook-endpoint.com/api/quotes

# Optional: Fallback webhook URL
NEXT_PUBLIC_FALLBACK_WEBHOOK_URL=https://backup-webhook.com/api/quotes
```

### 2. Popular Webhook Services

#### Zapier
1. Create a new Zap with "Webhooks by Zapier" as trigger
2. Choose "Catch Hook" as the trigger event
3. Copy the webhook URL to your `.env.local`
4. Send test data using the webhook tester (see below)

#### Make (Integromat)
1. Create a new scenario with "Webhooks" module
2. Select "Custom webhook"
3. Copy the webhook URL to your `.env.local`

#### Google Sheets (via Apps Script)
1. Create a Google Apps Script
2. Deploy as Web App
3. Use the deployment URL as your webhook

#### Slack
1. Create an Incoming Webhook in your Slack workspace
2. Note: You may need a formatting adapter for Slack's specific format

### 3. Testing Your Webhook

#### Local Testing
For local development, use the built-in test endpoint:

```bash
# In .env.local
NEXT_PUBLIC_WEBHOOK_URL=http://localhost:3000/api/webhook-test
```

#### Browser Console Testing
Open your browser console and test webhook formatting:

```javascript
// Test formatting without sending
WebhookTester.testFormatting('roofing');

// Test actual submission
WebhookTester.testSubmission('roofing');

// Test all services
WebhookTester.testAllServices();
```

## Data Fields Reference

### Common Fields (All Forms)
- `firstName` - Customer's first name
- `lastName` - Customer's last name  
- `email` - Email address
- `phone` - Phone number
- `address` - Street address
- `city` - City
- `state` - State
- `zipCode` - ZIP code

### Service-Specific Fields

Each service has unique fields. Examples:

**Roofing:**
- `serviceType` - repair/replacement/rejuvenation
- `hasLeak` - yes/no
- `leakLocation` - Location of leak if applicable
- `roofAge` - Age range of roof
- `roofMaterial` - Type of roofing material

**Kitchen Remodeling:**
- `scope` - full_remodel/cabinet_countertop/appliances_only
- `cabinets` - yes/no
- `countertops` - yes/no
- `appliances` - yes/no
- `budget` - Budget range

## Urgency Levels

The system automatically determines urgency:

- **Emergency** - Requires immediate attention (leaks, power outages, etc.)
- **Urgent** - Should be addressed within a week
- **Normal** - Standard timeline

## Error Handling

The system includes multiple fallback mechanisms:

1. **Primary Webhook** - First attempt
2. **Fallback Webhook** - If primary fails (optional)
3. **Local Queue** - Stores in browser if all webhooks fail
4. **Submission History** - Last 10 submissions saved locally

## Advanced Integration

### Custom Processing

To add custom processing logic, modify `lib/webhookFormatter.ts`:

```typescript
// Add custom fields to payload
const customPayload = {
  ...standardPayload,
  customField: 'value',
  internalId: generateId()
};
```

### Webhook Validation

The system validates webhook URLs and tests connectivity:

```javascript
// Test webhook connectivity
WebhookSubmission.testWebhook('https://your-webhook.com');
```

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Some webhook services don't allow browser requests
   - Solution: Use a proxy or server-side endpoint

2. **Invalid URL**
   - Ensure URL starts with `http://` or `https://`
   - Check for typos in `.env.local`

3. **Webhook Not Receiving Data**
   - Test with local endpoint first
   - Check browser console for errors
   - Verify webhook service is active

### Debug Mode

Enable debug logging in browser console:

```javascript
localStorage.setItem('debugWebhooks', 'true');
```

View submission history:

```javascript
JSON.parse(localStorage.getItem('submissionHistory'));
```

## Security Considerations

- Webhook URLs are exposed in client-side code
- For sensitive integrations, use a server-side proxy
- Consider adding authentication headers for production
- Validate and sanitize all data on the receiving end

## Support

For issues or questions about webhook integration:
1. Check browser console for error messages
2. Test with local webhook endpoint
3. Verify environment variables are set correctly
4. Review submission history in localStorage