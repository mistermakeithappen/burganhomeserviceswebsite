const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const servicesDir = path.join(__dirname, '..', 'public', 'images', 'services');

const services = [
  { name: 'bathroom-remodeling', color: '#3B82F6' }, // Blue
  { name: 'kitchen-remodeling', color: '#10B981' }, // Green
  { name: 'interior-painting', color: '#8B5CF6' }, // Purple
  { name: 'exterior-painting', color: '#F59E0B' }, // Amber
  { name: 'handyman', color: '#EF4444' }, // Red
  { name: 'home-repairs', color: '#06B6D4' }, // Cyan
  { name: 'trim-painting', color: '#EC4899' }, // Pink
];

async function generatePlaceholders() {
  for (const service of services) {
    const svg = `
      <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <rect width="1200" height="630" fill="${service.color}"/>
        <rect x="50" y="50" width="1100" height="530" fill="white" opacity="0.1" rx="20"/>
        <text x="600" y="315" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="white" text-anchor="middle">
          ${service.name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
        </text>
        <text x="600" y="380" font-family="Arial, sans-serif" font-size="24" fill="white" opacity="0.9" text-anchor="middle">
          Professional Service in Spokane
        </text>
      </svg>
    `;

    const buffer = Buffer.from(svg);
    await sharp(buffer)
      .png()
      .toFile(path.join(servicesDir, `${service.name}-hero.jpg`));
    
    console.log(`Generated ${service.name}-hero.jpg`);
  }
}

generatePlaceholders().catch(console.error);