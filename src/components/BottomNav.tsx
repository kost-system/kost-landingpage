import React from 'react';
import { Home, User } from 'lucide-react';
import { ActiveTab } from '../types';

interface BottomNavProps {
  currentTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onSelectTab,
}) => {
  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-md border-t border-black/[0.07] px-4 pb-[max(env(safe-area-inset-bottom),0.35rem)] pt-1"
      aria-label="Navigasi Bawah Mobile"
    >
      <div className="grid grid-cols-2 max-w-xs mx-auto gap-2">
        {/* Menu 1: Beranda */}
        <button
          onClick={() => onSelectTab('beranda')}
          className={`flex flex-col items-center justify-center min-h-[44px] py-0.5 rounded-lg transition-colors cursor-pointer ${
            currentTab === 'beranda'
              ? 'text-[#12483E]'
              : 'text-[#71807C] hover:text-[#45524F]'
          }`}
          aria-current={currentTab === 'beranda' ? 'page' : undefined}
        >
          <div
            className={`p-1 rounded-md transition-transform ${
              currentTab === 'beranda' ? 'scale-105 bg-[#EBF3F0]' : ''
            }`}
          >
            <Home className="w-4.5 h-4.5 stroke-[1.8]" />
          </div>
          <span
            className={`text-[10px] mt-0.5 whitespace-nowrap ${
              currentTab === 'beranda' ? 'font-semibold text-[#12483E]' : 'font-medium'
            }`}
          >
            Beranda
          </span>
        </button>

        {/* Menu 2: Profil (Di dalamnya terdapat Data Sewa & Tagihan) */}
        <button
          onClick={() => onSelectTab('profil')}
          className={`flex flex-col items-center justify-center min-h-[44px] py-0.5 rounded-lg transition-colors cursor-pointer ${
            currentTab === 'profil'
              ? 'text-[#12483E]'
              : 'text-[#71807C] hover:text-[#45524F]'
          }`}
          aria-current={currentTab === 'profil' ? 'page' : undefined}
        >
          <div
            className={`p-1 rounded-lg transition-transform ${
              currentTab === 'profil' ? 'scale-105 bg-[#EBF3F0]' : ''
            }`}
          >
            <User className="w-4.5 h-4.5 stroke-[1.8]" />
          </div>
          <span
            className={`text-[10px] mt-0.5 whitespace-nowrap ${
              currentTab === 'profil' ? 'font-semibold text-[#12483E]' : 'font-medium'
            }`}
          >
            Profil
          </span>
        </button>
      </div>
    </nav>
  );
};
