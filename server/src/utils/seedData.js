export const initialCategories = [
  {
    slug: 'kannada-basics',
    title: 'Kannada Basics',
    titleKannada: 'ಕನ್ನಡ ಮೂಲಗಳು',
    description: 'Master Kannada vowels (ಸ್ವರಗಳು), consonants (ವ್ಯಂಜನಗಳು), and essential foundation words.',
    icon: '🔤',
    color: '#E87532',
    order: 1
  },
  {
    slug: 'greetings-and-introductions',
    title: 'Greetings & Introductions',
    titleKannada: 'ಶುಭಾಶಯಗಳು ಮತ್ತು ಪರಿಚಯ',
    description: 'Learn respectful greetings, self-introductions, and polite expressions for daily interaction.',
    icon: '👋',
    color: '#237A57',
    order: 2
  },
  {
    slug: 'everyday-conversations',
    title: 'Everyday Conversations',
    titleKannada: 'ದೈನಂದಿನ ಸಂಭಾಷಣೆಗಳು',
    description: 'Common colloquial exchanges with neighbours, vendors, and friends.',
    icon: '💬',
    color: '#3B82F6',
    order: 3
  },
  {
    slug: 'travel-and-transportation',
    title: 'Travel & Transportation',
    titleKannada: 'ಪ್ರಯಾಣ ಮತ್ತು ಸಾರಿಗೆ',
    description: 'Navigate auto-rickshaws, BMTC buses, Namma Metro, and ask for accurate directions.',
    icon: '🚌',
    color: '#F59E0B',
    order: 4
  },
  {
    slug: 'shopping-and-payments',
    title: 'Shopping & Payments',
    titleKannada: 'ಖರೀದಿ ಮತ್ತು ಪಾವತಿಗಳು',
    description: 'Ask prices, negotiate respectfully, and enquire about UPI / card payments.',
    icon: '🛍️',
    color: '#EC4899',
    order: 5
  },
  {
    slug: 'food-and-restaurants',
    title: 'Food & Restaurants',
    titleKannada: 'ಆಹಾರ ಮತ್ತು ಉಪಹಾರ ಗೃಹಗಳು',
    description: 'Order Karnataka delicacies like dosas, bisi bele bath, filter coffee, and request spice levels.',
    icon: '🍛',
    color: '#10B981',
    order: 6
  },
  {
    slug: 'healthcare-and-emergencies',
    title: 'Healthcare & Emergencies',
    titleKannada: 'ಆರೋಗ್ಯ ಮತ್ತು ತುರ್ತು ಸಂದರ್ಭಗಳು',
    description: 'Explain symptoms at clinics, buy medicines at pharmacies, and ask for urgent assistance.',
    icon: '🩺',
    color: '#EF4444',
    order: 7
  },
  {
    slug: 'education-and-workplace',
    title: 'Education & Workplace',
    titleKannada: 'ಶಿಕ್ಷಣ ಮತ್ತು ಕೆಲಸದ ಸ್ಥಳ',
    description: 'Communicate respectfully with colleagues, ask for clarification, and engage in campus life.',
    icon: '💼',
    color: '#8B5CF6',
    order: 8
  },
  {
    slug: 'numbers-dates-and-time',
    title: 'Numbers, Dates & Time',
    titleKannada: 'ಸಂಖ್ಯೆಗಳು, ದಿನಾಂಕಗಳು ಮತ್ತು ಸಮಯ',
    description: 'Count, understand prices, schedule appointments, and ask what time it is.',
    icon: '⏰',
    color: '#06B6D4',
    order: 9
  },
  {
    slug: 'culture-and-etiquette',
    title: 'Culture & Etiquette',
    titleKannada: 'ಕನ್ನಡ ಸಂಸ್ಕೃತಿ ಮತ್ತು ಶಿಷ್ಟಾಚಾರ',
    description: 'Appreciate Karnataka traditions, Rajyotsava, respectful suffixes like -ri and -re.',
    icon: '🪔',
    color: '#D97706',
    order: 10
  }
];

