import fs from 'fs';

const report = JSON.parse(fs.readFileSync('lighthouse-report.json', 'utf-8'));
const audits = report.audits;

console.log('=== NETWORK REQUESTS ===');
if (audits['network-requests']?.details?.items) {
  audits['network-requests'].details.items.forEach(req => {
    console.log(`${req.url} | ${(req.transferSize/1024).toFixed(1)} KB | mime: ${req.mimeType} | resourceType: ${req.resourceType}`);
  });
}

console.log('\n=== METRICS BREAKDOWN ===');
for (const key of ['first-contentful-paint', 'largest-contentful-paint', 'total-blocking-time', 'cumulative-layout-shift', 'speed-index']) {
  console.log(`${key}: score ${audits[key]?.score}, displayValue: ${audits[key]?.displayValue}, numericValue: ${audits[key]?.numericValue}`);
}

console.log('\n=== RENDER BLOCKING ===');
console.log(audits['render-blocking-resources']?.details?.items);

console.log('\n=== BOOTUP TIME ===');
if (audits['bootup-time']?.details?.items) {
  audits['bootup-time'].details.items.forEach(item => {
    console.log(`${item.url} - total: ${item.total}ms, scriptEvaluation: ${item.scriptEvaluation}ms`);
  });
}
