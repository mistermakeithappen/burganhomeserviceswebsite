import { Resend } from 'resend';
import ContactEmail from '@/emails/ContactEmail';
import QuoteEmail from '@/emails/QuoteEmail';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export async function sendContactEmail(data: ContactFormData) {
  if (!resend) {
    console.warn('Email service not configured. Set RESEND_API_KEY in environment variables.');
    return { success: false, error: 'Email service not configured' };
  }
  
  try {
    const { data: emailData, error } = await resend.emails.send({
      from: 'Burgan Home Services <noreply@burganhomeservices.com>',
      to: process.env.CONTACT_EMAIL || 'contact@burganhomeservices.com',
      replyTo: data.email,
      subject: `New Contact Form Submission from ${data.name}`,
      react: ContactEmail(data),
    });

    if (error) {
      throw error;
    }

    return { success: true, data: emailData };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error };
  }
}

export interface QuoteFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  propertyType: string;
  urgency: string;
  budget?: string;
  message: string;
}

export async function sendQuoteEmail(data: QuoteFormData) {
  if (!resend) {
    console.warn('Email service not configured. Set RESEND_API_KEY in environment variables.');
    return { success: false, error: 'Email service not configured' };
  }
  
  try {
    const { data: emailData, error } = await resend.emails.send({
      from: 'Burgan Home Services <noreply@burganhomeservices.com>',
      to: process.env.QUOTE_EMAIL || 'quotes@burganhomeservices.com',
      replyTo: data.email,
      subject: `New Quote Request from ${data.name} - ${data.service}`,
      react: QuoteEmail(data),
    });

    if (error) {
      throw error;
    }

    return { success: true, data: emailData };
  } catch (error) {
    console.error('Failed to send quote email:', error);
    return { success: false, error };
  }
}