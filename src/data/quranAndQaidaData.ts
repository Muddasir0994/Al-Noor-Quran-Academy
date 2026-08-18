export interface AyahData {
  number: number;
  numberInSurah: number;
  arabic: string;
  transliteration: string;
  english: string;
  urdu: string;
  audioUrl: string;
  tajweedNotes?: string;
}

export interface SurahData {
  number: number;
  name: string;
  arabicName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: 'Meccan' | 'Medinan';
  ayahs: AyahData[];
}

export interface QaidaLetterItem {
  id: string;
  arabic: string;
  name: string;
  transliteration: string;
  makhraj: 'Throat (حلق)' | 'Tongue (لسان)' | 'Lips (شفتان)' | 'Nasal Cavity (خيشوم)' | 'Empty Mouth (جوف)';
  makhrajDetail: string;
  soundType: 'Heavy (مفخم)' | 'Light (مرقق)' | 'Throat' | 'Lip';
  audioPhonetic: string;
}

export interface QaidaLesson {
  id: number;
  title: string;
  arabicTitle: string;
  description: string;
  category: 'Alphabet' | 'Joint Letters' | 'Harakaat' | 'Tanween' | 'Sukoon / Jazm' | 'Tashdeed' | 'Madd';
  items: Array<{
    id: string;
    arabic: string;
    text?: string;
    subText?: string;
    rule?: string;
  }>;
}

export interface MasnoonDuaItem {
  id: string;
  title: string;
  category: 'Morning & Evening' | 'Daily Routine' | 'Protection & Forgiveness' | 'Knowledge & Salah';
  arabic: string;
  transliteration: string;
  english: string;
  urdu: string;
  benefit: string;
  reference: string;
}

export interface SalahStepItem {
  stepNumber: number;
  title: string;
  arabicTitle: string;
  posture: string;
  arabicRecitation: string;
  transliteration: string;
  englishTranslation: string;
  urduTranslation: string;
  importantNotes: string;
}

