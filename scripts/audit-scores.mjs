import fs from 'fs';

const report = JSON.parse(fs.readFileSync('lighthouse-report.json', 'utf-8'));
const audits = report.audits;

console.log('Environment:', report.environment);
console.log('Configuration Form Factor:', report.configSettings?.formFactor);
console.log('Throttling:', report.configSettings?.throttling);

console.log('\n--- Audits Breakdown ---');
for (const [key, audit] of Object.entries(audits)) {
  if (audit.score !== null && audit.score < 0.9 && audit.details) {
    console.log(`[Score ${(audit.score * 100).toFixed(0)}] ${audit.title} (${key}): ${audit.displayValue || ''}`);
  }
}
