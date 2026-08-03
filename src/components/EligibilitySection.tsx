import React, { useState } from 'react';
import { Scheme } from '../types/scheme';
import { SchemeCard } from './SchemeCard';
import { useLanguage } from '../contexts/LanguageContext';
import { Sparkles, CheckCircle2, RefreshCw, Filter, ArrowRight, UserCheck, ShieldCheck, Award } from 'lucide-react';

interface EligibilitySectionProps {
  schemes: Scheme[];
  onOpenDetails: (scheme: Scheme) => void;
  onOpenApply: (scheme: Scheme) => void;
  onToggleBookmark: (id: number) => void;
  bookmarkedIds: number[];
}

export const EligibilitySection: React.FC<EligibilitySectionProps> = ({
  schemes,
  onOpenDetails,
  onOpenApply,
  onToggleBookmark,
  bookmarkedIds,
}) => {
  const { t } = useLanguage();

  const [step, setStep] = useState(1);
  const [age, setAge] = useState<number>(25);
  const [gender, setGender] = useState<string>('All');
  const [occupation, setOccupation] = useState<string>('All');
  const [annualIncome, setAnnualIncome] = useState<number>(250000);
  const [stateResidency, setStateResidency] = useState<string>('All');

  const [calculated, setCalculated] = useState(false);
  const [matchedSchemes, setMatchedSchemes] = useState<Scheme[]>([]);

  const handleCalculate = () => {
    const matched = schemes.filter((s) => {
      if (s.min_age && age < s.min_age) return false;
      if (s.max_age && age > s.max_age) return false;
      if (s.gender !== 'All' && gender !== 'All' && s.gender !== gender) return false;
      if (s.max_income && annualIncome > s.max_income) return false;
      if (s.occupation !== 'All' && occupation !== 'All' && s.occupation !== occupation) return false;
      if (s.state !== 'All' && stateResidency !== 'All' && s.state !== stateResidency) return false;
      return true;
    });

    setMatchedSchemes(matched);
    setCalculated(true);
  };

  const handleReset = () => {
    setStep(1);
    setAge(25);
    setGender('All');
    setOccupation('All');
    setAnnualIncome(250000);
    setStateResidency('All');
    setCalculated(false);
    setMatchedSchemes([]);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-800 dark:from-emerald-950 dark:via-teal-950 dark:to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold mb-3 backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Official Smart Eligibility Engine
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2">
            Check Schemes You Are Eligible For
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
            Answer 3 quick profile questions to discover 100% matching Central & State Government benefits, subsidies, scholarships, and grants.
          </p>
        </div>
      </div>

      {/* Calculator Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xs overflow-hidden">
        {/* Step Indicator */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
          <button
            onClick={() => setStep(1)}
            className={`flex-1 text-center py-3 text-xs sm:text-sm font-bold transition-colors ${
              step >= 1 ? 'text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-600' : 'text-slate-400'
            }`}
          >
            1. Personal Demographics
          </button>
          <button
            onClick={() => setStep(2)}
            className={`flex-1 text-center py-3 text-xs sm:text-sm font-bold transition-colors ${
              step >= 2 ? 'text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-600' : 'text-slate-400'
            }`}
          >
            2. Occupation & Domicile
          </button>
          <button
            onClick={() => setStep(3)}
            className={`flex-1 text-center py-3 text-xs sm:text-sm font-bold transition-colors ${
              step >= 3 ? 'text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-600' : 'text-slate-400'
            }`}
          >
            3. Income Level
          </button>
        </div>

        {/* Step Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">
                  Your Current Age: <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">{age} Years Old</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={age}
                  onChange={(e) => setAge(parseInt(e.target.value, 10))}
                  className="w-full accent-emerald-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>1 yr</span>
                  <span>50 yrs</span>
                  <span>100 yrs</span>
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">
                  Gender Identification:
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['All', 'Female', 'Male'].map((g) => (
                    <button
                      key={g}
                      onClick={() => setGender(g)}
                      className={`py-3 px-4 text-xs font-bold rounded-2xl border transition-all ${
                        gender === g
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-800 dark:text-emerald-300 shadow-xs'
                          : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-300'
                      }`}
                    >
                      {g === 'All' ? 'Any Gender' : g}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">
                  Primary Occupation / Category:
                </label>
                <select
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  className="w-full p-3 text-xs sm:text-sm rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold"
                >
                  <option value="All">All Occupations / General Citizen</option>
                  <option value="Farmer">Farmer / Agriculture Worker</option>
                  <option value="Student">Student / Scholar</option>
                  <option value="Entrepreneur">Entrepreneur / Small Business Owner</option>
                  <option value="Senior Citizen">Senior Citizen / Pensioner</option>
                  <option value="Unemployed">Unemployed Youth / Jobseeker</option>
                  <option value="Worker">Unorganized Sector Worker / Artisan</option>
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">
                  State / Union Territory Domicile:
                </label>
                <select
                  value={stateResidency}
                  onChange={(e) => setStateResidency(e.target.value)}
                  className="w-full p-3 text-xs sm:text-sm rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold"
                >
                  <option value="All">All India / Central Level</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Delhi">Delhi NCR</option>
                  <option value="Bihar">Bihar</option>
                  <option value="West Bengal">West Bengal</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Odisha">Odisha</option>
                </select>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">
                  Annual Household Income: <span className="text-emerald-600 dark:text-emerald-400 font-black">₹{annualIncome.toLocaleString('en-IN')}</span>
                </label>
                <input
                  type="range"
                  min="50000"
                  max="1500000"
                  step="25000"
                  value={annualIncome}
                  onChange={(e) => setAnnualIncome(parseInt(e.target.value, 10))}
                  className="w-full accent-emerald-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>₹50,000</span>
                  <span>₹5 Lakhs</span>
                  <span>₹15 Lakhs+</span>
                </div>
              </div>

              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800/60 text-xs text-slate-700 dark:text-emerald-200 space-y-1">
                <div className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Your Profile Summary Ready
                </div>
                <p>Age: {age} yrs | Gender: {gender} | Occupation: {occupation}</p>
                <p>Income: ≤ ₹{annualIncome.toLocaleString('en-IN')} | State: {stateResidency}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-700 dark:text-slate-400 px-3 py-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset Parameters
          </button>

          <div className="flex items-center gap-2">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-4 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl hover:bg-slate-100"
              >
                Back
              </button>
            )}

            {step < 3 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs"
              >
                Next Step
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleCalculate}
                className="flex items-center gap-1.5 px-6 py-2.5 text-xs font-extrabold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded-xl shadow-md"
              >
                <Filter className="w-4 h-4 text-amber-300" />
                Find My Eligible Schemes
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Matched Schemes Results */}
      {calculated && (
        <div className="space-y-6 pt-4">
          <div className="bg-emerald-50 dark:bg-emerald-950/40 p-6 rounded-3xl border border-emerald-200 dark:border-emerald-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block">Eligibility Result</span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-600" />
                You Qualify For {matchedSchemes.length} Government Schemes!
              </h3>
            </div>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-bold rounded-xl"
            >
              Modify Profile
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchedSchemes.map((scheme) => (
              <SchemeCard
                key={scheme.id}
                scheme={scheme}
                isBookmarked={bookmarkedIds.includes(scheme.id)}
                onToggleBookmark={onToggleBookmark}
                onOpenDetails={onOpenDetails}
                onOpenApply={onOpenApply}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
