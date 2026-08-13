import React from 'react';

const STEPS = [
  {
    num: '01',
    title: 'Consultation & Anatomy Reference',
    desc: 'Tell us what you carry. We listen before we draw — analyzing skin tone, reference photos, and placement in our Rajajinagar studio.'
  },
  {
    num: '02',
    title: 'Custom Digital Concept Sketch',
    desc: 'Never off-the-wall flash. Your artist builds a precision digital rendering engineered specifically around your natural anatomy.'
  },
  {
    num: '03',
    title: 'Private Studio Session',
    desc: 'Hospital-grade hygiene, single-use sterilized cartridges, and imported organic inks in a calm, distraction-free environment.'
  },
  {
    num: '04',
    title: 'Lifetime Aftercare Protocol',
    desc: 'We apply second-skin protective wraps and provide complete healing guidance with our complimentary touch-up guarantee.'
  }
];

export default function Process() {
  return (
    <section id="process" className="py-20 sm:py-36 border-b border-ink/10 bg-ink text-bone">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="max-w-2xl mb-12 sm:mb-20">
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-mutedGold mb-2 block">
            How We Work
          </span>
          <h2 className="font-serif text-3xl xs:text-4xl sm:text-6xl font-bold tracking-tight text-bone">
            The Inking Journey
          </h2>
        </div>

        {/* 4-Step Editorial Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">
          {STEPS.map((step, idx) => (
            <div key={idx} className="flex flex-col justify-between border-t border-white/20 pt-5 sm:pt-6 space-y-4 sm:space-y-6 group hover:border-mutedGold transition-colors">
              <div>
                <span className="font-serif text-3xl sm:text-4xl text-mutedGold font-bold">
                  {step.num}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-bone mt-3 mb-3 sm:mb-4">
                  {step.title}
                </h3>
                <p className="text-white/60 text-xs sm:text-sm leading-relaxed font-sans">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
