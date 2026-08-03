import { SupportedLanguage } from '../types/scheme';

// Multi-language translation map for common Scheme Titles
const SCHEME_TITLE_TRANSLATIONS: Record<string, Partial<Record<SupportedLanguage, string>>> = {
  'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)': {
    en: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
    hi: 'प्रधानमंत्री किसान सम्मान निधि (पीएम-किसान)',
    ta: 'பிரதமர் கிசான் சம்மான் நிதி (PM-KISAN)',
    te: 'ప్రధాన మంత్రి కిసాన్ సమ్మాన్ నిధి (PM-KISAN)',
    bn: 'প্রধানমন্ত্রী কিষাণ সম্মান নিধি (PM-KISAN)',
    mr: 'प्रधानमंत्री किसान सन्मान निधी (पीएम-किसान)',
    gu: 'પ્રધાનમંત્રી કિસાન સન્માન નિધિ (PM-KISAN)',
    kn: 'ಪ್ರಧಾನಮಂತ್ರಿ ಕಿಸಾನ್ ಸಮ್ಮಾನ್ ನಿಧಿ (PM-KISAN)',
    ml: 'പ്രധാനമന്ത്രി കിസാൻ സമ്മാൻ നിധി (PM-KISAN)',
    pa: 'ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਕਿਸਾਨ ਸੰਮਾਨ ਨਿਧੀ (PM-KISAN)'
  },
  'Ayushman Bharat PM Jan Arogya Yojana (PM-JAY)': {
    en: 'Ayushman Bharat PM Jan Arogya Yojana (PM-JAY)',
    hi: 'आयुष्मान भारत प्रधानमंत्री जन आरोग्य योजना (PM-JAY)',
    ta: 'ஆயுஷ்மான் பாரத் பிரதான் மந்திரி ஜன் ஆரோக்கிய யோஜனா',
    te: 'ఆయుష్మాన్ భారత్ పిఎం జన్ ఆరోగ్య యోజన',
    bn: 'আয়ুষ্মান ভারত প্রধানমন্ত্রী জন আরোগ্য যোজনা',
    mr: 'आयुष्मान भारत जन आरोग्य योजना',
    gu: 'આયુષ્માન ભારત જન આરોગ્ય યોજના',
    kn: 'ಆಯುಷ್ಮಾನ್ ಭಾರತ್ ಜನ್ ಆರೋಗ್ಯ ಯೋಜನೆ',
    ml: 'ആയുഷ്മാൻ ഭാരത് ജൻ ആരോഗ്യ യോജന',
    pa: 'ਆਯੁਸ਼ਮਾਨ ਭਾਰਤ ਜਨ ਅਰੋਗਿਆ ਯੋਜਨਾ'
  },
  'Pradhan Mantri Awas Yojana (PMAY Housing for All)': {
    en: 'Pradhan Mantri Awas Yojana (PMAY Housing for All)',
    hi: 'प्रधानमंत्री आवास योजना (PMAY)',
    ta: 'பிரதம மந்திரி ஆவாஸ் யோஜனா',
    te: 'ప్రధాన మంత్రి ఆవాస్ యోజన',
    bn: 'Prime Minister Housing Scheme',
    mr: 'प्रधानमंत्री आवास योजना',
    gu: 'પ્રધાનમંત્રી આવાસ યોજના',
    kn: 'ಪ್ರಧಾನಮಂತ್ರಿ ಆವಾಸ್ ಯೋಜನೆ',
    ml: 'പ്രധാനമന്ത്രി ആവാസ് യോജന',
    pa: 'ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਆਵਾਸ ਯੋਜਨਾ'
  },
  'Sukanya Samriddhi Yojana (SSY)': {
    en: 'Sukanya Samriddhi Yojana (SSY)',
    hi: 'सुकन्या समृद्धि योजना (SSY)',
    ta: 'சுகன்யா சம்ரிதி யோஜனா',
    te: 'సుకన్య సమృద్ధి యోజన',
    bn: 'সুকন্যা সমৃদ্ধি যোজনা',
    mr: 'सुकन्या समृद्धी योजना',
    gu: 'સુકન્યા સમૃદ્ધિ યોજના',
    kn: 'ಸುಕನ್ಯಾ ಸಮೃದ್ಧಿ ಯೋಜನೆ',
    ml: 'സുകന്യ സമൃദ്ധി യോജന',
    pa: 'ਸੁਕੰਨਿਆ ਸਮ੍ਰਿਧੀ ਯੋਜਨਾ'
  },
  'Pradhan Mantri MUDRA Yojana (PMMY Loan)': {
    en: 'Pradhan Mantri MUDRA Yojana (PMMY Loan)',
    hi: 'प्रधानमंत्री मुद्रा योजना (PMMY)',
    ta: 'பிரதம மந்திரி முத்ரா கடன் யோஜனா',
    te: 'ప్రధాన మంత్రి ముద్రా రుణాలు',
    bn: 'প্রধানমন্ত্রী মুদ্রা ঋণ যোজনা',
    mr: 'प्रधानमंत्री मुद्रा योजना',
    gu: 'પ્રધાનમંત્રી મુદ્રા યોજના',
    kn: 'ಪ್ರಧಾನಮಂತ್ರಿ ಮುದ್ರಾ ಯೋಜನೆ',
    ml: 'പ്രധാനമന്ത്രി മുദ്ര വായ്പ യോജന',
    pa: 'ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਮੁਦਰਾ ਯੋਜਨਾ'
  },
  'Atal Pension Yojana (APY)': {
    en: 'Atal Pension Yojana (APY)',
    hi: 'अटल पेंशन योजना (APY)',
    ta: 'அடல் பென்ஷன் யோஜனா',
    te: 'அటల్ పెన్షన్ యోజన',
    bn: 'অটল পেনশন যোজনা',
    mr: 'अटल पेन्शन योजना',
    gu: 'અટલ પેન્શન યોજના',
    kn: 'ಅಟಲ್ ಪಿಂಚಣಿ ಯೋಜನೆ',
    ml: 'അടൽ പെൻഷൻ യോജന',
    pa: 'ਅਟਲ ਪੈਨਸ਼ਨ ਯੋਜਨਾ'
  },
  'PM Kaushal Vikas Yojana (PMKVY 4.0)': {
    en: 'PM Kaushal Vikas Yojana (PMKVY 4.0)',
    hi: 'प्रधानमंत्री कौशल विकास योजना (PMKVY)',
    ta: 'பிரதம மந்திரி திறன்பாட்டு யோஜனா',
    te: 'ప్రధాన మంత్రి కౌశల్ వికాస్ యోజన',
    bn: 'প্রধানমন্ত্রী কৌশল বিকাশ যোজনা',
    mr: 'प्रधानमंत्री कौशल विकास योजना',
    gu: 'પ્રધાનમંત્રી કૌશલ વિકાસ યોજના',
    kn: 'ಪ್ರಧಾನಮಂತ್ರಿ ಕೌಶಲ್ಯ ವಿಕಾಸ ಯೋಜನೆ',
    ml: 'പ്രധാനമന്ത്രി കൗശൽ വികാസ് യോജന',
    pa: 'ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਕੌਸ਼ਲ ਵਿਕਾਸ ਯੋਜਨਾ'
  },
  'Mukhyamantri Majhi Ladki Bahin Yojana': {
    en: 'Mukhyamantri Majhi Ladki Bahin Yojana',
    hi: 'मुख्यमंत्री माझी लाडकी बहिण योजना',
    ta: 'மகாராஷ்டிரா முதலமைச்சர் माझी லாட்கி பஹின் திட்டம்',
    te: 'మహారాష్ట్ర ముఖ్యమంత్రి లడ్కీ బెహన్ పథకం',
    bn: 'মুখ্যমন্ত্রী মাজি লাডকি বহিন যোজনা',
    mr: 'मुख्यमंत्री माझी लाडकी बहीण योजना',
    gu: 'મુખ્યમંત્રી માઝી લાડકી બહિણ યોજના',
    kn: 'ಮುಖ್ಯಮಂತ್ರಿ ಮಾಝಿ ಲಾಡ್ಕಿ ಬಹಿನ್ ಯೋಜನೆ',
    ml: 'മുഖ്യമന്ത്രി മാജി ലാഡ്കി ബഹിൻ യോജന',
    pa: 'ਮੁੱਖ ਮੰਤਰੀ ਮਾਝੀ ਲਾਡਕੀ ਬਹਿਣ ਯੋਜਨਾ'
  },
  'PM Surya Ghar: Muft Bijli Yojana (Rooftop Solar)': {
    en: 'PM Surya Ghar: Muft Bijli Yojana (Rooftop Solar)',
    hi: 'पीएम सूर्य घर: मुफ़्त बिजली योजना',
    ta: 'பிரதமர் சூர்யா கர் இலவச மின்சாரத் திட்டம்',
    te: 'పిఎం సూర్య ఘర్ ఉచిత విద్యుత్ పథకం',
    bn: 'পিএম সূর্য ঘর বিনামূল্যে বিদ্যুৎ যোজনা',
    mr: 'पीएम सूर्य घर मोफत वीज योजना',
    gu: 'પીએમ સૂર્ય ઘર મફત વીજળી યોજના',
    kn: 'ಪಿಎಂ ಸೂರ್ಯ ಘರ್ ಉಚಿತ ವಿದ್ಯುತ್ ಯೋಜನೆ',
    ml: 'പിഎം സൂര്യ ഘർ സൗജന്യ വൈദ്യുതി യോജന',
    pa: 'ਪੀਐਮ ਸੂਰਜ ਘਰ ਮੁਫ਼ਤ ਬਿਜਲੀ ਯੋਜਨਾ'
  },
  'PM Vishwakarma Scheme': {
    en: 'PM Vishwakarma Scheme',
    hi: 'पीएम विश्वकर्मा योजना',
    ta: 'பிரதமர் விஸ்வகர்மா திட்டம்',
    te: 'పిఎం విశ్వకర్మ పథకం',
    bn: 'পিএম বিশ্বকর্মা যোজনা',
    mr: 'पीएम विश्वकर्मा योजना',
    gu: 'પીએમ વિશ્વકર્મા યોજના',
    kn: 'ಪಿಎಂ ವಿಶ್ವಕರ್ಮ ಯೋಜನೆ',
    ml: 'പിഎം വിശ്വകർമ യോജന',
    pa: 'ਪੀਐਮ ਵਿਸ਼ਵਕਰਮਾ ਯੋਜਨਾ'
  }
};

