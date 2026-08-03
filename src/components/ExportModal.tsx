import React from 'react';
import { Scheme } from '../types/scheme';
import { useLanguage } from '../contexts/LanguageContext';
import { X, Download, FileSpreadsheet, FileCode, Printer } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  schemes: Scheme[];
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, schemes }) => {
  const { t } = useLanguage();

  if (!isOpen) return null;

  const exportCSV = () => {
    const headers = ['ID', 'Title', 'Category', 'Ministry', 'Level', 'Min Age', 'Max Age', 'Benefits'];
    const rows = schemes.map((s) => [
      s.id,
      `"${s.title.replace(/"/g, '""')}"`,
      `"${s.category}"`,
      `"${s.ministry}"`,
      s.level,
      s.min_age,
      s.max_age,
      `"${s.benefits.replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'National_Schemes_Catalogue.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportJSON = () => {
    const jsonStr = JSON.stringify(schemes, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'National_Schemes_Catalogue.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const triggerPrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden">
        <div className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white p-6 relative">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 text-blue-200 hover:text-white rounded-full bg-white/10">
            <X className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Download className="w-5 h-5" />
            {t('exportCatalog')}
          </h2>
          <p className="text-xs text-blue-100/80 mt-1">Download complete repository of {schemes.length} schemes offline</p>
        </div>

        <div className="p-6 space-y-3">
          <button
            onClick={exportCSV}
            className="w-full p-4 bg-slate-50 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center gap-3 transition-colors text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300 flex items-center justify-center shrink-0">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">Export as CSV Spreadsheet</h4>
              <p className="text-[11px] text-slate-500">Open in Microsoft Excel or Google Sheets</p>
            </div>
          </button>

          <button
            onClick={exportJSON}
            className="w-full p-4 bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/50 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center gap-3 transition-colors text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center shrink-0">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">Export as Raw JSON File</h4>
              <p className="text-[11px] text-slate-500">Structured data feed for developers</p>
            </div>
          </button>

          <button
            onClick={triggerPrint}
            className="w-full p-4 bg-slate-50 dark:bg-slate-800 hover:bg-purple-50 dark:hover:bg-purple-950/50 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center gap-3 transition-colors text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 flex items-center justify-center shrink-0">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">Print Portal Summary</h4>
              <p className="text-[11px] text-slate-500">Print or Save as PDF document</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
