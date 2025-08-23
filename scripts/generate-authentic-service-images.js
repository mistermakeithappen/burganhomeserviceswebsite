const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const servicesDir = path.join(__dirname, '..', 'public', 'images', 'services');

// Service-specific visual elements with more authentic, work-in-progress feel
const services = [
  { 
    name: 'bathroom-remodeling',
    primaryColor: '#1e3a8a', // Deep blue
    secondaryColor: '#3b82f6', // Lighter blue
    elements: [
      { type: 'rect', x: 100, y: 150, width: 400, height: 300, color: '#e0e7ff', opacity: 0.3 }, // Bathtub silhouette
      { type: 'rect', x: 550, y: 200, width: 200, height: 250, color: '#dbeafe', opacity: 0.3 }, // Vanity
      { type: 'circle', x: 900, y: 300, r: 80, color: '#bfdbfe', opacity: 0.3 }, // Mirror
      { type: 'tools', text: 'Tile • Plumbing • Fixtures', y: 500 }
    ]
  },
  { 
    name: 'kitchen-remodeling',
    primaryColor: '#14532d', // Deep green
    secondaryColor: '#16a34a', // Lighter green
    elements: [
      { type: 'rect', x: 150, y: 200, width: 350, height: 250, color: '#dcfce7', opacity: 0.3 }, // Cabinets
      { type: 'rect', x: 600, y: 180, width: 400, height: 50, color: '#bbf7d0', opacity: 0.3 }, // Countertop
      { type: 'rect', x: 700, y: 250, width: 200, height: 200, color: '#a7f3d0', opacity: 0.3 }, // Appliance
      { type: 'tools', text: 'Cabinets • Countertops • Appliances', y: 500 }
    ]
  },
  { 
    name: 'interior-painting',
    primaryColor: '#581c87', // Deep purple
    secondaryColor: '#9333ea', // Lighter purple
    elements: [
      { type: 'rect', x: 0, y: 0, width: 1200, height: 315, color: '#f3e8ff', opacity: 0.2 }, // Wall top
      { type: 'rect', x: 0, y: 315, width: 1200, height: 315, color: '#e9d5ff', opacity: 0.3 }, // Wall bottom (being painted)
      { type: 'brush', x: 800, y: 280 }, // Paint brush
      { type: 'tools', text: 'Prep • Prime • Paint • Perfect', y: 500 }
    ]
  },
  { 
    name: 'exterior-painting',
    primaryColor: '#b45309', // Deep amber
    secondaryColor: '#f59e0b', // Lighter amber
    elements: [
      { type: 'house', x: 300, y: 150, width: 600, height: 350 }, // House silhouette
      { type: 'ladder', x: 200, y: 200 }, // Ladder
      { type: 'tools', text: 'Power Wash • Scrape • Prime • Paint', y: 520 }
    ]
  },
  { 
    name: 'handyman',
    primaryColor: '#7f1d1d', // Deep red
    secondaryColor: '#dc2626', // Lighter red
    elements: [
      { type: 'toolbox', x: 500, y: 200 }, // Toolbox
      { type: 'wrench', x: 300, y: 350 }, // Wrench
      { type: 'hammer', x: 700, y: 350 }, // Hammer
      { type: 'tools', text: 'Fix • Repair • Install • Maintain', y: 480 }
    ]
  },
  { 
    name: 'home-repairs',
    primaryColor: '#0e7490', // Deep cyan
    secondaryColor: '#06b6d4', // Lighter cyan
    elements: [
      { type: 'patch', x: 200, y: 200, size: 150 }, // Drywall patch
      { type: 'pipe', x: 500, y: 300 }, // Plumbing pipe
      { type: 'outlet', x: 800, y: 250 }, // Electrical outlet
      { type: 'tools', text: 'Drywall • Plumbing • Electrical • Carpentry', y: 480 }
    ]
  },
  { 
    name: 'trim-painting',
    primaryColor: '#831843', // Deep pink
    secondaryColor: '#ec4899', // Lighter pink
    elements: [
      { type: 'frame', x: 100, y: 100, width: 1000, height: 400 }, // Window/door frame
      { type: 'detail-brush', x: 850, y: 300 }, // Detail brush
      { type: 'tape', x: 150, y: 350 }, // Painter's tape
      { type: 'tools', text: 'Baseboards • Crown • Doors • Windows', y: 520 }
    ]
  }
];

