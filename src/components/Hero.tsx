import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  Search, 
  Sparkles, 
  Users, 
  Award, 
  TrendingUp, 
  Layers,
  X,
  Tag
} from 'lucide-react';

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onOpenWizard: () => void;
  onSelectCategory: (cat: string) => void;
  totalSchemesCount: number;
  totalSectorsCount?: number;
  totalMinistriesCount?: number;
  totalApplicationsCount?: number;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  setSearchQuery,
  onOpenWizard,
  onSelectCategory,
  totalSchemesCount,
}) => {
  const { t } = useLanguage();

  const trendingKeywords = [
    'PM Kisan',
    'Ayushman Bharat',
    'Surya Ghar Solar',
    'PMAY Awas',
    'Ladki Bahin',
    'Mudra Loan',
    'Scholarship',
    'Atal Pension',
    'Ujjwala Gas',
    'Vishwakarma'
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-emerald-900 via-teal-900 to-slate-900 text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Decorative background blur vectors */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-800/60 border border-emerald-500/30 text-emerald-200 text-xs font-semibold mb-6 shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Smart Scheme Discovery Tool</span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4 leading-tight">
          Find Public Welfare Schemes <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-200 bg-clip-text text-transparent">
             tailored to your exact eligibility
          </span>
        </h1>

        <p className="text-sm sm:text-lg text-emerald-100/90 max-w-2xl mx-auto mb-8 font-normal">
          {t('portalTagline')}. Search hundreds of direct benefit transfers, pensions, scholarships, and agricultural grants in one click.
        </p>

        {/* Interactive Search Box */}
        <div className="max-w-3xl mx-auto mb-4">
          <div className="relative flex items-center bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-2 border-2 border-emerald-500/40 focus-within:border-emerald-400 transition-all">
            <Search className="w-6 h-6 text-emerald-600 dark:text-emerald-400 ml-3 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search scheme, ministry, or benefit..."
              className="w-full py-3 px-3 text-slate-900 dark:text-white placeholder-slate-400 bg-transparent text-sm sm:text-base focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 mr-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
                title="Clear search"
              >
                <X className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={onOpenWizard}
              className="shrink-0 hidden sm:flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-md transition-all duration-200 hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>{t('checkEligibility')}</span>
            </button>
          </div>
        </div>

        {/* One-Tap Search Keyword Pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mb-10 text-xs">
          <span className="text-emerald-200/80 font-medium mr-1 flex items-center gap-1">
            <Tag className="w-3.5 h-3.5 text-amber-300" />
            Trending Searches:
          </span>
          {trendingKeywords.map((kw) => (
            <button
              key={kw}
              onClick={() => setSearchQuery(kw)}
              className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                searchQuery === kw
                  ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold shadow-sm'
                  : 'bg-white/10 hover:bg-white/20 text-emerald-100 border-white/10'
              }`}
            >
              {kw}
            </button>
          ))}
        </div>

        {/* Portal Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto pt-6 border-t border-emerald-800/60">
          <div className="bg-emerald-950/40 border border-emerald-800/40 rounded-xl p-3 text-center">
            <div className="flex justify-center mb-1 text-emerald-400">
              <Layers className="w-5 h-5" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-white">{totalSchemesCount}+</div>
            <div className="text-[11px] text-emerald-200/80">Active Schemes Listed</div>
          </div>

          <div className="bg-emerald-950/40 border border-emerald-800/40 rounded-xl p-3 text-center">
            <div className="flex justify-center mb-1 text-teal-400">
              <Users className="w-5 h-5" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-white">12.5 Cr+</div>
            <div className="text-[11px] text-emerald-200/80">Beneficiaries Reached</div>
          </div>

          <div className="bg-emerald-950/40 border border-emerald-800/40 rounded-xl p-3 text-center">
            <div className="flex justify-center mb-1 text-amber-300">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-white">₹3.2 Lakh Cr</div>
            <div className="text-[11px] text-emerald-200/80">Funds Disbursed</div>
          </div>

          <div className="bg-emerald-950/40 border border-emerald-800/40 rounded-xl p-3 text-center">
            <div className="flex justify-center mb-1 text-emerald-400">
              <Award className="w-5 h-5" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-white">100% Direct</div>
            <div className="text-[11px] text-emerald-200/80">DBT Transparent Transfer</div>
          </div>
        </div>
      </div>
    </div>
  );
};
