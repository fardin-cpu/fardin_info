import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure we are in the directory containing vite.config.ts or index.html
const rootDir = __dirname;
process.chdir(rootDir);

if (!fs.existsSync(path.join(rootDir, 'index.html'))) {
  // Check for any nested subfolder that might contain index.html
  const entries = fs.readdirSync(rootDir, { withFileTypes: true });
  const nested = entries.find(
    (e) =>
      e.isDirectory() &&
      e.name !== 'node_modules' &&
      e.name !== 'dist' &&
      fs.existsSync(path.join(rootDir, e.name, 'index.html'))
  );

  if (nested) {
    console.log(`[Build] Found nested project folder: ${nested.name}`);
    const nestedPath = path.join(rootDir, nested.name);
    execSync(`npx vite build --outDir "${path.join(rootDir, 'dist')}"`, {
      cwd: nestedPath,
      stdio: 'inherit',
    });
    process.exit(0);
  }
}

execSync('npx vite build', {
  cwd: rootDir,
  stdio: 'inherit',
});
