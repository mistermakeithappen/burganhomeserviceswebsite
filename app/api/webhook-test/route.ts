import { NextRequest, NextResponse } from 'next/server';

/**
 * Test webhook endpoint for local development
 * Use this to test form submissions before connecting to production webhooks
 */
export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    
    // Log the received webhook
    console.log('📨 Webhook Received:', {
      timestamp: new Date().toISOString(),
      headers: {
        'content-type': request.headers.get('content-type'),
        'x-source': request.headers.get('x-source'),
        'x-form-version': request.headers.get('x-form-version'),
        'x-test': request.headers.get('x-test')
      },
      payload
    });
    
    // Extract key information
    const { meta, service, contact, serviceDetails, summary } = payload;
    
    // Log formatted summary
    if (summary?.text) {
      console.log('📋 Summary:', summary.text);
    }
    
    // Log contact info
    if (contact) {
      console.log('👤 Contact:', `${contact.firstName} ${contact.lastName} - ${contact.email} - ${contact.phone}`);
    }
    
    // Log service details
    if (serviceDetails) {
      console.log('🔧 Service Details:', serviceDetails);
    }
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Webhook received successfully',
      webhookId: `test-${Date.now()}`,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Webhook Error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint to verify webhook is running
 */
export async function GET() {
  return NextResponse.json({
    status: 'ready',
    message: 'Test webhook endpoint is running',
    usage: 'POST your webhook payload to this endpoint',
    testUrl: 'http://localhost:3000/api/webhook-test'
  });
}