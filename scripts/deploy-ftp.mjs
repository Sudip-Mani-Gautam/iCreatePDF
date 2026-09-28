import * as ftp from 'basic-ftp';
import fs from 'fs';
import path from 'path';

async function deploy() {
  const rawServer = process.env.FTP_SERVER || '';
  const server = rawServer.replace(/^ftps?:\/\//i, '').replace(/\/.*$/, '').trim();
  const username = (process.env.FTP_USERNAME || '').trim();
  const password = process.env.FTP_PASSWORD || '';
  const port = parseInt(process.env.FTP_PORT || '21', 10);
  const targetDir = (process.env.FTP_SERVER_DIR || '').trim();

  if (!server) {
    console.error('❌ Error: FTP_SERVER secret is missing or empty.');
    process.exit(1);
  }
  if (!username) {
    console.error('❌ Error: FTP_USERNAME secret is missing or empty.');
    process.exit(1);
  }
  if (!password) {
    console.error('❌ Error: FTP_PASSWORD secret is missing or empty.');
    process.exit(1);
  }

  const outDir = path.resolve('out');
  if (!fs.existsSync(outDir)) {
    console.error(`❌ Error: Export directory '${outDir}' not found. Run 'npm run build' first.`);
    process.exit(1);
  }

  // Ensure .htaccess is in outDir
  const htaccessSrc = path.resolve('.htaccess');
  const htaccessDest = path.join(outDir, '.htaccess');
  if (fs.existsSync(htaccessSrc) && !fs.existsSync(htaccessDest)) {
    fs.copyFileSync(htaccessSrc, htaccessDest);
    console.log('✓ Copied .htaccess to out/');
  }

  console.log(`🌐 Preparing FTP deployment to Hostinger...`);
  console.log(`   Host:     ${server}:${port}`);
  console.log(`   Username: ${username}`);
  console.log(`   Local:    ${outDir}`);

  const client = new ftp.Client();
  client.ftp.verbose = false; // Keep logs clean, custom progress below

  // Try FTPS first with relaxed certificate validation (Hostinger standard)
  let connected = false;
  try {
    console.log('🔒 Connecting via FTPS (TLS/SSL)...');
    await client.access({
      host: server,
      user: username,
      password: password,
      port: port,
      secure: true,
      secureOptions: { rejectUnauthorized: false }
    });
    connected = true;
    console.log('✓ FTPS connection established.');
  } catch (tlsErr) {
    console.warn(`⚠️ FTPS connection failed (${tlsErr.message}). Retrying with standard FTP...`);
    try {
      await client.access({
        host: server,
        user: username,
        password: password,
        port: port,
        secure: false
      });
      connected = true;
      console.log('✓ Standard FTP connection established.');
    } catch (ftpErr) {
      console.error(`❌ FTP Connection failed: ${ftpErr.message}`);
      client.close();
      process.exit(1);
    }
  }

  if (!connected) {
    console.error('❌ Could not establish FTP connection.');
    process.exit(1);
  }

  try {
    // Determine the correct remote directory
    console.log('📂 Detecting remote target directory...');
    const rootList = await client.list();
    const hasPublicHtml = rootList.some(item => item.name === 'public_html' && item.isDirectory);

    if (targetDir && targetDir !== '.' && targetDir !== './') {
      try {
        await client.cd(targetDir);
        console.log(`✓ Navigated to specified directory: '${targetDir}'`);
      } catch {
        console.log(`ℹ️ Could not cd into '${targetDir}'. Account may already be rooted inside public_html.`);
      }
    } else if (hasPublicHtml) {
      await client.cd('public_html');
      console.log("✓ Navigated into 'public_html'");
    } else {
      console.log("✓ Account is already rooted in target directory (public_html).");
    }

    console.log('🚀 Uploading files to Hostinger (this may take 1-3 minutes for all tools & WASM)...');
    let uploadedCount = 0;
    client.trackProgress(info => {
      uploadedCount++;
      if (uploadedCount % 100 === 0) {
        console.log(`   Uploaded ${uploadedCount} files... (Current: ${info.name})`);
      }
    });

    await client.uploadFromDir(outDir);
    console.log('🎉 Successfully deployed all files to Hostinger!');
  } catch (err) {
    console.error(`❌ Deployment upload error: ${err.message}`);
    process.exit(1);
  } finally {
    client.close();
  }
}

deploy();
