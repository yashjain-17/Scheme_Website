import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { Building2, ShieldCheck, Sun, Moon, PhoneCall, Mail, MapPin, Info } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <footer className="bg-slate-900 text-slate-300 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="font-bold text-sm text-white">{t('portalName')}</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Designed to bring maximum clarity and quick scheme eligibility information for public welfare benefits across India.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-[10px] text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              Independent Information Directory
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-[11px]">Quick Sectors</h4>
            <ul className="space-y-2 text-slate-400 text-xs">
              <li><a href="#schemes-list" className="hover:text-emerald-400">{t('agriculture')}</a></li>
              <li><a href="#schemes-list" className="hover:text-emerald-400">{t('education')}</a></li>
              <li><a href="#schemes-list" className="hover:text-emerald-400">{t('health')}</a></li>
              <li><a href="#schemes-list" className="hover:text-emerald-400">{t('women')}</a></li>
              <li><a href="#schemes-list" className="hover:text-emerald-400">{t('finance')}</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-[11px]">Help & Information</h4>
            <ul className="space-y-2 text-slate-400 text-xs">
              <li><span>Scheme Guidelines Summary</span></li>
              <li><span>Document Checklist Guide</span></li>
              <li><span>Direct Bank Transfer Info</span></li>
              <li><span>Privacy & Terms Statement</span></li>
              <li><span>Accessibility Standards</span></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-[11px]">Platform Contact & Helplines</h4>
            <div className="space-y-2 text-slate-400 text-xs">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Platform Support: <strong className="text-white">support@publicschemesportal.in</strong></span>
              </div>
              <div className="flex flex-col gap-0.5 pt-1">
                <div className="flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Govt. Helpline: <strong className="text-white">1800-11-1555</strong></span>
                </div>
                <span className="text-[10px] text-amber-400 font-semibold pl-6">
                  (Official Govt. of India helpline — external, not operated by this site)
                </span>
              </div>
              <div className="flex items-start gap-2 pt-1">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Public Schemes Information Hub, New Delhi - 110001</span>
              </div>
            </div>
          </div>
        </div>

        {/* Persistent Disclaimer Box in Footer */}
        <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700/80 flex items-start sm:items-center gap-3 text-slate-300">
          <Info className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5 sm:mt-0" />
          <p className="text-xs leading-relaxed">
            <strong className="text-white font-semibold">Disclaimer: </strong>
            This is an independent informational platform and is not affiliated with, endorsed by, or operated by the Government of India or any state government.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} Public Schemes Portal. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <button onClick={toggleDarkMode} className="hover:text-slate-300 flex items-center gap-1 transition-colors">
              {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
              <span>{isDarkMode ? 'Light Theme' : 'Dark Theme'}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
