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

  if (!server || !username || !password) {
    console.error('❌ Error: FTP credentials missing.');
    process.exit(1);
  }

  const zipPath = path.resolve('deploy.zip');
  const phpPath = path.resolve('deploy-extract.php');

  if (!fs.existsSync(zipPath) || !fs.existsSync(phpPath)) {
    console.error('❌ Error: deploy.zip or deploy-extract.php not found.');
    process.exit(1);
  }

  console.log(`🌐 Connecting to Hostinger FTP (${server}:${port})...`);
  const client = new ftp.Client();
  client.ftp.verbose = false;

  let connected = false;
  try {
    console.log('🔒 Connecting via FTPS (TLS)...');
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
    console.warn(`⚠️ FTPS failed (${tlsErr.message}). Retrying with plain FTP...`);
    try {
      await client.access({
        host: server,
        user: username,
        password: password,
        port: port,
        secure: false
      });
      connected = true;
      console.log('✓ Plain FTP connected.');
    } catch (ftpErr) {
      console.error(`❌ FTP Connection failed: ${ftpErr.message}`);
      client.close();
      process.exit(1);
    }
  }

  try {
    // Navigate into target directory if needed
    const list = await client.list();
    const hasPublicHtml = list.some(item => item.name === 'public_html' && item.isDirectory);

    if (targetDir && targetDir !== '.' && targetDir !== './') {
      try {
        await client.cd(targetDir);
        console.log(`✓ Directory set to '${targetDir}'`);
      } catch {
        console.log(`ℹ️ Account already inside target directory.`);
      }
    } else if (hasPublicHtml) {
      await client.cd('public_html');
      console.log("✓ Navigated to 'public_html'");
    }

    console.log('🚀 Uploading deploy.zip & deploy-extract.php (only 2 files!)...');
    await client.uploadFrom(zipPath, 'deploy.zip');
    console.log('✓ Uploaded deploy.zip');

    await client.uploadFrom(phpPath, 'deploy-extract.php');
    console.log('✓ Uploaded deploy-extract.php');
  } catch (err) {
    console.error(`❌ Upload error: ${err.message}`);
    process.exit(1);
  } finally {
    client.close();
  }

  console.log('⚡ Triggering server-side extraction on Hostinger...');
  const extractUrl = 'https://icreatepdf.com/deploy-extract.php?token=icreatepdf_deploy_secret_2026';
  
  let attempts = 0;
  while (attempts < 5) {
    attempts++;
    try {
      const res = await fetch(extractUrl);
      const text = await res.text();
      if (res.ok && text.includes('DEPLOY_SUCCESS')) {
        console.log('🎉 Server-side extraction completed! Website is LIVE.');
        return;
      } else {
        console.warn(`Attempt ${attempts}: Response was ${res.status} - ${text}`);
      }
    } catch (fetchErr) {
      console.warn(`Attempt ${attempts}: Network error (${fetchErr.message})`);
    }
    await new Promise(r => setTimeout(r, 3000));
  }

  console.log('⚠️ Note: Extraction ping finished. Verify site at https://icreatepdf.com');
}

deploy();
