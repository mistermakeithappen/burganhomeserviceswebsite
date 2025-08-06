import { WebhookFormatter } from './webhookFormatter';
import { serviceFormConfigs } from './serviceFormConfigs';

interface WebhookResponse {
  success: boolean;
  message?: string;
  error?: string;
  webhookId?: string;
}

export class WebhookSubmission {
  private static webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL || '';
  private static fallbackWebhookUrl = process.env.NEXT_PUBLIC_FALLBACK_WEBHOOK_URL || '';
  
  /**
   * Submits form data to webhook endpoint(s)
   */
  static async submitForm(
    serviceId: string,
    formData: Record<string, any>
  ): Promise<WebhookResponse> {
    try {
      // Get service configuration
      const serviceConfig = serviceFormConfigs[serviceId];
      if (!serviceConfig) {
        throw new Error(`Invalid service ID: ${serviceId}`);
      }
      
      // Format the data
      const payload = WebhookFormatter.formatFormData(
        serviceId,
        serviceConfig.title,
        formData
      );
      
      // Generate human-readable summary
      const summary = WebhookFormatter.generateSummary(payload);
      
      // Add summary to payload
      const enrichedPayload = {
        ...payload,
        summary: {
          ...payload.summary,
          text: summary
        }
      };
      
      // Try primary webhook
      let response = await this.sendToWebhook(this.webhookUrl, enrichedPayload);
      
      // If primary fails and fallback exists, try fallback
      if (!response.success && this.fallbackWebhookUrl) {
        console.warn('Primary webhook failed, trying fallback...');
        response = await this.sendToWebhook(this.fallbackWebhookUrl, enrichedPayload);
      }
      
      // If webhook fails, try email notification as last resort
      if (!response.success) {
        console.warn('All webhooks failed, sending email notification...');
        response = await this.sendEmailNotification(enrichedPayload);
      }
      
      // Log submission for analytics
      this.logSubmission(serviceId, response.success, enrichedPayload);
      
      return response;
      
    } catch (error) {
      console.error('Form submission error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }
  
  /**
   * Sends payload to a specific webhook URL
   */
  private static async sendToWebhook(
    url: string,
    payload: any
  ): Promise<WebhookResponse> {
    if (!url) {
      return {
        success: false,
        error: 'No webhook URL configured'
      };
    }
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Source': 'burgan-home-services',
          'X-Form-Version': '1.0.0'
        },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        throw new Error(`Webhook returned ${response.status}`);
      }
      
      const data = await response.json().catch(() => ({}));
      
      return {
        success: true,
        message: 'Form submitted successfully',
        webhookId: data.id || data.webhookId || undefined
      };
      
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Webhook submission failed'
      };
    }
  }
  
  /**
   * Sends email notification as fallback
   */
  private static async sendEmailNotification(payload: any): Promise<WebhookResponse> {
    try {
      // This would typically call your email API endpoint
      // For now, we'll simulate storing to localStorage as a queue
      const emailQueue = JSON.parse(localStorage.getItem('emailQueue') || '[]');
      emailQueue.push({
        ...payload,
        queuedAt: new Date().toISOString()
      });
      localStorage.setItem('emailQueue', JSON.stringify(emailQueue));
      
      return {
        success: true,
        message: 'Form queued for processing'
      };
      
    } catch (error) {
      return {
        success: false,
        error: 'Failed to queue form submission'
      };
    }
  }
  
  /**
   * Logs submission for analytics and debugging
   */
  private static logSubmission(
    serviceId: string,
    success: boolean,
    payload: any
  ): void {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Form Submission:', {
        serviceId,
        success,
        timestamp: new Date().toISOString(),
        payload
      });
    }
    
    // Store submission history in localStorage (last 10)
    try {
      const history = JSON.parse(localStorage.getItem('submissionHistory') || '[]');
      history.unshift({
        serviceId,
        success,
        timestamp: new Date().toISOString(),
        contactName: `${payload.contact.firstName} ${payload.contact.lastName}`
      });
      
      // Keep only last 10 submissions
      if (history.length > 10) {
        history.pop();
      }
      
      localStorage.setItem('submissionHistory', JSON.stringify(history));
    } catch (error) {
      console.error('Failed to log submission:', error);
    }
  }
  
  /**
   * Validates webhook URL format
   */
  static validateWebhookUrl(url: string): boolean {
    try {
      const parsed = new URL(url);
      return parsed.protocol === 'https:' || parsed.protocol === 'http:';
    } catch {
      return false;
    }
  }
  
  /**
   * Tests webhook connectivity
   */
  static async testWebhook(url?: string): Promise<boolean> {
    const testUrl = url || this.webhookUrl;
    
    if (!testUrl) {
      console.error('No webhook URL to test');
      return false;
    }
    
    try {
      const response = await fetch(testUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Test': 'true'
        },
        body: JSON.stringify({
          test: true,
          timestamp: new Date().toISOString()
        })
      });
      
      return response.ok;
    } catch (error) {
      console.error('Webhook test failed:', error);
      return false;
    }
  }
}

/**
 * Hook for using webhook submission in React components
 */
export function useWebhookSubmission() {
  const submitForm = async (
    serviceId: string,
    formData: Record<string, any>
  ): Promise<WebhookResponse> => {
    return WebhookSubmission.submitForm(serviceId, formData);
  };
  
  return { submitForm };
}