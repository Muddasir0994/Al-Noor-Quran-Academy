import fs from 'fs';

const report = JSON.parse(fs.readFileSync('lighthouse-report.json', 'utf-8'));
const audits = report.audits;

console.log('--- CLS Culprits ---');
if (audits['layout-shifts']?.details?.items) {
  audits['layout-shifts'].details.items.forEach(item => {
    console.log(`Node: ${item.node?.snippet || item.node?.selector || 'unknown'}, score: ${item.score}`);
  });
}

console.log('\n--- Render-Blocking Requests ---');
if (audits['render-blocking-resources']?.details?.items) {
  audits['render-blocking-resources'].details.items.forEach(item => {
    console.log(`Url: ${item.url}, wastedMs: ${item.wastedMs}`);
  });
}

console.log('\n--- LCP Element ---');
console.log(audits['largest-contentful-paint-element']?.details?.items?.[0]?.node);

console.log('\n--- Opportunities ---');
for (const [key, audit] of Object.entries(audits)) {
  if (audit.details?.type === 'opportunity' && audit.numericValue > 0) {
    console.log(`${audit.title} (${key}): wasted ${audit.displayValue || Math.round(audit.numericValue) + 'ms'}`);
  }
}
