import React, { useState, useEffect } from 'react';
import { Scheme } from './types/scheme';
import { Header, NavTab } from './components/Header';
import { Hero } from './components/Hero';
import { CategorySection } from './components/CategorySection';
import { CulturalStateGrid } from './components/CulturalStateGrid';
import { HomeInfoSection } from './components/HomeInfoSection';
import { SchemeCard } from './components/SchemeCard';
import { SchemeDetailModal } from './components/SchemeDetailModal';
import { ApplicationModal } from './components/ApplicationModal';
import { EligibilityWizard } from './components/EligibilityWizard';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { StatusTrackerModal } from './components/StatusTrackerModal';
import { FeedbackModal } from './components/FeedbackModal';
import { ExportModal } from './components/ExportModal';
import { DashboardSection } from './components/DashboardSection';
import { StatesSection } from './components/StatesSection';
import { AboutUsSection } from './components/AboutUsSection';
import { SupportSection } from './components/SupportSection';
import { Footer } from './components/Footer';
import { useLanguage } from './contexts/LanguageContext';
import { 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  Filter, 
  Layers,
  X
} from 'lucide-react';

export default function App() {
  const { t } = useLanguage();

  const [activeTab, setActiveTab] = useState<NavTab>('schemes');

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMinistry, setSelectedMinistry] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedStateFilter, setSelectedStateFilter] = useState('Maharashtra');

  // Pagination & Data States
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filteredCount, setFilteredCount] = useState(0);

  // Bookmarks State
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('bookmarked_schemes');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modal Control States
  const [activeDetailScheme, setActiveDetailScheme] = useState<Scheme | null>(null);
  const [activeRedirectScheme, setActiveRedirectScheme] = useState<Scheme | null>(null);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isStatusTrackerOpen, setIsStatusTrackerOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  // Fetch Schemes from API
  const fetchSchemes = async () => {
    setLoading(true);
    try {
      // When on the "states" tab, load up to 100 items so all state-specific schemes are available
      const limit = activeTab === 'states' ? 100 : 12;
      let url = `/api/schemes?page=${currentPage}&limit=${limit}&`;
      
      if (selectedCategory !== 'All') url += `category=${encodeURIComponent(selectedCategory)}&`;
      if (selectedMinistry !== 'All') url += `ministry=${encodeURIComponent(selectedMinistry)}&`;
      if (selectedLevel !== 'All') url += `level=${encodeURIComponent(selectedLevel)}&`;
      if (searchQuery) url += `search=${encodeURIComponent(searchQuery)}&`;

      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setSchemes(data.schemes || []);
        setTotalPages(data.totalPages || 1);
        setFilteredCount(data.filteredCount || (data.schemes || []).length);
      }
    } catch (e) {
      console.error('Failed to fetch schemes:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchemes();
  }, [currentPage, selectedCategory, selectedMinistry, selectedLevel, searchQuery, activeTab]);

  useEffect(() => {
    localStorage.setItem('bookmarked_schemes', JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  const toggleBookmark = (id: number) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedMinistry('All');
    setSelectedLevel('All');
    setCurrentPage(1);
  };

  const categoryCounts = schemes.reduce((acc, s) => {
    acc[s.category] = (acc[s.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const bookmarkedSchemes = schemes.filter(s => bookmarkedIds.includes(s.id));
  const ministries = Array.from(new Set(schemes.map((s) => s.ministry))).filter(Boolean);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Header Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        bookmarkCount={bookmarkedIds.length}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onOpenStatusTracker={() => setIsStatusTrackerOpen(true)}
        onOpenFeedback={() => setIsFeedbackOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
        onOpenWizard={() => setIsWizardOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {activeTab === 'schemes' && (
        <>
          {/* Hero Banner Section */}
          <Hero
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onOpenWizard={() => setIsWizardOpen(true)}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              setCurrentPage(1);
            }}
            totalSchemesCount={4770}
          />

          {/* Category Cards Section */}
          <CategorySection
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              setCurrentPage(1);
            }}
            categoryCounts={categoryCounts}
          />

          {/* Cultural Regional State Grid */}
          <CulturalStateGrid
            onSelectState={(stateName) => {
              setSelectedStateFilter(stateName);
              setActiveTab('states');
            }}
          />

          {/* Home Info & Benefits Estimator */}
          <HomeInfoSection
            onOpenWizard={() => setIsWizardOpen(true)}
            onOpenStatusTracker={() => setIsStatusTrackerOpen(true)}
          />

          {/* Main Schemes Catalog Container */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            {/* Filter Bar Controls */}
            <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300">
                    <Filter className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Filters</span>
                  </div>

                  {/* Level Filter */}
                  <select
                    value={selectedLevel}
                    onChange={(e) => {
                      setSelectedLevel(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="p-2 text-xs font-semibold rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                  >
                    <option value="All">All Levels (Central & State)</option>
                    <option value="Central">Central Govt Only</option>
                    <option value="State">State Govt Only</option>
                  </select>

                  {/* Ministry Filter */}
                  <select
                    value={selectedMinistry}
                    onChange={(e) => {
                      setSelectedMinistry(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="p-2 text-xs font-semibold rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 max-w-xs"
                  >
                    <option value="All">All Central & State Ministries</option>
                    {ministries.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>

                  {(selectedCategory !== 'All' || selectedMinistry !== 'All' || selectedLevel !== 'All' || searchQuery) && (
                    <button
                      onClick={handleResetFilters}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs text-rose-600 hover:text-rose-700 font-bold bg-rose-50 dark:bg-rose-950/60 rounded-xl"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Clear All Filters
                    </button>
                  )}
                </div>

                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Matches Found: <strong className="text-emerald-600 dark:text-emerald-400">{filteredCount} Schemes</strong> | Page {currentPage} of {totalPages}
                </div>
              </div>

              {/* Active Filter Chips */}
              {(selectedCategory !== 'All' || searchQuery || selectedMinistry !== 'All' || selectedLevel !== 'All') && (
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <span className="text-[11px] font-bold text-slate-400">Active Filters:</span>

                  {selectedCategory !== 'All' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-semibold border border-emerald-300 dark:border-emerald-800">
                      Sector: {selectedCategory}
                      <button onClick={() => { setSelectedCategory('All'); setCurrentPage(1); }}>
                        <X className="w-3 h-3 hover:text-rose-600" />
                      </button>
                    </span>
                  )}

                  {searchQuery && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 font-semibold border border-blue-300 dark:border-blue-800">
                      Search: "{searchQuery}"
                      <button onClick={() => { setSearchQuery(''); setCurrentPage(1); }}>
                        <X className="w-3 h-3 hover:text-rose-600" />
                      </button>
                    </span>
                  )}

                  {selectedLevel !== 'All' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 font-semibold border border-purple-300 dark:border-purple-800">
                      Level: {selectedLevel}
                      <button onClick={() => { setSelectedLevel('All'); setCurrentPage(1); }}>
                        <X className="w-3 h-3 hover:text-rose-600" />
                      </button>
                    </span>
                  )}

                  {selectedMinistry !== 'All' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-semibold border border-amber-300 dark:border-amber-800">
                      Ministry: {selectedMinistry}
                      <button onClick={() => { setSelectedMinistry('All'); setCurrentPage(1); }}>
                        <X className="w-3 h-3 hover:text-rose-600" />
                      </button>
                    </span>
                  )}
                </div>
              )}
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-64 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 animate-pulse space-y-4">
                    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
                    <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
                    <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded w-full" />
                    <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded w-full" />
                  </div>
                ))}
              </div>
            ) : schemes.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 max-w-md mx-auto shadow-sm space-y-4">
                <Layers className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-700" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t('noSchemesFound')}</h3>
                <p className="text-xs text-slate-500">Try broadening your search query or resetting filters.</p>
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {schemes.map((scheme) => (
                    <SchemeCard
                      key={scheme.id}
                      scheme={scheme}
                      isBookmarked={bookmarkedIds.includes(scheme.id)}
                      onToggleBookmark={toggleBookmark}
                      onOpenDetails={(s) => setActiveDetailScheme(s)}
                      onOpenApply={(s) => setActiveRedirectScheme(s)}
                    />
                  ))}
                </div>

                {/* Repository Pagination Bar */}
                <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-4">
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Showing {schemes.length} schemes per page across MyScheme repository.
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setCurrentPage((p) => Math.max(1, p - 1));
                        window.scrollTo({ top: 500, behavior: 'smooth' });
                      }}
                      disabled={currentPage === 1}
                      className="p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold disabled:opacity-40 flex items-center gap-1"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Previous</span>
                    </button>

                    <div className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-xs font-bold rounded-xl text-emerald-700 dark:text-emerald-400">
                      Page {currentPage} of {totalPages}
                    </div>

                    <button
                      onClick={() => {
                        setCurrentPage((p) => Math.min(totalPages, p + 1));
                        window.scrollTo({ top: 500, behavior: 'smooth' });
                      }}
                      disabled={currentPage >= totalPages}
                      className="p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold disabled:opacity-40 flex items-center gap-1"
                    >
                      <span>Next</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </main>
        </>
      )}

      {activeTab === 'dashboard' && (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <DashboardSection
            schemes={schemes}
            onOpenDetails={(s) => setActiveDetailScheme(s)}
            onOpenApply={(s) => setActiveRedirectScheme(s)}
            onOpenWizard={() => setIsWizardOpen(true)}
          />
        </main>
      )}

      {activeTab === 'states' && (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <StatesSection
            schemes={schemes}
            onOpenDetails={(s) => setActiveDetailScheme(s)}
            onOpenApply={(s) => setActiveRedirectScheme(s)}
            onToggleBookmark={toggleBookmark}
            bookmarkedIds={bookmarkedIds}
            activeStateFilter={selectedStateFilter}
            onSelectStateFilter={(st) => setSelectedStateFilter(st)}
          />
        </main>
      )}

      {activeTab === 'about' && (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AboutUsSection />
        </main>
      )}

      {activeTab === 'support' && (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <SupportSection
            onOpenFeedback={() => setIsFeedbackOpen(true)}
            onOpenStatusTracker={() => setIsStatusTrackerOpen(true)}
          />
        </main>
      )}

      {/* Footer */}
      <Footer />

      {/* Modals & Overlay Components */}
      <EligibilityWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        schemes={schemes}
        onApplyMatchedFilters={() => setIsWizardOpen(false)}
      />

      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarkedSchemes={bookmarkedSchemes}
        onRemoveBookmark={toggleBookmark}
        onOpenDetails={(s) => {
          setIsBookmarksOpen(false);
          setActiveDetailScheme(s);
        }}
      />

      <StatusTrackerModal
        isOpen={isStatusTrackerOpen}
        onClose={() => setIsStatusTrackerOpen(false)}
      />

      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
      />

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        schemes={schemes}
      />

      <SchemeDetailModal
        scheme={activeDetailScheme}
        isOpen={!!activeDetailScheme}
        onClose={() => setActiveDetailScheme(null)}
        onOpenApply={(s) => {
          setActiveDetailScheme(null);
          setActiveRedirectScheme(s);
        }}
        isBookmarked={activeDetailScheme ? bookmarkedIds.includes(activeDetailScheme.id) : false}
        onToggleBookmark={toggleBookmark}
      />

      <ApplicationModal
        scheme={activeRedirectScheme}
        isOpen={!!activeRedirectScheme}
        onClose={() => setActiveRedirectScheme(null)}
        onSuccessSubmitted={() => {
          setActiveRedirectScheme(null);
          setIsStatusTrackerOpen(true);
        }}
      />
    </div>
  );
}
