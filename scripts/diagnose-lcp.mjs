import fs from 'fs';

const report = JSON.parse(fs.readFileSync('lighthouse-report.json', 'utf-8'));
const audits = report.audits;

console.log('=== LCP BREAKDOWN ===');
console.log('LCP displayValue:', audits['largest-contentful-paint']?.displayValue);
console.log('LCP element details:', audits['largest-contentful-paint-element']?.details?.items);

console.log('\n=== NETWORK REQUESTS SUMMARY ===');
let totalBytes = 0;
if (audits['network-requests']?.details?.items) {
  audits['network-requests'].details.items.forEach(req => {
    totalBytes += req.transferSize || 0;
    console.log(`${(req.transferSize/1024).toFixed(1)} KB | ${req.resourceType} | ${req.url}`);
  });
}
console.log(`TOTAL NETWORK BYTES: ${(totalBytes/1024).toFixed(1)} KB`);

console.log('\n=== MAIN THREAD WORK BREAKDOWN ===');
console.log(audits['mainthread-work-breakdown']?.details?.items);
