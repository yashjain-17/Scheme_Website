import React from 'react';
import { Scheme } from '../types/scheme';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  Building2, 
  Bookmark, 
  ChevronRight, 
  Star, 
  Users, 
  CheckCircle2, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

interface SchemeCardProps {
  scheme: Scheme;
  isBookmarked: boolean;
  onToggleBookmark: (schemeId: number) => void;
  onOpenDetails: (scheme: Scheme) => void;
  onOpenApply: (scheme: Scheme) => void;
}

export const SchemeCard: React.FC<SchemeCardProps> = ({
  scheme,
  isBookmarked,
  onToggleBookmark,
  onOpenDetails,
  onOpenApply,
}) => {
  const { language, t } = useLanguage();

  const localizedTitle = (language === 'hi' && scheme.title_hi)
    ? scheme.title_hi
    : (language === 'ta' && scheme.title_ta)
    ? scheme.title_ta
    : (language === 'te' && scheme.title_te)
    ? scheme.title_te
    : (language === 'mr' && scheme.title_mr)
    ? scheme.title_mr
    : scheme.title;

  const localizedDesc = (language === 'hi' && scheme.short_desc_hi)
    ? scheme.short_desc_hi
    : scheme.short_desc;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs hover:shadow-lg flex flex-col justify-between group relative overflow-hidden transition-all">
      {scheme.featured && (
        <div className="absolute top-0 right-0">
          <div className="bg-gradient-to-l from-emerald-600 to-teal-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl shadow-xs flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-300" />
            Top Priority
          </div>
        </div>
      )}

      <div>
        {/* Header Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pr-20">
          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase ${
            scheme.level === 'Central'
              ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800'
              : 'bg-purple-100 text-purple-900 dark:bg-purple-950 dark:text-purple-200 border border-purple-200 dark:border-purple-800'
          }`}>
            <Building2 className="w-3 h-3" />
            {scheme.level === 'Central' ? 'Central Govt' : scheme.state || 'State Govt'}
          </span>

          <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
            {scheme.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
          {localizedTitle}
        </h3>

        {/* Ministry Tag */}
        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold mb-3 truncate">
          🏛️ {scheme.ministry}
        </p>

        {/* Description */}
        <p className="text-xs text-slate-600 dark:text-slate-300 mb-4 line-clamp-3 leading-relaxed">
          {localizedDesc}
        </p>

        {/* Key Benefits Card Pill */}
        <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl p-3 mb-4">
          <div className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider mb-1 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            Direct Benefit
          </div>
          <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 line-clamp-2">
            {scheme.benefits}
          </p>
        </div>

        {/* Target Specs Grid */}
        <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500 dark:text-slate-400 mb-4 border-t border-b border-slate-100 dark:border-slate-800 py-2.5">
          <div>
            <span className="block text-[10px] text-slate-400 font-medium">Target Occupation:</span>
            <strong className="text-slate-800 dark:text-slate-200 font-bold">{scheme.occupation || 'All Citizens'}</strong>
          </div>
          <div>
            <span className="block text-[10px] text-slate-400 font-medium">Age Requirement:</span>
            <strong className="text-slate-800 dark:text-slate-200 font-bold">{scheme.min_age} - {scheme.max_age} Yrs</strong>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div>
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-3">
          <span className="flex items-center gap-1 font-medium">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            {(scheme.total_applications || 12000).toLocaleString()} Applied
          </span>
          <span className="flex items-center gap-1 text-amber-500 font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            {scheme.rating || 4.8} / 5
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Bookmark Button */}
          <button
            onClick={() => onToggleBookmark(scheme.id)}
            className={`p-2.5 rounded-xl border transition-colors ${
              isBookmarked
                ? 'bg-amber-50 text-amber-600 border-amber-300 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800'
                : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            title="Save scheme"
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500' : ''}`} />
          </button>

          {/* Details Button */}
          <button
            onClick={() => onOpenDetails(scheme)}
            className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-center flex items-center justify-center gap-1"
          >
            <span>{t('viewDetails')}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          {/* Direct Apply Button */}
          <button
            onClick={() => onOpenApply(scheme)}
            className="py-2.5 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1"
          >
            <span>{t('applyNow')}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
