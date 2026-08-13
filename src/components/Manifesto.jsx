import React from 'react';

export default function Manifesto() {
  return (
    <section className="py-20 sm:py-36 border-b border-ink/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-bloodRed mb-4 sm:mb-6 block">
          Our Philosophy
        </span>

        <h2 className="font-serif text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-normal leading-[1.15] tracking-tight text-ink mb-8 sm:mb-10">
          "Tattooing is not decoration. It is permanence executed with <span className="italic font-normal text-bloodRed">museum-grade restraint</span> and architectural precision."
        </h2>

        <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6 text-warmGray text-sm sm:text-lg font-normal leading-relaxed">
          <p>
            Founded in Rajajinagar, Bangalore, Art Garage Tattoo Studio operates by private appointment with a curated roster of artists. We reject walk-in rush and generic flash designs.
          </p>
          <p>
            Every piece is developed collaboratively — translating your personal references, anatomy, and vision into custom body art that ages with dignity.
          </p>
        </div>

        {/* Minimalist Signature Line */}
        <div className="mt-10 sm:mt-12 flex items-center justify-center gap-3 sm:gap-4 text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-ink">
          <span className="w-6 sm:w-8 h-px bg-ink/20"></span>
          <span>Sudee & Master Artists</span>
          <span className="w-6 sm:w-8 h-px bg-ink/20"></span>
        </div>

      </div>
    </section>
  );
}
