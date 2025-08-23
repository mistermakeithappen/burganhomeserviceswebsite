const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [192, 256, 384, 512];
const publicDir = path.join(__dirname, '..', 'public');

// Create a simple icon with Burgan Home Services initials
const svgIcon = (size) => `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="#1e293b"/>
  <text x="${size/2}" y="${size/2 + size/6}" 
        font-family="Arial, sans-serif" 
        font-size="${size/3}" 
        font-weight="bold"
        fill="#fbbf24" 
        text-anchor="middle">BH</text>
</svg>`;

async function generateIcons() {
  for (const size of sizes) {
    const svg = Buffer.from(svgIcon(size));
    await sharp(svg)
      .png()
      .toFile(path.join(publicDir, `icon-${size}.png`));
    console.log(`Generated icon-${size}.png`);
  }
}

generateIcons().catch(console.error);