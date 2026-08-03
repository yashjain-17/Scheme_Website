import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { LANGUAGES } from '../translations/dictionary';
import { 
  Building2, 
  Sun, 
  Moon, 
  Globe2, 
  Bookmark, 
  SearchCheck, 
  MessageSquarePlus, 
  Download, 
  Menu, 
  X,
  Sparkles,
  ShieldCheck,
  BarChart3,
  MapPin,
  HelpCircle,
  Info,
  LayoutGrid,
  ChevronDown,
  PhoneCall,
  SlidersHorizontal
} from 'lucide-react';

export type NavTab = 'schemes' | 'dashboard' | 'eligibility' | 'states' | 'about' | 'support';

interface HeaderProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  bookmarkCount: number;
  onOpenBookmarks: () => void;
  onOpenStatusTracker: () => void;
  onOpenFeedback: () => void;
  onOpenExport: () => void;
  onOpenWizard: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  bookmarkCount,
  onOpenBookmarks,
  onOpenStatusTracker,
  onOpenFeedback,
  onOpenExport,
  onOpenWizard,
}) => {
  const { language, setLanguage, t } = useLanguage();
  const { isDarkMode, toggleDarkMode } = useTheme();

  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const currentLangObj = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  const navItems: { id: NavTab; label: string; icon: any }[] = [
    { id: 'schemes', label: 'Schemes', icon: LayoutGrid },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'eligibility', label: 'Check Eligibility', icon: Sparkles },
    { id: 'states', label: 'State Schemes', icon: MapPin },
    { id: 'about', label: 'About Us', icon: Info },
    { id: 'support', label: 'Support & FAQs', icon: HelpCircle },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200 shadow-xs">
      {/* Top Utility Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-6 lg:px-8 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-4 text-[11px]">
          <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Informational Welfare Schemes Directory
          </span>
          <span className="hidden sm:inline text-slate-500">|</span>
          <span className="hidden sm:flex items-center gap-1 text-slate-300">
            <PhoneCall className="w-3 h-3 text-emerald-400" />
            Govt. Helpline: <strong className="text-white">1800-11-1555</strong>
            <span className="text-[10px] text-amber-300 font-normal ml-1">(External Govt Line)</span>
          </span>
        </div>

        <div className="flex items-center gap-3 text-[11px]">
          {/* Saved Schemes Bookmark Button */}
          <button
            onClick={onOpenBookmarks}
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
          >
            <Bookmark className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span>Saved</span>
            {bookmarkCount > 0 && (
              <span className="px-1.5 py-0.2 text-[9px] font-bold bg-amber-500 text-slate-950 rounded-full">
                {bookmarkCount}
              </span>
            )}
          </button>

          <span className="text-slate-700">|</span>

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Globe2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{currentLangObj.flag} {currentLangObj.nativeName}</span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-1 z-50 divide-y divide-slate-100 dark:divide-slate-700 text-slate-900 dark:text-white">
                <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Select Language
                </div>
                <div className="max-h-56 overflow-y-auto">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLangOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-1.5 text-xs text-left hover:bg-emerald-50 dark:hover:bg-emerald-950/60 ${
                        language === lang.code ? 'font-bold text-emerald-600 dark:text-emerald-400' : ''
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <span>{lang.flag}</span>
                        <span>{lang.nativeName}</span>
                      </span>
                      <span className="text-[10px] text-slate-400">{lang.code.toUpperCase()}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <span className="text-slate-700">|</span>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="flex items-center gap-1 hover:text-white text-slate-300 transition-colors"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Light</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-slate-300" />
                <span className="hidden sm:inline">Dark</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-6">
        {/* Brand Logo & Name */}
        <div 
          onClick={() => setActiveTab('schemes')}
          className="flex items-center gap-3 cursor-pointer shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-600/20">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight">
              {t('portalName')}
            </h1>
            <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 hidden sm:block">
              Independent Scheme Information Aggregator
            </p>
          </div>
        </div>

        {/* Center Primary Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100/90 dark:bg-slate-800/80 p-1 rounded-2xl border border-slate-200/80 dark:border-slate-700/80">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'eligibility') {
                    onOpenWizard();
                  } else {
                    setActiveTab(item.id);
                  }
                }}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/80 dark:hover:bg-slate-700/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-emerald-600 dark:text-emerald-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          {/* Track Application button */}
          <button
            onClick={onOpenStatusTracker}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-950 dark:text-emerald-200 rounded-xl border border-emerald-300 dark:border-emerald-800 transition-colors"
          >
            <SearchCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Track Application</span>
          </button>

          {/* Quick Tools Dropdown */}
          <div className="relative group">
            <button
              onClick={() => setIsToolsOpen(!isToolsOpen)}
              aria-label="Advanced filters"
              className="p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors relative"
              title="Advanced Filters"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>

            {/* Visible Tooltip on Hover / Focus */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2.5 py-1 bg-slate-900 text-white text-[10px] font-bold rounded-lg shadow-md opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 border border-slate-700">
              Advanced Filters
            </div>

            {isToolsOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-2 z-50 space-y-1">
                <button
                  onClick={() => {
                    onOpenExport();
                    setIsToolsOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60 rounded-xl text-left"
                >
                  <Download className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Export Schemes Catalog</span>
                </button>

                <button
                  onClick={() => {
                    onOpenFeedback();
                    setIsToolsOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60 rounded-xl text-left"
                >
                  <MessageSquarePlus className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span>Feedback & Suggestions</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu toggle button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-4 py-4 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === 'eligibility') {
                      onOpenWizard();
                    } else {
                      setActiveTab(item.id);
                    }
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 p-2.5 text-xs font-bold rounded-xl text-left ${
                    activeTab === item.id ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-2">
            <button
              onClick={() => {
                onOpenStatusTracker();
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between p-2.5 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 font-bold text-xs rounded-xl"
            >
              <span className="flex items-center gap-2">
                <SearchCheck className="w-4 h-4 text-emerald-600" />
                Track Application Status
              </span>
            </button>

            <button
              onClick={() => {
                onOpenExport();
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 p-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
            >
              <Download className="w-4 h-4 text-blue-600" />
              <span>Export Catalog</span>
            </button>

            <button
              onClick={() => {
                onOpenFeedback();
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 p-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
            >
              <MessageSquarePlus className="w-4 h-4 text-purple-600" />
              <span>Feedback & Suggestions</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
