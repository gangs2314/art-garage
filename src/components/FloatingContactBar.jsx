import React, { useState, useEffect } from 'react';
import { MessageCircle, Phone, Instagram, X, Plus } from 'lucide-react';

export default function FloatingContactBar() {
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Mobile: FAB pattern that expands into contact options
  if (isMobile) {
    return (
      <div className="fixed bottom-4 right-3 z-40 flex flex-col items-end gap-3 pointer-events-auto">

        {expanded && (
          <div className="flex flex-col items-end gap-2.5 animate-fadeIn">
            <a
              href="https://wa.me/917795875799?text=Hi%20Art%20Garage%20Tattoo%20Studio,%20I%20would%20like%20to%20book%20a%20consultation."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-4 py-2.5 bg-[#25D366] text-white rounded-full shadow-xl font-bold text-[11px] uppercase tracking-wider"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp</span>
            </a>
            <a
              href="tel:+917795875799"
              className="flex items-center gap-2.5 px-4 py-2.5 bg-ink text-bone rounded-full shadow-xl font-bold text-[11px] uppercase tracking-wider"
            >
              <Phone className="w-4 h-4" />
              <span>Call Studio</span>
            </a>
            <a
              href="https://instagram.com/artgaragetattoo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-4 py-2.5 bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white rounded-full shadow-xl font-bold text-[11px] uppercase tracking-wider"
            >
              <Instagram className="w-4 h-4" />
              <span>Instagram</span>
            </a>
          </div>
        )}

        <button
          onClick={() => setExpanded(!expanded)}
          aria-label={expanded ? 'Close contact options' : 'Open contact options'}
          className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${
            expanded ? 'bg-bloodRed text-white rotate-45' : 'bg-ink text-bone'
          }`}
        >
          {expanded ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
        </button>
      </div>
    );
  }

  // Desktop / Tablet: horizontal pill row
  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2 pointer-events-auto">

      {/* WhatsApp Quick Action Pill */}
      <a
        href="https://wa.me/917795875799?text=Hi%20Art%20Garage%20Tattoo%20Studio,%20I%20would%20like%20to%20book%20a%20consultation."
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 px-4 py-3 bg-[#25D366] text-white rounded-full shadow-2xl hover:scale-105 transition-all duration-300 font-bold text-xs uppercase tracking-wider"
      >
        <MessageCircle className="w-4 h-4 fill-white" />
        <span>Chat on WhatsApp</span>
      </a>

      {/* Phone Icon Trigger */}
      <a
        href="tel:+917795875799"
        aria-label="Call +91 77958 75799"
        className="w-11 h-11 rounded-full bg-ink text-bone flex items-center justify-center shadow-2xl hover:bg-bloodRed transition-all duration-300"
      >
        <Phone className="w-4 h-4" />
      </a>

      {/* Instagram Direct Button */}
      <a
        href="https://instagram.com/art_garage_tattoo_studio"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram Portfolio"
        className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300"
      >
        <Instagram className="w-4 h-4" />
      </a>

    </div>
  );
}
