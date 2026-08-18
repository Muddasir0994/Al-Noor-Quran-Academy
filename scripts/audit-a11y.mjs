import fs from 'fs';

const report = JSON.parse(fs.readFileSync('lighthouse-report.json', 'utf-8'));
const audits = report.audits;

console.log('=== ACCESSIBILITY AUDIT DETAILS ===');
for (const [key, audit] of Object.entries(audits)) {
  if (audit.score !== null && audit.score < 1 && audit.details) {
    if (report.categories.accessibility.auditRefs.some(ref => ref.id === key)) {
      console.log(`\n[FAILED] ${audit.title} (${key}) - Score: ${audit.score}`);
      console.log(`Description: ${audit.description}`);
      if (audit.details.items) {
        audit.details.items.forEach(item => {
          console.log(`  - Node: ${item.node?.snippet || item.node?.selector}`);
          console.log(`    Explanation: ${item.node?.explanation || item.subItems?.items || ''}`);
        });
      }
    }
  }
}
