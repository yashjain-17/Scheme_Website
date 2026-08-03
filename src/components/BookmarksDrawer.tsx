import React from 'react';
import { Scheme } from '../types/scheme';
import { useLanguage } from '../contexts/LanguageContext';
import { X, Bookmark, Download, ArrowUpRight, Trash2 } from 'lucide-react';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedSchemes: Scheme[];
  onRemoveBookmark: (id: number) => void;
  onOpenDetails: (scheme: Scheme) => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  bookmarkedSchemes,
  onRemoveBookmark,
  onOpenDetails,
}) => {
  const { t } = useLanguage();

  if (!isOpen) return null;

  const handleExportCSV = () => {
    if (bookmarkedSchemes.length === 0) return;

    const headers = ['ID', 'Title', 'Category', 'Ministry', 'Level', 'Benefits'];
    const rows = bookmarkedSchemes.map((s) => [
      s.id,
      `"${s.title.replace(/"/g, '""')}"`,
      `"${s.category}"`,
      `"${s.ministry}"`,
      s.level,
      `"${s.benefits.replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'Saved_Government_Schemes.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col">
          {/* Header */}
          <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-amber-400 fill-amber-400" />
              <h2 className="text-lg font-bold">{t('savedSchemes')} ({bookmarkedSchemes.length})</h2>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-slate-800 rounded-lg text-slate-400">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="p-6 flex-1 overflow-y-auto space-y-4">
            {bookmarkedSchemes.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <Bookmark className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="text-sm font-medium">No saved schemes yet.</p>
                <p className="text-xs text-slate-500 mt-1">Click the bookmark icon on any scheme card to save it here.</p>
              </div>
            ) : (
              bookmarkedSchemes.map((scheme) => (
                <div key={scheme.id} className="p-4 bg-slate-50 dark:bg-slate-800/70 rounded-2xl border border-slate-200 dark:border-slate-700/80 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2">{scheme.title}</h4>
                    <button
                      onClick={() => onRemoveBookmark(scheme.id)}
                      className="p-1 text-slate-400 hover:text-rose-500 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800 inline-block">
                    {scheme.ministry}
                  </span>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2">{scheme.benefits}</p>

                  <button
                    onClick={() => {
                      onClose();
                      onOpenDetails(scheme);
                    }}
                    className="w-full mt-2 py-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline text-left flex items-center justify-between"
                  >
                    <span>View Full Details & Requirements</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer Export */}
          {bookmarkedSchemes.length > 0 && (
            <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={handleExportCSV}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>Export Saved List as CSV File</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