// -------------------------------------------------------------
// SURAHS DATA (Selected major Surahs for Interactive Mushaf)
// -------------------------------------------------------------
export const QURAN_SURAHS: SurahData[] = [
  {
    number: 1,
    name: 'Al-Fatiha',
    arabicName: 'الفَاتِحَة',
    englishNameTranslation: 'The Opening',
    numberOfAyahs: 7,
    revelationType: 'Meccan',
    ayahs: [
      {
        number: 1,
        numberInSurah: 1,
        arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
        transliteration: 'Bismillāhir-Raḥmānir-Raḥīm',
        english: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
        urdu: 'اللہ کے نام سے شروع جو نہایت مہربان ہمیشہ رحم فرمانے والا ہے',
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/001001.mp3',
        tajweedNotes: 'Lam in Allah is light due to Kasrah in Bismi. Ra is heavy.'
      },
      {
        number: 2,
        numberInSurah: 2,
        arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
        transliteration: 'Al-ḥamdu lillāhi Rabbil-‘ālamīn',
        english: '[All] praise is [due] to Allah, Lord of the worlds -',
        urdu: 'سب تعریفیں اللہ کے لیے ہیں جو تمام جہانوں کا پالنے والا ہے',
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/001002.mp3',
        tajweedNotes: 'Clear Haa from middle of throat (ح). Madd ‘Arid lissukoon on ‘Alameen.'
      },
      {
        number: 3,
        numberInSurah: 3,
        arabic: 'الرَّحْمَٰنِ الرَّحِيمِ',
        transliteration: 'Ar-Raḥmānir-Raḥīm',
        english: 'The Entirely Merciful, the Especially Merciful,',
        urdu: 'نہایت مہربان، ہمیشہ رحم فرمانے والا',
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/001003.mp3',
        tajweedNotes: 'Idgham Shamsi on Ra. Ra is heavy.'
      },
      {
        number: 4,
        numberInSurah: 4,
        arabic: 'مَالِكِ يَوْمِ الدِّينِ',
        transliteration: 'Māliki yawmid-dīn',
        english: 'Sovereign of the Day of Recompense.',
        urdu: 'روزِ جزا کا مالک',
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/001004.mp3',
        tajweedNotes: 'Natural Madd on Maaliki (2 counts). Dal is light and sharp.'
      },
      {
        number: 5,
        numberInSurah: 5,
        arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
        transliteration: 'Iyyāka na‘budu wa-iyyāka nasta‘īn',
        english: 'It is You we worship and You we ask for help.',
        urdu: 'ہم صرف تیری ہی عبادت کرتے ہیں اور صرف تجھ ہی سے مدد چاہتے ہیں',
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/001005.mp3',
        tajweedNotes: 'Tashdeed on Ya (Nabrah). Clear ‘Ayn in na‘budu and nasta‘īn.'
      },
      {
        number: 6,
        numberInSurah: 6,
        arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
        transliteration: 'Ihdināṣ-ṣirāṭal-mustaqīm',
        english: 'Guide us to the straight path -',
        urdu: 'ہمیں سیدھے راستے کی ہدایت فرما',
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/001006.mp3',
        tajweedNotes: 'Sad and Taa are heavy letters (Musta‘liyah). Qaf is heavy.'
      },
      {
        number: 7,
        numberInSurah: 7,
        arabic: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
        transliteration: 'Ṣirāṭallaḏhīna an‘amta ‘alayhim ghayril-maghḍūbi ‘alayhim walāḍ-ḍāllīn',
        english: 'The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.',
        urdu: 'ان لوگوں کا راستہ جن پر تو نے انعام فرمایا، نہ ان کا جن پر غضب ہوا اور نہ گمراہوں کا',
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/001007.mp3',
        tajweedNotes: 'Izhar on an‘amta. Ghayn & Dhad are heavy. Madd Lazim Kalimi Muthaqqal on Dhaallīn (6 counts).'
      }
    ]
  },
  {
    number: 112,
    name: 'Al-Ikhlas',
    arabicName: 'الإِخْلَاص',
    englishNameTranslation: 'The Sincerity (Tawheed)',
    numberOfAyahs: 4,
    revelationType: 'Meccan',
    ayahs: [
      {
        number: 1,
        numberInSurah: 1,
        arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ',
        transliteration: 'Qul huwa-llāhu aḥad',
        english: 'Say, "He is Allah, [who is] One,',
        urdu: 'آپ فرما دیجیے کہ وہ اللہ ایک ہے',
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/112001.mp3',
        tajweedNotes: 'Heavy Qaf. Qalqalah Kubra on Dal when stopping.'
      },
      {
        number: 2,
        numberInSurah: 2,
        arabic: 'اللَّهُ الصَّمَدُ',
        transliteration: 'Allāhuṣ-Ṣamad',
        english: 'Allah, the Eternal Refuge.',
        urdu: 'اللہ بے نیاز ہے (سب اس کے محتاج ہیں)',
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/112002.mp3',
        tajweedNotes: 'Heavy Sad. Qalqalah on Dal.'
      },
      {
        number: 3,
        numberInSurah: 3,
        arabic: 'لَمْ يَلِدْ وَلَمْ يُولَدْ',
        transliteration: 'Lam yalid walam yūlad',
        english: 'He neither begets nor is born,',
        urdu: 'نہ اس سے کوئی پیدا ہوا اور نہ وہ کسی سے پیدا ہوا',
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/112003.mp3',
        tajweedNotes: 'Izhar Shafawi on Meem Sakin. Qalqalah Sughra on Dal in yalid.'
      },
      {
        number: 4,
        numberInSurah: 4,
        arabic: 'وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
        transliteration: 'Walam yakul-lahu kufuwan aḥad',
        english: 'Nor is there to Him any equivalent."',
        urdu: 'اور نہ کوئی اس کا ہمسر ہے',
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/112004.mp3',
        tajweedNotes: 'Idgham Bila Ghunnah on Noon Sakin into Lam (yakul-lahu).'
      }
    ]
  },
  {
    number: 113,
    name: 'Al-Falaq',
    arabicName: 'الفَلَق',
    englishNameTranslation: 'The Daybreak',
    numberOfAyahs: 5,
    revelationType: 'Meccan',
    ayahs: [
      {
        number: 1,
        numberInSurah: 1,
        arabic: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ',
        transliteration: 'Qul a‘ūḏhu bi-Rabbil-falaq',
        english: 'Say, "I seek refuge in the Lord of daybreak',
        urdu: 'آپ عرض کیجیے کہ میں صبح کے رب کی پناہ مانگتا ہوں',
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/113001.mp3',
        tajweedNotes: 'Soft Dhal from tongue tip. Qalqalah Kubra on Qaf when stopping.'
      },
      {
        number: 2,
        numberInSurah: 2,
        arabic: 'مِن شَرِّ مَا خَلَقَ',
        transliteration: 'Min sharri mā khalaq',
        english: 'From the evil of that which He created',
        urdu: 'ہر اس چیز کے شر سے جو اس نے پیدا فرمائی',
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/113002.mp3',
        tajweedNotes: 'Ikhfa Haqiqi with light Ghunnah on Noon Sakin before Sheen.'
      },
      {
        number: 3,
        numberInSurah: 3,
        arabic: 'وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ',
        transliteration: 'Wa-min sharri ghāsiqin iḏhā waqab',
        english: 'And from the evil of darkness when it settles',
        urdu: 'اور اندھیری رات کے شر سے جب وہ چھا جائے',
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/113003.mp3',
        tajweedNotes: 'Izhar on Tanween before Hamza/Alif. Qalqalah on Ba.'
      },
      {
        number: 4,
        numberInSurah: 4,
        arabic: 'وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ',
        transliteration: 'Wa-min sharrin-naffāthāti fīl-‘uqad',
        english: 'And from the evil of the blowers in knots',
        urdu: 'اور گرہوں میں پھونکنے والیوں کے شر سے',
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/113004.mp3',
        tajweedNotes: 'Ghunnah Mushaddadah on Noon (النَّفَّاثَاتِ). Qalqalah on Dal.'
      },
      {
        number: 5,
        numberInSurah: 5,
        arabic: 'وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ',
        transliteration: 'Wa-min sharri ḥāsidin iḏhā ḥasad',
        english: 'And from the evil of an envier when he envies."',
        urdu: 'اور حسد کرنے والے کے شر سے جب وہ حسد کرے',
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/113005.mp3',
        tajweedNotes: 'Izhar on ḥāsidin iḏhā. Qalqalah on Dal.'
      }
    ]
  },
  {
    number: 114,
    name: 'An-Nas',
    arabicName: 'النَّاس',
    englishNameTranslation: 'Mankind',
    numberOfAyahs: 6,
    revelationType: 'Meccan',
    ayahs: [
      {
        number: 1,
        numberInSurah: 1,
        arabic: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ',
        transliteration: 'Qul a‘ūḏhu bi-Rabbin-nās',
        english: 'Say, "I seek refuge in the Lord of mankind,',
        urdu: 'آپ عرض کیجیے کہ میں انسانوں کے پروردگار کی پناہ مانگتا ہوں',
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/114001.mp3',
        tajweedNotes: 'Ghunnah Mushaddadah on Noon in an-Nas (2 counts).'
      },
      {
        number: 2,
        numberInSurah: 2,
        arabic: 'مَلِكِ النَّاسِ',
        transliteration: 'Malikin-nās',
        english: 'The Sovereign of mankind,',
        urdu: 'انسانوں کے بادشاہ کی',
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/114002.mp3',
        tajweedNotes: 'Short Kasrah on Lam (Maliki).'
      },
      {
        number: 3,
        numberInSurah: 3,
        arabic: 'إِلَٰهِ النَّاسِ',
        transliteration: 'Ilāhin-nās',
        english: 'The God of mankind,',
        urdu: 'انسانوں کے معبود کی',
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/114003.mp3',
        tajweedNotes: 'Natural Madd on Ilahi.'
      },
      {
        number: 4,
        numberInSurah: 4,
        arabic: 'مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ',
        transliteration: 'Min sharril-waswāsil-khannās',
        english: 'From the evil of the retreating whisperer -',
        urdu: 'وسوسہ ڈالنے والے، پیچھے ہٹ جانے والے کے شر سے',
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/114004.mp3',
        tajweedNotes: 'Ikhfa on Min sharri. Ghunnah on Khannas.'
      },
      {
        number: 5,
        numberInSurah: 5,
        arabic: 'الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ',
        transliteration: 'Alladhī yuwaswisu fī ṣudūrin-nās',
        english: 'Who whispers into the breasts of mankind -',
        urdu: 'جو لوگوں کے دلوں میں وسوسہ ڈالتا ہے',
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/114005.mp3',
        tajweedNotes: 'Sad is heavy letter from tongue tip & lower teeth.'
      },
      {
        number: 6,
        numberInSurah: 6,
        arabic: 'مِنَ الْجِنَّةِ وَالنَّاسِ',
        transliteration: 'Minal-jinnati wan-nās',
        english: 'From among the jinn and mankind."',
        urdu: 'خواہ وہ جنات میں سے ہو یا انسانوں میں سے',
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/114006.mp3',
        tajweedNotes: 'Full Ghunnah on both Noon Mushaddad.'
      }
    ]
  },
  {
    number: 36,
    name: 'Ya-Sin (Selected Verses)',
    arabicName: 'يسٓ',
    englishNameTranslation: 'Ya-Sin (Heart of Quran)',
    numberOfAyahs: 6,
    revelationType: 'Meccan',
    ayahs: [
      {
        number: 1,
        numberInSurah: 1,
        arabic: 'يسٓ',
        transliteration: 'Yā-Sīn',
        english: 'Ya, Seen.',
        urdu: 'یسٓ (حقیقی معنی اللہ اور رسول ہی بہتر جانتے ہیں)',
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/036001.mp3',
        tajweedNotes: 'Huroof Muqatta‘at: Yaa has Madd Tabee‘i (2 counts), Seen has Madd Lazim Harfi Mukhaffaf (6 counts).'
      },
      {
        number: 2,
        numberInSurah: 2,
        arabic: 'وَالْقُرْآنِ الْحَكِيمِ',
        transliteration: 'Wal-Qur’ānil-Ḥakīm',
        english: 'By the wise Qur\'an.',
        urdu: 'حکمت سے بھرپور قرآن کی قسم',
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/036002.mp3',
        tajweedNotes: 'Qaf is heavy with Dammah. Ra Sakin preceded by Dammah is heavy (Tafkheem).'
      },
      {
        number: 3,
        numberInSurah: 3,
        arabic: 'إِنَّكَ لَمِنَ الْمُرْسَلِينَ',
        transliteration: 'Innaka laminal-mursalīn',
        english: 'Indeed you, [O Muhammad], are from among the messengers,',
        urdu: 'بے شک آپ ضرور رسولوں میں سے ہیں',
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/036003.mp3',
        tajweedNotes: 'Ghunnah on Noon Mushaddad. Ra is heavy.'
      },
      {
        number: 4,
        numberInSurah: 4,
        arabic: 'عَلَىٰ صِرَاطٍ مُّسْتَقِيمٍ',
        transliteration: '‘Alā ṣirāṭim-mustaqīm',
        english: 'On a straight path.',
        urdu: 'سیدھے راستے پر ہیں',
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/036004.mp3',
        tajweedNotes: 'Idgham with Ghunnah from Tanween on Taa into Meem (ṣirāṭim-mustaqīm).'
      },
      {
        number: 5,
        numberInSurah: 5,
        arabic: 'تَنزِيلَ الْعَزِيزِ الرَّحِيمِ',
        transliteration: 'Tanzīlal-‘Azīzir-Raḥīm',
        english: '[This is] a revelation of the Exalted in Might, the Merciful,',
        urdu: 'یہ غالب، نہایت رحم فرمانے والے کا نازل کیا ہوا ہے',
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/036005.mp3',
        tajweedNotes: 'Ikhfa Haqiqi on Noon Sakin before Zaa (Tanzīla).'
      }
    ]
  },
  {
    number: 67,
    name: 'Al-Mulk (Selected Verses)',
    arabicName: 'المُلْك',
    englishNameTranslation: 'The Sovereignty',
    numberOfAyahs: 4,
    revelationType: 'Meccan',
    ayahs: [
      {
        number: 1,
        numberInSurah: 1,
        arabic: 'تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ',
        transliteration: 'Tabārakallaḏhī biyadihil-mulku wahuwa ‘alā kulli shay’in qadīr',
        english: 'Blessed is He in whose hand is dominion, and He is over all things competent -',
        urdu: 'بڑی برکت والا ہے وہ جس کے ہاتھ میں ساری بادشاہی ہے اور وہ ہر چیز پر قادر ہے',
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/067001.mp3',
        tajweedNotes: 'Ikhfa with heavy Ghunnah on shay’in qadīr because Qaf is a heavy letter.'
      },
      {
        number: 2,
        numberInSurah: 2,
        arabic: 'الَّذِي خَلَقَ الْمَوْتَ وَالْحَيَاةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا وَهُوَ الْعَزِيزُ الْغَفُورُ',
        transliteration: 'Alladhī khalaqal-mawta wal-ḥayāta liyabluwakum ayyukum aḥsanu ‘amalā, wahuwal-‘Azīzul-Ghafūr',
        english: '[He] who created death and life to test you [as to] which of you is best in deed - and He is the Exalted in Might, the Forgiving -',
        urdu: 'جس نے موت اور زندگی کو پیدا کیا تاکہ تمہیں آزمائے کہ تم میں سے عمل کے لحاظ سے کون بہتر ہے',
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/067002.mp3',
        tajweedNotes: 'Qalqalah Sughra on Ba in liyabluwakum. Madd ‘Iwad on ‘amalā (2 counts).'
      },
      {
        number: 3,
        numberInSurah: 3,
        arabic: 'الَّذِي خَلَقَ سَبْعَ سَمَاوَاتٍ طِبَاقًا',
        transliteration: 'Alladhī khalaqa sab‘a samāwātin ṭibāqā',
        english: '[And] who created seven heavens in layers.',
        urdu: 'جس نے سات آسمان اوپر تلے پیدا فرمائے',
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/067003.mp3',
        tajweedNotes: 'Qalqalah on Ba in sab‘a. Ikhfa with heavy Ghunnah on samāwātin ṭibāqā.'
      }
    ]
  }
];

