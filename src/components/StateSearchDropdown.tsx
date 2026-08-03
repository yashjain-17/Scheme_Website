import React, { useState } from 'react';
import { MapPin, ChevronDown, Check } from 'lucide-react';

export const ALL_36_STATES_UTS = [
  'Maharashtra', 'Uttar Pradesh', 'Tamil Nadu', 'Karnataka', 'Gujarat', 'Delhi', 'Bihar', 
  'West Bengal', 'Rajasthan', 'Telangana', 'Andhra Pradesh', 'Kerala', 'Madhya Pradesh', 
  'Odisha', 'Punjab', 'Haryana', 'Assam', 'Chhattisgarh', 'Goa', 'Himachal Pradesh', 
  'Jharkhand', 'Uttarakhand', 'Jammu and Kashmir', 'Ladakh', 'Puducherry', 'Chandigarh', 
  'Andaman and Nicobar Islands', 'Arunachal Pradesh', 'Manipur', 'Meghalaya', 'Mizoram', 
  'Nagaland', 'Sikkim', 'Tripura', 'Dadra and Nagar Haveli and Daman and Diu', 'Lakshadweep'
];

interface StateSearchDropdownProps {
  selectedState: string;
  onSelectState: (state: string) => void;
}

export const StateSearchDropdown: React.FC<StateSearchDropdownProps> = ({
  selectedState,
  onSelectState,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = ALL_36_STATES_UTS.filter((st: string) =>
    st.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 p-2 text-xs font-bold rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
      >
        <MapPin className="w-3.5 h-3.5 text-emerald-600" />
        <span>{selectedState === 'All' ? 'All States & UTs' : selectedState}</span>
        <ChevronDown className="w-3 h-3 text-slate-400" />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-2 z-50 divide-y divide-slate-100 dark:divide-slate-700 space-y-1">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter State / UT..."
            className="w-full p-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white mb-1"
          />

          <div className="max-h-48 overflow-y-auto pt-1 space-y-0.5">
            <button
              onClick={() => {
                onSelectState('All');
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between p-2 text-xs rounded-xl text-left ${
                selectedState === 'All' ? 'bg-emerald-50 dark:bg-emerald-950/60 font-bold text-emerald-700 dark:text-emerald-300' : 'text-slate-800 dark:text-slate-200'
              }`}
            >
              <span>All India / All States</span>
              {selectedState === 'All' && <Check className="w-3.5 h-3.5 text-emerald-600" />}
            </button>

            {filtered.map((st: string) => (
              <button
                key={st}
                onClick={() => {
                  onSelectState(st);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between p-2 text-xs rounded-xl text-left ${
                  selectedState === st ? 'bg-emerald-50 dark:bg-emerald-950/60 font-bold text-emerald-700 dark:text-emerald-300' : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                }`}
              >
                <span>{st}</span>
                {selectedState === st && <Check className="w-3.5 h-3.5 text-emerald-600" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