const LANG_PREFIXES: Record<string, { pm: string; govt: string; scheme: string }> = {
  en: { pm: 'Pradhan Mantri', govt: 'Government Scheme', scheme: 'Welfare Scheme' },
  hi: { pm: 'प्रधानमंत्री', govt: 'सरकारी योजना', scheme: 'जनकल्याण योजना' },
  ta: { pm: 'பிரதம மந்திரி', govt: 'அரசு திட்டம்', scheme: 'நலத்திட்டம்' },
  te: { pm: 'ప్రధాన మంత్రి', govt: 'ప్రభుత్వ పథకం', scheme: 'సంక్షేమ పథకం' },
  bn: { pm: 'প্রধানমন্ত্রী', govt: 'সরকারি প্রকল্প', scheme: 'জনকল্যাণ প্রকল্প' },
  mr: { pm: 'प्रधानमंत्री', govt: 'शासकीय योजना', scheme: 'लोककल्याण योजना' },
  gu: { pm: 'પ્રધાનમંત્રી', govt: 'સરકારી યોજના', scheme: 'કલ્યાણ યોજના' },
  kn: { pm: 'ಪ್ರಧಾನಮಂತ್ರಿ', govt: 'ಸರ್ಕಾರಿ ಯೋಜನೆ', scheme: 'ಕಲ್ಯಾಣ ಯೋಜನೆ' },
  ml: { pm: 'പ്രധാനമന്ത്രി', govt: 'സർക്കാർ പദ്ധതി', scheme: 'ക്ഷേമ പദ്ധതി' },
  pa: { pm: 'ਪ੍ਰਧਾਨ ਮੰਤਰੀ', govt: 'ਸਰਕਾਰੀ ਸਕੀਮ', scheme: 'ਭਲਾਈ ਸਕੀਮ' },
};