export const initialLessons = [
  {
    categorySlug: 'kannada-basics',
    slug: 'vowels-and-simple-words',
    title: 'First Kannada Sounds & Words',
    titleKannada: 'ಮೊದಲ ಕನ್ನಡ ಶಬ್ದಗಳು',
    description: 'Understand basic phonetics, polite pronouns, and simple affirmation phrases.',
    difficulty: 'beginner',
    order: 1,
    estimatedMinutes: 5,
    culturalNote: 'Kannada is an agglutinative language where suffixes add rich shades of respect and grammatical case.',
    dialogue: [
      { speaker: 'Ravi', kannada: 'ಹೌದು, ನಾನು ಕಲಿಯುತ್ತಿದ್ದೇನೆ.', transliteration: 'Haudu, nānu kaliyuttiddēne.', english: 'Yes, I am learning.' },
      { speaker: 'Ananya', kannada: 'ತುಂಬಾ ಒಳ್ಳೆಯದು!', transliteration: 'Tumbā oḷḷeyadu!', english: 'Very good!' }
    ]
  },
  {
    categorySlug: 'greetings-and-introductions',
    slug: 'meeting-someone-new',
    title: 'Warm Greetings & Names',
    titleKannada: 'ಶುಭಾಶಯ ಮತ್ತು ಹೆಸರುಗಳು',
    description: 'Learn how to greet someone politely and share your name.',
    difficulty: 'beginner',
    order: 1,
    estimatedMinutes: 6,
    culturalNote: 'Namaskara (ನಮಸ್ಕಾರ) is used universally at any time of day with palms folded together.',
    dialogue: [
      { speaker: 'Suresh', kannada: 'ನಮಸ್ಕಾರ! ನಿಮ್ಮ ಹೆಸರೇನು?', transliteration: 'Namaskāra! Nimma hesarēnu?', english: 'Hello! What is your name?' },
      { speaker: 'Priya', kannada: 'ನಮಸ್ಕಾರ, ನನ್ನ ಹೆಸರು ಪ್ರಿಯಾ.', transliteration: 'Namaskāra, nanna hesaru Priya.', english: 'Hello, my name is Priya.' }
    ]
  },
  {
    categorySlug: 'everyday-conversations',
    slug: 'asking-how-are-you',
    title: 'How Are You & Wellbeing',
    titleKannada: 'ಹೇಗಿದ್ದೀರಾ ಮತ್ತು ಕ್ಷೇಮ',
    description: 'Enquire about well-being and respond with natural everyday warmth.',
    difficulty: 'beginner',
    order: 1,
    estimatedMinutes: 5,
    culturalNote: 'Asking "ಊಟ ಆಯ್ತಾ?" (Did you have food?) is a genuine Kannada expression of care and hospitality.',
    dialogue: [
      { speaker: 'Kiran', kannada: 'ನೀವು ಹೇಗಿದ್ದೀರಾ?', transliteration: 'Nīvu hēgiddīra?', english: 'How are you?' },
      { speaker: 'Ramesh', kannada: 'ನಾನು ಚೆನ್ನಾಗಿದ್ದೇನೆ, ಧನ್ಯವಾದಗಳು!', transliteration: 'Nānu cennāgiddēne, dhanyavādagaḷu!', english: 'I am fine, thank you!' }
    ]
  },
  {
    categorySlug: 'travel-and-transportation',
    slug: 'taking-an-auto-or-bus',
    title: 'Auto-Rickshaw & Bus Travel',
    titleKannada: 'ಆಟೋ ಮತ್ತು ಬಸ್ ಪ್ರಯಾಣ',
    description: 'Ask for destinations, meter fares, and bus stops in Bengaluru and across Karnataka.',
    difficulty: 'beginner',
    order: 1,
    estimatedMinutes: 7,
    culturalNote: 'Adding "ಮೀಟರ್ ಹಾಕಿ" (Meter hāki - please turn on the meter) is common when hailing an auto in Bengaluru.',
    dialogue: [
      { speaker: 'Passenger', kannada: 'ಎಂ.ಜಿ. ರಸ್ತೆಗೆ ಹೋಗ್ತೀರಾ?', transliteration: 'M.G. rastege hōgtīra?', english: 'Will you go to M.G. Road?' },
      { speaker: 'Driver', kannada: 'ಹೌದು, ಬನ್ನಿ ಕುಳಿತುಕೊಳ್ಳಿ.', transliteration: 'Haudu, banni kuḷitukoḷḷi.', english: 'Yes, please come and sit.' }
    ]
  },
  {
    categorySlug: 'shopping-and-payments',
    slug: 'market-shopping-and-upi',
    title: 'Market Bargaining & Digital Pay',
    titleKannada: 'ಮಾರುಕಟ್ಟೆ ಖರೀದಿ ಮತ್ತು ಪಾವತಿ',
    description: 'Enquire about vegetable prices, ask for discounts politely, and ask for QR code scanning.',
    difficulty: 'intermediate',
    order: 1,
    estimatedMinutes: 6,
    culturalNote: '"ಸ್ವಲ್ಪ ಕಡಿಮೆ ಮಾಡಿ" (Please reduce a little) is the polite standard way to negotiate prices in local markets.',
    dialogue: [
      { speaker: 'Customer', kannada: 'ಈ ಹಣ್ಣು ಒಂದು ಕೆಜಿಗೆ ಎಷ್ಟು?', transliteration: 'Ī haṇṇu ondu kējige eṣṭu?', english: 'How much is this fruit per kilo?' },
      { speaker: 'Vendor', kannada: 'ಎಂಬತ್ತು ರೂಪಾಯಿ.', transliteration: 'Embattu rūpāyi.', english: 'Eighty rupees.' },
      { speaker: 'Customer', kannada: 'ಗೂಗಲ್ ಪೇ ಇದೆಯಾ?', transliteration: 'Google Pay ideyā?', english: 'Do you have Google Pay?' }
    ]
  },
  {
    categorySlug: 'food-and-restaurants',
    slug: 'ordering-at-darshini',
    title: 'Ordering at a Darshini Restaurant',
    titleKannada: 'ಹೋಟೆಲ್‌ನಲ್ಲಿ ಊಟ ಮತ್ತು ತಿಂಡಿ',
    description: 'Order breakfast items, filter coffee, and request less spice or extra sambar.',
    difficulty: 'beginner',
    order: 1,
    estimatedMinutes: 6,
    culturalNote: 'Darshinis are iconic quick-service South Indian restaurants with standing tables and freshly made coffee.',
    dialogue: [
      { speaker: 'Customer', kannada: 'ಒಂದು ಮಸಾಲೆ ದೋಸೆ ಮತ್ತು ಫಿಲ್ಟರ್ ಕಾಫಿ ಕೊಡಿ.', transliteration: 'Ondu masāle dōse mattu filter coffee koḍi.', english: 'Please give one masala dosa and filter coffee.' },
      { speaker: 'Cashier', kannada: 'ಖಂಡಿತ, ಟೋಕನ್ ತೆಗೆದುಕೊಳ್ಳಿ.', transliteration: 'Khaṇḍita, tōkan tegedukoḷḷi.', english: 'Sure, please take the token.' }
    ]
  },
  {
    categorySlug: 'healthcare-and-emergencies',
    slug: 'clinic-and-pharmacy',
    title: 'Visiting a Doctor or Pharmacy',
    titleKannada: 'ವೈದ್ಯರ ಭೇಟಿ ಮತ್ತು ಔಷಧ',
    description: 'Communicate fever, headache, stomach pain, and ask how to take medicine.',
    difficulty: 'intermediate',
    order: 1,
    estimatedMinutes: 6,
    culturalNote: 'Pharmacy staff in Karnataka are generally multilingual, but speaking Kannada helps convey exact symptoms immediately.',
    dialogue: [
      { speaker: 'Patient', kannada: 'ನನಗೆ ಜ್ವರ ಮತ್ತು ತಲೆನೋವು ಇದೆ.', transliteration: 'Nanage jvara mattu talenōvu ide.', english: 'I have fever and a headache.' },
      { speaker: 'Doctor', kannada: 'ಈ ಮಾತ್ರೆಗಳನ್ನು ಊಟದ ನಂತರ ತಗೊಳ್ಳಿ.', transliteration: 'Ī mātregaḷannu ūṭada nantara tagoḷḷi.', english: 'Take these tablets after food.' }
    ]
  },
  {
    categorySlug: 'education-and-workplace',
    slug: 'office-and-collaboration',
    title: 'Workplace Courtesy & Clarity',
    titleKannada: 'ಕಚೇರಿ ಮಾತುಕತೆ',
    description: 'Polite questions in meetings, asking someone to repeat, and scheduling discussions.',
    difficulty: 'intermediate',
    order: 1,
    estimatedMinutes: 5,
    culturalNote: 'In corporate Bengaluru, using basic Kannada with support staff, security, and cab drivers fosters warm camaraderie.',
    dialogue: [
      { speaker: 'Colleague 1', kannada: 'ದಯವಿಟ್ಟು ಮತ್ತೆ ಹೇಳಿ, ಅರ್ಥವಾಗಲಿಲ್ಲ.', transliteration: 'Dayaviṭṭu matte hēḷi, arthavāgalilla.', english: 'Please say that again, I did not understand.' },
      { speaker: 'Colleague 2', kannada: 'ಖಂಡಿತ, ನಾನು ಮತ್ತೆ ವಿವರಿಸುತ್ತೇನೆ.', transliteration: 'Khaṇḍita, nānu matte vivarisuttēne.', english: 'Sure, I will explain again.' }
    ]
  },
  {
    categorySlug: 'numbers-dates-and-time',
    slug: 'counting-and-time',
    title: 'Numbers 1 to 10 & Telling Time',
    titleKannada: 'ಸಂಖ್ಯೆಗಳು ಮತ್ತು ಸಮಯ',
    description: 'Learn cardinal numbers, time enquiries, and today/tomorrow expressions.',
    difficulty: 'beginner',
    order: 1,
    estimatedMinutes: 5,
    culturalNote: 'Understanding numbers helps immensely with auto meters, market rates, and bus platform numbers.',
    dialogue: [
      { speaker: 'Learner', kannada: 'ಈಗ ಸಮಯ ಎಷ್ಟು?', transliteration: 'Īga samaya eṣṭu?', english: 'What time is it now?' },
      { speaker: 'Speaker', kannada: 'ಈಗ ಮೂರು ಗಂಟೆ.', transliteration: 'Īga mūru gaṇṭe.', english: 'It is three o’clock now.' }
    ]
  },
  {
    categorySlug: 'culture-and-etiquette',
    slug: 'kannada-heritage-and-respect',
    title: 'Respectful Terms & Karnataka Culture',
    titleKannada: 'ಗೌರವ ಮತ್ತು ಸಂಸ್ಕೃತಿ',
    description: 'Discover respectful pronouns (ತಾವು, ನೀವು), Karnataka Rajyotsava, and celebrating the Kannada language.',
    difficulty: 'beginner',
    order: 1,
    estimatedMinutes: 6,
    culturalNote: 'November 1st is celebrated across Karnataka as Kannada Rajyotsava (Karnataka Formation Day) with red and yellow flags.',
    dialogue: [
      { speaker: 'Friend', kannada: 'ಕನ್ನಡ ರಾಜ್ಯೋತ್ಸವದ ಶುಭಾಶಯಗಳು!', transliteration: 'Kannaḍa rājyōtsavada śubhāśayagaḷu!', english: 'Happy Kannada Rajyotsava!' },
      { speaker: 'Learner', kannada: 'ನಿಮಗೂ ಶುಭಾಶಯಗಳು! ಸಿರಿಗನ್ನಡಂ ಗೆಲ್ಗೆ!', transliteration: 'Nimagu śubhāśayagaḷu! Sirigannaḍaṁ gelge!', english: 'Greetings to you too! Long live glorious Kannada!' }
    ]
  }
];

