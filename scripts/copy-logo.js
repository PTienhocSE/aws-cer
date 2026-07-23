const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '..', 'amazon-web-services-logo.png');
const destDir = path.join(__dirname, '..', 'public');
const dest = path.join(destDir, 'amazon-web-services-logo.png');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

fs.copyFileSync(src, dest);
console.log('✅ Logo copied to public/amazon-web-services-logo.png');