async function generateAuthenticImages() {
  for (const service of services) {
    // Create SVG with gradient background and work elements
    let svgElements = '';
    
    // Add subtle texture/noise pattern for authenticity
    svgElements += `
      <defs>
        <pattern id="noise" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <rect width="100" height="100" fill="white" opacity="0.03"/>
          <circle cx="20" cy="20" r="1" fill="white" opacity="0.05"/>
          <circle cx="80" cy="40" r="1" fill="white" opacity="0.05"/>
          <circle cx="50" cy="70" r="1" fill="white" opacity="0.05"/>
          <circle cx="10" cy="90" r="1" fill="white" opacity="0.05"/>
          <circle cx="90" cy="10" r="1" fill="white" opacity="0.05"/>
        </pattern>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${service.primaryColor};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${service.secondaryColor};stop-opacity:1" />
        </linearGradient>
      </defs>
    `;
    
    // Add service-specific elements
    service.elements.forEach(element => {
      switch(element.type) {
        case 'rect':
          svgElements += `<rect x="${element.x}" y="${element.y}" width="${element.width}" height="${element.height}" fill="${element.color}" opacity="${element.opacity}"/>`;
          break;
        case 'circle':
          svgElements += `<circle cx="${element.x}" cy="${element.y}" r="${element.r}" fill="${element.color}" opacity="${element.opacity}"/>`;
          break;
        case 'house':
          // Simple house shape
          svgElements += `
            <polygon points="${element.x},${element.y + element.height} ${element.x + element.width/2},${element.y} ${element.x + element.width},${element.y + element.height}" 
                     fill="white" opacity="0.2"/>
            <rect x="${element.x + 100}" y="${element.y + 150}" width="${element.width - 200}" height="${element.height - 150}" 
                  fill="white" opacity="0.15"/>
          `;
          break;
        case 'brush':
          // Paint brush shape
          svgElements += `
            <rect x="${element.x}" y="${element.y}" width="30" height="100" fill="white" opacity="0.3" transform="rotate(-30 ${element.x + 15} ${element.y + 50})"/>
            <rect x="${element.x - 5}" y="${element.y - 20}" width="40" height="30" fill="${service.secondaryColor}" opacity="0.5" transform="rotate(-30 ${element.x + 15} ${element.y})"/>
          `;
          break;
        case 'toolbox':
          svgElements += `
            <rect x="${element.x}" y="${element.y}" width="200" height="120" fill="white" opacity="0.2" rx="10"/>
            <rect x="${element.x + 70}" y="${element.y - 20}" width="60" height="40" fill="white" opacity="0.15" rx="5"/>
          `;
          break;
        case 'wrench':
          svgElements += `
            <rect x="${element.x}" y="${element.y}" width="150" height="20" fill="white" opacity="0.25" transform="rotate(45 ${element.x + 75} ${element.y + 10})"/>
            <circle cx="${element.x}" cy="${element.y}" r="25" fill="none" stroke="white" stroke-width="15" opacity="0.2"/>
          `;
          break;
        case 'hammer':
          svgElements += `
            <rect x="${element.x}" y="${element.y}" width="20" height="100" fill="white" opacity="0.25"/>
            <rect x="${element.x - 30}" y="${element.y - 20}" width="80" height="30" fill="white" opacity="0.3"/>
          `;
          break;
        case 'frame':
          // Window/door frame
          svgElements += `
            <rect x="${element.x}" y="${element.y}" width="${element.width}" height="${element.height}" 
                  fill="none" stroke="white" stroke-width="40" opacity="0.2"/>
            <rect x="${element.x + 50}" y="${element.y + 50}" width="${element.width - 100}" height="${element.height - 100}" 
                  fill="white" opacity="0.05"/>
          `;
          break;
        case 'tools':
          // Text for tools/services
          svgElements += `
            <text x="600" y="${element.y}" font-family="Arial, sans-serif" font-size="28" font-weight="bold" 
                  fill="white" opacity="0.6" text-anchor="middle" letter-spacing="2">
              ${element.text}
            </text>
          `;
          break;
        case 'patch':
          // Drywall patch
          svgElements += `
            <rect x="${element.x}" y="${element.y}" width="${element.size}" height="${element.size}" 
                  fill="white" opacity="0.15" rx="5"/>
            <line x1="${element.x + 20}" y1="${element.y}" x2="${element.x + 20}" y2="${element.y + element.size}" 
                  stroke="white" stroke-width="2" opacity="0.1" stroke-dasharray="5,5"/>
            <line x1="${element.x}" y1="${element.y + 20}" x2="${element.x + element.size}" y2="${element.y + 20}" 
                  stroke="white" stroke-width="2" opacity="0.1" stroke-dasharray="5,5"/>
          `;
          break;
        case 'ladder':
          svgElements += `
            <line x1="${element.x}" y1="${element.y}" x2="${element.x - 50}" y2="${element.y + 250}" 
                  stroke="white" stroke-width="8" opacity="0.3"/>
            <line x1="${element.x + 40}" y1="${element.y}" x2="${element.x + 90}" y2="${element.y + 250}" 
                  stroke="white" stroke-width="8" opacity="0.3"/>
            <line x1="${element.x - 10}" y1="${element.y + 50}" x2="${element.x + 50}" y2="${element.y + 50}" 
                  stroke="white" stroke-width="6" opacity="0.25"/>
            <line x1="${element.x - 20}" y1="${element.y + 100}" x2="${element.x + 60}" y2="${element.y + 100}" 
                  stroke="white" stroke-width="6" opacity="0.25"/>
            <line x1="${element.x - 30}" y1="${element.y + 150}" x2="${element.x + 70}" y2="${element.y + 150}" 
                  stroke="white" stroke-width="6" opacity="0.25"/>
          `;
          break;
      }
    });

    const svg = `
      <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <rect width="1200" height="630" fill="url(#grad)"/>
        <rect width="1200" height="630" fill="url(#noise)"/>
        ${svgElements}
        
        <!-- Service name with work-in-progress feel -->
        <text x="600" y="315" font-family="Arial, sans-serif" font-size="72" font-weight="bold" 
              fill="white" opacity="0.9" text-anchor="middle" letter-spacing="3">
          ${service.name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
        </text>
        
        <!-- Subtle branding -->
        <text x="600" y="380" font-family="Arial, sans-serif" font-size="24" 
              fill="white" opacity="0.5" text-anchor="middle">
          Burgan Home Services • Est. 1873
        </text>
      </svg>
    `;

    const buffer = Buffer.from(svg);
    await sharp(buffer)
      .jpeg({ quality: 90 })
      .toFile(path.join(servicesDir, `${service.name}-hero.jpg`));
    
    console.log(`Generated ${service.name}-hero.jpg`);
  }
}

generateAuthenticImages().catch(console.error);