import fs from 'fs';

const report = JSON.parse(fs.readFileSync('lighthouse-desktop.json', 'utf-8'));
const audits = report.audits;

console.log('--- Desktop Layout Shifts ---');
if (audits['layout-shifts']?.details?.items) {
  audits['layout-shifts'].details.items.forEach(item => {
    console.log(`Node: ${item.node?.snippet || item.node?.selector || 'unknown'}, score: ${item.score}`);
  });
}

console.log('\n--- Desktop LCP Element ---');
console.log(audits['largest-contentful-paint-element']?.details?.items?.[0]?.node);

console.log('\n--- Unused JS Breakdown ---');
if (audits['unused-javascript']?.details?.items) {
  audits['unused-javascript'].details.items.forEach(item => {
    console.log(`${item.url} | wasted: ${(item.wastedBytes/1024).toFixed(1)} KB / ${(item.totalBytes/1024).toFixed(1)} KB`);
  });
}
