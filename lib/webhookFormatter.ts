export interface WebhookPayload {
  // Meta information
  meta: {
    timestamp: string;
    formVersion: string;
    source: 'website';
    formType: 'quote_request';
  };
  
  // Service information
  service: {
    id: string;
    name: string;
    category: 'home_services';
  };
  
  // Contact information (standardized)
  contact: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };
  
  // Service-specific fields (flexible)
  serviceDetails: Record<string, any>;
  
  // Computed/derived fields
  summary: {
    urgency: 'normal' | 'urgent' | 'emergency';
    estimatedValue?: 'small' | 'medium' | 'large';
    preferredContact?: 'email' | 'phone' | 'either';
  };
  
  // Single line service details summary
  serviceDetailsSummary: string;
}

export class WebhookFormatter {
  /**
   * Formats form data into a standardized webhook payload
   */
  static formatFormData(
    serviceId: string,
    serviceName: string,
    formData: Record<string, any>
  ): WebhookPayload {
    // Extract contact fields
    const contactFields = [
      'firstName', 'lastName', 'email', 'phone',
      'address', 'city', 'state', 'zipCode'
    ];
    
    const contact: any = {};
    const serviceDetails: Record<string, any> = {};
    
    // Separate contact info from service-specific fields
    Object.entries(formData).forEach(([key, value]) => {
      if (contactFields.includes(key)) {
        contact[key] = value;
      } else {
        serviceDetails[key] = value;
      }
    });
    
    // Determine urgency based on service details
    const urgency = this.determineUrgency(serviceId, serviceDetails);
    
    // Estimate project value
    const estimatedValue = this.estimateProjectValue(serviceId, serviceDetails);
    
    // Clean service details
    const cleanedServiceDetails = this.cleanServiceDetails(serviceDetails);
    
    // Generate single-line service details summary
    const serviceDetailsSummary = this.generateServiceDetailsSummary(cleanedServiceDetails);
    
    // Build the webhook payload
    const payload: WebhookPayload = {
      meta: {
        timestamp: new Date().toISOString(),
        formVersion: '1.0.0',
        source: 'website',
        formType: 'quote_request'
      },
      service: {
        id: serviceId,
        name: serviceName,
        category: 'home_services'
      },
      contact,
      serviceDetails: cleanedServiceDetails,
      summary: {
        urgency,
        estimatedValue,
        preferredContact: this.determinePreferredContact(formData)
      },
      serviceDetailsSummary
    };
    
    return payload;
  }
  
  /**
   * Determines urgency based on service type and details
   */
  private static determineUrgency(
    serviceId: string,
    details: Record<string, any>
  ): 'normal' | 'urgent' | 'emergency' {
    // Check for emergency keywords in any field
    const emergencyKeywords = ['emergency', 'urgent', 'leak', 'flood', 'asap', 'immediately'];
    const detailsString = JSON.stringify(details).toLowerCase();
    
    if (emergencyKeywords.some(keyword => detailsString.includes(keyword))) {
      return 'emergency';
    }
    
    // Service-specific urgency rules
    switch (serviceId) {
      case 'plumbing':
        if (details.issue === 'emergency' || details.leakActive === 'yes') {
          return 'emergency';
        }
        if (details.issue === 'leak' || details.issue === 'no_water') {
          return 'urgent';
        }
        break;
        
      case 'roofing':
        if (details.hasLeak === 'yes' || details.emergencyTarping === 'yes') {
          return 'emergency';
        }
        if (details.serviceType === 'repair') {
          return 'urgent';
        }
        break;
        
      case 'electrical':
        if (details.issue === 'power_outage' || details.issue === 'sparking') {
          return 'emergency';
        }
        if (details.issue === 'flickering' || details.issue === 'outlet_not_working') {
          return 'urgent';
        }
        break;
    }
    
    // Check timeline preference
    if (details.timeline === 'asap' || details.timeline === 'within_week') {
      return 'urgent';
    }
    
    return 'normal';
  }
  
  /**
   * Estimates project value based on service type and scope
   */
  private static estimateProjectValue(
    serviceId: string,
    details: Record<string, any>
  ): 'small' | 'medium' | 'large' {
    // Service-specific value estimation
    switch (serviceId) {
      case 'roofing':
        if (details.serviceType === 'replacement') return 'large';
        if (details.serviceType === 'rejuvenation') return 'medium';
        return 'small';
        
      case 'kitchen':
        if (details.scope === 'full_remodel') return 'large';
        if (details.scope === 'cabinet_countertop') return 'medium';
        return 'small';
        
      case 'bathroom':
        if (details.scope === 'full_remodel') return 'large';
        if (details.scope === 'tub_shower' || details.scope === 'vanity_fixtures') return 'medium';
        return 'small';
        
      case 'painting':
        const rooms = details.interiorRooms || [];
        if (details.paintScope === 'entire_house' || rooms.length > 5) return 'large';
        if (details.paintScope === 'multiple_rooms' || rooms.length > 2) return 'medium';
        return 'small';
        
      case 'flooring':
        const sqft = parseInt(details.squareFootage) || 0;
        if (sqft > 1000) return 'large';
        if (sqft > 500) return 'medium';
        return 'small';
        
      case 'deck':
        if (details.projectType === 'new_build') return 'large';
        if (details.projectType === 'rebuild') return 'medium';
        return 'small';
        
      case 'siding':
        if (details.scope === 'entire_house') return 'large';
        if (details.scope === 'multiple_sides') return 'medium';
        return 'small';
        
      case 'windows':
        const windowCount = parseInt(details.numberOfWindows) || 0;
        if (windowCount > 10) return 'large';
        if (windowCount > 5) return 'medium';
        return 'small';
        
      case 'handyman':
        const services = details.services || [];
        if (services.length > 5) return 'medium';
        return 'small';
        
      default:
        return 'small';
    }
  }
  
