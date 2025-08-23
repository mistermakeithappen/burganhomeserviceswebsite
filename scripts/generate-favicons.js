const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const inputImage = path.join(publicDir, 'burgan-logo-original.png');

async function generateFavicons() {
  // Read the original image
  const originalImage = sharp(inputImage);
  
  // Generate favicon.ico (32x32)
  await originalImage
    .resize(32, 32)
    .toFile(path.join(publicDir, 'favicon.ico'));
  console.log('Generated favicon.ico');

  // Generate various PNG sizes for different uses
  const sizes = [
    { size: 16, name: 'favicon-16x16.png' },
    { size: 32, name: 'favicon-32x32.png' },
    { size: 48, name: 'favicon-48x48.png' },
    { size: 64, name: 'favicon-64x64.png' },
    { size: 128, name: 'favicon-128x128.png' },
    { size: 180, name: 'apple-touch-icon.png' }, // Apple devices
    { size: 192, name: 'icon-192.png' }, // Android/PWA
    { size: 256, name: 'icon-256.png' }, // PWA
    { size: 384, name: 'icon-384.png' }, // PWA
    { size: 512, name: 'icon-512.png' }, // PWA
  ];

  for (const { size, name } of sizes) {
    await sharp(inputImage)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png()
      .toFile(path.join(publicDir, name));
    console.log(`Generated ${name}`);
  }

  // Generate maskable icon for PWA (with padding)
  await sharp(inputImage)
    .resize(512, 512, {
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    })
    .extend({
      top: 64,
      bottom: 64,
      left: 64,
      right: 64,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    })
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'icon-512-maskable.png'));
  console.log('Generated icon-512-maskable.png');

  // Generate Open Graph image (1200x630 for social media)
  await sharp(inputImage)
    .resize(600, 600, {
      fit: 'contain',
      background: { r: 30, g: 41, b: 59, alpha: 1 } // Slate-900 background
    })
    .extend({
      top: 15,
      bottom: 15,
      left: 300,
      right: 300,
      background: { r: 30, g: 41, b: 59, alpha: 1 }
    })
    .png()
    .toFile(path.join(publicDir, 'og-image.png'));
  console.log('Generated og-image.png');

  console.log('\nAll favicons generated successfully!');
}

generateFavicons().catch(console.error);