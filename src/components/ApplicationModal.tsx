import React, { useState } from 'react';
import { Scheme } from '../types/scheme';
import { useLanguage } from '../contexts/LanguageContext';
import { ALL_36_STATES_UTS } from './StateSearchDropdown';
import { 
  X, 
  Send, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles
} from 'lucide-react';

interface ApplicationModalProps {
  scheme: Scheme | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccessSubmitted: (trackingCode: string) => void;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({
  scheme,
  isOpen,
  onClose,
  onSuccessSubmitted,
}) => {
  const { t } = useLanguage();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState<number>(25);
  const [gender, setGender] = useState('Male');
  const [income, setIncome] = useState<number>(150000);
  const [stateName, setStateName] = useState('Maharashtra');
  const [fileName, setFileName] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [createdCode, setCreatedCode] = useState<string | null>(null);

  if (!isOpen || !scheme) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scheme_id: scheme.id,
          scheme_title: scheme.title,
          applicant_name: name,
          email,
          phone,
          age,
          gender,
          income,
          state: stateName,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed');

      setCreatedCode(data.tracking_code);
      onSuccessSubmitted(data.tracking_code);
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred while submitting application');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden">
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
            Direct Application Portal
          </div>
          <h2 className="text-lg sm:text-xl font-bold line-clamp-1">{scheme.title}</h2>
          <p className="text-xs text-emerald-100/80 mt-1">Submit digital application to Ministry Database</p>
        </div>

        {/* Success State */}
        {createdCode ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Application Submitted!</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Your application has been logged into the National Direct Benefit Transfer System.
            </p>

            <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Your Application Tracking Code</span>
              <div className="text-lg font-black text-emerald-600 dark:text-emerald-400 tracking-wider font-mono">
                {createdCode}
              </div>
            </div>

            <p className="text-[11px] text-slate-500">Save this code to check verification and disbursement status anytime.</p>

            <button
              onClick={onClose}
              className="w-full py-3 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl"
            >
              Done & Close
            </button>
          </div>
        ) : (
          /* Form State */
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {errorMsg && (
              <div className="p-3 bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ramesh@example.com"
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Mobile Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="10 digit mobile number"
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Applicant Age
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(parseInt(e.target.value, 10))}
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Annual Household Income (₹)
                </label>
                <input
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(parseFloat(e.target.value))}
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  State of Residence
                </label>
                <select
                  value={stateName}
                  onChange={(e) => setStateName(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  {ALL_36_STATES_UTS.map((st: string) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Simulated file upload */}
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Attach Supporting ID Proof (Aadhaar / Income Cert)
              </label>
              <label className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-emerald-500 rounded-xl cursor-pointer bg-slate-50 dark:bg-slate-800/50 transition-colors">
                <Upload className="w-4 h-4 text-emerald-600" />
                <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                  {fileName ? fileName : 'Choose PDF or Image file...'}
                </span>
                <input type="file" onChange={handleFileChange} className="hidden" accept=".pdf,.png,.jpg,.jpeg" />
              </label>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-1.5 px-6 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Submit Application'}
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
