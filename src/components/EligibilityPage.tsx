import React, { useState } from 'react';
import { Scheme } from '../types/scheme';
import { useLanguage } from '../contexts/LanguageContext';
import { SchemeCard } from './SchemeCard';
import { 
  Sparkles, 
  Check, 
  RefreshCw, 
  Filter, 
  ArrowRight, 
  CheckCircle2, 
  User, 
  MapPin, 
  IndianRupee, 
  Briefcase,
  Award
} from 'lucide-react';

interface EligibilityPageProps {
  schemes: Scheme[];
  onOpenDetails: (scheme: Scheme) => void;
  onOpenApply: (scheme: Scheme) => void;
  onToggleBookmark: (id: number) => void;
  bookmarkedIds: number[];
}

export const EligibilityPage: React.FC<EligibilityPageProps> = ({
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
  const [isCalculated, setIsCalculated] = useState<boolean>(true);

  // Filter schemes matching the profile
  const matchedSchemes = schemes.filter((s) => {
    // Age check
    if (s.min_age && age < s.min_age) return false;
    if (s.max_age && age > s.max_age) return false;

    // Gender check
    if (s.gender !== 'All' && gender !== 'All' && s.gender !== gender) return false;

    // Income check
    if (s.max_income && annualIncome > s.max_income) return false;

    // Occupation check
    if (s.occupation !== 'All' && occupation !== 'All' && s.occupation !== occupation) return false;

    // State check
    if (s.state !== 'All' && stateResidency !== 'All' && s.state.toLowerCase() !== stateResidency.toLowerCase()) return false;

    return true;
  });

  const handleReset = () => {
    setStep(1);
    setAge(25);
    setGender('All');
    setOccupation('All');
    setAnnualIncome(250000);
    setStateResidency('All');
    setIsCalculated(false);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto">
      {/* Page Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-6 sm:p-10 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-800/80 border border-emerald-500/30 text-emerald-200 text-xs font-semibold mb-3">
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            Smart Eligibility Matching Portal
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight mb-2">
            Check Your Govt Welfare Eligibility
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
            Answer 3 quick questions about your profile to discover 100% verified central and state schemes you qualify for.
          </p>
        </div>
      </div>

      {/* Interactive Questionnaire Container */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xs overflow-hidden">
        {/* Step Indicator Bar */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
          <button
            onClick={() => setStep(1)}
            className={`flex-1 text-center py-3 text-xs sm:text-sm font-bold transition-all ${
              step === 1 ? 'text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-600 bg-white dark:bg-slate-900' : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            1. Age & Gender
          </button>
          <button
            onClick={() => setStep(2)}
            className={`flex-1 text-center py-3 text-xs sm:text-sm font-bold transition-all ${
              step === 2 ? 'text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-600 bg-white dark:bg-slate-900' : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            2. State & Occupation
          </button>
          <button
            onClick={() => setStep(3)}
            className={`flex-1 text-center py-3 text-xs sm:text-sm font-bold transition-all ${
              step === 3 ? 'text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-600 bg-white dark:bg-slate-900' : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            3. Household Income
          </button>
        </div>

        {/* Step Form Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {step === 1 && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div>
                <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">
                  Select Your Age: <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">{age} Years Old</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={age}
                  onChange={(e) => {
                    setAge(parseInt(e.target.value, 10));
                    setIsCalculated(true);
                  }}
                  className="w-full accent-emerald-600 h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-400 font-medium mt-1">
                  <span>1 yr</span>
                  <span>50 yrs</span>
                  <span>100 yrs</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">
                  Gender Identification:
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['All', 'Female', 'Male'].map((g) => (
                    <button
                      key={g}
                      onClick={() => {
                        setGender(g);
                        setIsCalculated(true);
                      }}
                      className={`py-3 px-4 text-xs sm:text-sm font-bold rounded-2xl border transition-all ${
                        gender === g
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                          : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:border-emerald-400'
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
            <div className="space-y-6 max-w-2xl mx-auto">
              <div>
                <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">
                  Primary Occupation / Category:
                </label>
                <select
                  value={occupation}
                  onChange={(e) => {
                    setOccupation(e.target.value);
                    setIsCalculated(true);
                  }}
                  className="w-full p-3 text-xs sm:text-sm font-semibold rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="All">All Occupations / General Public</option>
                  <option value="Farmer">Farmer / Agriculture Worker</option>
                  <option value="Student">Student / Scholar</option>
                  <option value="Entrepreneur">Small Business Owner / Entrepreneur</option>
                  <option value="Senior Citizen">Senior Citizen / Pensioner</option>
                  <option value="Unemployed">Unemployed / Jobseeker</option>
                  <option value="Worker">Unorganized Sector Worker / Artisan</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">
                  State / Union Territory of Domicile:
                </label>
                <select
                  value={stateResidency}
                  onChange={(e) => {
                    setStateResidency(e.target.value);
                    setIsCalculated(true);
                  }}
                  className="w-full p-3 text-xs sm:text-sm font-semibold rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="All">All India / Central Level Only</option>
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
                  <option value="Punjab">Punjab</option>
                  <option value="Kerala">Kerala</option>
                </select>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div>
                <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">
                  Annual Household Income: <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">₹{annualIncome.toLocaleString('en-IN')}</span>
                </label>
                <input
                  type="range"
                  min="50000"
                  max="1500000"
                  step="25000"
                  value={annualIncome}
                  onChange={(e) => {
                    setAnnualIncome(parseInt(e.target.value, 10));
                    setIsCalculated(true);
                  }}
                  className="w-full accent-emerald-600 h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-400 font-medium mt-1">
                  <span>₹50,000</span>
                  <span>₹5 Lakhs</span>
                  <span>₹15 Lakhs+</span>
                </div>
              </div>

              <div className="p-5 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800 space-y-2 text-xs sm:text-sm text-slate-800 dark:text-emerald-200">
                <div className="font-extrabold text-emerald-900 dark:text-emerald-300 flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  Your Configured Profile Criteria:
                </div>
                <p>• Age: <strong>{age} Years</strong> | Gender: <strong>{gender}</strong> | Occupation: <strong>{occupation}</strong></p>
                <p>• Annual Household Income Limit: <strong>≤ ₹{annualIncome.toLocaleString('en-IN')}</strong> | Region: <strong>{stateResidency}</strong></p>
              </div>
            </div>
          )}
        </div>

        {/* Step Navigation Bar */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 px-3 py-2"
          >
            <RefreshCw className="w-4 h-4" />
            Reset Criteria
          </button>

          <div className="flex items-center gap-2">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl hover:bg-slate-100"
              >
                Back
              </button>
            )}

            {step < 3 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md"
              >
                Next Step
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setIsCalculated(true)}
                className="flex items-center gap-1.5 px-6 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl shadow-lg"
              >
                <Filter className="w-4 h-4 text-amber-300" />
                View Matched Schemes ({matchedSchemes.length})
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Matched Schemes Results Grid */}
      <div className="space-y-6 pt-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-6 h-6 text-amber-500" />
              Your Eligible Schemes ({matchedSchemes.length} Matched)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Based on your configured age ({age}), income (≤₹{annualIncome.toLocaleString()}), and region ({stateResidency}).
            </p>
          </div>

          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
            100% Verified Eligibility Match
          </span>
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
    </div>
  );
};
