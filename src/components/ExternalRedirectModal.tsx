import React from 'react';
import { Scheme } from '../types/scheme';
import { X, ExternalLink, ShieldCheck, ArrowRight, FileEdit } from 'lucide-react';

interface ExternalRedirectModalProps {
  scheme: Scheme | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenDigitalApply: (scheme: Scheme) => void;
}

export const ExternalRedirectModal: React.FC<ExternalRedirectModalProps> = ({
  scheme,
  isOpen,
  onClose,
  onOpenDigitalApply,
}) => {
  if (!isOpen || !scheme) return null;

  // Determine official URL with safe default fallback
  const targetUrl = scheme.official_url || scheme.apply_url || 'https://www.myscheme.gov.in/';

  const handleContinue = () => {
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden text-slate-900 dark:text-slate-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-emerald-200 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-500/40 text-emerald-200 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
            External Portal Navigation Notice
          </div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <ExternalLink className="w-5 h-5 text-emerald-400" />
            Leaving Portal Confirmation
          </h2>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <p className="text-sm font-medium leading-relaxed text-slate-800 dark:text-slate-200">
            You're about to leave this site for the official <strong className="text-emerald-700 dark:text-emerald-400 font-bold">{scheme.title}</strong> application page.
          </p>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Verified Official Domain</span>
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 break-all bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>{targetUrl}</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
              This link will open in a secure new browser tab with encryption (<code className="font-mono text-emerald-600 dark:text-emerald-400">rel="noopener noreferrer"</code>).
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
            >
              Cancel
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenDigitalApply(scheme);
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-800 rounded-xl hover:bg-emerald-200"
            >
              <FileEdit className="w-3.5 h-3.5" />
              <span>Apply In-Portal</span>
            </button>

            <button
              onClick={handleContinue}
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md"
            >
              <span>Continue to Official Site</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
