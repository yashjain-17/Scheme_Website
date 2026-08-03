import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  Sprout, 
  GraduationCap, 
  HeartPulse, 
  Baby, 
  Landmark, 
  Home, 
  UserCheck, 
  Briefcase, 
  HandHeart,
  LayoutGrid,
  Info
} from 'lucide-react';

interface CategorySectionProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  categoryCounts: Record<string, number>;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  selectedCategory,
  onSelectCategory,
  categoryCounts,
}) => {
  const { t } = useLanguage();

  const categories = [
    {
      id: 'All',
      label: t('allCategories'),
      icon: LayoutGrid,
      color: 'from-slate-600 to-slate-800 text-white',
      bgLight: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200',
      defaultCount: '4,770+',
    },
    {
      id: 'Agriculture & Farming',
      label: t('agriculture'),
      icon: Sprout,
      color: 'from-emerald-500 to-green-600 text-white',
      bgLight: 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300',
      defaultCount: '420+',
    },
    {
      id: 'Education & Learning',
      label: t('education'),
      icon: GraduationCap,
      color: 'from-blue-500 to-indigo-600 text-white',
      bgLight: 'bg-blue-50 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300',
      defaultCount: '610+',
    },
    {
      id: 'Health & Healthcare',
      label: t('health'),
      icon: HeartPulse,
      color: 'from-rose-500 to-red-600 text-white',
      bgLight: 'bg-rose-50 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300',
      defaultCount: '540+',
    },
    {
      id: 'Women & Child Development',
      label: t('women'),
      icon: Baby,
      color: 'from-pink-500 to-purple-600 text-white',
      bgLight: 'bg-pink-50 text-pink-800 dark:bg-pink-950/60 dark:text-pink-300',
      defaultCount: '780+',
    },
    {
      id: 'Banking & Financial Services',
      label: t('finance'),
      icon: Landmark,
      color: 'from-amber-500 to-orange-600 text-white',
      bgLight: 'bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300',
      defaultCount: '380+',
    },
    {
      id: 'Housing & Urban Shelter',
      label: t('housing'),
      icon: Home,
      color: 'from-teal-500 to-cyan-600 text-white',
      bgLight: 'bg-teal-50 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300',
      defaultCount: '290+',
    },
    {
      id: 'Senior Citizens & Pension',
      label: t('senior'),
      icon: UserCheck,
      color: 'from-purple-500 to-indigo-700 text-white',
      bgLight: 'bg-purple-50 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300',
      defaultCount: '310+',
    },
    {
      id: 'Skill & Employment',
      label: t('skill'),
      icon: Briefcase,
      color: 'from-cyan-500 to-blue-600 text-white',
      bgLight: 'bg-cyan-50 text-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-300',
      defaultCount: '650+',
    },
    {
      id: 'Social Welfare & Empowerment',
      label: t('social'),
      icon: HandHeart,
      color: 'from-orange-500 to-amber-700 text-white',
      bgLight: 'bg-orange-50 text-orange-800 dark:bg-orange-950/60 dark:text-orange-300',
      defaultCount: '770+',
    },
  ];

  return (
    <section className="py-8 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Featured Schemes by Sector
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 flex items-center gap-1.5">
              <span>Select a ministry or social benefit sector to narrow down official welfare initiatives.</span>
              <span className="font-semibold text-emerald-700 dark:text-emerald-400">• More schemes added regularly</span>
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold shadow-2xs">
            <Info className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>More schemes added regularly</span>
          </div>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`p-3.5 rounded-2xl text-left border transition-all duration-200 flex flex-col justify-between group ${
                  isSelected
                    ? 'ring-2 ring-emerald-500 border-emerald-500 shadow-md bg-white dark:bg-slate-800'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 hover:border-emerald-300 dark:hover:border-slate-700 hover:shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-br ${cat.color} shadow-xs`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${cat.bgLight}`}>
                    {cat.defaultCount}
                  </span>
                </div>
                <div>
                  <h3 className={`text-xs sm:text-sm font-bold line-clamp-2 ${
                    isSelected ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-900 dark:text-white'
                  }`}>
                    {cat.label}
                  </h3>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