export function getLocalizedSchemeTitle(title: string, language: SupportedLanguage, schemeObj?: any): string {
  if (language === 'en') return title;

  if (language === 'hi' && schemeObj?.title_hi) return schemeObj.title_hi;
  if (language === 'ta' && schemeObj?.title_ta) return schemeObj.title_ta;
  if (language === 'te' && schemeObj?.title_te) return schemeObj.title_te;
  if (language === 'mr' && schemeObj?.title_mr) return schemeObj.title_mr;
  if (language === 'bn' && schemeObj?.title_bn) return schemeObj.title_bn;
  if (language === 'gu' && schemeObj?.title_gu) return schemeObj.title_gu;
  if (language === 'kn' && schemeObj?.title_kn) return schemeObj.title_kn;
  if (language === 'ml' && schemeObj?.title_ml) return schemeObj.title_ml;

  if (SCHEME_TITLE_TRANSLATIONS[title] && SCHEME_TITLE_TRANSLATIONS[title][language]) {
    return SCHEME_TITLE_TRANSLATIONS[title][language]!;
  }

  const pfx = LANG_PREFIXES[language] || LANG_PREFIXES.hi;

  if (title.startsWith('Pradhan Mantri') || title.startsWith('PM ')) {
    const rest = title.replace(/^(Pradhan Mantri|PM)\s*/i, '');
    return `${pfx.pm} ${rest}`;
  }

  if (title.includes('State') || title.includes('Yojana') || title.includes('Scheme')) {
    return `${title.replace('Scheme', pfx.scheme).replace('Yojana', pfx.scheme)}`;
  }

  return title;
}
