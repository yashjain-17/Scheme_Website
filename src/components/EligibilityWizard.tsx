import React, { useState } from 'react';
import { Scheme } from '../types/scheme';
import { useLanguage } from '../contexts/LanguageContext';
import { ALL_36_STATES_UTS } from './StateSearchDropdown';
import { Sparkles, Check, X, RefreshCw, Filter, ArrowRight } from 'lucide-react';

interface EligibilityWizardProps {
  isOpen: boolean;
  onClose: () => void;
  schemes: Scheme[];
  onApplyMatchedFilters: (matchedSchemes: Scheme[]) => void;
}

export const EligibilityWizard: React.FC<EligibilityWizardProps> = ({
  isOpen,
  onClose,
  schemes,
  onApplyMatchedFilters,
}) => {
  const { t } = useLanguage();

  const [step, setStep] = useState(1);
  const [age, setAge] = useState<number>(25);
  const [gender, setGender] = useState<string>('All');
  const [occupation, setOccupation] = useState<string>('All');
  const [annualIncome, setAnnualIncome] = useState<number>(250000);
  const [stateResidency, setStateResidency] = useState<string>('All');

  if (!isOpen) return null;

  const handleCalculate = () => {
    // Filter logic including Transgender / Third Gender matching
    const matched = schemes.filter((s) => {
      // Age check
      if (s.min_age && age < s.min_age) return false;
      if (s.max_age && age > s.max_age) return false;

      // Gender check (All, Female, Male, Transgender / Third Gender)
      if (s.gender !== 'All' && gender !== 'All') {
        if (s.gender.toLowerCase() !== gender.toLowerCase()) {
          return false;
        }
      }

      // Income check
      if (s.max_income && annualIncome > s.max_income) return false;

      // Occupation check
      if (s.occupation !== 'All' && occupation !== 'All' && s.occupation.toLowerCase() !== occupation.toLowerCase()) return false;

      // State check
      if (s.state !== 'All' && stateResidency !== 'All' && s.state.toLowerCase() !== stateResidency.toLowerCase()) return false;

      return true;
    });

    onApplyMatchedFilters(matched);
    onClose();
  };

  const handleReset = () => {
    setStep(1);
    setAge(25);
    setGender('All');
    setOccupation('All');
    setAnnualIncome(250000);
    setStateResidency('All');
  };

  const genderOptions = [
    { value: 'All', label: 'Any Gender' },
    { value: 'Female', label: 'Female' },
    { value: 'Male', label: 'Male' },
    { value: 'Transgender', label: 'Other / Third Gender' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in text-slate-900 dark:text-white">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-emerald-200 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-200 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Smart Eligibility Matching Engine
          </div>
          <h2 className="text-xl sm:text-2xl font-bold">Find Schemes You Qualify For</h2>
          <p className="text-xs text-emerald-100/80 mt-1">
            Answer a few quick questions to dynamically filter 100% eligible central & state benefits.
          </p>
        </div>

        {/* Step Indicator Bar */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
          <div
            className={`flex-1 text-center py-2 text-xs font-semibold ${
              step >= 1 ? 'text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-600' : 'text-slate-400'
            }`}
          >
            1. Personal Info
          </div>
          <div
            className={`flex-1 text-center py-2 text-xs font-semibold ${
              step >= 2 ? 'text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-600' : 'text-slate-400'
            }`}
          >
            2. Profession & State
          </div>
          <div
            className={`flex-1 text-center py-2 text-xs font-semibold ${
              step >= 3 ? 'text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-600' : 'text-slate-400'
            }`}
          >
            3. Income Level
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                  Your Age: <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">{age} Years Old</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={age}
                  onChange={(e) => setAge(parseInt(e.target.value, 10))}
                  className="w-full accent-emerald-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-semibold">
                  <span>1 yr</span>
                  <span>50 yrs</span>
                  <span>100 yrs</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
                  Gender Identification:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {genderOptions.map((g) => (
                    <button
                      key={g.value}
                      onClick={() => setGender(g.value)}
                      className={`py-2 px-2.5 text-xs font-bold rounded-xl border transition-all text-center ${
                        gender === g.value
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                          : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:border-emerald-400'
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
                  Primary Occupation:
                </label>
                <select
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold"
                >
                  <option value="All">All Occupations / General Public</option>
                  <option value="Farmer">Farmer / Agriculture Worker</option>
                  <option value="Student">Student / Scholar</option>
                  <option value="Entrepreneur">Small Business Owner / Entrepreneur</option>
                  <option value="Senior Citizen">Senior Citizen / Pensioner</option>
                  <option value="Unemployed">Unemployed / Jobseeker</option>
                  <option value="Worker">Unorganized Sector Worker</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
                  State / Union Territory of Residence:
                </label>
                <select
                  value={stateResidency}
                  onChange={(e) => setStateResidency(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold"
                >
                  <option value="All">All India / Central Level</option>
                  {ALL_36_STATES_UTS.map((st: string) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                  Annual Household Income: <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">₹{annualIncome.toLocaleString('en-IN')}</span>
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
                <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-semibold">
                  <span>₹50,000</span>
                  <span>₹5 Lakhs</span>
                  <span>₹15 Lakhs+</span>
                </div>
              </div>

              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800/60 text-xs text-slate-700 dark:text-emerald-200 space-y-1">
                <div className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Wizard Summary Ready
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
            className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 px-3 py-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset
          </button>

          <div className="flex items-center gap-2">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl hover:bg-slate-100"
              >
                Back
              </button>
            )}

            {step < 3 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md"
              >
                Next Step
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleCalculate}
                className="flex items-center gap-1.5 px-6 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded-xl shadow-lg"
              >
                <Filter className="w-4 h-4 text-amber-300" />
                See Eligible Schemes
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
