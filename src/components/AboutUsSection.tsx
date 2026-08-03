import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  Building2, 
  ShieldCheck, 
  Target, 
  Globe2 
} from 'lucide-react';

export const AboutUsSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-10 animate-fade-in max-w-5xl mx-auto text-slate-900 dark:text-slate-100">
      {/* Hero Header */}
      <div className="text-center space-y-4 pt-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
          <Building2 className="w-4 h-4" />
          <span>{t('aboutPageBadge')}</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
          {t('portalName')}
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
          {t('portalTagline')}. Search central and state welfare benefits in 10 major Indian languages (Hindi, Tamil, Telugu, Marathi, Bengali, Gujarati, Kannada, Malayalam, Punjabi, English).
        </p>
      </div>

      {/* Core Objectives */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">{t('checkEligibility')}</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            {t('checkEligibilityDesc')}
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Direct Scheme Transparency</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            Providing step-by-step application instructions, required document checklists, and verified official domain links without fees or intermediaries.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
            <Globe2 className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Multilingual Accessibility</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            Supporting 10 functional Indian languages including English, Hindi, Tamil, Telugu, Marathi, Bengali, Gujarati, Kannada, Malayalam, and Punjabi.
          </p>
        </div>
      </div>
    </div>
  );
};