// Seed phrases: All 20 original phrases from index.html are preserved + 25 additional essential phrases!
export const initialPhrases = [
  // 1 to 6: Basics (from original)
  {
    kannada: 'ನಮಸ್ಕಾರ',
    transliteration: 'Namaskāra',
    english: 'Hello / Greetings',
    categorySlug: 'greetings-and-introductions',
    lessonSlug: 'meeting-someone-new',
    difficulty: 'beginner',
    tags: ['greeting', 'polite'],
    usageContext: 'Universal polite greeting used with palms folded, suitable at any time.',
    exampleSentenceKn: 'ನಮಸ್ಕಾರ ಸರ್, ಹೇಗಿದ್ದೀರಾ?',
    exampleSentenceEn: 'Hello sir, how are you?'
  },
  {
    kannada: 'ಧನ್ಯವಾದಗಳು',
    transliteration: 'Dhanyavādagaḷu',
    english: 'Thank you',
    categorySlug: 'greetings-and-introductions',
    lessonSlug: 'meeting-someone-new',
    difficulty: 'beginner',
    tags: ['courtesy', 'polite'],
    usageContext: 'Use to express gratitude in both formal and casual settings.',
    exampleSentenceKn: 'ನಿಮ್ಮ ಸಹಾಯಕ್ಕೆ ಧನ್ಯವಾದಗಳು.',
    exampleSentenceEn: 'Thank you for your help.'
  },
  {
    kannada: 'ದಯವಿಟ್ಟು',
    transliteration: 'Dayaviṭṭu',
    english: 'Please',
    categorySlug: 'greetings-and-introductions',
    lessonSlug: 'meeting-someone-new',
    difficulty: 'beginner',
    tags: ['request', 'polite'],
    usageContext: 'Prefix or suffix to make any request courteous.',
    exampleSentenceKn: 'ದಯವಿಟ್ಟು ಇಲ್ಲಿ ಕುಳಿತುಕೊಳ್ಳಿ.',
    exampleSentenceEn: 'Please sit here.'
  },
  {
    kannada: 'ಕ್ಷಮಿಸಿ',
    transliteration: 'Kṣamisi',
    english: 'Excuse me / Sorry',
    categorySlug: 'greetings-and-introductions',
    lessonSlug: 'meeting-someone-new',
    difficulty: 'beginner',
    tags: ['apology', 'polite'],
    usageContext: 'Use when bumping into someone or asking someone to get their attention.',
    exampleSentenceKn: 'ಕ್ಷಮಿಸಿ, ಒಂದು ಪ್ರಶ್ನೆ ಕೇಳಬಹುದೇ?',
    exampleSentenceEn: 'Excuse me, may I ask a question?'
  },
  {
    kannada: 'ನಿಮ್ಮ ಹೆಸರೇನು?',
    transliteration: 'Nimma hesarēnu?',
    english: 'What is your name?',
    categorySlug: 'greetings-and-introductions',
    lessonSlug: 'meeting-someone-new',
    difficulty: 'beginner',
    tags: ['question', 'introduction'],
    usageContext: 'Polite formal phrasing for asking someone’s name.',
    exampleSentenceKn: 'ನಮಸ್ಕಾರ, ನಿಮ್ಮ ಹೆಸರೇನು?',
    exampleSentenceEn: 'Hello, what is your name?'
  },
  {
    kannada: 'ನನ್ನ ಹೆಸರು …',
    transliteration: 'Nanna hesaru …',
    english: 'My name is …',
    categorySlug: 'greetings-and-introductions',
    lessonSlug: 'meeting-someone-new',
    difficulty: 'beginner',
    tags: ['introduction'],
    usageContext: 'Add your name after "hesaru" to introduce yourself.',
    exampleSentenceKn: 'ನನ್ನ ಹೆಸರು ರಾಹುಲ್.',
    exampleSentenceEn: 'My name is Rahul.'
  },

  // 7 to 10: Travel (from original)
  {
    kannada: 'ಬಸ್ ನಿಲ್ದಾಣ ಎಲ್ಲಿದೆ?',
    transliteration: 'Bus nilḍāṇa ellide?',
    english: 'Where is the bus stop?',
    categorySlug: 'travel-and-transportation',
    lessonSlug: 'taking-an-auto-or-bus',
    difficulty: 'beginner',
    tags: ['travel', 'directions', 'bus'],
    usageContext: 'Very helpful when looking for BMTC or KSRTC bus stands.',
    exampleSentenceKn: 'ಕ್ಷಮಿಸಿ, ಮೆಜೆಸ್ಟಿಕ್ ಬಸ್ ನಿಲ್ದಾಣ ಎಲ್ಲಿದೆ?',
    exampleSentenceEn: 'Excuse me, where is the Majestic bus station?'
  },
  {
    kannada: 'ಇದು ಎಷ್ಟು ದೂರ?',
    transliteration: 'Idu eṣṭu dūra?',
    english: 'How far is this?',
    categorySlug: 'travel-and-transportation',
    lessonSlug: 'taking-an-auto-or-bus',
    difficulty: 'beginner',
    tags: ['distance', 'travel'],
    usageContext: 'Enquiring distance when walking or traveling.',
    exampleSentenceKn: 'ಇಲ್ಲಿಂದ ರೈಲ್ವೆ ನಿಲ್ದಾಣ ಎಷ್ಟು ದೂರ?',
    exampleSentenceEn: 'How far is the railway station from here?'
  },
  {
    kannada: 'ನನಗೆ ಸಹಾಯ ಬೇಕು',
    transliteration: 'Nanage sahāya bēku',
    english: 'I need help',
    categorySlug: 'travel-and-transportation',
    lessonSlug: 'taking-an-auto-or-bus',
    difficulty: 'beginner',
    tags: ['help', 'urgent'],
    usageContext: 'Use whenever you need assistance or directions.',
    exampleSentenceKn: 'ದಯವಿಟ್ಟು, ನನಗೆ ಸಹಾಯ ಬೇಕು.',
    exampleSentenceEn: 'Please, I need help.'
  },
  {
    kannada: 'ಎಡಕ್ಕೆ ತಿರುಗಿ',
    transliteration: 'Eḍakke tirugi',
    english: 'Turn left',
    categorySlug: 'travel-and-transportation',
    lessonSlug: 'taking-an-auto-or-bus',
    difficulty: 'beginner',
    tags: ['directions'],
    usageContext: 'Direction instruction when guiding a driver or following directions.',
    exampleSentenceKn: 'ಮುಂದಿನ ವೃತ್ತದಲ್ಲಿ ಎಡಕ್ಕೆ ತಿರುಗಿ.',
    exampleSentenceEn: 'Turn left at the next roundabout.'
  },

  // 11 to 14: Shopping (from original)
  {
    kannada: 'ಇದು ಎಷ್ಟು?',
    transliteration: 'Idu eṣṭu?',
    english: 'How much is this?',
    categorySlug: 'shopping-and-payments',
    lessonSlug: 'market-shopping-and-upi',
    difficulty: 'beginner',
    tags: ['shopping', 'price'],
    usageContext: 'Point at any item to ask its price.',
    exampleSentenceKn: 'ಅಣ್ಣಾ, ಇದು ಎಷ್ಟು?',
    exampleSentenceEn: 'Brother, how much is this?'
  },
  {
    kannada: 'ನೀರು ಬೇಕು',
    transliteration: 'Nīru bēku',
    english: 'I would like water',
    categorySlug: 'food-and-restaurants',
    lessonSlug: 'ordering-at-darshini',
    difficulty: 'beginner',
    tags: ['food', 'request'],
    usageContext: 'Simple request for drinking water at restaurants or homes.',
    exampleSentenceKn: 'ಕುಡಿಯಲು ಬಿಸಿ ನೀರು ಬೇಕು.',
    exampleSentenceEn: 'I need warm drinking water.'
  },
  {
    kannada: 'ಮೆನು ಕೊಡಿ',
    transliteration: 'Menu koḍi',
    english: 'Please give me the menu',
    categorySlug: 'food-and-restaurants',
    lessonSlug: 'ordering-at-darshini',
    difficulty: 'beginner',
    tags: ['restaurant', 'request'],
    usageContext: 'Requesting the food menu at a sit-down hotel.',
    exampleSentenceKn: 'ದಯವಿಟ್ಟು ಊಟದ ಮೆನು ಕೊಡಿ.',
    exampleSentenceEn: 'Please give me the lunch menu.'
  },
  {
    kannada: 'ಖಾರ ಕಡಿಮೆ ಮಾಡಿ',
    transliteration: 'Khāra kaḍime māḍi',
    english: 'Please make it less spicy',
    categorySlug: 'food-and-restaurants',
    lessonSlug: 'ordering-at-darshini',
    difficulty: 'intermediate',
    tags: ['food', 'taste'],
    usageContext: 'Ask chefs or waitstaff to reduce chili heat.',
    exampleSentenceKn: 'ಸಾಂಬಾರ್‌ನಲ್ಲಿ ಖಾರ ಕಡಿಮೆ ಮಾಡಿ.',
    exampleSentenceEn: 'Please make the sambar less spicy.'
  },

  // 15 to 17: Healthcare (from original)
  {
    kannada: 'ವೈದ್ಯರು ಎಲ್ಲಿದ್ದಾರೆ?',
    transliteration: 'Vaidyaru elliddāre?',
    english: 'Where is the doctor?',
    categorySlug: 'healthcare-and-emergencies',
    lessonSlug: 'clinic-and-pharmacy',
    difficulty: 'beginner',
    tags: ['health', 'doctor'],
    usageContext: 'Enquiring for the doctor at a dispensary or hospital.',
    exampleSentenceKn: 'ಆಸ್ಪತ್ರೆಯಲ್ಲಿ ವೈದ್ಯರು ಎಲ್ಲಿದ್ದಾರೆ?',
    exampleSentenceEn: 'Where is the doctor in the hospital?'
  },
  {
    kannada: 'ನನಗೆ ನೋವಾಗುತ್ತಿದೆ',
    transliteration: 'Nanage nōvāguttide',
    english: 'I am feeling pain',
    categorySlug: 'healthcare-and-emergencies',
    lessonSlug: 'clinic-and-pharmacy',
    difficulty: 'intermediate',
    tags: ['health', 'symptom'],
    usageContext: 'Explaining physical discomfort to healthcare providers.',
    exampleSentenceKn: 'ನನಗೆ ಹೊಟ್ಟೆಯಲ್ಲಿ ನೋವಾಗುತ್ತಿದೆ.',
    exampleSentenceEn: 'I am having pain in my stomach.'
  },

  // 18 to 20: Work & Study (from original)
  {
    kannada: 'ನನಗೆ ಅರ್ಥವಾಯಿತು',
    transliteration: 'Nanage arthavāyitu',
    english: 'I understand',
    categorySlug: 'education-and-workplace',
    lessonSlug: 'office-and-collaboration',
    difficulty: 'beginner',
    tags: ['work', 'comprehension'],
    usageContext: 'Confirming that you understood an instruction or explanation.',
    exampleSentenceKn: 'ಹೌದು, ನೀವು ಹೇಳಿದ್ದು ನನಗೆ ಅರ್ಥವಾಯಿತು.',
    exampleSentenceEn: 'Yes, I understood what you said.'
  },
  {
    kannada: 'ದಯವಿಟ್ಟು ಮತ್ತೆ ಹೇಳಿ',
    transliteration: 'Dayaviṭṭu matte hēḷi',
    english: 'Please say that again',
    categorySlug: 'education-and-workplace',
    lessonSlug: 'office-and-collaboration',
    difficulty: 'beginner',
    tags: ['work', 'request'],
    usageContext: 'Politely asking someone to repeat something you missed.',
    exampleSentenceKn: 'ನನಗೆ ಕೇಳಿಸಲಿಲ್ಲ, ದಯವಿಟ್ಟು ಮತ್ತೆ ಹೇಳಿ.',
    exampleSentenceEn: 'I could not hear, please say that again.'
  },
  {
    kannada: 'ನನಗೆ ಗೊತ್ತಿಲ್ಲ',
    transliteration: 'Nanage gottilla',
    english: 'I do not know',
    categorySlug: 'education-and-workplace',
    lessonSlug: 'office-and-collaboration',
    difficulty: 'beginner',
    tags: ['work', 'conversational'],
    usageContext: 'Simple, direct way to express lack of information.',
    exampleSentenceKn: 'ಕ್ಷಮಿಸಿ, ಈ ವಿಷಯ ನನಗೆ ಗೊತ್ತಿಲ್ಲ.',
    exampleSentenceEn: 'Sorry, I do not know about this matter.'
  },

  // Additional 20+ authentic phrases covering all categories:
  {
    kannada: 'ಹೌದು',
    transliteration: 'Haudu',
    english: 'Yes',
    categorySlug: 'kannada-basics',
    lessonSlug: 'vowels-and-simple-words',
    difficulty: 'beginner',
    tags: ['basics', 'affirmation'],
    usageContext: 'Everyday affirmative response.',
    exampleSentenceKn: 'ಹೌದು, ಇದು ಸರಿ.',
    exampleSentenceEn: 'Yes, this is correct.'
  },
  {
    kannada: 'ಇಲ್ಲ',
    transliteration: 'Illa',
    english: 'No / Not available',
    categorySlug: 'kannada-basics',
    lessonSlug: 'vowels-and-simple-words',
    difficulty: 'beginner',
    tags: ['basics', 'negation'],
    usageContext: 'Everyday negative or non-availability response.',
    exampleSentenceKn: 'ನನ್ನ ಬಳಿ ಹಣ ಇಲ್ಲ.',
    exampleSentenceEn: 'I do not have money with me.'
  },
  {
    kannada: 'ನೀವು ಹೇಗಿದ್ದೀರಾ?',
    transliteration: 'Nīvu hēgiddīra?',
    english: 'How are you? (Polite)',
    categorySlug: 'everyday-conversations',
    lessonSlug: 'asking-how-are-you',
    difficulty: 'beginner',
    tags: ['greetings', 'polite'],
    usageContext: 'Standard respectful greeting question when meeting anyone.',
    exampleSentenceKn: 'ನಮಸ್ಕಾರ ಸರ್, ನೀವು ಹೇಗಿದ್ದೀರಾ?',
    exampleSentenceEn: 'Hello sir, how are you?'
  },
  {
    kannada: 'ನಾನು ಚೆನ್ನಾಗಿದ್ದೇನೆ',
    transliteration: 'Nānu cennāgiddēne',
    english: 'I am doing well',
    categorySlug: 'everyday-conversations',
    lessonSlug: 'asking-how-are-you',
    difficulty: 'beginner',
    tags: ['response', 'wellbeing'],
    usageContext: 'Reply to "ಹೇಗಿದ್ದೀರಾ?".',
    exampleSentenceKn: 'ನಾನು ಚೆನ್ನಾಗಿದ್ದೇನೆ, ನೀವು ಹೇಗಿದ್ದೀರಾ?',
    exampleSentenceEn: 'I am doing well, how are you?'
  },
  {
    kannada: 'ಊಟ ಆಯ್ತಾ?',
    transliteration: 'Ūṭa āytā?',
    english: 'Did you have your meal?',
    categorySlug: 'everyday-conversations',
    lessonSlug: 'asking-how-are-you',
    difficulty: 'beginner',
    tags: ['culture', 'care'],
    usageContext: 'Very common, warm Karnataka conversational check-in.',
    exampleSentenceKn: 'ಬನ್ನಿ ಕುಳಿತುಕೊಳ್ಳಿ, ಊಟ ಆಯ್ತಾ?',
    exampleSentenceEn: 'Come sit down, did you eat?'
  },
  {
    kannada: 'ಬಲಕ್ಕೆ ತಿರುಗಿ',
    transliteration: 'Balakke tirugi',
    english: 'Turn right',
    categorySlug: 'travel-and-transportation',
    lessonSlug: 'taking-an-auto-or-bus',
    difficulty: 'beginner',
    tags: ['directions'],
    usageContext: 'Navigation instruction.',
    exampleSentenceKn: 'ಸಿಗ್ನಲ್ ದಾಟಿ ಬಲಕ್ಕೆ ತಿರುಗಿ.',
    exampleSentenceEn: 'Cross the signal and turn right.'
  },
  {
    kannada: 'ನೇರವಾಗಿ ಹೋಗಿ',
    transliteration: 'Nēravāgi hōgi',
    english: 'Go straight',
    categorySlug: 'travel-and-transportation',
    lessonSlug: 'taking-an-auto-or-bus',
    difficulty: 'beginner',
    tags: ['directions'],
    usageContext: 'Common directional advice.',
    exampleSentenceKn: 'ಮುಂದೆ ನೇರವಾಗಿ ಹೋಗಿ.',
    exampleSentenceEn: 'Go straight ahead.'
  },
  {
    kannada: 'ಮೀಟರ್ ಹಾಕಿ',
    transliteration: 'Mīṭar hāki',
    english: 'Please turn on the meter',
    categorySlug: 'travel-and-transportation',
    lessonSlug: 'taking-an-auto-or-bus',
    difficulty: 'beginner',
    tags: ['auto', 'travel'],
    usageContext: 'Standard request to auto-rickshaw drivers.',
    exampleSentenceKn: 'ಅಣ್ಣಾ, ಮೀಟರ್ ಹಾಕಿ ಹೋಗಿ.',
    exampleSentenceEn: 'Brother, please turn on the meter and go.'
  },
  {
    kannada: 'ಸ್ವಲ್ಪ ಕಡಿಮೆ ಮಾಡಿ',
    transliteration: 'Svalpa kaḍime māḍi',
    english: 'Please reduce the price a little',
    categorySlug: 'shopping-and-payments',
    lessonSlug: 'market-shopping-and-upi',
    difficulty: 'intermediate',
    tags: ['shopping', 'bargaining'],
    usageContext: 'Polite bargaining at street markets.',
    exampleSentenceKn: 'ತುಂಬಾ ಜಾಸ್ತಿ ಇದೆ, ಸ್ವಲ್ಪ ಕಡಿಮೆ ಮಾಡಿ.',
    exampleSentenceEn: 'It is too high, please reduce it a little.'
  },
  {
    kannada: 'ಗೂಗಲ್ ಪೇ ಇದೆಯಾ?',
    transliteration: 'Google Pay ideyā?',
    english: 'Do you accept Google Pay / UPI?',
    categorySlug: 'shopping-and-payments',
    lessonSlug: 'market-shopping-and-upi',
    difficulty: 'beginner',
    tags: ['shopping', 'payments'],
    usageContext: 'Ubiquitous question in shops across Karnataka.',
    exampleSentenceKn: 'ಕ್ಯಾಶ್ ಇಲ್ಲ, ಗೂಗಲ್ ಪೇ ಇದೆಯಾ?',
    exampleSentenceEn: 'I do not have cash, do you accept Google Pay?'
  },
  {
    kannada: 'ಒಂದು ಕಪ್ ಕಾಫಿ ಕೊಡಿ',
    transliteration: 'Ondu kappu kāfi koḍi',
    english: 'Please give one cup of coffee',
    categorySlug: 'food-and-restaurants',
    lessonSlug: 'ordering-at-darshini',
    difficulty: 'beginner',
    tags: ['food', 'darshini'],
    usageContext: 'Ordering filter coffee at any bakery or restaurant.',
    exampleSentenceKn: 'ಬಿಸಿ ಬಿಸಿ ಒಂದು ಕಪ್ ಕಾಫಿ ಕೊಡಿ.',
    exampleSentenceEn: 'Please give one cup of piping hot coffee.'
  },
  {
    kannada: 'ತುಂಬಾ ರುಚಿಯಾಗಿದೆ',
    transliteration: 'Tumbā ruciyāgide',
    english: 'It is very delicious',
    categorySlug: 'food-and-restaurants',
    lessonSlug: 'ordering-at-darshini',
    difficulty: 'beginner',
    tags: ['compliment', 'food'],
    usageContext: 'Praising food cooked by host or at a hotel.',
    exampleSentenceKn: 'ಊಟ ತುಂಬಾ ರುಚಿಯಾಗಿದೆ.',
    exampleSentenceEn: 'The meal is very delicious.'
  },
  {
    kannada: 'ಈಗ ಸಮಯ ಎಷ್ಟು?',
    transliteration: 'Īga samaya eṣṭu?',
    english: 'What is the time now?',
    categorySlug: 'numbers-dates-and-time',
    lessonSlug: 'counting-and-time',
    difficulty: 'beginner',
    tags: ['time'],
    usageContext: 'Enquiring time.',
    exampleSentenceKn: 'ಕ್ಷಮಿಸಿ, ಈಗ ಸಮಯ ಎಷ್ಟು?',
    exampleSentenceEn: 'Excuse me, what time is it now?'
  },
  {
    kannada: 'ಇವತ್ತು ಮತ್ತು ನಾಳೆ',
    transliteration: 'Ivattu mattu nāḷe',
    english: 'Today and tomorrow',
    categorySlug: 'numbers-dates-and-time',
    lessonSlug: 'counting-and-time',
    difficulty: 'beginner',
    tags: ['time', 'dates'],
    usageContext: 'Scheduling dates and days.',
    exampleSentenceKn: 'ನಾಳೆ ನಾನು ಬರುತ್ತೇನೆ.',
    exampleSentenceEn: 'I will come tomorrow.'
  },
  {
    kannada: 'ಒಂದು, ಎರಡು, ಮೂರು',
    transliteration: 'Ondu, eraḍu, mūru',
    english: 'One, two, three',
    categorySlug: 'numbers-dates-and-time',
    lessonSlug: 'counting-and-time',
    difficulty: 'beginner',
    tags: ['numbers'],
    usageContext: 'First foundational numbers.',
    exampleSentenceKn: 'ನನಗೆ ಮೂರು ಟಿಕೆಟ್ ಕೊಡಿ.',
    exampleSentenceEn: 'Give me three tickets.'
  },
  {
    kannada: 'ಕನ್ನಡ ರಾಜ್ಯೋತ್ಸವ',
    transliteration: 'Kannaḍa Rājyōtsava',
    english: 'Karnataka Formation Day celebration',
    categorySlug: 'culture-and-etiquette',
    lessonSlug: 'kannada-heritage-and-respect',
    difficulty: 'beginner',
    tags: ['culture', 'festival'],
    usageContext: 'Celebrated every year on November 1st.',
    exampleSentenceKn: 'ಎಲ್ಲರಿಗೂ ಕನ್ನಡ ರಾಜ್ಯೋತ್ಸವದ ಹಾರ್ದಿಕ ಶುಭಾಶಯಗಳು.',
    exampleSentenceEn: 'Hearty Kannada Rajyotsava wishes to everyone.'
  },
  {
    kannada: 'ಕನ್ನಡ ಕಲಿಯುವುದು ಸುಲಭ',
    transliteration: 'Kannaḍa kaliyuvudu sulabha',
    english: 'Learning Kannada is easy',
    categorySlug: 'culture-and-etiquette',
    lessonSlug: 'kannada-heritage-and-respect',
    difficulty: 'beginner',
    tags: ['encouragement', 'learning'],
    usageContext: 'Positive affirmation for learners.',
    exampleSentenceKn: 'ಪ್ರತಿದಿನ ಅಭ್ಯಾಸ ಮಾಡಿದರೆ ಕನ್ನಡ ಕಲಿಯುವುದು ಸುಲಭ.',
    exampleSentenceEn: 'If you practice daily, learning Kannada is easy.'
  }
];

