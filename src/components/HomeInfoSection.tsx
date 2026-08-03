import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Search, 
  FileCheck2, 
  ArrowRight, 
  Bell, 
  Calculator, 
  CheckCircle2, 
  Building2, 
  Zap, 
  HelpCircle,
  Clock,
  Landmark,
  Users
} from 'lucide-react';

interface HomeInfoSectionProps {
  onOpenWizard: () => void;
  onOpenStatusTracker: () => void;
}

export const HomeInfoSection: React.FC<HomeInfoSectionProps> = ({
  onOpenWizard,
  onOpenStatusTracker,
}) => {
  // Benefit Estimator Calculator state
  const [familySize, setFamilySize] = useState<number>(4);
  const [hasFarmer, setHasFarmer] = useState<boolean>(true);
  const [hasGirlChild, setHasGirlChild] = useState<boolean>(true);
  const [hasSenior, setHasSenior] = useState<boolean>(false);

  // Calculate estimated annual benefits
  let estimatedValue = 500000; // Base Ayushman Health Cover
  if (hasFarmer) estimatedValue += 6000 + 15000; // PM-KISAN + Crop insurance/solar
  if (hasGirlChild) estimatedValue += 12000 + 15000; // Sukanya + Scholarship
  if (hasSenior) estimatedValue += 18000; // Pension

  const announcements = [
    { tag: 'NEW UPDATE', date: 'July 2025', text: 'PM Surya Ghar Muft Bijli Scheme central subsidy increased up to ₹78,000 for rooftop solar installations.' },
    { tag: 'CABINET SANCTION', date: 'June 2025', text: 'PMAY Urban 2.0 approved to construct 1 Crore additional affordable houses for low-income families.' },
    { tag: 'STATE DIRECTIVE', date: 'June 2025', text: 'Mukhyamantri Majhi Ladki Bahin monthly allowance of ₹1,500 credited to 1.5 Crore women in Maharashtra.' },
    { tag: 'ARTISAN WELFARE', date: 'May 2025', text: 'PM Vishwakarma toolkit incentives of ₹15,000 distributed to over 40 Lakh traditional craftspeople.' }
  ];

  return (
    <section className="py-12 bg-white dark:bg-slate-900 border-t border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* 1. Official Announcements & Policy Ticker */}
        <div className="bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 rounded-3xl p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <span className="p-2 bg-emerald-600 text-white rounded-xl">
              <Bell className="w-5 h-5 animate-bounce" />
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Official Government Welfare Announcements & Policy Updates
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Latest cabinet decisions, direct benefit transfers, and scheme extension notices
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {announcements.map((item, i) => (
              <div key={i} className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-emerald-100 dark:border-emerald-900 space-y-2">
                <div className="flex items-center justify-between text-[10px] font-bold">
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300">
                    {item.tag}
                  </span>
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {item.date}
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-snug line-clamp-3">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 2. How the Portal Works (3-Step Guided Process) */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Simple 3-Step Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              How Citizens Benefit from MyScheme Portal
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Designed for 100% transparency, zero service charges, and direct Aadhaar bank account transfer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-3xl border border-slate-200 dark:border-slate-700/80 relative space-y-3 group hover:border-emerald-500 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black text-lg shadow-md">
                1
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Search className="w-4 h-4 text-emerald-600" />
                Check Your Eligibility
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Answer 3 simple questions (Age, Income, Occupation, Residence) on our Smart Eligibility Quiz to discover schemes tailored for your family.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-3xl border border-slate-200 dark:border-slate-700/80 relative space-y-3 group hover:border-emerald-500 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-black text-lg shadow-md">
                2
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-teal-600" />
                Review Guidelines & Documents
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Read official scheme criteria, benefits, required documents list, and download guidelines brief as printable PDF or structured JSON data.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-3xl border border-slate-200 dark:border-slate-700/80 relative space-y-3 group hover:border-emerald-500 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-black text-lg shadow-md">
                3
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Submit Application & Track
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Apply online to receive a unique SCH tracking code. Check live verification and direct benefit transfer (DBT) disbursement status anytime.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Interactive Benefit Estimator Calculator Widget */}
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-teal-950 text-white p-8 rounded-3xl shadow-xl grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-500/30 text-emerald-200 text-xs font-semibold">
              <Calculator className="w-3.5 h-3.5 text-amber-300" />
              Citizen Household Benefit Estimator
            </div>
            <h3 className="text-2xl font-black">Estimate Your Family's Total Annual Welfare Potential</h3>
            <p className="text-xs text-emerald-100/80 leading-relaxed">
              Toggle household criteria to estimate the combined monetary and health insurance value your family is eligible to receive under Central & State schemes.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <label className="flex items-center gap-2 p-3 rounded-xl bg-white/10 cursor-pointer hover:bg-white/20">
                <input
                  type="checkbox"
                  checked={hasFarmer}
                  onChange={(e) => setHasFarmer(e.target.checked)}
                  className="accent-emerald-500 w-4 h-4 rounded"
                />
                <span>Farmer / Ag Worker</span>
              </label>

              <label className="flex items-center gap-2 p-3 rounded-xl bg-white/10 cursor-pointer hover:bg-white/20">
                <input
                  type="checkbox"
                  checked={hasGirlChild}
                  onChange={(e) => setHasGirlChild(e.target.checked)}
                  className="accent-emerald-500 w-4 h-4 rounded"
                />
                <span>Girl Child / Student</span>
              </label>

              <label className="flex items-center gap-2 p-3 rounded-xl bg-white/10 cursor-pointer hover:bg-white/20">
                <input
                  type="checkbox"
                  checked={hasSenior}
                  onChange={(e) => setHasSenior(e.target.checked)}
                  className="accent-emerald-500 w-4 h-4 rounded"
                />
                <span>Senior Citizen (60+)</span>
              </label>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">Estimated Combined Value</span>
            <div className="text-3xl font-black text-amber-300">
              ₹{(estimatedValue).toLocaleString('en-IN')}+ <span className="text-xs text-white">/yr</span>
            </div>
            <p className="text-[10px] text-emerald-100/70">Includes Health Insurance + Cash Subsidies + Grants</p>
            <button
              onClick={onOpenWizard}
              className="w-full py-2.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-md transition-colors"
            >
              Get Exact Matching Schemes
            </button>
          </div>
        </div>

        {/* 4. Portal Directives & Guarantees */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/80 flex items-start gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-slate-900 dark:text-white font-bold mb-0.5">Direct Benefit Transfer (DBT)</strong>
              <span className="text-slate-500 dark:text-slate-400">100% financial aid transferred directly into Aadhaar-seeded accounts.</span>
            </div>
          </div>

          <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/80 flex items-start gap-3">
            <Landmark className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-slate-900 dark:text-white font-bold mb-0.5">36 States & UTs Integration</strong>
              <span className="text-slate-500 dark:text-slate-400">Unified single-window directory for Central and all State Level benefits.</span>
            </div>
          </div>

          <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/80 flex items-start gap-3">
            <Users className="w-6 h-6 text-purple-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-slate-900 dark:text-white font-bold mb-0.5">10 Indian Languages</strong>
              <span className="text-slate-500 dark:text-slate-400">Dynamic localization across Hindi, Tamil, Telugu, Marathi, Gujarati & more.</span>
            </div>
          </div>

          <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/80 flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-slate-900 dark:text-white font-bold mb-0.5">Zero Processing Fee</strong>
              <span className="text-slate-500 dark:text-slate-400">100% free government portal with zero registration or agent fees.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