// -------------------------------------------------------------
// NOORANI QAIDA LESSONS & MAKHARIJ
// -------------------------------------------------------------
export const QAIDA_ALPHABET: QaidaLetterItem[] = [
  { id: 'alif', arabic: 'ا', name: 'Alif', transliteration: 'A', makhraj: 'Empty Mouth (جوف)', makhrajDetail: 'Originates from the empty space of the mouth and throat. Air passes freely.', soundType: 'Light (مرقق)', audioPhonetic: 'Alif' },
  { id: 'baa', arabic: 'ب', name: 'Baa', transliteration: 'B', makhraj: 'Lips (شفتان)', makhrajDetail: 'Formed by closing the wet inner parts of both upper and lower lips together.', soundType: 'Lip', audioPhonetic: 'Baa' },
  { id: 'taa', arabic: 'ت', name: 'Taa', transliteration: 'T', makhraj: 'Tongue (لسان)', makhrajDetail: 'Tip of the tongue touching the roots of the upper two front teeth (incisors).', soundType: 'Light (مرقق)', audioPhonetic: 'Taa' },
  { id: 'thaa', arabic: 'ث', name: 'Thaa', transliteration: 'Th', makhraj: 'Tongue (لسان)', makhrajDetail: 'Tip of the tongue slightly touching the edge of the upper two front teeth.', soundType: 'Light (مرقق)', audioPhonetic: 'Thaa' },
  { id: 'jeem', arabic: 'ج', name: 'Jeem', transliteration: 'J', makhraj: 'Tongue (لسان)', makhrajDetail: 'Middle of the tongue touching the hard palate roof of the mouth.', soundType: 'Light (مرقق)', audioPhonetic: 'Jeem' },
  { id: 'haa', arabic: 'ح', name: 'Haa (Small/Throat)', transliteration: 'Ḥ', makhraj: 'Throat (حلق)', makhrajDetail: 'Middle of the throat (Wasat al-Halq). Sharp, raspy pure breath sound.', soundType: 'Throat', audioPhonetic: 'Haa' },
  { id: 'khaa', arabic: 'خ', name: 'Khaa', transliteration: 'Kh', makhraj: 'Throat (حلق)', makhrajDetail: 'Top of the throat nearest to the mouth (Adna al-Halq). Deep, scraping heavy sound.', soundType: 'Heavy (مفخم)', audioPhonetic: 'Khaa' },
  { id: 'daal', arabic: 'د', name: 'Daal', transliteration: 'D', makhraj: 'Tongue (لسان)', makhrajDetail: 'Tip of the tongue against the base of the upper front incisors. Qalqalah letter.', soundType: 'Light (مرقق)', audioPhonetic: 'Daal' },
  { id: 'dhaal', arabic: 'ذ', name: 'Dhaal', transliteration: 'Dh', makhraj: 'Tongue (لسان)', makhrajDetail: 'Tip of the tongue against the bottom edge of the upper front teeth. Soft sound.', soundType: 'Light (مرقق)', audioPhonetic: 'Dhaal' },
  { id: 'raa', arabic: 'ر', name: 'Raa', transliteration: 'R', makhraj: 'Tongue (لسان)', makhrajDetail: 'Tip and top of the tongue touching the gum ridge of upper teeth.', soundType: 'Heavy (مفخم)', audioPhonetic: 'Raa' },
  { id: 'zaa', arabic: 'ز', name: 'Zaa', transliteration: 'Z', makhraj: 'Tongue (لسان)', makhrajDetail: 'Tip of the tongue just behind the edges of lower front teeth with a whistling sound (Saffeer).', soundType: 'Light (مرقق)', audioPhonetic: 'Zaa' },
  { id: 'seen', arabic: 'س', name: 'Seen', transliteration: 'S', makhraj: 'Tongue (لسان)', makhrajDetail: 'Tip of the tongue close to the edges of the lower front teeth. Whistle sound.', soundType: 'Light (مرقق)', audioPhonetic: 'Seen' },
  { id: 'sheen', arabic: 'ش', name: 'Sheen', transliteration: 'Sh', makhraj: 'Tongue (لسان)', makhrajDetail: 'Middle of the tongue against the hard palate with spreading breath (Tafash-shee).', soundType: 'Light (مرقق)', audioPhonetic: 'Sheen' },
  { id: 'saad', arabic: 'ص', name: 'Saad', transliteration: 'Ṣ', makhraj: 'Tongue (لسان)', makhrajDetail: 'Heavy whistling letter: Tip of tongue near lower teeth, back of tongue elevated.', soundType: 'Heavy (مفخم)', audioPhonetic: 'Saad' },
  { id: 'dhaad', arabic: 'ض', name: 'Dhaad', transliteration: 'Ḍ', makhraj: 'Tongue (لسان)', makhrajDetail: 'One or both sides of the tongue pressed against the upper left/right molars. Most unique Arabic letter.', soundType: 'Heavy (مفخم)', audioPhonetic: 'Dhaad' },
  { id: 'toa', arabic: 'ط', name: 'Toa / Taa', transliteration: 'Ṭ', makhraj: 'Tongue (لسان)', makhrajDetail: 'Heaviest letter: Tip of tongue against upper front teeth roots with back of tongue strongly raised.', soundType: 'Heavy (مفخم)', audioPhonetic: 'Toa' },
  { id: 'zoa', arabic: 'ظ', name: 'Zoa / Zhaa', transliteration: 'Ẓ', makhraj: 'Tongue (لسان)', makhrajDetail: 'Tip of tongue touching edges of upper teeth with back of tongue elevated.', soundType: 'Heavy (مفخم)', audioPhonetic: 'Zoa' },
  { id: 'ayn', arabic: 'ع', name: '‘Ayn', transliteration: '‘A', makhraj: 'Throat (حلق)', makhrajDetail: 'Middle of the throat (Wasat al-Halq). Deep constriction of the epiglottis.', soundType: 'Throat', audioPhonetic: 'Ayn' },
  { id: 'ghayn', arabic: 'غ', name: 'Ghayn', transliteration: 'Gh', makhraj: 'Throat (حلق)', makhrajDetail: 'Top of throat closest to mouth (Adna al-Halq). Smooth, heavy gargling sound.', soundType: 'Heavy (مفخم)', audioPhonetic: 'Ghayn' },
  { id: 'faa', arabic: 'ف', name: 'Faa', transliteration: 'F', makhraj: 'Lips (شفتان)', makhrajDetail: 'Edge of upper front teeth resting gently on the inside wet part of the lower lip.', soundType: 'Lip', audioPhonetic: 'Faa' },
  { id: 'qaaf', arabic: 'ق', name: 'Qaaf', transliteration: 'Q', makhraj: 'Tongue (لسان)', makhrajDetail: 'Deepest back part of the tongue touching the soft palate (Uvula). Very heavy, Qalqalah letter.', soundType: 'Heavy (مفخم)', audioPhonetic: 'Qaaf' },
  { id: 'kaaf', arabic: 'ك', name: 'Kaaf', transliteration: 'K', makhraj: 'Tongue (لسان)', makhrajDetail: 'Back of tongue slightly forward of Qaaf, against hard palate with gentle puff of air (Hams).', soundType: 'Light (مرقق)', audioPhonetic: 'Kaaf' },
  { id: 'laam', arabic: 'ل', name: 'Laam', transliteration: 'L', makhraj: 'Tongue (لسان)', makhrajDetail: 'Sides of the front of the tongue touching the gum ridge of upper teeth.', soundType: 'Light (مرقق)', audioPhonetic: 'Laam' },
  { id: 'meem', arabic: 'م', name: 'Meem', transliteration: 'M', makhraj: 'Lips (شفتان)', makhrajDetail: 'Closing the dry outer surface of both upper and lower lips together. Has intrinsic Ghunnah.', soundType: 'Lip', audioPhonetic: 'Meem' },
  { id: 'noon', arabic: 'ن', name: 'Noon', transliteration: 'N', makhraj: 'Tongue (لسان)', makhrajDetail: 'Tip of the tongue against the upper gum line with sound echoing in nasal passage.', soundType: 'Light (مرقق)', audioPhonetic: 'Noon' },
  { id: 'waw', arabic: 'و', name: 'Waw', transliteration: 'W', makhraj: 'Lips (شفتان)', makhrajDetail: 'Rounding the lips into an incomplete circle without upper and lower teeth touching.', soundType: 'Lip', audioPhonetic: 'Waw' },
  { id: 'haa_big', arabic: 'هـ', name: 'Haa (Deep/Chest)', transliteration: 'H', makhraj: 'Throat (حلق)', makhrajDetail: 'Deepest base of the throat closest to the vocal cords (Aqsa al-Halq). Deep sigh sound.', soundType: 'Throat', audioPhonetic: 'Haa' },
  { id: 'hamza', arabic: 'ء', name: 'Hamza', transliteration: '’', makhraj: 'Throat (حلق)', makhrajDetail: 'Deepest base of the throat by closing vocal cords completely (Glottal stop).', soundType: 'Throat', audioPhonetic: 'Hamza' },
  { id: 'yaa', arabic: 'ي', name: 'Yaa', transliteration: 'Y', makhraj: 'Tongue (لسان)', makhrajDetail: 'Middle of the tongue raised towards the roof of the mouth without touching.', soundType: 'Light (مرقق)', audioPhonetic: 'Yaa' }
];