export const initialQuizzes = [
  {
    categorySlug: 'greetings-and-introductions',
    title: 'Beginner Kannada Greetings Quiz',
    description: 'Test your understanding of everyday Kannada greetings and courtesy words.',
    difficulty: 'beginner',
    passingScore: 60,
    questions: [
      {
        id: 'q1',
        questionText: 'What is the English meaning of "ನಮಸ್ಕಾರ" (Namaskāra)?',
        questionKannada: 'ನಮಸ್ಕಾರ',
        type: 'multiple_choice',
        options: [
          { id: 'opt-1', text: 'Hello / Greetings' },
          { id: 'opt-2', text: 'Goodbye' },
          { id: 'opt-3', text: 'Thank you' },
          { id: 'opt-4', text: 'How much?' }
        ],
        correctAnswerId: 'opt-1',
        explanation: '"ನಮಸ್ಕಾರ" (Namaskāra) is the universal respectful greeting in Kannada.'
      },
      {
        id: 'q2',
        questionText: 'Which phrase means "Thank you" in Kannada?',
        questionKannada: 'Thank you',
        type: 'translation',
        options: [
          { id: 'opt-1', text: 'ದಯವಿಟ್ಟು (Dayaviṭṭu)' },
          { id: 'opt-2', text: 'ಧನ್ಯವಾದಗಳು (Dhanyavādagaḷu)' },
          { id: 'opt-3', text: 'ಕ್ಷಮಿಸಿ (Kṣamisi)' },
          { id: 'opt-4', text: 'ಹೌದು (Haudu)' }
        ],
        correctAnswerId: 'opt-2',
        explanation: '"ಧನ್ಯವಾದಗಳು" (Dhanyavādagaḷu) is how you express thankfulness.'
      },
      {
        id: 'q3',
        questionText: 'How do you politely ask "What is your name?" in Kannada?',
        questionKannada: 'What is your name?',
        type: 'multiple_choice',
        options: [
          { id: 'opt-1', text: 'ಬಸ್ ಎಲ್ಲಿದೆ? (Bus ellide?)' },
          { id: 'opt-2', text: 'ಇದು ಎಷ್ಟು? (Idu eṣṭu?)' },
          { id: 'opt-3', text: 'ನಿಮ್ಮ ಹೆಸರೇನು? (Nimma hesarēnu?)' },
          { id: 'opt-4', text: 'ನೀರು ಬೇಕು (Nīru bēku)' }
        ],
        correctAnswerId: 'opt-3',
        explanation: '"ನಿಮ್ಮ ಹೆಸರೇನು?" (Nimma hesarēnu?) means "What is your name?".'
      },
      {
        id: 'q4',
        questionText: 'Complete the sentence: "ನನ್ನ ಹೆಸರು …" means:',
        questionKannada: 'ನನ್ನ ಹೆಸರು …',
        type: 'phrase_completion',
        options: [
          { id: 'opt-1', text: 'My name is …' },
          { id: 'opt-2', text: 'Where are you from?' },
          { id: 'opt-3', text: 'I am going to …' },
          { id: 'opt-4', text: 'I do not know' }
        ],
        correctAnswerId: 'opt-1',
        explanation: '"ನನ್ನ ಹೆಸರು …" (Nanna hesaru …) means "My name is …".'
      },
      {
        id: 'q5',
        questionText: 'What does "ಕ್ಷಮಿಸಿ" (Kṣamisi) mean?',
        questionKannada: 'ಕ್ಷಮಿಸಿ',
        type: 'multiple_choice',
        options: [
          { id: 'opt-1', text: 'Please' },
          { id: 'opt-2', text: 'Excuse me / Sorry' },
          { id: 'opt-3', text: 'Welcome' },
          { id: 'opt-4', text: 'Good morning' }
        ],
        correctAnswerId: 'opt-2',
        explanation: '"ಕ್ಷಮಿಸಿ" (Kṣamisi) is used for apology or getting someone’s polite attention.'
      }
    ]
  },
  {
    categorySlug: 'travel-and-transportation',
    title: 'Travel & Navigation Quick Check',
    description: 'Verify your confidence navigating buses, autos, and street directions.',
    difficulty: 'beginner',
    passingScore: 60,
    questions: [
      {
        id: 'tq1',
        questionText: 'What does "ಬಸ್ ನಿಲ್ದಾಣ ಎಲ್ಲಿದೆ?" mean?',
        questionKannada: 'ಬಸ್ ನಿಲ್ದಾಣ ಎಲ್ಲಿದೆ?',
        type: 'multiple_choice',
        options: [
          { id: 'opt-1', text: 'Where is the bus stop?' },
          { id: 'opt-2', text: 'When does the bus arrive?' },
          { id: 'opt-3', text: 'Is this the bus to airport?' },
          { id: 'opt-4', text: 'How much is the bus ticket?' }
        ],
        correctAnswerId: 'opt-1',
        explanation: '"ಬಸ್ ನಿಲ್ದಾಣ ಎಲ್ಲಿದೆ?" translates to "Where is the bus stop?".'
      },
      {
        id: 'tq2',
        questionText: 'Which phrase instructs a driver to "Turn left"?',
        questionKannada: 'Turn left',
        type: 'translation',
        options: [
          { id: 'opt-1', text: 'ಬಲಕ್ಕೆ ತಿರುಗಿ (Balakke tirugi)' },
          { id: 'opt-2', text: 'ಎಡಕ್ಕೆ ತಿರುಗಿ (Eḍakke tirugi)' },
          { id: 'opt-3', text: 'ನೇರವಾಗಿ ಹೋಗಿ (Nēravāgi hōgi)' },
          { id: 'opt-4', text: 'ಇಲ್ಲಿ ನಿಲ್ಲಿಸಿ (Illi nillisi)' }
        ],
        correctAnswerId: 'opt-2',
        explanation: '"ಎಡಕ್ಕೆ ತಿರುಗಿ" (Eḍakke tirugi) means "Turn left". "ಬಲಕ್ಕೆ" means right.'
      },
      {
        id: 'tq3',
        questionText: 'What do you say when you need help?',
        questionKannada: 'I need help',
        type: 'translation',
        options: [
          { id: 'opt-1', text: 'ನನಗೆ ಸಹಾಯ ಬೇಕು (Nanage sahāya bēku)' },
          { id: 'opt-2', text: 'ನನಗೆ ನೀರು ಬೇಕು (Nanage nīru bēku)' },
          { id: 'opt-3', text: 'ನನಗೆ ಅರ್ಥವಾಯಿತು (Nanage arthavāyitu)' },
          { id: 'opt-4', text: 'ನನಗೆ ಗೊತ್ತಿಲ್ಲ (Nanage gottilla)' }
        ],
        correctAnswerId: 'opt-1',
        explanation: '"ನನಗೆ ಸಹಾಯ ಬೇಕು" means "I need help".'
      },
      {
        id: 'tq4',
        questionText: 'What does "ಮೀಟರ್ ಹಾಕಿ" (Mīṭar hāki) mean when hailing an auto?',
        questionKannada: 'ಮೀಟರ್ ಹಾಕಿ',
        type: 'multiple_choice',
        options: [
          { id: 'opt-1', text: 'Please turn on the meter' },
          { id: 'opt-2', text: 'Drive faster' },
          { id: 'opt-3', text: 'Stop here' },
          { id: 'opt-4', text: 'Take a detour' }
        ],
        correctAnswerId: 'opt-1',
        explanation: '"ಮೀಟರ್ ಹಾಕಿ" means "Please put/turn on the meter".'
      }
    ]
  },
  {
    categorySlug: 'shopping-and-payments',
    title: 'Shopping, Food & Bargaining Quiz',
    description: 'Check your grasp of price questions, food orders, and requests.',
    difficulty: 'intermediate',
    passingScore: 60,
    questions: [
      {
        id: 'sq1',
        questionText: 'How do you ask "How much is this?" in Kannada?',
        questionKannada: 'How much is this?',
        type: 'multiple_choice',
        options: [
          { id: 'opt-1', text: 'ಇದು ಎಷ್ಟು? (Idu eṣṭu?)' },
          { id: 'opt-2', text: 'ಎಲ್ಲಿ ಹೋಗ್ತೀರಾ? (Elli hōgtīra?)' },
          { id: 'opt-3', text: 'ಯಾರು ನೀವು? (Yāru nīvu?)' },
          { id: 'opt-4', text: 'ಏನು ಬೇಕು? (Ēnu bēku?)' }
        ],
        correctAnswerId: 'opt-1',
        explanation: '"ಇದು ಎಷ್ಟು?" (Idu eṣṭu?) directly asks for the price.'
      },
      {
        id: 'sq2',
        questionText: 'What is the meaning of "ಖಾರ ಕಡಿಮೆ ಮಾಡಿ"?',
        questionKannada: 'ಖಾರ ಕಡಿಮೆ ಮಾಡಿ',
        type: 'translation',
        options: [
          { id: 'opt-1', text: 'Please make it less spicy' },
          { id: 'opt-2', text: 'Add more salt' },
          { id: 'opt-3', text: 'Bring the bill' },
          { id: 'opt-4', text: 'Serve it hot' }
        ],
        correctAnswerId: 'opt-1',
        explanation: '"ಖಾರ ಕಡಿಮೆ ಮಾಡಿ" asks the cook to reduce chili spiciness.'
      },
      {
        id: 'sq3',
        questionText: 'Which phrase means "I would like water"?',
        questionKannada: 'I would like water',
        type: 'translation',
        options: [
          { id: 'opt-1', text: 'ಕಾಫಿ ಕೊಡಿ (Kāfi koḍi)' },
          { id: 'opt-2', text: 'ನೀರು ಬೇಕು (Nīru bēku)' },
          { id: 'opt-3', text: 'ಊಟ ಆಯ್ತು (Ūṭa āytu)' },
          { id: 'opt-4', text: 'ಮೆನು ತನ್ನಿ (Menu tanni)' }
        ],
        correctAnswerId: 'opt-2',
        explanation: '"ನೀರು ಬೇಕು" translates to "I want/would like water".'
      }
    ]
  }
];
