import { WebhookFormatter, WebhookPayload } from './webhookFormatter';
import { WebhookSubmission } from './webhookSubmission';

/**
 * Utility for testing webhook configuration and data formatting
 */
export class WebhookTester {
  /**
   * Generates sample form data for testing
   */
  static generateSampleData(serviceId: string): Record<string, any> {
    const baseData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '(509) 555-1234',
      address: '123 Main Street',
      city: 'Spokane',
      state: 'WA',
      zipCode: '99201'
    };
    
    // Add service-specific sample data
    const serviceData: Record<string, any> = {
      roofing: {
        serviceType: 'repair',
        hasLeak: 'yes',
        leakLocation: 'around_chimney',
        roofAge: '10-15',
        roofMaterial: 'asphalt_shingles',
        timeline: 'within_week'
      },
      kitchen: {
        scope: 'full_remodel',
        cabinets: 'yes',
        countertops: 'yes',
        appliances: 'yes',
        backsplash: 'yes',
        flooring: 'yes',
        budget: '25000-50000',
        timeline: 'within_3_months'
      },
      bathroom: {
        scope: 'full_remodel',
        bathroomType: 'master',
        vanity: 'yes',
        shower: 'yes',
        tub: 'no',
        toilet: 'yes',
        flooring: 'yes',
        budget: '10000-25000'
      },
      painting: {
        paintScope: 'multiple_rooms',
        serviceType: 'interior',
        interiorRooms: ['living_room', 'master_bedroom', 'kitchen'],
        ceilings: 'yes',
        trim: 'yes',
        timeline: 'within_month'
      },
      plumbing: {
        issue: 'leak',
        leakActive: 'yes',
        location: 'bathroom',
        waterDamage: 'minor',
        timeline: 'asap'
      },
      electrical: {
        issue: 'outlet_not_working',
        location: 'multiple_rooms',
        breakerTripping: 'no',
        timeline: 'within_week'
      },
      handyman: {
        services: ['tv_mounting', 'furniture_assembly', 'drywall_repair', 'door_repair'],
        description: 'Need TV mounted in living room, IKEA furniture assembled, small hole in drywall patched, and bedroom door adjusted',
        timeline: 'within_week'
      },
      flooring: {
        floorType: 'luxury_vinyl',
        rooms: ['living_room', 'kitchen', 'hallway'],
        squareFootage: '800',
        removeExisting: 'yes',
        moveContent: 'yes',
        timeline: 'within_month'
      },
      deck: {
        projectType: 'repair',
        deckSize: 'medium',
        issue: 'boards_damaged',
        railing: 'yes',
        stairs: 'no',
        timeline: 'within_month'
      },
      siding: {
        scope: 'multiple_sides',
        material: 'vinyl',
        insulation: 'yes',
        trim: 'yes',
        squareFootage: '1500',
        timeline: 'within_3_months'
      },
      windows: {
        numberOfWindows: '8',
        windowType: 'double_hung',
        material: 'vinyl',
        energyEfficient: 'yes',
        installationType: 'full_replacement',
        timeline: 'within_3_months'
      },
      drywall: {
        repairType: 'water_damage',
        numberOfAreas: '2',
        largestAreaSize: 'medium',
        textureMatch: 'yes',
        painting: 'yes',
        timeline: 'within_week'
      }
    };
    
    return {
      ...baseData,
      ...(serviceData[serviceId] || {})
    };
  }
  
  /**
   * Tests webhook formatting without sending
   */
  static testFormatting(serviceId: string): WebhookPayload {
    const sampleData = this.generateSampleData(serviceId);
    const serviceName = this.getServiceName(serviceId);
    
    const formatted = WebhookFormatter.formatFormData(
      serviceId,
      serviceName,
      sampleData
    );
    
    const summary = WebhookFormatter.generateSummary(formatted);
    
    console.group(`📋 Webhook Format Test: ${serviceName}`);
    console.log('Sample Form Data:', sampleData);
    console.log('Formatted Payload:', formatted);
    console.log('Summary:', summary);
    console.groupEnd();
    
    return formatted;
  }
  
  /**
   * Tests actual webhook submission
   */
  static async testSubmission(
    serviceId: string,
    webhookUrl?: string
  ): Promise<void> {
    console.group(`🚀 Webhook Submission Test: ${this.getServiceName(serviceId)}`);
    
    // Test webhook connectivity first
    if (webhookUrl) {
      console.log('Testing webhook URL:', webhookUrl);
      const isReachable = await WebhookSubmission.testWebhook(webhookUrl);
      console.log('Webhook reachable:', isReachable ? '✅' : '❌');
    }
    
    // Generate and submit sample data
    const sampleData = this.generateSampleData(serviceId);
    console.log('Submitting sample data...');
    
    const response = await WebhookSubmission.submitForm(serviceId, sampleData);
    
    if (response.success) {
      console.log('✅ Submission successful!');
      if (response.webhookId) {
        console.log('Webhook ID:', response.webhookId);
      }
    } else {
      console.error('❌ Submission failed:', response.error);
    }
    
    console.groupEnd();
  }
  
  /**
   * Tests all services
   */
  static async testAllServices(): Promise<void> {
    const services = [
      'roofing', 'kitchen', 'bathroom', 'painting',
      'plumbing', 'electrical', 'handyman', 'flooring',
      'deck', 'siding', 'windows', 'drywall'
    ];
    
    console.group('🧪 Testing All Services');
    
    for (const serviceId of services) {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Rate limiting
      await this.testSubmission(serviceId);
    }
    
    console.groupEnd();
  }
  
  /**
   * Helper to get service name
   */
  private static getServiceName(serviceId: string): string {
    const names: Record<string, string> = {
      roofing: 'Roofing Services',
      kitchen: 'Kitchen Remodeling',
      bathroom: 'Bathroom Remodeling',
      painting: 'Painting Services',
      plumbing: 'Plumbing Services',
      electrical: 'Electrical Services',
      handyman: 'Handyman Services',
      flooring: 'Flooring Services',
      deck: 'Deck & Outdoor',
      siding: 'Siding Installation',
      windows: 'Windows & Doors',
      drywall: 'Drywall Services'
    };
    
    return names[serviceId] || serviceId;
  }
}

// Export for browser console usage
if (typeof window !== 'undefined') {
  (window as any).WebhookTester = WebhookTester;
}