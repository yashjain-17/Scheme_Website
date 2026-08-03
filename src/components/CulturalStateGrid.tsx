import React, { useState } from 'react';
import { Building2, Search, Sparkles, ArrowRight } from 'lucide-react';

interface CulturalStateGridProps {
  onSelectState: (stateName: string) => void;
}

export interface StateCulture {
  name: string;
  code: string;
  capital: string;
  icon: string;
  cultureTitle: string;
  schemeCount: number;
  bgGradient: string;
}

export const CULTURAL_STATES: StateCulture[] = [
  { name: 'Maharashtra', code: 'MH', capital: 'Mumbai', icon: '🚩', cultureTitle: 'Gateway of India & Chhatrapati Forts', schemeCount: 48, bgGradient: 'from-amber-500 to-orange-600' },
  { name: 'Uttar Pradesh', code: 'UP', capital: 'Lucknow', icon: '🛕', cultureTitle: 'Taj Mahal & Varanasi Ghats', schemeCount: 52, bgGradient: 'from-orange-500 to-amber-600' },
  { name: 'Tamil Nadu', code: 'TN', capital: 'Chennai', icon: '🛕', cultureTitle: 'Meenakshi Temple & Bharatanatyam', schemeCount: 42, bgGradient: 'from-rose-500 to-pink-600' },
  { name: 'Karnataka', code: 'KA', capital: 'Bengaluru', icon: '🏛️', cultureTitle: 'Hampi Chariot & Mysuru Palace', schemeCount: 45, bgGradient: 'from-purple-500 to-indigo-600' },
  { name: 'Gujarat', code: 'GJ', capital: 'Gandhinagar', icon: '💃', cultureTitle: 'Statue of Unity & Garba Heritage', schemeCount: 39, bgGradient: 'from-emerald-500 to-teal-600' },
  { name: 'Delhi', code: 'DL', capital: 'New Delhi', icon: '🏛️', cultureTitle: 'India Gate & Red Fort Heritage', schemeCount: 35, bgGradient: 'from-blue-500 to-cyan-600' },
  { name: 'Bihar', code: 'BR', capital: 'Patna', icon: '🪷', cultureTitle: 'Bodh Gaya & Mahabodhi Wisdom', schemeCount: 38, bgGradient: 'from-amber-600 to-yellow-600' },
  { name: 'West Bengal', code: 'WB', capital: 'Kolkata', icon: '🐅', cultureTitle: 'Victoria Memorial & Durga Puja', schemeCount: 41, bgGradient: 'from-red-500 to-amber-600' },
  { name: 'Kerala', code: 'KL', capital: 'Thiruvananthapuram', icon: '🛶', cultureTitle: 'Backwaters & Kathakali Heritage', schemeCount: 36, bgGradient: 'from-teal-500 to-emerald-600' },
  { name: 'Punjab', code: 'PB', capital: 'Chandigarh', icon: '🌾', cultureTitle: 'Golden Temple & Bhangra Culture', schemeCount: 34, bgGradient: 'from-yellow-500 to-amber-600' },
  { name: 'Rajasthan', code: 'RJ', capital: 'Jaipur', icon: '🏰', cultureTitle: 'Hawa Mahal & Desert Palaces', schemeCount: 44, bgGradient: 'from-orange-500 to-pink-600' },
  { name: 'Goa', code: 'GA', capital: 'Panaji', icon: '🏖️', cultureTitle: 'Basilica of Bom Jesus & Beaches', schemeCount: 28, bgGradient: 'from-cyan-500 to-blue-600' },
  { name: 'Odisha', code: 'OD', capital: 'Bhubaneswar', icon: '🪁', cultureTitle: 'Konark Sun Temple & Puri Heritage', schemeCount: 37, bgGradient: 'from-indigo-500 to-purple-600' },
  { name: 'Telangana', code: 'TG', capital: 'Hyderabad', icon: '🕌', cultureTitle: 'Charminar & Kakatiya Arch', schemeCount: 40, bgGradient: 'from-pink-500 to-rose-600' },
  { name: 'Andhra Pradesh', code: 'AP', capital: 'Amaravati', icon: '🛕', cultureTitle: 'Tirupati Balaji & Kuchipudi', schemeCount: 43, bgGradient: 'from-teal-600 to-cyan-600' },
  { name: 'Assam', code: 'AS', capital: 'Dispur', icon: '🦏', cultureTitle: 'Kaziranga & Bihu Festival', schemeCount: 32, bgGradient: 'from-emerald-600 to-green-600' },
];

export const CulturalStateGrid: React.FC<CulturalStateGridProps> = ({ onSelectState }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = CULTURAL_STATES.filter(st => 
    st.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    st.cultureTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    st.capital.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-12 bg-slate-50 dark:bg-slate-950/60 border-t border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-2">
              <Building2 className="w-3.5 h-3.5" />
              <span>Cultural & Regional State Hub</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Explore Schemes by State Culture & Heritage
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Click on any State card to quickly filter dedicated welfare schemes for that region.
            </p>
          </div>

          {/* Clean Input Search Styling */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search State or Landmark..."
              className="w-full pl-9 pr-3 py-2 text-xs font-medium rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all shadow-xs"
            />
          </div>
        </div>

        {/* States Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map((st) => (
            <div
              key={st.code}
              onClick={() => onSelectState(st.name)}
              className="group bg-white dark:bg-slate-800/90 hover:bg-slate-50 dark:hover:bg-slate-800 p-5 rounded-3xl border border-slate-200 dark:border-slate-700/80 shadow-2xs hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Top Badge & Cultural Icon */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-2xl shadow-xs group-hover:scale-110 transition-transform">
                    {st.icon}
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600">
                    {st.code}
                  </span>
                </div>

                {/* State Name & Capital */}
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  {st.name}
                </h3>
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block mb-2">
                  Capital: <strong className="text-slate-700 dark:text-slate-300 font-semibold">{st.capital}</strong>
                </span>

                {/* Cultural Landmark / Heritage Title */}
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-700/60 text-[11px] text-slate-700 dark:text-slate-300 font-medium mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span className="line-clamp-1">{st.cultureTitle}</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-700/60 text-xs">
                <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                  {st.schemeCount}+ Active Schemes
                </span>
                <span className="flex items-center gap-1 text-[11px] font-bold text-slate-700 dark:text-slate-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                  View Schemes
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
