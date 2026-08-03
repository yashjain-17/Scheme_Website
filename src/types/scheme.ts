export interface Scheme {
  id: number;
  title: string;
  title_hi?: string;
  title_ta?: string;
  title_te?: string;
  title_mr?: string;
  title_bn?: string;
  category: string;
  ministry: string;
  level: 'Central' | 'State';
  short_desc: string;
  short_desc_hi?: string;
  benefits: string;
  eligibility: string[];
  documents_required: string[];
  application_process: string;
  apply_url?: string;
  official_url?: string;
  min_age: number;
  max_age: number;
  gender: string;
  max_income: number;
  occupation: string;
  state: string;
  rating: number;
  total_applications: number;
  featured?: boolean;
}

export interface Application {
  id: number;
  tracking_code: string;
  scheme_id: number;
  scheme_title: string;
  applicant_name: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  income: number;
  state: string;
  status: 'Submitted' | 'Under Review' | 'Approved' | 'Action Required';
  submitted_at: string;
}

export interface FeedbackItem {
  id?: number;
  name: string;
  email: string;
  rating: number;
  message: string;
  scheme_suggestion?: string;
  created_at?: string;
}

export type SupportedLanguage = 
  | 'en'   // English
  | 'hi'   // Hindi (हिंदी)
  | 'ta'   // Tamil (தமிழ்)
  | 'te'   // Telugu (తెలుగు)
  | 'bn'   // Bengali (বাংলা)
  | 'mr'   // Marathi (मराठी)
  | 'gu'   // Gujarati (ગુજરાતી)
  | 'kn'   // Kannada (ಕನ್ನಡ)
  | 'ml'   // Malayalam (മലയാളം)
  | 'pa';  // Punjabi (ਪੰਜਾਬੀ)

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
}
