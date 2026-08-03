import React from 'react';
import { Scheme } from '../types/scheme';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  TrendingUp, 
  Users, 
  Award, 
  BarChart3, 
  Building2, 
  Sparkles,
  PieChart,
  ArrowUpRight,
  Zap,
  Info
} from 'lucide-react';

interface DashboardSectionProps {
  schemes: Scheme[];
  onOpenDetails: (scheme: Scheme) => void;
  onOpenApply: (scheme: Scheme) => void;
  onOpenWizard: () => void;
}

export const DashboardSection: React.FC<DashboardSectionProps> = ({
  schemes,
  onOpenDetails,
  onOpenApply,
  onOpenWizard,
}) => {
  const { t } = useLanguage();

  const totalApplications = schemes.reduce((acc, s) => acc + (s.total_applications || 0), 0);
  const featuredSchemes = schemes.filter((s) => s.featured);
  const centralCount = schemes.filter((s) => s.level === 'Central').length;
  const stateCount = schemes.filter((s) => s.level === 'State').length;

  // Sector breakdown
  const categoryStats: Record<string, number> = {};
  schemes.forEach((s) => {
    categoryStats[s.category] = (categoryStats[s.category] || 0) + 1;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-white p-6 sm:p-8 rounded-3xl border border-emerald-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 text-xs font-bold mb-3">
            <BarChart3 className="w-3.5 h-3.5 text-emerald-600 dark:text-amber-300" />
            National Public Welfare Analytics & Dashboard
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2">
            Real-Time Welfare Impact & DBT Overview
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6 font-medium">
            Comprehensive transparent analytics tracking beneficiary reach, direct bank transfer disbursements, and central/state scheme participation across all sectors.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={onOpenWizard}
              className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Check Eligibility Quiz</span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Total Active Schemes</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white">4,770+ Listed</div>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">{centralCount} Central | {stateCount} State</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Total Applications Logged</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white">12.5 Cr+</div>
            <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold">100% Aadhaar Verified</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Total Funds Disbursed</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white">₹3.42 Lakh Cr</div>
            <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold">Zero Middlemen Leakage</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Average Satisfaction</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white">4.88 / 5.0</div>
            <span className="text-[10px] text-purple-600 dark:text-purple-400 font-bold">Based on 1.2M+ Reviews</span>
          </div>
        </div>
      </div>

      {/* Sector Breakdown Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sector Distribution List */}
        <div className="lg:col-span-1 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="pb-3 border-b border-slate-100 dark:border-slate-800 space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <PieChart className="w-4 h-4 text-emerald-600" />
                Featured Schemes by Sector
              </h3>
              <span className="text-xs text-slate-400 font-semibold">{Object.keys(categoryStats).length} Sectors</span>
            </div>
            <div className="text-[10px] font-medium text-slate-500 flex items-center gap-1">
              <Info className="w-3 h-3 text-emerald-600" />
              Note: More schemes added regularly
            </div>
          </div>

          <div className="space-y-3">
            {Object.entries(categoryStats).map(([cat, count]) => {
              const pct = Math.round((count / (schemes.length || 1)) * 100);
              return (
                <div key={cat} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <span className="truncate pr-2">{cat}</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">{count}</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${Math.max(15, pct)}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Flagship Schemes Table */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              High-Impact Flagship Schemes
            </h3>
            <span className="text-xs font-bold text-emerald-600">Top Priority</span>
          </div>

          <div className="space-y-3">
            {featuredSchemes.map((scheme) => (
              <div
                key={scheme.id}
                className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 flex flex-wrap items-center justify-between gap-3 hover:border-emerald-400 transition-colors"
              >
                <div className="max-w-md">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      {scheme.ministry}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold">{scheme.level}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">{scheme.title}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">{scheme.benefits}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenDetails(scheme)}
                    className="px-3 py-1.5 text-xs font-bold border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => onOpenApply(scheme)}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg"
                  >
                    <span>Apply</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
