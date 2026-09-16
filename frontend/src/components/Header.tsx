import React, { useState, useEffect } from 'react';
import { Moon, Menu, X, BarChart3, Sun, Monitor } from 'lucide-react';
import type { Theme } from '../App';

interface HeaderProps {
  page: string;
  theme: Theme;
  onNavigate: (page: string) => void;
  onThemeChange: (theme: Theme) => void;
}

const NAV_ITEMS = ['Home', 'Recommendation', 'Soil Data', 'Weather', 'Model Insights', 'About'];

const Header: React.FC<HeaderProps> = ({ page, theme, onNavigate, onThemeChange }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (item: string) => {
    onNavigate(item);
    setMobileOpen(false);
  };

  const toggleTheme = () => {
    if (theme === 'dark') onThemeChange('light');
    else if (theme === 'light') onThemeChange('system');
    else onThemeChange('dark');
  };

  return (
    <>
      <aside aria-label="Main Navigation" className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <header className="w-full max-w-6xl glass-nav rounded-2xl md:rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between pointer-events-auto transition-all duration-300">
          
          <button 
            onClick={() => handleNav('Home')}
            className="flex items-center gap-2.5 focus:outline-none focus:ring-1 focus:ring-primary rounded-lg group"
          >
            <div className="w-8 h-8 flex items-center justify-center bg-primary/20 text-primary rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
            </div>
            <div className="flex flex-col items-start text-left">
              <span className="font-bold text-[16px] tracking-tight text-on-surface leading-tight">AgriSense</span>
              <span className="text-[9px] uppercase tracking-wider text-outline font-semibold">Precision Agronomy</span>
            </div>
          </button>

          <nav className="hidden lg:flex items-center gap-6">
            {NAV_ITEMS.map(item => (
              <button
                key={item}
                className={`text-[13px] font-medium transition-colors ${page === item ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'}`}
                onClick={() => handleNav(item)}
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="flex items-center bg-surface-container-highest rounded-full p-0.5 border border-outline-variant/30" aria-label="Theme selector">
              <button 
                onClick={() => onThemeChange('dark')}
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-all focus:outline-none ${theme === 'dark' ? 'bg-surface shadow-sm text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
                title="Dark Mode"
                aria-pressed={theme === 'dark'}
              >
                <Moon size={14} />
              </button>
              <button 
                onClick={() => onThemeChange('system')}
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-all focus:outline-none ${theme === 'system' ? 'bg-surface shadow-sm text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
                title="System Theme"
                aria-pressed={theme === 'system'}
              >
                <Monitor size={14} />
              </button>
              <button 
                onClick={() => onThemeChange('light')}
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-all focus:outline-none ${theme === 'light' ? 'bg-surface shadow-sm text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
                title="Light Mode"
                aria-pressed={theme === 'light'}
              >
                <Sun size={14} />
              </button>
            </div>
            
            <button 
              className="hidden sm:inline-flex items-center justify-center h-8 px-4 rounded-full bg-primary text-on-primary font-semibold text-[12px] hover:bg-primary-container transition-all focus:outline-none shadow-sm"
              onClick={() => handleNav('Recommendation')}
            >
              <BarChart3 size={15} className="mr-1.5" /> Analyze Field
            </button>
            
            <button
              className="lg:hidden w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors focus:outline-none"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </header>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-surface/95 backdrop-blur-sm pt-24 px-6 flex flex-col gap-4 items-center">
          {NAV_ITEMS.map(item => (
            <button
              key={item}
              className={`text-lg font-medium transition-colors ${page === item ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'}`}
              onClick={() => handleNav(item)}
            >
              {item}
            </button>
          ))}
          <button 
              className="mt-6 inline-flex items-center justify-center h-12 px-6 rounded-full bg-primary text-on-primary font-semibold text-[14px] w-full max-w-xs hover:bg-primary-container transition-all"
              onClick={() => handleNav('Recommendation')}
            >
              <BarChart3 size={18} className="mr-2" /> Analyze Field
            </button>
        </div>
      )}
    </>
  );
};

export default Header;
