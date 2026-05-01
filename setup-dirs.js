const fs = require('fs');
const path = require('path');

const dirs = [
  'src/pages/landing/sections',
  'src/pages/landing/styles',
  'src/pages/shop',
  'src/components/common'
];

dirs.forEach(dir => {
  const fullPath = path.resolve(dir);
  fs.mkdirSync(fullPath, { recursive: true });
  console.log('✓ Created:', dir);
});

console.log('\n✓ Directory structure created successfully!');
