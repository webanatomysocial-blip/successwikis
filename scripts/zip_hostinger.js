// scripts/zip_hostinger.js
// Creates hostinger-deploy.zip for uploading to Hostinger Node.js hosting.
// Excludes node_modules (Hostinger installs them), .env.local, and dev-only files.

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const root = path.join(__dirname, '..');
const tempDir = path.join(root, 'hostinger_temp');
const zipFile = path.join(root, 'hostinger-deploy.zip');

// Clean up previous runs
if (fs.existsSync(tempDir)) fs.rmSync(tempDir, { recursive: true, force: true });
if (fs.existsSync(zipFile)) fs.unlinkSync(zipFile);
fs.mkdirSync(tempDir);

function copyDir(src, dest, exclude = []) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (exclude.includes(entry.name)) continue;
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath, exclude);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function copyFile(src, dest) {
  if (fs.existsSync(src)) {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
    console.log('  ✓', path.basename(src));
  } else {
    console.warn('  ✗ MISSING:', src);
  }
}

console.log('\nBuilding Hostinger deployment package (source files — Hostinger builds on server)...\n');

// 1. src/ — Next.js source (Hostinger runs npm build itself)
console.log('Copying src/...');
copyDir(path.join(root, 'src'), path.join(tempDir, 'src'));

// 2. public/ — static assets
console.log('Copying public/...');
copyDir(path.join(root, 'public'), path.join(tempDir, 'public'));

// 3. api/ — PHP API (likes, comments, posts, auth, uploads)
console.log('Copying api/...');
copyDir(path.join(root, 'api'), path.join(tempDir, 'api'), [
  'database.sqlite',
  'database.sqlite-shm',
  'database.sqlite-wal',
]);

// 4. Root files
console.log('\nCopying root files:');
copyFile(path.join(root, 'server.js'),          path.join(tempDir, 'server.js'));
copyFile(path.join(root, 'package.json'),        path.join(tempDir, 'package.json'));
copyFile(path.join(root, 'package-lock.json'),   path.join(tempDir, 'package-lock.json'));
copyFile(path.join(root, 'next.config.mjs'),     path.join(tempDir, 'next.config.mjs'));
copyFile(path.join(root, 'eslint.config.js'),    path.join(tempDir, 'eslint.config.js'));
copyFile(path.join(root, 'sitemap.php'),         path.join(tempDir, 'sitemap.php'));
copyFile(path.join(root, 'llms.php'),            path.join(tempDir, 'llms.php'));
copyFile(path.join(root, '.env.production'),     path.join(tempDir, '.env.production'));

// 5. .htaccess — Hostinger-specific version
const htaccessSrc = path.join(root, '.htaccess.hostinger');
if (fs.existsSync(htaccessSrc)) {
  fs.copyFileSync(htaccessSrc, path.join(tempDir, '.htaccess'));
  console.log('  ✓ .htaccess.hostinger → .htaccess');
} else {
  console.warn('  ✗ .htaccess.hostinger not found');
}

// 6. Zip it
console.log('\nZipping...');
try {
  execSync(`cd "${tempDir}" && zip -r "${zipFile}" . -x ".DS_Store" -x "__MACOSX/*"`, { stdio: 'inherit' });
  const sizeMB = (fs.statSync(zipFile).size / 1024 / 1024).toFixed(1);
  console.log(`\n✅  hostinger-deploy.zip created (${sizeMB} MB)`);
  console.log('   Upload this to Hostinger hPanel → Node.js → Upload your app files\n');
} catch (err) {
  console.error('Error creating zip:', err.message);
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
