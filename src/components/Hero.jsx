import React from 'react';
import { Phone, MessageCircle, ArrowRight } from 'lucide-react';

export default function Hero({ onOpenLocate }) {
  return (
    <section className="relative min-h-[90vh] flex items-center border-b border-ink/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20 w-full">

        {/* Split-Pane Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* Left Pane: Editorial Typography & Action Deck */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-5 sm:space-y-8 order-2 lg:order-1">

            {/* Top Tagline */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-ink/5 border border-ink/10 w-fit">
              <span className="w-2 h-2 rounded-full bg-bloodRed animate-pulse"></span>
              <span className="text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase text-ink">
                Bangalore's Premier Custom Tattoo Studio
              </span>
            </div>

            {/* Core Master Headline */}
            <h1 className="font-serif text-[2.6rem] xs:text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter leading-[0.92] text-ink uppercase">
              YOU IMAGINE IT. <br />
              <span className="text-warmGray italic font-normal">WE INK IT.</span>
            </h1>

            {/* Manifesto Statement */}
            <p className="text-sm sm:text-lg text-warmGray max-w-xl font-normal leading-relaxed">
              We don't do flash-off-the-wall. Every piece starts as a private conversation in our <strong className="text-ink font-semibold">Rajajinagar studio</strong> and ends as fine-art body sculpture tailored to your anatomy.
            </p>

            {/* Screenshot-Matched CTA Action Layout */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">

              {/* Primary Appointment Button */}
              <a
                href="https://wa.me/917795875799?text=Hi%20Art%20Garage,%20I%20would%20like%20to%20book%20an%20appointment."
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic-btn px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-ink text-bone font-semibold text-[11px] sm:text-xs tracking-widest uppercase flex items-center justify-center gap-3 border border-ink hover:bg-bloodRed hover:border-bloodRed transition-all duration-300 shadow-xl group"
              >
                <span className="relative z-10">Book an Appointment</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
              </a>

              {/* Inline Phone Action */}
              <a
                href="tel:+917795875799"
                className="px-5 sm:px-6 py-3.5 sm:py-4 rounded-full bg-transparent border border-ink/20 text-ink font-semibold text-[11px] sm:text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:border-ink hover:bg-ink/5 transition-all duration-300"
              >
                <Phone className="w-4 h-4 text-bloodRed" />
                <span>Book on Call</span>
              </a>

              {/* Inline WhatsApp Action */}
              <a
                href="https://wa.me/917795875799?text=Hi%20Art%20Garage,%20I%20have%20a%20tattoo%20idea."
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 sm:px-6 py-3.5 sm:py-4 rounded-full bg-transparent border border-ink/20 text-ink font-semibold text-[11px] sm:text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:border-[#25D366] hover:bg-[#25D366]/10 transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp</span>
              </a>

            </div>

            {/* Studio Meta Footer */}
            <div className="pt-4 border-t border-ink/10 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] sm:text-xs text-warmGray">
              <span>
                3rd Floor, TCL Building, 1st N Block, 2nd Block, 2nd Stage, Rajajinagar, Bengaluru, Karnataka-560010
              </span>
              <span>Open 7 Days: 10:00 AM – 10:00 PM</span>
            </div>

          </div>

          {/* Right Pane: Museum-Grade Fine-Art Imagery */}
          <div className="lg:col-span-5 relative order-1 lg:order-2">
            <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none aspect-[4/5] rounded-3xl overflow-hidden border border-ink/15 shadow-2xl bg-ink/5 group">

              {/* High-Resolution Desaturated Realism Photo */}
              <img
                src="/images/main.png"
                alt="Custom Realism Tattoo Art — Art Garage Studio Bangalore"
                className="w-full h-full object-cover fine-art-img"
                loading="eager"
              />

              {/* Floating Luxury Case Study Badge */}
              <div className="absolute inset-x-3 sm:inset-x-4 bottom-3 sm:bottom-4 p-3 sm:p-4 rounded-2xl dark-glass-panel text-bone flex items-center justify-between opacity-90 group-hover:opacity-100 transition-opacity">
                <div>
                  <p className="text-[9px] sm:text-[10px] tracking-widest uppercase text-bone/60">Recent Custom Work</p>
                  <p className="font-serif text-base sm:text-lg font-semibold">Micro-Realism Shading • 7 Hrs</p>
                </div>
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-mutedGold">
                  Rajajinagar
                </span>
              </div>

            </div>

            {/* Decorative Architectural Line Accent */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border-l border-b border-bloodRed/40 -z-10 hidden sm:block"></div>
            <div className="absolute -top-6 -right-6 w-24 h-24 border-t border-r border-ink/20 -z-10 hidden sm:block"></div>
          </div>

        </div>

      </div>
    </section>
  );
}