export const QAIDA_LESSONS: QaidaLesson[] = [
  {
    id: 1,
    title: 'Lesson 1: The Arabic Alphabet (Huroof Mufradaat)',
    arabicTitle: 'الدرس الأول: حُرُوفُ المُفْرَدَات',
    description: 'Learn the 29 individual Arabic letters with exact Makharij (origin points) and pronunciation rules.',
    category: 'Alphabet',
    items: QAIDA_ALPHABET.map(l => ({ id: l.id, arabic: l.arabic, text: l.name, subText: l.transliteration, rule: l.soundType }))
  },
  {
    id: 2,
    title: 'Lesson 2: Joint Letters (Huroof Murakkabaat)',
    arabicTitle: 'الدرس الثاني: حُرُوفُ المُرَكَّبَات',
    description: 'Master how letters change shapes and connect at the beginning, middle, and end of words.',
    category: 'Joint Letters',
    items: [
      { id: 'm-1', arabic: 'لا', text: 'Lam - Alif', subText: 'Combination of Lam & Alif', rule: 'Joint' },
      { id: 'm-2', arabic: 'با', text: 'Baa - Alif', subText: 'Baa at start connected to Alif', rule: 'Joint' },
      { id: 'm-3', arabic: 'بل', text: 'Baa - Lam', subText: 'Baa connected to Lam', rule: 'Joint' },
      { id: 'm-4', arabic: 'كـتـب', text: 'Kaaf - Taa - Baa', subText: '3-letter root word connection', rule: 'Joint' },
      { id: 'm-5', arabic: 'يـعـلـم', text: 'Yaa - Ayn - Lam - Meem', subText: 'Middle Ayn shape connection', rule: 'Joint' },
      { id: 'm-6', arabic: 'نـحـن', text: 'Noon - Haa - Noon', subText: 'Middle sharp Haa connection', rule: 'Joint' },
      { id: 'm-7', arabic: 'تـجـري', text: 'Taa - Jeem - Raa - Yaa', subText: 'Jeem and curved Yaa ending', rule: 'Joint' },
      { id: 'm-8', arabic: 'فـسـيـكـفـيـكـهـم', text: 'Fa - Sa - Ya - Kaaf - Fa - Ya - Kaaf - Haa - Meem', subText: 'Longest connection drill in Quran', rule: 'Joint' }
    ]
  },
  {
    id: 3,
    title: 'Lesson 3: Short Vowels (Harakaat: Zabar, Zer, Pesh)',
    arabicTitle: 'الدرس الثالث: الحَرَكَات (فَتْحَة، كَسْرَة، ضَمَّة)',
    description: 'Learn short movement vowels: Fathah (Zabar), Kasrah (Zer), and Dammah (Pesh). Must be pronounced quickly without stretching.',
    category: 'Harakaat',
    items: [
      { id: 'h-1', arabic: 'أَ', text: 'Hamza Fathah (A)', subText: 'Short "a" sound (1 count)', rule: 'Fathah / Zabar' },
      { id: 'h-2', arabic: 'إِ', text: 'Hamza Kasrah (I)', subText: 'Short "i" sound (1 count)', rule: 'Kasrah / Zer' },
      { id: 'h-3', arabic: 'أُ', text: 'Hamza Dammah (U)', subText: 'Short "u" sound (1 count)', rule: 'Dammah / Pesh' },
      { id: 'h-4', arabic: 'بَ - بِ - بُ', text: 'Ba - Bi - Bu', subText: 'Baa with all three short vowels', rule: 'Combined' },
      { id: 'h-5', arabic: 'تَ - تِ - تُ', text: 'Ta - Ti - Tu', subText: 'Taa with all three short vowels', rule: 'Combined' },
      { id: 'h-6', arabic: 'دَرَسَ', text: 'Da-Ra-Sa', subText: 'Word with 3 Fathahs', rule: 'Word drill' },
      { id: 'h-7', arabic: 'سَمِعَ', text: 'Sa-Mi-‘A', subText: 'Fathah + Kasrah + Fathah', rule: 'Word drill' },
      { id: 'h-8', arabic: 'رُسُلُ', text: 'Ru-Su-Lu', subText: 'Word with 3 Dammahs', rule: 'Word drill' }
    ]
  },
  {
    id: 4,
    title: 'Lesson 4: Double Vowels (Tanween: Two Zabars, Two Zers, Two Pesh)',
    arabicTitle: 'الدرس الرابع: التَّنْوِين (ـً ـٍ ـٌ)',
    description: 'Tanween produces a hidden Noon Sakin sound at the end of nouns.',
    category: 'Tanween',
    items: [
      { id: 't-1', arabic: 'بً', text: 'Baa Two Fathahs (Ban)', subText: 'Produces "an" sound with lip contact', rule: 'Fathatayn' },
      { id: 't-2', arabic: 'بٍ', text: 'Baa Two Kasrahs (Bin)', subText: 'Produces "in" sound below letter', rule: 'Kasratayn' },
      { id: 't-3', arabic: 'بٌ', text: 'Baa Two Dammahs (Bun)', subText: 'Produces "un" sound above letter', rule: 'Dammatayn' },
      { id: 't-4', arabic: 'عَلِيمًا', text: '‘Alīman', subText: 'Tanween Fathah with Alif', rule: 'Word drill' },
      { id: 't-5', arabic: 'حَكِيمٌ', text: 'Ḥakīmun', subText: 'Tanween Dammah on Meem', rule: 'Word drill' },
      { id: 't-6', arabic: 'قَوْمٍ', text: 'Qawmin', subText: 'Tanween Kasrah on Meem', rule: 'Word drill' }
    ]
  },
  {
    id: 5,
    title: 'Lesson 5: Resting Mark & Echo Letters (Sukoon / Jazm & Qalqalah)',
    arabicTitle: 'الدرس الخامس: السُّكُون والقَلْقَلَة',
    description: 'When a letter has a Sukoon (Jazm), it rests on the preceding vowel. The 5 Qalqalah letters (ق، ط، ب، ج، د) produce a sharp bouncing echo.',
    category: 'Sukoon / Jazm',
    items: [
      { id: 's-1', arabic: 'أَبْ', text: 'Ab (Qalqalah on Baa)', subText: 'Lips bounce apart sharply', rule: 'Qalqalah' },
      { id: 's-2', arabic: 'أَقْ', text: 'Aq (Qalqalah on Qaaf)', subText: 'Deep throat/palate bounce', rule: 'Qalqalah' },
      { id: 's-3', arabic: 'أَطْ', text: 'Aṭ (Qalqalah on Toa)', subText: 'Heavy tongue bounce', rule: 'Qalqalah' },
      { id: 's-4', arabic: 'أَجْ', text: 'Aj (Qalqalah on Jeem)', subText: 'Middle palate snap', rule: 'Qalqalah' },
      { id: 's-5', arabic: 'أَدْ', text: 'Ad (Qalqalah on Daal)', subText: 'Front teeth tongue snap', rule: 'Qalqalah' },
      { id: 's-6', arabic: 'يَجْعَلْ', text: 'Yaj‘al', subText: 'In-word Qalqalah on Jeem', rule: 'Word drill' }
    ]
  },
  {
    id: 6,
    title: 'Lesson 6: Doubled Letters & Nasal Hum (Tashdeed & Ghunnah)',
    arabicTitle: 'الدرس السادس: التَّشْدِيد والغُنَّة',
    description: 'Tashdeed indicates a letter read twice (first Sakin, second with Harakah). Noon and Meem with Tashdeed MUST have 2 counts of Ghunnah (nasal hum).',
    category: 'Tashdeed',
    items: [
      { id: 'td-1', arabic: 'إِنَّ', text: 'Inna (Ghunnah on Noon)', subText: '2 counts of clear nasal sound', rule: 'Ghunnah' },
      { id: 'td-2', arabic: 'ثُمَّ', text: 'Thumma (Ghunnah on Meem)', subText: '2 counts of lip nasal hum', rule: 'Ghunnah' },
      { id: 'td-3', arabic: 'رَبَّنَا', text: 'Rabbanā', subText: 'Double Baa with strong emphasis', rule: 'Tashdeed' },
      { id: 'td-4', arabic: 'الصِّرَاطَ', text: 'Aṣ-Ṣirāṭ', subText: 'Sun letter Idgham with Tashdeed', rule: 'Tashdeed' }
    ]
  }
];

