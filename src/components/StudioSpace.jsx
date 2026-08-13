import React from 'react';
import { MapPin, Clock, Phone, Mail } from 'lucide-react';

export default function StudioSpace({ onOpenLocate }) {
  return (
    <section id="space" className="py-20 sm:py-36 border-b border-ink/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* Left Column: Studio Location Details */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            <div>
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-bloodRed mb-2 block">
                The Space
              </span>
              <h2 className="font-serif text-3xl xs:text-4xl sm:text-6xl font-bold tracking-tight text-ink">
                Rajajinagar, Bangalore
              </h2>
            </div>

            <p className="text-warmGray text-sm sm:text-lg leading-relaxed">
              Designed for privacy and comfort. Our Rajajinagar studio combines hospital-grade sterilization protocols with the quiet atmosphere of a fine-art gallery.
            </p>

            <div className="space-y-4 pt-4 border-t border-ink/10 text-sm font-sans">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-bloodRed shrink-0 mt-0.5" />
                <div>
                  <strong className="text-ink block">Address</strong>
                  <span className="text-warmGray"> 3rd Floor, TCL Building, 1st N Block, 2nd Block, 2nd Stage, Rajajinagar, Bengaluru, Karnataka-560010</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-bloodRed shrink-0 mt-0.5" />
                <div>
                  <strong className="text-ink block">Studio Hours</strong>
                  <span className="text-warmGray">Monday – Sunday: 10:00 AM – 10:00 PM (Open 7 Days)</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-bloodRed shrink-0 mt-0.5" />
                <div>
                  <strong className="text-ink block">Phone & WhatsApp</strong>
                  <a href="tel:+917795875799" className="text-warmGray hover:text-ink transition-colors">+91 77958 75799</a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-bloodRed shrink-0 mt-0.5" />
                <div>
                  <strong className="text-ink block">Email</strong>
                  <a href="mailto:artgaragetattoo@gmail.com" className="text-warmGray hover:text-ink transition-colors break-all">artgaragetattoo@gmail.com</a>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <button
                onClick={onOpenLocate}
                className="px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-ink text-bone font-semibold text-[10px] sm:text-xs uppercase tracking-wider hover:bg-bloodRed transition-colors"
              >
                Open Studio Map
              </button>
              <a
                href="https://wa.me/917795875799?text=Hi%20Art%20Garage,%20I%20want%20to%20visit%20your%20Rajajinagar%20studio.%20Please%20share%20directions."
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 sm:px-6 py-3 sm:py-3.5 rounded-full border border-ink/20 text-ink font-semibold text-[10px] sm:text-xs uppercase tracking-wider hover:border-ink transition-colors"
              >
                WhatsApp Directions
              </a>
            </div>

          </div>

          {/* Right Column: Architectural Photography Grid */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-3 sm:gap-4">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-ink/15">
              <img
                src="/images/main.png"
                alt="Art Garage Tattoo Studio Interior Bangalore"
                className="w-full h-full object-cover fine-art-img"
                loading="lazy"
              />
            </div>
            <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-ink/15 mt-6 sm:mt-8">
              <img
                src="./images/allef-vinicius-hxNiXP498UI-unsplash.jpg"
                alt="Sterile Tattoo Station Rajajinagar"
                className="w-full h-full object-cover fine-art-img"
                loading="lazy"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
