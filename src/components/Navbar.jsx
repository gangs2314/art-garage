import React, { useState, useEffect } from 'react';
import { MapPin, Phone, MessageCircle, Menu } from 'lucide-react';

export default function Navbar({ onOpenMenu, onOpenLocate }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-40 w-full border-b transition-all duration-300 ${scrolled ? 'border-ink/10 glass-panel shadow-sm' : 'border-transparent bg-bone'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">

        {/* Left: Sleek Brand Emblem & Wordmark */}
        <a href="#" className="flex items-center gap-2 sm:gap-3 group">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-ink flex items-center justify-center text-bone font-serif font-bold text-base sm:text-lg tracking-tighter group-hover:bg-bloodRed transition-colors duration-300">
            <img
             src="/images/logo.jpg" alt="Art Garage Tattoo Studio" className="w-8 h-8 sm:w-9 sm:h-9 object-contain rounded-full group-hover:opacity-80 transition-opacity duration-300"
/>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg sm:text-2xl font-bold tracking-tight text-ink leading-none">
              ART GARAGE
            </span>
            <span className="hidden sm:block text-[9px] uppercase tracking-[0.25em] text-warmGray font-sans mt-1">
              Tattoo Studio • Rajajinagar
            </span>
          </div>
        </a>

        {/* Center: Desktop Quick Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold tracking-widest uppercase text-warmGray">
          <a href="#work" className="hover:text-ink transition-colors">Work</a>
          <a href="#artists" className="hover:text-ink transition-colors">Artists</a>
          <a href="#process" className="hover:text-ink transition-colors">Process</a>
          <a href="#space" className="hover:text-ink transition-colors">The Studio</a>
        </nav>

        {/* Right: Persistent Utilities */}
        <div className="flex items-center gap-1.5 sm:gap-3">

          {/* Locate Us Button */}
          <button
            onClick={onOpenLocate}
            className="hidden xs:flex items-center gap-1.5 px-3 sm:px-4 py-2 border border-ink/20 rounded-full text-[10px] sm:text-xs font-semibold tracking-wider uppercase hover:border-ink hover:bg-ink hover:text-bone transition-all duration-300"
          >
            <MapPin className="w-3.5 h-3.5 text-bloodRed" />
            <span>Locate Us</span>
          </button>

          {/* WhatsApp Direct Icon */}
          <a
            href="https://wa.me/917795875799?text=Hi%20Art%20Garage%20Tattoo%20Studio,%20I%20would%20like%20to%20book%20a%20private%20consultation."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Book on WhatsApp"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-bone border border-ink/15 flex items-center justify-center text-ink hover:bg-[#25D366] hover:text-white hover:border-transparent transition-all duration-300 shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
          </a>

          {/* Phone Direct Dialer Icon */}
          <a
            href="tel:+917795875799"
            aria-label="Call Studio"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-bone border border-ink/15 flex items-center justify-center text-ink hover:bg-ink hover:text-bone transition-all duration-300 shadow-sm"
          >
            <Phone className="w-4 h-4" />
          </a>

          {/* Hamburger Overlay Trigger */}
          <button
            onClick={onOpenMenu}
            aria-label="Open Navigation Menu"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-ink text-bone flex items-center justify-center hover:bg-bloodRed transition-colors duration-300 ml-0.5 sm:ml-1"
          >
            <Menu className="w-4 h-4" />
          </button>

        </div>
      </div>
    </header>
  );
}
