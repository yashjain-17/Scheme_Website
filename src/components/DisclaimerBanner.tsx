import React, { useState, useEffect } from 'react';
import { Info, X } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  const [isDismissed, setIsDismissed] = useState<boolean>(true);

  useEffect(() => {
    const dismissed = localStorage.getItem('disclaimer_banner_dismissed');
    if (!dismissed) {
      setIsDismissed(false);
    }
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('disclaimer_banner_dismissed', 'true');
  };

  if (isDismissed) return null;

  return (
    <div className="bg-slate-100 dark:bg-slate-800/90 border-b border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 text-xs py-2.5 px-4 sm:px-6 transition-colors duration-200 relative z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
          <p className="leading-snug">
            <strong className="font-semibold text-slate-900 dark:text-slate-100">Notice: </strong>
            This is an independent informational platform and is not affiliated with, endorsed by, or operated by the Government of India or any state government.
          </p>
        </div>

        <button
          onClick={handleDismiss}
          className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 transition-colors shrink-0"
          title="Dismiss notice"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
