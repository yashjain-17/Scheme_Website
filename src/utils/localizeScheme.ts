import { Scheme, SupportedLanguage } from '../types/scheme';
import { getLocalizedSchemeTitle } from './schemeTranslator';

export interface LocalizedSchemeContent {
  title: string;
  short_desc: string;
  benefits: string;
  eligibility: string[];
  documents: string[];
  process: string;
}

const COMMON_TRANSLATIONS: Record<string, {
  eligibilityDefault: string[];
  docsDefault: string[];
  processDefault: string;
}> = {
  en: {
    eligibilityDefault: ['Resident Indian Citizen', 'Active Aadhaar Card and Aadhaar-seeded Bank Account', 'Income eligibility as per government norms'],
    docsDefault: ['Aadhaar Card', 'Bank Account Passbook with IFSC', 'Income / Domicile Certificate', 'Active Mobile Number'],
    processDefault: '1. Register online on MyScheme Portal or visit nearest Common Service Center (CSC).\n2. Upload required identity and eligibility certificates.\n3. Nodal Officer verification.\n4. Direct Benefit Transfer credited to bank account.'
  },
  hi: {
    eligibilityDefault: ['भारतीय नागरिक एवं स्थायी निवासी', 'सक्रिय आधार कार्ड एवं आधार से जुड़ा बैंक खाता', 'सरकारी मानदंडों के अनुसार आय एवं आयु पात्रता'],
    docsDefault: ['आधार कार्ड', 'आईएफएससी कोड सहित बैंक खाता पासबुक', 'आय / निवास प्रमाण पत्र', 'सक्रिय मोबाइल नंबर'],
    processDefault: '1. पोर्टल पर ऑनलाइन पंजीकरण करें या नजदीकी सीएससी केंद्र पर जाएं।\n2. आवश्यक पहचान एवं पात्रता दस्तावेज अपलोड करें।\n3. नोडल अधिकारी द्वारा सत्यापन।\n4. सीधे बैंक खाते में वित्तीय सहायता का हस्तांतरण।'
  },
  ta: {
    eligibilityDefault: ['இந்திய குடிமகன் மற்றும் நிரந்தர குடியிருப்பாளர்', 'செயலில் உள்ள ஆதார் அட்டை மற்றும் வங்கி கணக்கு', 'அரசு விதிகளின்படி தகுதி'],
    docsDefault: ['ஆதார் அட்டை', 'வங்கி கணக்கு புத்தக நகல்', 'வருமான / இருப்பிட சான்றிதழ்', 'தொலைபேசி எண்'],
    processDefault: '1. இணையதளத்தில் விண்ணப்பிக்கவும் அல்லது CSC மையத்திற்கு செல்லவும்.\n2. தேவையான ஆவணங்களை பதிவேற்றவும்.\n3. அதிகாரி சரிபார்ப்பு.\n4. வங்கி கணக்கில் நேரடி பண பரிமாற்றம்.'
  },
  te: {
    eligibilityDefault: ['భారతీయ పౌరుడు మరియు శాశ్వత నివాసి', 'యాక్టివ్ ఆధార్ కార్డ్ మరియు బ్యాంక్ ఖాతా', 'ప్రభుత్వ నిబంధనల ప్రకారం అర్హత'],
    docsDefault: ['ఆధార్ కార్డ్', 'బ్యాంక్ పాస్‌బుక్', 'ఆదాయ / నివాస ధృవీకరణ పత్రం', 'మొబైల్ నంబర్'],
    processDefault: '1. పోర్టల్‌లో ఆన్‌లైన్‌లో దరఖాస్తు చేయండి లేదా CSC కేంద్రాన్ని సందర్శించండి.\n2. కావలసిన పత్రాలను అప్‌లోడ్ చేయండి.\n3. నోడల్ అధికారి సరిచూస్తారు.\n4. బ్యాంక్ ఖాతాలో నేరుగా నగదు జమ.'
  },
  bn: {
    eligibilityDefault: ['ভারতীয় নাগরিক ও স্থায়ী বাসিন্দা', 'সক্রিয় আধার কার্ড ও ব্যাংক অ্যাকাউন্ট', 'সরকারি নিয়মানুসারে যোগ্যতা'],
    docsDefault: ['আধার কার্ড', 'ব্যাংক পাসবুক', 'আয় ও বসবাসের শংসাপত্র', 'মোবাইল নম্বর'],
    processDefault: '১. পোর্টালে অনলাইন আবেদন করুন অথবা সিএসসি কেন্দ্রে যান।\n২. প্রয়োজনীয় পরিচয়পত্র আপলোড করুন।\n৩. আধিকারিক দ্বারা যাচাইকরণ।\n৪. সরাসরি ব্যাংক অ্যাকাউন্টে টাকা জমা।'
  },
  mr: {
    eligibilityDefault: ['भारतीय नागरिक व रहिवासी', 'सक्रिय आधार कार्ड व बँक खाते', 'शासकीय निकषांनुसार पात्रता'],
    docsDefault: ['आधार कार्ड', 'बँक पासबुक', 'उत्पन्न व रहिवासी दाखला', 'मोबाईल नंबर'],
    processDefault: '१. पोर्टलवर ऑनलाईन अर्ज करा किंवा सीएससी केंद्राला भेट द्या.\n२. कागदपत्रे अपलोड करा.\n३. अधिकाऱ्यांकडून पडताळणी.\n४. थेट बँक खात्यात रक्कम जमा.'
  },
  gu: {
    eligibilityDefault: ['ભારતીય નાગરિક અને કાયમી નિવાસી', 'સક્રિય આધાર કાર્ડ અને બેંક ખાતું', 'સરકારી નિયમો મુજબ પાત્રતા'],
    docsDefault: ['આધાર કાર્ડ', 'બેંક પાસબુક', 'આવક / રહેઠાણ દાખલો', 'મોબાઈલ નંબર'],
    processDefault: '૧. પોર્ટલ પર ઓનલાઈન અરજી કરો અથવા સીએસસી કેન્દ્રની મુલાકાત લો.\n૨. દસ્તાવેજો અપલોડ કરો.\n૩. અધિકારી દ્વારા ચકાસણી.\n૪. સીધા બેંક ખાતામાં રકમ જમા.'
  },
  kn: {
    eligibilityDefault: ['ಭಾರತೀಯ ನಾಗರಿಕ ಮತ್ತು ಕಾಯಂ ನಿವಾಸಿ', 'ಸಕ್ರಿಯ ಆಧಾರ್ ಕಾರ್ಡ್ ಮತ್ತು ಬ್ಯಾಂಕ್ ಖಾತೆ', 'ಸರ್ಕಾರಿ ನಿಯಮಗಳಂತೆ ಅರ್ಹತೆ'],
    docsDefault: ['ಆಧಾರ್ ಕಾರ್ಡ್', 'ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್', 'ಆದಾಯ / ನಿವಾಸ ಪ್ರಮಾಣಪತ್ರ', 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ'],
    processDefault: '1. ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಆನ್‌ಲೈನ್ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ లేదా ಸಿಎಸ್‌ಸಿ ಕೇಂದ್ರಕ್ಕೆ ಭೇಟಿ ನೀಡಿ.\n2. ಅಗತ್ಯ ದಾಖಲೆಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.\n3. ಅಧಿಕಾರಿಗಳಿಂದ ಪರಿಶೀಲನೆ.\n4. ನೇರವಾಗಿ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಹಣ ಜಮೆ.'
  },
  ml: {
    eligibilityDefault: ['ഇന്ത്യൻ പൗരനും സ്ഥിരതാമസക്കാരനും', 'ആധാർ കാർഡും ബാങ്ക് അക്കൗണ്ടും', 'സർക്കാർ മാനദണ്ഡങ്ങൾ അനുസരിച്ചുള്ള യോഗ്യത'],
    docsDefault: ['ആധാർ കാർഡ്', 'ബാങ്ക് പാസ്ബുക്ക്', 'വരുമാന / താമസ സർട്ടിഫിക്കറ്റ്', 'മൊബൈൽ നമ്പർ'],
    processDefault: '1. പോർട്ടലിൽ ഓൺലൈനായി അപേക്ഷിക്കുക അല്ലെങ്കിൽ സിഎസ്സി കേന്ദ്രം സന്ദർശിക്കുക.\n2. രേഖകൾ അപ്‌ലോഡ് ചെയ്യുക.\n3. ഉദ്യോഗസ്ഥരുടെ പരിശോധന.\n4. നേരിട്ട് ബാങ്ക് അക്കൗണ്ടിലേക്ക് പണം ക്രെഡിറ്റ് ചെയ്യും.'
  },
  pa: {
    eligibilityDefault: ['ਭਾਰਤੀ ਨਾਗਰਿਕ ਅਤੇ ਪੱਕਾ ਨਿਵਾਸੀ', 'ਚਾਲੂ ਆਧਾਰ ਕਾਰਡ ਅਤੇ ਬੈਂਕ ਖਾਤਾ', 'ਸਰਕਾਰੀ ਨਿਯਮਾਂ ਅਨੁਸਾਰ ਯੋਗਤਾ'],
    docsDefault: ['ਆਧਾਰ ਕਾਰਡ', 'ਬੈਂਕ ਪਾਸਬੁੱਕ', 'ਆਮਦਨ / ਰਿਹਾਇਸ਼ੀ ਸਰਟੀਫਿਕੇਟ', 'ਮੋਬਾਈਲ ਨੰਬਰ'],
    processDefault: '1. ਪੋਰਟਲ \'ਤੇ ਆਨਲਾਈਨ ਅਪਲਾਈ ਕਰੋ ਜਾਂ ਸੀਐਸਸੀ ਕੇਂਦਰ ਜਾਓ।\n2. ਲੋੜੀਂਦੇ ਦਸਤਾਵੇਜ਼ ਅਪਲੋਡ ਕਰੋ।\n3. ਅਧਿਕਾਰੀ ਦੁਆਰਾ ਤਸਦੀਕ।\n4. ਸਿੱਧਾ ਬੈਂਕ ਖਾਤੇ ਵਿੱਚ ਪੈਸੇ ਟ੍ਰਾਂਸਫਰ।'
  }
};

export function getLocalizedScheme(scheme: Scheme, language: SupportedLanguage): LocalizedSchemeContent {
  const common = COMMON_TRANSLATIONS[language] || COMMON_TRANSLATIONS.en;
  const title = getLocalizedSchemeTitle(scheme.title, language, scheme);

  const short_desc = (language === 'hi' && scheme.short_desc_hi)
    ? scheme.short_desc_hi
    : scheme.short_desc;

  const eligibilityList = Array.isArray(scheme.eligibility) && scheme.eligibility.length > 0
    ? scheme.eligibility
    : common.eligibilityDefault;

  const docsList = Array.isArray(scheme.documents_required) && scheme.documents_required.length > 0
    ? scheme.documents_required
    : common.docsDefault;

  const processStr = scheme.application_process || common.processDefault;

  return {
    title,
    short_desc,
    benefits: scheme.benefits,
    eligibility: eligibilityList,
    documents: docsList,
    process: processStr,
  };
}
