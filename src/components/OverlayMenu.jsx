import React, { useEffect } from 'react';
import { X, ShieldCheck, ArrowRight, Instagram, MessageCircle, Phone } from 'lucide-react';

export default function OverlayMenu({ isOpen, onClose, onOpenLocate }) {
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
    <div className="fixed inset-0 z-50 flex flex-col justify-between dark-glass-panel text-bone animate-fadeIn overflow-y-auto">
      {/* Top Bar */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between border-b border-white/10 shrink-0">
        <span className="font-serif text-lg sm:text-2xl tracking-wide uppercase font-semibold">
          Art Garage • Menu
        </span>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-ink transition-colors duration-300"
          aria-label="Close Menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Content Columns */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 lg:gap-16">

          {/* Left Column: Primary Menu */}
          <div className="flex flex-col space-y-3 sm:space-y-5">
            <span className="text-xs font-sans tracking-widest uppercase text-white/40 mb-2">
              Navigation
            </span>
            {[
              { label: 'Home', href: '#' },
              { label: 'Artists', href: '#artists' },
              { label: 'Tattoo Categories', href: '#work' },
              { label: 'Cover-Ups & Repair', href: '#work' }
            ].map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                onClick={onClose}
                className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white/90 hover:text-white hover:translate-x-2 transition-all duration-300"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Center Column: Studio & Support */}
          <div className="flex flex-col space-y-3 sm:space-y-5">
            <span className="text-xs font-sans tracking-widest uppercase text-white/40 mb-2">
              Information
            </span>
            {[
              { label: 'Gallery & Realism', href: '#work' },
              { label: 'Pricing & Aftercare', href: '#process' },
              { label: 'Studio & FAQs', href: '#space' }
            ].map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onClick={onClose}
                className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white/70 hover:text-white hover:translate-x-2 transition-all duration-300"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={onOpenLocate}
              className="text-left font-serif text-2xl sm:text-3xl lg:text-4xl text-bloodRed hover:text-white hover:translate-x-2 transition-all duration-300"
            >
              Locate Us — Rajajinagar
            </button>
          </div>

          {/* Right Column: Luxury Action Cards */}
          <div className="flex flex-col justify-center space-y-4">

            {/* Action Card 1: Lifetime Care */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-300">
              <div className="flex items-center gap-3 mb-2">
                <ShieldCheck className="w-5 h-5 text-mutedGold" />
                <h4 className="font-serif text-lg font-semibold text-white">
                  Art Garage Lifetime Care
                </h4>
              </div>
              <p className="text-xs text-white/60 font-sans leading-relaxed">
                Every custom tattoo includes our hospital-grade aftercare protocol and complimentary touch-up guarantee.
              </p>
            </div>

            {/* Action Card 2: Private Consultation */}
            <a
              href="https://wa.me/917795875799?text=Hi%20Art%20Garage,%20I%20would%20like%20to%20book%20a%20private%20consultation."
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 sm:p-6 rounded-2xl bg-bloodRed text-white border border-transparent hover:bg-bloodRed/90 transition-all duration-300 group block"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-serif text-lg font-semibold">Private Consultation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-xs text-white/80 font-sans">
                Book a 1-on-1 concept session with our lead artists in Rajajinagar.
              </p>
            </a>

          </div>
        </div>
      </div>

      {/* Bottom Footer Strip */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-[11px] sm:text-xs text-white/60 shrink-0">
        <p className="text-center sm:text-left">#707, Manyu Complex, 73 Cross, 6th Block, Rajajinagar, Bangalore – 560010</p>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <a href="https://instagram.com/art_garage_tattoo_studio" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1.5">
            <Instagram className="w-4 h-4" />
            <span>@art_garage_tattoo_studio</span>
          </a>
          <a href="https://wa.me/917795875799" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1.5">
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>
          <a href="tel:+917795875799" className="hover:text-white flex items-center gap-1.5">
            <Phone className="w-4 h-4" />
            <span>+91 77958 75799</span>
          </a>
        </div>
      </div>
    </div>
  );
}
