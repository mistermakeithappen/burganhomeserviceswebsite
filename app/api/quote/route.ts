import { NextRequest, NextResponse } from 'next/server';
import { sendQuoteEmail } from '@/lib/email';
import { z } from 'zod';

const quoteSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number is required'),
  service: z.string().min(1, 'Service is required'),
  propertyType: z.string().min(1, 'Property type is required'),
  urgency: z.string().min(1, 'Urgency is required'),
  budget: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const validatedData = quoteSchema.parse(body);
    
    const result = await sendQuoteEmail(validatedData);
    
    if (result.success) {
      return NextResponse.json(
        { message: 'Quote request sent successfully' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: 'Failed to send quote request' },
        { status: 500 }
      );
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      );
    }
    
    console.error('Quote form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}