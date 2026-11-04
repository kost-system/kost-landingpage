import React from 'react';
import { PhoneCall, Home, User } from 'lucide-react';
import { ActiveTab } from '../types';

interface HeaderProps {
  currentTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenContact: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onOpenContact,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full bg-[#FAF9F6]/90 backdrop-blur-md border-b border-black/[0.06]">
      <div className="max-w-6xl mx-auto px-3.5 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => onSelectTab('beranda')}
          className="flex items-center gap-2 text-left group cursor-pointer focus:outline-none shrink-0"
          aria-label="Kembali ke Beranda Senja Living"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#12483E] flex items-center justify-center text-white font-semibold text-xs sm:text-sm tracking-tight shadow-2xs">
            S
          </div>
          <div>
            <span className="text-sm sm:text-base font-bold tracking-tight text-[#1A2220] block leading-tight">
              Senja Living
            </span>
            <span className="text-[10px] sm:text-[11px] text-[#71807C] tracking-wide block">
              Kost & Hunian Modern
            </span>
          </div>
        </button>

        {/* Zone 2: Desktop Horizontal Navigation */}
        <nav
          className="hidden md:flex items-center gap-1 bg-[#F0EFEB] p-1 rounded-xl"
          aria-label="Navigasi Utama"
        >
          <button
            onClick={() => onSelectTab('beranda')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer inline-flex items-center gap-1.5 ${
              currentTab === 'beranda'
                ? 'bg-white text-[#12483E] shadow-2xs'
                : 'text-[#45524F] hover:text-[#1A2220]'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Beranda</span>
          </button>

          <button
            onClick={() => onSelectTab('profil')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer inline-flex items-center gap-1.5 ${
              currentTab === 'profil'
                ? 'bg-white text-[#12483E] shadow-2xs'
                : 'text-[#45524F] hover:text-[#1A2220]'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Profil</span>
          </button>
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenContact}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-semibold text-white bg-[#12483E] hover:bg-[#0A2E28] active:scale-[0.98] rounded-xl transition-all shadow-2xs cursor-pointer min-h-[36px] sm:min-h-[40px]"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span className="whitespace-nowrap">Hubungi</span>
          </button>
        </div>
      </div>
    </header>
  );
};
