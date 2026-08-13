import React from 'react';
import { Instagram, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-ink text-bone py-14 sm:py-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 pb-10 sm:pb-12 border-b border-white/10">

          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-wide uppercase block">
              ART GARAGE
            </span>
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-white/50">
              Fine Art Custom Tattoo Studio • Rajajinagar, Bangalore
            </p>
            <p className="text-sm text-white/70 max-w-sm pt-2 leading-relaxed">
              You imagine it. We ink it. Hospital-grade hygiene, custom concept designs, and lifetime tattoo care.
            </p>

            {/* Social row */}
            <div className="flex items-center gap-3 pt-3">
              <a
                href="https://instagram.com/art_garage_tattoo_studio"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] hover:border-transparent transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/917795875799"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#25D366] hover:border-transparent transition-all"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="tel:+917795875799"
                aria-label="Call"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-bloodRed hover:border-transparent transition-all"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href="mailto:artgaragetattoo@gmail.com"
                aria-label="Email"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-mutedGold hover:border-transparent transition-all"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-[10px] sm:text-xs uppercase tracking-widest text-mutedGold font-semibold mb-3 sm:mb-4">
              Explore
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="#work" className="hover:text-white transition-colors">Portfolio Gallery</a></li>
              <li><a href="#artists" className="hover:text-white transition-colors">Master Artists</a></li>
              <li><a href="#process" className="hover:text-white transition-colors">Aftercare & Process</a></li>
              <li><a href="#space" className="hover:text-white transition-colors">Rajajinagar Studio</a></li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-[10px] sm:text-xs uppercase tracking-widest text-mutedGold font-semibold mb-3 sm:mb-4">
              Connect & Visit
            </h4>
            <div className="space-y-2.5 text-sm text-white/70">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-bloodRed shrink-0 mt-0.5" />
                <span> 3rd Floor, TCL Building, 1st N Block, 2nd Block, 2nd Stage, Rajajinagar, Bengaluru, Karnataka-560010</span>
              </p>
              <a href="tel:+917795875799" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-bloodRed shrink-0" />
                <span>+91 77958 75799</span>
              </a>
              <a href="mailto:artgaragetattoo@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-bloodRed shrink-0" />
                <span className="break-all">
                  artgaragetattoo@gmail.com
                </span>
              </a>
              <a href="https://instagram.com/art_garage_tattoo_studio" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                <Instagram className="w-4 h-4 text-bloodRed shrink-0" />
                <span>@art_garage_tattoo_studio</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-[10px] sm:text-xs text-white/40">
          <p>© 2026 Art Garage Tattoo Studio. All rights reserved.</p>
          <p className="italic font-serif text-sm">You imagine it. We ink it.</p>
        </div>

      </div>
    </footer>
  );
}
