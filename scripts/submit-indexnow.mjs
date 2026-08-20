/**
 * IndexNow Instant Search Engine Indexing Script
 * Submits all sitemap URLs of Noor E Quran Institute to IndexNow (Bing, Yandex, Seznam, Naver).
 */
import https from 'https';

const INDEXNOW_CONFIG = {
  host: 'noorequraninstitute.me',
  key: '171291dc902c49d0af85b3414442a356',
  keyLocation: 'https://noorequraninstitute.me/171291dc902c49d0af85b3414442a356.txt',
  urlList: [
    'https://noorequraninstitute.me/',
    'https://noorequraninstitute.me/courses',
    'https://noorequraninstitute.me/online-quran-classes',
    'https://noorequraninstitute.me/noorani-qaida',
    'https://noorequraninstitute.me/quran-reading-nazra',
    'https://noorequraninstitute.me/quran-with-tajweed',
    'https://noorequraninstitute.me/quran-memorization-hifz',
    'https://noorequraninstitute.me/islamic-studies',
    'https://noorequraninstitute.me/teachers',
    'https://noorequraninstitute.me/faculty',
    'https://noorequraninstitute.me/tutors',
    'https://noorequraninstitute.me/packages',
    'https://noorequraninstitute.me/pricing',
    'https://noorequraninstitute.me/how-it-works',
    'https://noorequraninstitute.me/methodology',
    'https://noorequraninstitute.me/about',
    'https://noorequraninstitute.me/about-us',
    'https://noorequraninstitute.me/blog',
    'https://noorequraninstitute.me/contact',
    'https://noorequraninstitute.me/faq',
    'https://noorequraninstitute.me/kids-program',
    'https://noorequraninstitute.me/quran-classes-for-kids',
    'https://noorequraninstitute.me/adults-program',
    'https://noorequraninstitute.me/quran-classes-for-adults',
    'https://noorequraninstitute.me/female-tutors',
    'https://noorequraninstitute.me/female-quran-teacher',
    'https://noorequraninstitute.me/online-quran-classes-uk',
    'https://noorequraninstitute.me/online-quran-classes-usa',
    'https://noorequraninstitute.me/online-quran-classes-canada',
    'https://noorequraninstitute.me/online-quran-classes-australia',
    'https://noorequraninstitute.me/online-quran-classes-pakistan'
  ]
};

function submitToIndexNow() {
  const postData = JSON.stringify(INDEXNOW_CONFIG);

  const options = {
    hostname: 'api.indexnow.org',
    port: 443,
    path: '/indexnow',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  console.log(`📡 Submitting ${INDEXNOW_CONFIG.urlList.length} URLs to IndexNow.org...`);

  const req = https.request(options, (res) => {
    console.log(`HTTP Status: ${res.statusCode} ${res.statusMessage}`);
    
    let body = '';
    res.on('data', (chunk) => { body += chunk; });
    res.on('end', () => {
      if (res.statusCode === 200) {
        console.log('✅ Success! IndexNow received and queued all URLs for rapid crawling.');
      } else if (res.statusCode === 202) {
        console.log('⏳ Accepted (202): Key verification is in progress.');
      } else {
        console.log(`ℹ️ Response: ${body || res.statusMessage}`);
      }
    });
  });

  req.on('error', (e) => {
    console.error(`❌ Error submitting to IndexNow: ${e.message}`);
  });

  req.write(postData);
  req.end();
}

submitToIndexNow();
