// PRISM local server — serves the app over HTTPS so Chrome on the tablet allows Web MIDI.
// No dependencies. Reuses the self-signed certificate made for piano-trainer.
const http = require('http'), https = require('https'), fs = require('fs'), path = require('path'), os = require('os');
const PUBLIC = path.join(__dirname, 'public');
const HTTP_PORT = Number(process.env.PORT || 8100), HTTPS_PORT = Number(process.env.HTTPS_PORT || 8543);
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml',
  '.webmanifest': 'application/manifest+json', '.json': 'application/json', '.png': 'image/png' };
function handler(req, res) {
  const p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  const file = path.normalize(path.join(PUBLIC, p === '/' ? 'index.html' : p));
  if (!file.startsWith(PUBLIC)) { res.writeHead(403); return res.end(); }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); return res.end('Not found'); }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
    res.end(data);
  });
}
const ips = Object.values(os.networkInterfaces()).flat().filter(i => i && i.family === 'IPv4' && !i.internal).map(i => i.address);
http.createServer(handler).listen(HTTP_PORT, '0.0.0.0');
try {
  const key = fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')), cert = fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'));
  https.createServer({ key, cert }, handler).listen(HTTPS_PORT, '0.0.0.0');
} catch (e) { console.warn('HTTPS disabled (no cert found):', e.message); }
console.log('\n  PRISM is running.\n');
console.log(`  On this PC:     http://localhost:${HTTP_PORT}`);
for (const ip of ips) console.log(`  On the tablet:  https://${ip}:${HTTPS_PORT}   (accept the certificate warning once)`);
console.log('\n  Press Ctrl+C to stop.\n');
