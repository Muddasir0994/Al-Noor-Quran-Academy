import fs from 'fs';

const report = JSON.parse(fs.readFileSync('lighthouse-desktop.json', 'utf-8'));

const scores = {
  performance: Math.round((report.categories.performance?.score || 0) * 100),
  accessibility: Math.round((report.categories.accessibility?.score || 0) * 100),
  bestPractices: Math.round((report.categories['best-practices']?.score || 0) * 100),
  seo: Math.round((report.categories.seo?.score || 0) * 100),
};

const audits = report.audits;

const metrics = {
  fcp: audits['first-contentful-paint']?.displayValue,
  lcp: audits['largest-contentful-paint']?.displayValue,
  tbt: audits['total-blocking-time']?.displayValue,
  cls: audits['cumulative-layout-shift']?.displayValue,
  speedIndex: audits['speed-index']?.displayValue,
  totalByteWeight: audits['total-byte-weight']?.displayValue,
};

console.log('========================================================');
console.log('         LIGHTHOUSE AUDIT RESULTS (DESKTOP)             ');
console.log('========================================================');
console.log(`PERFORMANCE    : ${scores.performance}/100`);
console.log(`ACCESSIBILITY  : ${scores.accessibility}/100`);
console.log(`BEST PRACTICES : ${scores.bestPractices}/100`);
console.log(`SEO            : ${scores.seo}/100`);
console.log('--------------------------------------------------------');
console.log(`First Contentful Paint (FCP)  : ${metrics.fcp}`);
console.log(`Largest Contentful Paint (LCP): ${metrics.lcp}`);
console.log(`Total Blocking Time (TBT)     : ${metrics.tbt}`);
console.log(`Cumulative Layout Shift (CLS) : ${metrics.cls}`);
console.log(`Speed Index                   : ${metrics.speedIndex}`);
console.log(`Total Page Payload            : ${metrics.totalByteWeight}`);
console.log('========================================================');
