import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { PhotoSlide } from '../types';

interface PhotoSliderProps {
  slides: PhotoSlide[];
}

export const PhotoSlider: React.FC<PhotoSliderProps> = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const currentSlide = slides[currentIndex];

  return (
    <div className="w-full flex flex-col gap-2 sm:gap-3">
      {/* Main Slide Frame */}
      <div className="relative w-full aspect-16/10 sm:aspect-16/9 rounded-xl sm:rounded-2xl overflow-hidden border border-black/[0.08] bg-[#EFEFEA] shadow-2xs group">
        {/* Main Image */}
        <img
          key={currentSlide.id}
          src={currentSlide.imageSrc}
          alt={currentSlide.alt}
          className="w-full h-full object-cover transition-opacity duration-300"
          referrerPolicy="no-referrer"
          loading="eager"
        />

        {/* Scrim Overlay for Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent pointer-events-none" />

        {/* Top Badges / Counter */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
          <div className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg bg-black/50 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-medium tracking-wide">
            {currentIndex + 1} / {slides.length}
          </div>

          <button
            onClick={() => setIsZoomed(true)}
            className="p-1.5 rounded-md sm:rounded-lg bg-black/50 backdrop-blur-md text-white hover:bg-black/70 transition-colors cursor-pointer min-w-[30px] min-h-[30px] sm:min-w-[36px] sm:min-h-[36px] flex items-center justify-center"
            title="Perbesar tampilan foto"
            aria-label="Perbesar foto"
          >
            <Maximize2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </button>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white text-[#1A2220] shadow-md flex items-center justify-center transition-transform active:scale-90 cursor-pointer z-10"
          aria-label="Foto sebelumnya"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white text-[#1A2220] shadow-md flex items-center justify-center transition-transform active:scale-90 cursor-pointer z-10"
          aria-label="Foto berikutnya"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
        </button>

        {/* Bottom Caption Overlay */}
        <div className="absolute bottom-2.5 left-3 right-3 sm:bottom-3.5 sm:left-4 sm:right-4 text-white pointer-events-none">
          <span className="text-[9px] sm:text-[11px] font-medium opacity-85 block tracking-wide uppercase">
            {currentSlide.subtitle}
          </span>
          <h3 className="text-xs sm:text-base font-bold leading-tight mt-0.5 drop-shadow-2xs">
            {currentSlide.title}
          </h3>
        </div>
      </div>

      {/* Thumbnail Navigation Strip */}
      <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
        {slides.map((slide, idx) => {
          const isSelected = idx === currentIndex;
          return (
            <button
              key={slide.id}
              onClick={() => setCurrentIndex(idx)}
              className={`relative aspect-16/10 rounded-lg sm:rounded-xl overflow-hidden border transition-all cursor-pointer ${
                isSelected
                  ? 'border-[#12483E] ring-1.5 sm:ring-2 ring-[#12483E]/40 opacity-100'
                  : 'border-black/[0.08] opacity-70 hover:opacity-90'
              }`}
              aria-label={`Pilih foto ${idx + 1}: ${slide.title}`}
            >
              <img
                src={slide.imageSrc}
                alt={slide.alt}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              {isSelected && (
                <div className="absolute inset-0 bg-[#12483E]/15 pointer-events-none" />
              )}
            </button>
          );
        })}
      </div>

      {/* Lightbox Modal when Zoomed */}
      {isZoomed && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-3 sm:p-4"
        >
          <div className="w-full max-w-4xl flex items-center justify-between text-white pb-2.5">
            <div>
              <span className="text-[10px] sm:text-xs opacity-75">{currentSlide.subtitle}</span>
              <h4 className="text-xs sm:text-base font-bold">{currentSlide.title}</h4>
            </div>
            <button
              onClick={() => setIsZoomed(false)}
              className="px-2.5 py-1 rounded-md sm:rounded-lg bg-white/20 hover:bg-white/30 text-xs font-semibold text-white transition-colors cursor-pointer"
            >
              Tutup
            </button>
          </div>

          <div className="relative w-full max-w-4xl aspect-16/10 sm:aspect-16/9 rounded-xl sm:rounded-2xl overflow-hidden bg-black flex items-center justify-center">
            <img
              src={currentSlide.imageSrc}
              alt={currentSlide.alt}
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
            <button
              onClick={prevSlide}
              className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/90 text-black shadow-lg flex items-center justify-center transition-transform active:scale-95 cursor-pointer"
              aria-label="Foto sebelumnya"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/90 text-black shadow-lg flex items-center justify-center transition-transform active:scale-95 cursor-pointer"
              aria-label="Foto berikutnya"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
            </button>
          </div>

          <div className="mt-2 text-white text-[11px] sm:text-xs opacity-80">
            {currentIndex + 1} dari {slides.length} Foto Kost
          </div>
        </div>
      )}
    </div>
  );
};
