import React, { useState } from 'react';
import { Scheme } from '../types/scheme';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  ArrowLeft, 
  Building2, 
  CheckCircle2, 
  FileText, 
  ListOrdered, 
  Download, 
  Share2, 
  ArrowUpRight, 
  Bookmark, 
  Info, 
  Star, 
  Users, 
  ShieldCheck,
  Award,
  Sparkles
} from 'lucide-react';

interface SchemeFullTabProps {
  scheme: Scheme;
  onBack: () => void;
  onOpenApply: (scheme: Scheme) => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: number) => void;
}

export const SchemeFullTab: React.FC<SchemeFullTabProps> = ({
  scheme,
  onBack,
  onOpenApply,
  isBookmarked,
  onToggleBookmark,
}) => {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'overview' | 'eligibility' | 'documents' | 'process'>('overview');
  const [copied, setCopied] = useState(false);

  const localizedTitle = (language === 'hi' && scheme.title_hi) ? scheme.title_hi : scheme.title;

  const handleDownloadPDF = () => {
    const textContent = `
=====================================================
NATIONAL SCHEMES PORTAL - OFFICIAL GUIDELINE SUMMARY
=====================================================
Scheme Title: ${scheme.title}
Ministry: ${scheme.ministry}
Government Level: ${scheme.level}
Target Sector: ${scheme.category}

OVERVIEW:
${scheme.short_desc}

KEY BENEFITS:
${scheme.benefits}

ELIGIBILITY CRITERIA:
${Array.isArray(scheme.eligibility) ? scheme.eligibility.map((e, i) => `${i + 1}. ${e}`).join('\n') : scheme.eligibility}

REQUIRED DOCUMENTS:
${Array.isArray(scheme.documents_required) ? scheme.documents_required.map((d, i) => `${i + 1}. ${d}`).join('\n') : scheme.documents_required}

APPLICATION PROCESS:
${scheme.application_process}

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
    const jsonStr = JSON.stringify(scheme, null, 2);
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-fade-in">
      {/* Back Breadcrumb Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 shadow-xs transition-all"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>← Back to Schemes Directory</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
          <span>Official Scheme ID: #{scheme.id}</span>
          <span>•</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">{scheme.category}</span>
        </div>
      </div>

      {/* Full Page Hero Header Card */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-4 relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-emerald-700/80 border border-emerald-500/40 text-emerald-200">
              {scheme.level} Level Scheme
            </span>
            <span className="text-xs text-emerald-100/90 bg-white/10 px-3 py-1 rounded-full font-medium">
              {scheme.ministry}
            </span>
            {scheme.featured && (
              <span className="px-3 py-1 bg-amber-500 text-slate-950 font-extrabold text-xs rounded-full flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
                Top Priority Scheme
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark(scheme.id)}
              className={`p-2.5 rounded-xl border transition-colors ${
                isBookmarked
                  ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold'
                  : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
              }`}
              title="Bookmark scheme"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-slate-950' : ''}`} />
            </button>

            <button
              onClick={handleShare}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
              title="Share Scheme"
            >
              <Share2 className="w-4 h-4" />
            </button>
            {copied && <span className="text-xs text-amber-300 font-bold">Link Copied!</span>}
          </div>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold leading-snug">
          {localizedTitle}
        </h1>

        <p className="text-sm sm:text-base text-emerald-100/90 max-w-4xl leading-relaxed">
          {scheme.short_desc}
        </p>

        <div className="pt-4 border-t border-emerald-800/80 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-xs text-emerald-200">
            <span className="flex items-center gap-1.5 font-medium">
              <Users className="w-4 h-4 text-emerald-400" />
              <strong>{(scheme.total_applications || 0).toLocaleString()}</strong> Beneficiaries Enrolled
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Star className="w-4 h-4 text-amber-300 fill-amber-300" />
              <strong>{scheme.rating || 4.8} / 5.0</strong> Citizen Rating
            </span>
          </div>

          <button
            onClick={() => onOpenApply(scheme)}
            className="flex items-center gap-2 px-6 py-3 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-lg transition-transform hover:scale-105"
          >
            <span>Apply Now for {scheme.title.split(' ')[0]} Benefits</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Details Body Container */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xs overflow-hidden">
        {/* Full Tab Bar Navigation */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-4 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Info className="w-4 h-4" />
            1. Overview & Key Benefits
          </button>

          <button
            onClick={() => setActiveTab('eligibility')}
            className={`px-6 py-4 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'eligibility'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            2. Detailed Eligibility
          </button>

          <button
            onClick={() => setActiveTab('documents')}
            className={`px-6 py-4 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'documents'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            3. Required Documents
          </button>

          <button
            onClick={() => setActiveTab('process')}
            className={`px-6 py-4 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'process'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <ListOrdered className="w-4 h-4" />
            4. How to Apply Step-by-Step
          </button>
        </div>

        {/* Tab Body Section */}
        <div className="p-6 sm:p-8 space-y-8 text-slate-900 dark:text-slate-100">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Highlight Benefit Card */}
              <div className="bg-emerald-50/80 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-3xl p-6 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-600" />
                  Primary Financial & Social Benefit
                </span>
                <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
                  {scheme.benefits}
                </p>
              </div>

              {/* Requirements Summary Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block">Minimum Age</span>
                  <strong className="text-base font-bold text-slate-900 dark:text-white">{scheme.min_age} Years</strong>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block">Maximum Age</span>
                  <strong className="text-base font-bold text-slate-900 dark:text-white">{scheme.max_age} Years</strong>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block">Household Income Ceiling</span>
                  <strong className="text-base font-bold text-slate-900 dark:text-white">
                    {scheme.max_income ? `≤ ₹${scheme.max_income.toLocaleString('en-IN')}` : 'No Limit'}
                  </strong>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block">Target Group</span>
                  <strong className="text-base font-bold text-slate-900 dark:text-white">{scheme.occupation}</strong>
                </div>
              </div>

              {/* Full Description */}
              <div className="space-y-3 pt-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Detailed Scheme Summary & Objective
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                  {scheme.short_desc}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'eligibility' && (
            <div className="space-y-6">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                Mandatory Eligibility Conditions
              </h3>

              <div className="bg-slate-50 dark:bg-slate-800/60 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
                {Array.isArray(scheme.eligibility) ? (
                  scheme.eligibility.map((crit, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{crit}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-800 dark:text-slate-200">{scheme.eligibility}</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-6">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-600" />
                Required Supporting Documents Checklist
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Array.isArray(scheme.documents_required) ? (
                  scheme.documents_required.map((doc, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">{doc}</span>
                    </div>
                  ))
                ) : (
                  <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border text-sm">{scheme.documents_required}</div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'process' && (
            <div className="space-y-6">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ListOrdered className="w-5 h-5 text-emerald-600" />
                Step-by-Step Online / Offline Application Instructions
              </h3>

              <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 text-sm sm:text-base leading-relaxed space-y-3 whitespace-pre-line text-slate-800 dark:text-slate-200 font-medium">
                {scheme.application_process}
              </div>
            </div>
          )}

          {/* Download Brief Section */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 bg-slate-50 dark:bg-slate-800/60 p-6 rounded-3xl">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Official Scheme Guidelines & Data Feed
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">Download formatted scheme brief for offline reference</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleDownloadPDF}
                className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 rounded-xl border border-emerald-300 dark:border-emerald-800 shadow-xs"
              >
                <Download className="w-4 h-4" />
                <span>{t('downloadPDF')}</span>
              </button>

              <button
                onClick={handleDownloadJSON}
                className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-blue-900 bg-blue-100 hover:bg-blue-200 dark:bg-blue-950 dark:text-blue-300 rounded-xl border border-blue-300 dark:border-blue-800 shadow-xs"
              >
                <Download className="w-4 h-4" />
                <span>{t('downloadJSON')}</span>
              </button>

              <button
                onClick={() => onOpenApply(scheme)}
                className="flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md"
              >
                <span>Apply Now</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
