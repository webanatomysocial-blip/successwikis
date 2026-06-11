const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const tempDir = path.join(__dirname, '../deploy_temp');
const zipFile = path.join(__dirname, '../deploy.zip');

// Clean up previous runs
if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
}
if (fs.existsSync(zipFile)) {
    fs.unlinkSync(zipFile);
}

fs.mkdirSync(tempDir);

// 1. Copy template.html (renamed from out/index.html)
if (fs.existsSync(path.join(__dirname, '../out/index.html'))) {
    fs.copyFileSync(
        path.join(__dirname, '../out/index.html'),
        path.join(tempDir, 'template.html')
    );
} else {
    console.error('Error: out/index.html not found! Please run npm run build first.');
    process.exit(1);
}

// Helper to copy directory recursively
function copyDir(src, dest) {
    fs.mkdirSync(dest, { recursive: true });
    let entries = fs.readdirSync(src, { withFileTypes: true });

    for (let entry of entries) {
        let srcPath = path.join(src, entry.name);
        let destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

// 2. Copy all files and folders from out/ (except out/index.html which is renamed to template.html)
if (fs.existsSync(path.join(__dirname, '../out'))) {
    let entries = fs.readdirSync(path.join(__dirname, '../out'), { withFileTypes: true });
    for (let entry of entries) {
        if (entry.name === 'index.html') continue;

        let srcPath = path.join(__dirname, '../out', entry.name);
        let destPath = path.join(tempDir, entry.name);

        if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

// 3. Copy root PHP and config files
const rootFiles = ['.htaccess', 'index.php', 'sitemap.php', 'llms.php'];
rootFiles.forEach(file => {
    const src = path.join(__dirname, '..', file);
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, path.join(tempDir, file));
    }
});

// 4. Copy api folder (excluding SQLite database file to avoid overwriting production data)
if (fs.existsSync(path.join(__dirname, '../api'))) {
    copyDir(path.join(__dirname, '../api'), path.join(tempDir, 'api'));
    const sqliteDb = path.join(tempDir, 'api/database.sqlite');
    if (fs.existsSync(sqliteDb)) {
        fs.unlinkSync(sqliteDb);
    }
}

console.log('Folders prepared in deploy_temp.');

// 5. Zip it using native Mac/Linux zip command
try {
    console.log('Zipping files...');
    execSync(`cd "${tempDir}" && zip -r "${zipFile}" . -x ".DS_Store" -x "__MACOSX/*"`);
    console.log('SUCCESS: deploy.zip created in root directory!');
} catch (error) {
    console.error('Error creating zip:', error);
} finally {
    // Clean up temp folder
    fs.rmSync(tempDir, { recursive: true, force: true });
}