// -------------------------------------------------------------
// 40 MASNOON DUAS (Selected high-benefit Daily Duas)
// -------------------------------------------------------------
export const MASNOON_DUAS: MasnoonDuaItem[] = [
  {
    id: 'dua-1',
    title: 'Dua Before Starting Anything / Studying Quran',
    category: 'Knowledge & Salah',
    arabic: 'رَّبِّ زِدْنِي عِلْمًا',
    transliteration: 'Rabbi zidnī ‘ilmā',
    english: 'My Lord, increase me in beneficial knowledge.',
    urdu: 'اے میرے رب! میرے علم میں اضافہ فرما۔',
    benefit: 'Recited before class, memorization, and exams for mental clarity.',
    reference: 'Surah Taha (20:114)'
  },
  {
    id: 'dua-2',
    title: 'Dua for Ease and Speech Eloquence (Musa AS)',
    category: 'Knowledge & Salah',
    arabic: 'رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي وَاحْلُلْ عُقْدَةً مِّن لِّسَانِي يَفْقَهُوا قَوْلِي',
    transliteration: 'Rabbish-raḥ lī ṣadrī, wa-yassir lī amrī, waḥ-lul ‘uqdatam-mil-lisānī, yafqahū qawlī',
    english: 'My Lord, expand for me my chest, and ease for me my task, and untie the knot from my tongue that they may understand my speech.',
    urdu: 'اے میرے رب! میرے لیے میرا سینہ کھول دے، اور میرا کام آسان کر دے، اور میری زبان کی گرہ کھول دے تاکہ لوگ میری بات سمجھ سکیں۔',
    benefit: 'Overcomes stuttering, anxiety, and boosts Quranic speech mastery.',
    reference: 'Surah Taha (20:25-28)'
  },
  {
    id: 'dua-3',
    title: 'Dua for Parents (Dua for Father & Mother)',
    category: 'Daily Routine',
    arabic: 'رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
    transliteration: 'Rabbir-ḥamhumā kamā rabbayānī ṣaghīrā',
    english: 'My Lord, have mercy upon them as they brought me up when I was small.',
    urdu: 'اے میرے رب! ان دونوں پر رحم فرما جس طرح انہوں نے مجھے بچپن میں پالا۔',
    benefit: 'The best gift children can give to parents in this life and the hereafter.',
    reference: 'Surah Al-Isra (17:24)'
  },
  {
    id: 'dua-4',
    title: 'Dua When Waking Up in the Morning',
    category: 'Morning & Evening',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
    transliteration: 'Al-ḥamdu lillāhil-laḏhī aḥyānā ba‘da mā amātanā wa-ilayhin-nushūr',
    english: 'Praise is to Allah who gave us life after He caused us to die, and unto Him is the resurrection.',
    urdu: 'سب تعریفیں اللہ کے لیے ہیں جس نے ہمیں مارنے کے بعد زندہ کیا اور اسی کی طرف لوٹ کر جانا ہے۔',
    benefit: 'Begins your morning with gratitude and divine remembrance.',
    reference: 'Sahih Bukhari (6312)'
  },
  {
    id: 'dua-5',
    title: 'Dua for Ultimate Protection (Ayat-ul-Kursi excerpt)',
    category: 'Protection & Forgiveness',
    arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ',
    transliteration: 'Allāhu lā ilāha illā huwal-Ḥayyul-Qayyūm, lā ta’khuḏhuhū sinatuw-walā nawm',
    english: 'Allah - there is no deity except Him, the Ever-Living, the Sustainer of all existence. Neither drowsiness overtakes Him nor sleep.',
    urdu: 'اللہ ہی کے لیے تمام حاکمیت ہے، اس کے سوا کوئی معبود نہیں، وہ زندہ ہے سب کو سنبھالنے والا، نہ اسے اونگھ آتی ہے نہ نیند۔',
    benefit: 'Guarantees angel protection throughout the day and night against all evils.',
    reference: 'Surah Al-Baqarah (2:255)'
  },
  {
    id: 'dua-6',
    title: 'Sayyidul Istighfar (The Master of Forgiveness)',
    category: 'Protection & Forgiveness',
    arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَىٰ عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ',
    transliteration: 'Allāhumma anta Rabbī lā ilāha illā anta, khalaqtanī wa-anā ‘abduka, wa-anā ‘alā ‘ahdika wa-wa‘dika mastata‘tu',
    english: 'O Allah, You are my Lord, there is no deity except You. You created me and I am Your servant, and I am on Your covenant and promise as much as I can.',
    urdu: 'اے اللہ! تو ہی میرا رب ہے، تیرے سوا کوئی عبادت کے لائق نہیں، تو نے مجھے پیدا کیا اور میں تیرا بندہ ہوں اور تیرے عہد پر قائم ہوں۔',
    benefit: 'The Prophet ﷺ said whoever recites this with conviction during day or night and dies will be among the people of Jannah.',
    reference: 'Sahih Bukhari (6306)'
  }
];

