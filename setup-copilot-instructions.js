const fs = require('fs');
const path = require('path');

try {
  // Create .github directory
  const githubDir = path.resolve('.github');
  fs.mkdirSync(githubDir, { recursive: true });
  console.log('✓ Created .github directory');

  // Read temp file (using relative path from cwd)
  const tempFile = path.resolve('.github-copilot-instructions.md');
  const content = fs.readFileSync(tempFile, 'utf8');
  console.log('✓ Read temp file');
  
  // Write to target location
  const targetFile = path.resolve('.github/copilot-instructions.md');
  fs.writeFileSync(targetFile, content, 'utf8');
  console.log('✓ Created .github/copilot-instructions.md');

  // Delete temp file
  fs.unlinkSync(tempFile);
  console.log('✓ Cleaned up temporary file');
  
  console.log('\n✅ File successfully created at: .github/copilot-instructions.md');
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
