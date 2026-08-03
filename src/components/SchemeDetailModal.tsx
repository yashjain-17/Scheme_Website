import React, { useState } from 'react';
import { Scheme } from '../types/scheme';
import { useLanguage } from '../contexts/LanguageContext';
import { getLocalizedScheme } from '../utils/localizeScheme';
import { 
  X, 
  CheckCircle2, 
  FileText, 
  ListOrdered, 
  Download, 
  Share2, 
  ArrowUpRight, 
  Bookmark,
  Info
} from 'lucide-react';

interface SchemeDetailModalProps {
  scheme: Scheme | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenApply: (scheme: Scheme) => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: number) => void;
}

export const SchemeDetailModal: React.FC<SchemeDetailModalProps> = ({
  scheme,
  isOpen,
  onClose,
  onOpenApply,
  isBookmarked,
  onToggleBookmark,
}) => {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'overview' | 'eligibility' | 'documents' | 'process'>('overview');
  const [copied, setCopied] = useState(false);

  if (!isOpen || !scheme) return null;

  // Fully localized scheme object
  const loc = getLocalizedScheme(scheme, language);

  const handleDownloadPDF = () => {
    const textContent = `
=====================================================
NATIONAL SCHEMES PORTAL - OFFICIAL GUIDELINE SUMMARY
=====================================================
Scheme Title: ${loc.title}
Ministry: ${scheme.ministry}
Government Level: ${scheme.level}
Target Sector: ${scheme.category}

OVERVIEW:
${loc.short_desc}

KEY BENEFITS:
${loc.benefits}

ELIGIBILITY CRITERIA:
${loc.eligibility.map((e, i) => `${i + 1}. ${e}`).join('\n')}

REQUIRED DOCUMENTS:
${loc.documents.map((d, i) => `${i + 1}. ${d}`).join('\n')}

APPLICATION PROCESS:
${loc.process}

=====================================================
Downloaded from Official Public Welfare Portal
Date: ${new Date().toLocaleDateString()}
=====================================================
    `;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${scheme.title.replace(/[^a-zA-Z0-9]/g, '_')}_Guidelines.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadJSON = () => {
    const jsonStr = JSON.stringify({ ...scheme, localized: loc }, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${scheme.title.replace(/[^a-zA-Z0-9]/g, '_')}_data.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Header Banner */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 text-white p-6 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-emerald-100 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-emerald-700/80 border border-emerald-500/40 text-emerald-100">
              {scheme.level === 'Central' ? t('levelCentral') : t('levelState')}
            </span>
            <span className="text-xs text-emerald-100/90 bg-white/10 px-2 py-0.5 rounded font-medium">
              {scheme.ministry}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold leading-snug pr-8 text-white">
            {loc.title}
          </h2>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-5 py-3 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Info className="w-4 h-4" />
            Overview & Benefits
          </button>

          <button
            onClick={() => setActiveTab('eligibility')}
            className={`px-5 py-3 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'eligibility'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            {t('eligibility')}
          </button>

          <button
            onClick={() => setActiveTab('documents')}
            className={`px-5 py-3 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'documents'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            {t('documentsRequired')}
          </button>

          <button
            onClick={() => setActiveTab('process')}
            className={`px-5 py-3 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'process'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <ListOrdered className="w-4 h-4" />
            {t('applicationProcess')}
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800 dark:text-slate-200">
          {activeTab === 'overview' && (
            <div className="space-y-5">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Description</h4>
                <p className="text-sm leading-relaxed text-slate-800 dark:text-slate-200 font-normal">
                  {loc.short_desc}
                </p>
              </div>

              <div className="bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 rounded-2xl p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  Key Financial & Social Benefits ({t('keyBenefits')})
                </h4>
                <p className="text-sm font-bold text-emerald-950 dark:text-emerald-100 leading-relaxed">
                  {loc.benefits}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-semibold">{t('minAge')}:</span>
                  <strong className="text-sm font-bold text-slate-900 dark:text-white">{scheme.min_age} Yrs</strong>
                </div>
                <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-semibold">{t('maxAge')}:</span>
                  <strong className="text-sm font-bold text-slate-900 dark:text-white">{scheme.max_age} Yrs</strong>
                </div>
                <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-semibold">{t('maxIncome')}:</span>
                  <strong className="text-sm font-bold text-slate-900 dark:text-white">
                    {scheme.max_income ? `≤ ₹${Number(scheme.max_income).toLocaleString('en-IN')}` : 'No Limit'}
                  </strong>
                </div>
                <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-semibold">{t('gender')}:</span>
                  <strong className="text-sm font-bold text-slate-900 dark:text-white">{scheme.gender}</strong>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'eligibility' && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">{t('eligibility')}</h4>
              <ul className="space-y-2.5">
                {loc.eligibility.map((crit, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs font-medium text-slate-800 dark:text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{crit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">{t('documentsRequired')}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {loc.documents.map((doc, idx) => (
                  <div key={idx} className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center gap-2.5 text-xs font-semibold text-slate-800 dark:text-slate-200">
                    <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'process' && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">{t('applicationProcess')}</h4>
              <div className="p-4 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed space-y-2 whitespace-pre-line font-medium">
                {loc.process}
              </div>
            </div>
          )}

          {/* Download Brief Section */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Download Scheme Brief File:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDownloadPDF}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-950 dark:text-emerald-200 rounded-lg border border-emerald-300 dark:border-emerald-800 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                {t('downloadPDF')}
              </button>
              <button
                onClick={handleDownloadJSON}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-blue-900 bg-blue-100 hover:bg-blue-200 dark:bg-blue-950 dark:text-blue-200 rounded-lg border border-blue-300 dark:border-blue-800 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                {t('downloadJSON')}
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark(scheme.id)}
              className={`p-2.5 rounded-xl border transition-colors ${
                isBookmarked
                  ? 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300'
                  : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500' : ''}`} />
            </button>

            <button
              onClick={handleShare}
              className="p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              title="Share Scheme"
            >
              <Share2 className="w-4 h-4" />
            </button>
            {copied && <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">Link Copied!</span>}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors"
            >
              {t('close')}
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenApply(scheme);
              }}
              className="flex items-center gap-1.5 px-6 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition-colors"
            >
              <span>{t('applyNow')}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
