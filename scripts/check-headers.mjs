async function checkHeaders() {
  const res = await fetch('http://localhost:3000/');
  console.log('=== HTTP RESPONSE HEADERS ===');
  console.log('Status:', res.status);
  console.log('Content-Security-Policy:', res.headers.get('content-security-policy'));
  console.log('Strict-Transport-Security:', res.headers.get('strict-transport-security'));
  console.log('Cross-Origin-Opener-Policy:', res.headers.get('cross-origin-opener-policy'));
  console.log('X-Content-Type-Options:', res.headers.get('x-content-type-options'));
  console.log('X-Frame-Options:', res.headers.get('x-frame-options'));
  console.log('Referrer-Policy:', res.headers.get('referrer-policy'));
  console.log('Permissions-Policy:', res.headers.get('permissions-policy'));
}
checkHeaders();