  /**
   * Determines preferred contact method
   */
  private static determinePreferredContact(
    formData: Record<string, any>
  ): 'email' | 'phone' | 'either' {
    if (formData.preferredContact) {
      return formData.preferredContact;
    }
    
    // If both provided, default to either
    if (formData.email && formData.phone) {
      return 'either';
    }
    
    return formData.email ? 'email' : 'phone';
  }
  
  /**
   * Cleans and formats service details for consistency
   */
  private static cleanServiceDetails(details: Record<string, any>): Record<string, any> {
    const cleaned: Record<string, any> = {};
    
    Object.entries(details).forEach(([key, value]) => {
      // Skip empty values
      if (value === '' || value === null || value === undefined) {
        return;
      }
      
      // Convert arrays to comma-separated strings for readability
      if (Array.isArray(value)) {
        cleaned[key] = value.length > 0 ? value.join(', ') : null;
      } 
      // Keep other values as-is
      else {
        cleaned[key] = value;
      }
    });
    
    return cleaned;
  }
  
  /**
   * Generates a single-line summary of all service details
   */
  private static generateServiceDetailsSummary(details: Record<string, any>): string {
    const parts: string[] = [];
    
    Object.entries(details).forEach(([key, value]) => {
      // Skip null/undefined values
      if (value === null || value === undefined) {
        return;
      }
      
      // Format the key to be more readable
      const formattedKey = key
        .replace(/([A-Z])/g, ' $1') // Add space before capital letters
        .replace(/_/g, ' ') // Replace underscores with spaces
        .replace(/^\w/, c => c.toUpperCase()) // Capitalize first letter
        .trim();
      
      // Format the value
      let formattedValue = value;
      if (typeof value === 'boolean') {
        formattedValue = value ? 'Yes' : 'No';
      } else if (typeof value === 'object') {
        formattedValue = JSON.stringify(value);
      }
      
      // Add to parts array
      parts.push(`${formattedKey}: ${formattedValue}`);
    });
    
    // Join all parts with semicolons for a single-line summary
    return parts.join('; ');
  }
  
  /**
   * Generates a human-readable summary of the request
   */
  static generateSummary(payload: WebhookPayload): string {
    const { service, contact, serviceDetails, summary } = payload;
    
    let text = `New ${service.name} quote request from ${contact.firstName} ${contact.lastName}`;
    
    if (summary.urgency === 'emergency') {
      text = `🚨 EMERGENCY: ${text}`;
    } else if (summary.urgency === 'urgent') {
      text = `⚡ URGENT: ${text}`;
    }
    
    // Add location if available
    if (contact.city) {
      text += ` in ${contact.city}`;
    }
    
    // Add key service details
    const keyDetails = this.extractKeyDetails(service.id, serviceDetails);
    if (keyDetails) {
      text += `. ${keyDetails}`;
    }
    
    // Add contact preference
    text += `. Contact via ${summary.preferredContact === 'either' ? 'phone or email' : summary.preferredContact}.`;
    
    return text;
  }
  
  /**
   * Extracts key details for summary based on service type
   */
  private static extractKeyDetails(serviceId: string, details: Record<string, any>): string {
    switch (serviceId) {
      case 'roofing':
        return details.serviceType ? `Needs ${details.serviceType}` : '';
        
      case 'kitchen':
      case 'bathroom':
        return details.scope ? `Scope: ${details.scope.replace(/_/g, ' ')}` : '';
        
      case 'painting':
        return details.paintScope ? `Scope: ${details.paintScope.replace(/_/g, ' ')}` : '';
        
      case 'plumbing':
        return details.issue ? `Issue: ${details.issue.replace(/_/g, ' ')}` : '';
        
      case 'electrical':
        return details.issue ? `Issue: ${details.issue.replace(/_/g, ' ')}` : '';
        
      case 'handyman':
        const serviceCount = details.services?.split(', ').length || 0;
        return serviceCount > 0 ? `${serviceCount} service(s) needed` : '';
        
      default:
        return '';
    }
  }
}