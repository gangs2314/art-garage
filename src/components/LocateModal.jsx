import React, { useEffect } from 'react';
import { X, MapPin, Phone, ExternalLink } from 'lucide-react';

export default function LocateModal({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 dark-glass-panel overflow-y-auto animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-w-2xl w-full bg-bone text-ink rounded-3xl overflow-hidden border border-white/20 shadow-2xl p-5 sm:p-8 md:p-10 relative my-8"
      >

        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-ink/10 flex items-center justify-center hover:bg-ink hover:text-bone transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-bloodRed mb-2">
          <MapPin className="w-4 h-4" />
          <span>Rajajinagar Studio</span>
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 pr-10">
          Art Garage Tattoo Studio
        </h3>

        <p className="text-warmGray text-xs sm:text-sm md:text-base leading-relaxed mb-6 sm:mb-8">
          3rd Floor, TCL Building, 1st N Block, 2nd Block, 2nd Stage, Rajajinagar, Bengaluru, Karnataka 560010
        </p>

        {/* Embedded Responsive Map */}
        <div className="aspect-video w-full rounded-2xl overflow-hidden border border-ink/15 bg-ink/5 mb-6 sm:mb-8">
          <iframe
            title="Art Garage Tattoo Studio Rajajinagar Map"
            src="https://www.google.com/maps?q=Art+Garage+Tattoo+Studio,+3rd+Floor,+TCL+Building,+1st+N+Block,+2nd+Block,+2nd+Stage,+Rajajinagar,+Bengaluru,+Karnataka+560010&output=embed"
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch gap-3 sm:gap-4">
          <a
            href="https://www.google.com/maps/search/Art+Garage+Tattoo+Studio+Rajajinagar+Bangalore"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 sm:py-3.5 px-4 sm:px-6 rounded-xl bg-ink text-bone font-semibold text-[10px] sm:text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-bloodRed transition-colors"
          >
            <span>Open in Google Maps</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <a
            href="tel:+917795875799"
            className="py-3 sm:py-3.5 px-4 sm:px-6 rounded-xl border border-ink/20 text-ink font-semibold text-[10px] sm:text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-ink hover:text-bone transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>Call +91 77958 75799</span>
          </a>
        </div>

      </div>
    </div>
  );
}
