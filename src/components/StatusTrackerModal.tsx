import React, { useState } from 'react';
import { Application } from '../types/scheme';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  X, 
  Search, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Calendar, 
  User, 
  Building2,
  FileCheck2
} from 'lucide-react';

interface StatusTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCode?: string;
}

export const StatusTrackerModal: React.FC<StatusTrackerModalProps> = ({
  isOpen,
  onClose,
  initialCode = '',
}) => {
  const { t } = useLanguage();
  const [code, setCode] = useState(initialCode);
  const [loading, setLoading] = useState(false);
  const [application, setApplication] = useState<Application | null>(null);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setLoading(true);
    setError('');
    setApplication(null);

    try {
      const res = await fetch(`/api/applications?code=${encodeURIComponent(code.trim())}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Tracking code not found.');
      }

      setApplication(data);
    } catch (err: any) {
      setError(err.message || 'Error fetching status');
    } finally {
      setLoading(false);
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

          <h2 className="text-xl font-bold flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-emerald-300" />
            {t('trackStatus')}
          </h2>
          <p className="text-xs text-emerald-100/80 mt-1">Check live progress of your submitted benefit application</p>
        </div>

        <div className="p-6 space-y-5">
          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={t('enterTrackingCode')}
              className="flex-1 p-3 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md disabled:opacity-50 shrink-0"
            >
              {loading ? 'Searching...' : t('checkStatus')}
            </button>
          </form>

          {error && (
            <div className="p-3 bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {application && (
            <div className="space-y-4 border-t border-slate-200 dark:border-slate-800 pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-semibold">Scheme Name</span>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{application.scheme_title}</h4>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                  {application.status}
                </span>
              </div>

              {/* Progress Tracker Steps */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Application Progress Timeline
                </div>

                <div className="space-y-3 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-300 dark:before:bg-slate-700">
                  <div className="flex items-center gap-3 relative z-10">
                    <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                      ✓
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 block">Submitted & Digitized</span>
                      <span className="text-[10px] text-slate-400">
                        {new Date(application.submitted_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 relative z-10">
                    <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                      ✓
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 block">Nodal Officer Review</span>
                      <span className="text-[10px] text-slate-400">Eligibility Documents Validated</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 relative z-10">
                    <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold animate-pulse">
                      ●
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 block">DBT Treasury Sanction</span>
                      <span className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">In Final Approval Queue</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400">
                <div>Applicant: <strong className="text-slate-900 dark:text-white">{application.applicant_name}</strong></div>
                <div>State: <strong className="text-slate-900 dark:text-white">{application.state}</strong></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
