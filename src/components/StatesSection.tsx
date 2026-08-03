import React, { useState } from 'react';
import { Scheme } from '../types/scheme';
import { SchemeCard } from './SchemeCard';
import { Building2, Search, Layers } from 'lucide-react';

interface StatesSectionProps {
  schemes: Scheme[];
  onOpenDetails: (scheme: Scheme) => void;
  onOpenApply: (scheme: Scheme) => void;
  onToggleBookmark: (id: number) => void;
  bookmarkedIds: number[];
  onSelectStateFilter?: (stateName: string) => void;
  activeStateFilter?: string;
}

export const ALL_36_STATES_UTS = [
  'Goa', 'Maharashtra', 'Uttar Pradesh', 'Tamil Nadu', 'Karnataka', 'Gujarat', 
  'Delhi', 'Bihar', 'West Bengal', 'Rajasthan', 'Telangana', 'Andhra Pradesh', 
  'Kerala', 'Madhya Pradesh', 'Odisha', 'Punjab', 'Haryana', 'Assam', 'Chhattisgarh', 
  'Himachal Pradesh', 'Jharkhand', 'Uttarakhand', 'Jammu and Kashmir', 'Ladakh', 
  'Puducherry', 'Chandigarh', 'Andaman and Nicobar Islands', 'Arunachal Pradesh', 
  'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Sikkim', 'Tripura', 
  'Dadra and Nagar Haveli and Daman and Diu', 'Lakshadweep'
];

export const StatesSection: React.FC<StatesSectionProps> = ({
  schemes,
  onOpenDetails,
  onOpenApply,
  onToggleBookmark,
  bookmarkedIds,
  onSelectStateFilter,
  activeStateFilter = 'Goa'
}) => {
  const [selectedState, setSelectedState] = useState<string>(activeStateFilter);
  const [stateSearch, setStateSearch] = useState<string>('');

  const handleStateClick = (st: string) => {
    setSelectedState(st);
    if (onSelectStateFilter) {
      onSelectStateFilter(st);
    }
  };

  const filteredStates = ALL_36_STATES_UTS.filter((st) =>
    st.toLowerCase().includes(stateSearch.toLowerCase())
  );

  // Filter schemes matching selectedState (Central nationwide OR State == selectedState)
  const filteredSchemes = schemes.filter((s) => {
    if (selectedState === 'Central Level Only') {
      return s.level === 'Central';
    }
    if (s.level === 'Central' || s.state === 'All') return true;
    return s.state.toLowerCase() === selectedState.toLowerCase();
  });

  // State-specific scheme count
  const stateSpecificCount = filteredSchemes.filter(s => s.state.toLowerCase() === selectedState.toLowerCase()).length;
  const centralCount = filteredSchemes.filter(s => s.level === 'Central').length;

  return (
    <div className="space-y-8 animate-fade-in text-slate-900 dark:text-slate-100">
      {/* Top Header & Search Bar Container */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-2">
              <Building2 className="w-3.5 h-3.5" />
              <span>36 States & Union Territories</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              State-Specific Welfare Schemes Directory
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Select a State or Union Territory below to view dedicated state benefits alongside nationwide Central schemes.
            </p>
          </div>

          {/* Clean State Search Input inside Parent Layout */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              value={stateSearch}
              onChange={(e) => setStateSearch(e.target.value)}
              placeholder="Search State or UT..."
              className="w-full pl-9 pr-3 py-2.5 text-xs font-medium rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all shadow-xs"
            />
          </div>
        </div>

        {/* State Selection Badges Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-2 border-t border-slate-100 dark:border-slate-800/80">
          <button
            onClick={() => handleStateClick('Central Level Only')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all shrink-0 ${
              selectedState === 'Central Level Only'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-purple-400'
            }`}
          >
            🏛️ Central Level Only
          </button>

          {filteredStates.map((st) => (
            <button
              key={st}
              onClick={() => handleStateClick(st)}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all shrink-0 ${
                selectedState === st
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-emerald-400'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Active State Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs text-slate-400 uppercase font-bold block">Active State Filter</span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Building2 className="w-5 h-5 text-emerald-600" />
            {selectedState} Applicable Schemes
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold">
          <span className="px-3 py-1.5 rounded-xl bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
            {stateSpecificCount} {selectedState} State Schemes
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            {centralCount} Central Schemes
          </span>
        </div>
      </div>

      {/* Scheme Cards Grid */}
      {filteredSchemes.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 max-w-md mx-auto shadow-sm space-y-4">
          <Layers className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-700" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Schemes Found for {selectedState}</h3>
          <p className="text-xs text-slate-500">Select another State tab or view Central Schemes.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchemes.map((scheme) => (
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
      )}
    </div>
  );
};