// -------------------------------------------------------------
// STEP-BY-STEP SALAH (NAMAZ) GUIDE
// -------------------------------------------------------------
export const SALAH_STEPS: SalahStepItem[] = [
  {
    stepNumber: 1,
    title: 'Takbeer-e-Tehrima (Beginning Prayer)',
    arabicTitle: 'تَكْبِيرَةُ الإِحْرَام',
    posture: 'Standing upright facing Qiblah, raising both hands to earlobes (men) or shoulders (women).',
    arabicRecitation: 'اللَّهُ أَكْبَرُ',
    transliteration: 'Allāhu Akbar',
    englishTranslation: 'Allah is the Greatest.',
    urduTranslation: 'اللہ سب سے بڑا ہے۔',
    importantNotes: 'Fix gaze on the place of prostration (Sajdah spot). Fold hands below navel (men) or over chest (women).'
  },
  {
    stepNumber: 2,
    title: 'Thanaa (Opening Praise)',
    arabicTitle: 'دُعَاءُ الاِسْتِفْتَاح (الثَّنَاء)',
    posture: 'Standing in Qiyam with hands folded peacefully.',
    arabicRecitation: 'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ وَتَبَارَكَ اسْمُكَ وَتَعَالَىٰ جَدُّكَ وَلَا إِلَٰهَ غَيْرُكَ',
    transliteration: 'Subḥānakal-lāhumma wa-biḥamdika wa-tabārakasmuka wa-ta‘ālā jadduka wa-lā ilāha ghayruk',
    englishTranslation: 'Glory be to You, O Allah, and with Your praise, and blessed is Your name, and exalted is Your majesty, and there is no deity besides You.',
    urduTranslation: 'پاک ہے تو اے اللہ اپنی تعریفوں کے ساتھ، اور برکت والا ہے تیرا نام، اور بلند ہے تیری شان اور تیرے سوا کوئی معبود نہیں۔',
    importantNotes: 'Recited silently in the first Rak‘ah followed by Ta‘awwuz (A‘udhu Billah) and Tasmiyah (Bismillah).'
  },
  {
    stepNumber: 3,
    title: 'Ruku (Bowing Down)',
    arabicTitle: 'الرُّكُوع',
    posture: 'Bowing with back flat and horizontal, holding knees firmly with fingers spread.',
    arabicRecitation: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ (3x)',
    transliteration: 'Subḥāna Rabbiyal-‘Aẓīm (3 times)',
    englishTranslation: 'Glory be to my Lord, the Magnificent (recite at least 3 times).',
    urduTranslation: 'پاک ہے میرا رب جو بڑی عظمت والا ہے۔ (۳ بار)',
    importantNotes: 'Pronounce Zhaa (ظ) in Azim with heaviness from tongue tip.'
  },
  {
    stepNumber: 4,
    title: 'Qawmah (Rising from Ruku)',
    arabicTitle: 'القَوْمَة وَالتَّحْمِيد',
    posture: 'Standing completely straight and relaxed before going down.',
    arabicRecitation: 'سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ ۖ رَبَّنَا لَكَ الْحَمْدُ',
    transliteration: 'Sami‘allāhu liman ḥamidah, Rabbanā lakal-ḥamd',
    englishTranslation: 'Allah hears whoever praises Him. Our Lord, to You belongs all praise.',
    urduTranslation: 'اللہ نے سن لیا اس کو جس نے اس کی تعریف کی، اے ہمارے رب! تمام تعریفیں تیرے ہی لیے ہیں۔',
    importantNotes: 'Pause for at least 1-2 seconds with full spine uprightness.'
  },
  {
    stepNumber: 5,
    title: 'Sajdah (Prostration)',
    arabicTitle: 'السُّجُود',
    posture: 'Prostrating with 7 body parts touching the ground: forehead & nose, both palms, both knees, and toes curled forward towards Qiblah.',
    arabicRecitation: 'سُبْحَانَ رَبِّيَ الْأَعْلَىٰ (3x)',
    transliteration: 'Subḥāna Rabbiyal-A‘lā (3 times)',
    englishTranslation: 'Glory be to my Lord, the Most High (recite at least 3 times).',
    urduTranslation: 'پاک ہے میرا رب جو سب سے بلند و بالا ہے۔ (۳ بار)',
    importantNotes: 'The servant is closest to Allah during Sajdah; make heartfelt sincere Duas.'
  },
  {
    stepNumber: 6,
    title: 'Tashahhud (Sitting & Attahiyyat)',
    arabicTitle: 'التَّشَهُّد وَالتَّحِيَّات',
    posture: 'Sitting on left foot with right foot upright (Iftirash).',
    arabicRecitation: 'التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَىٰ عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَن لَّا إِلَٰهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
    transliteration: 'At-taḥiyyātu lillāhi waṣ-ṣalawātu waṭ-ṭayyibāt, as-salāmu ‘alayka ayyuhan-Nabiyyu wa-raḥmatullāhi wa-barakātuh, as-salāmu ‘alaynā wa-‘alā ‘ibādillāhiṣ-ṣāliḥīn, ash-hadu allā ilāha illallāh, wa-ash-hadu anna Muḥammadan ‘abduhū wa-rasūluh',
    englishTranslation: 'All compliments, prayers and pure words are due to Allah. Peace be upon you, O Prophet, and the mercy of Allah and His blessings. Peace be upon us and upon the righteous servants of Allah. I bear witness that none has the right to be worshipped but Allah, and I bear witness that Muhammad is His slave and Messenger.',
    urduTranslation: 'تمام قولی، بدنی اور مالی عبادتیں اللہ کے لیے ہیں۔ آپ پر سلام ہو اے نبی اور اللہ کی رحمت اور اس کی برکتیں ہوں۔ سلام ہو ہم پر اور اللہ کے نیک بندوں پر۔ میں گواہی دیتا ہوں کہ اللہ کے سوا کوئی معبود نہیں اور محمد ﷺ اس کے بندے اور رسول ہیں۔',
    importantNotes: 'Raise the right index finger at "Ash-hadu alla ilaha" and lower it at "illallah".'
  }
];
