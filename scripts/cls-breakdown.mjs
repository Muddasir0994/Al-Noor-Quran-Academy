import fs from 'fs';

const mobileReport = JSON.parse(fs.readFileSync('lighthouse-report.json', 'utf-8'));
const desktopReport = JSON.parse(fs.readFileSync('lighthouse-desktop.json', 'utf-8'));

console.log('=== MOBILE LAYOUT SHIFT AUDIT ===');
const mItems = mobileReport.audits['layout-shifts']?.details?.items || [];
mItems.forEach((item, idx) => {
  console.log(`[Shift #${idx + 1}] Score: ${item.score}`);
  console.log(`Node:`, item.node);
});

console.log('\n=== DESKTOP LAYOUT SHIFT AUDIT ===');
const dItems = desktopReport.audits['layout-shifts']?.details?.items || [];
dItems.forEach((item, idx) => {
  console.log(`[Shift #${idx + 1}] Score: ${item.score}`);
  console.log(`Node:`, item.node);
});

console.log('\n=== MOBILE DIAGNOSTICS ===');
const mAudits = mobileReport.audits;
['largest-contentful-paint-element', 'render-blocking-resources', 'unminified-javascript', 'unused-javascript', 'mainthread-work-breakdown', 'font-display'].forEach(k => {
  console.log(`--- ${k} ---`);
  console.log(mAudits[k]?.details?.items || mAudits[k]?.displayValue || mAudits[k]?.score);
});
