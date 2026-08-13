import React from 'react';
import { Star, ShieldCheck, Instagram } from 'lucide-react';

export default function AuthorityDock() {
  return (
    <div className="fixed left-2 sm:left-6 bottom-24 sm:bottom-8 z-30 flex flex-col gap-2 pointer-events-auto">

      {/* Badge 1: Google Reviews */}
      <a
        href="https://www.google.com/maps/search/Art+Garage+Tattoo+Studio+Rajajinagar+Bangalore"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 sm:gap-2.5 px-2.5 py-1.5 sm:px-4 sm:py-2.5 bg-bone/95 border border-ink/15 rounded-xl shadow-lg backdrop-blur-md hover:border-ink hover:scale-105 transition-all duration-300 group"
      >
        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#4285F4]/10 flex items-center justify-center text-[#4285F4] font-bold text-[10px] sm:text-xs">
          G
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-0.5 sm:gap-1">
            <span className="text-[10px] sm:text-xs font-bold text-ink">5.0</span>
            <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-amber-400 text-amber-400" />
            <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-amber-400 text-amber-400" />
            <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-amber-400 text-amber-400" />
            <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-amber-400 text-amber-400" />
            <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-amber-400 text-amber-400" />
          </div>
          <span className="text-[8px] sm:text-[10px] text-warmGray uppercase tracking-wider">
            Verified Reviews
          </span>
        </div>
      </a>

      {/* Badge 2: Hygiene & Safety */}
      <div className="flex items-center gap-2 sm:gap-2.5 px-2.5 py-1.5 sm:px-4 sm:py-2.5 bg-bone/95 border border-ink/15 rounded-xl shadow-lg backdrop-blur-md hover:border-bloodRed transition-all duration-300">
        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 font-bold">
          <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] sm:text-xs font-bold text-ink leading-none">100% Sterile</span>
          <span className="text-[8px] sm:text-[10px] text-warmGray uppercase tracking-wider mt-0.5">
            Hospital Hygiene
          </span>
        </div>
      </div>

      {/* Badge 3: Instagram Direct Dock */}
      <a
        href="https://instagram.com/art_garage_tattoo_studio"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 sm:gap-2.5 px-2.5 py-1.5 sm:px-4 sm:py-2.5 bg-ink text-bone border border-ink rounded-xl shadow-lg hover:bg-bloodRed hover:border-bloodRed transition-all duration-300 group"
      >
        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-bone/10 flex items-center justify-center text-bone">
          <Instagram className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] sm:text-xs font-bold tracking-tight leading-none">@art_garage_tattoo_studio</span>
          <span className="text-[8px] sm:text-[10px] text-bone/70 uppercase tracking-wider mt-0.5">
            Official Instagram
          </span>
        </div>
      </a>

    </div>
  );
}
