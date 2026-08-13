import React from 'react';
import { ArrowUpRight, Instagram, Eye } from 'lucide-react';

const ARTISTS = [
  {
    name: 'Sudee',
    role: 'Founder & Lead Realism Master',
    specialties: ['Portrait & Realism', 'Custom Concept', 'Large Scale Sleeve'],
    bio: 'Specializing in black-and-grey micro realism and intricate structural tattooing in Rajajinagar, with clients visiting from across Bangalore for signature portrait work.',
    image: '/images/sudee.png',
    instagram: 'https://instagram.com/art_garage_tattoo_studio',
  },
  {
    name: 'Sagar',
    role: 'Fine Line & Realism Specialist',
    specialties: ['Sacred Geometry', 'Ink Restoration', 'Single Needle'],
    bio: 'Rotating senior guest artist mastering single-needle precision, sacred geometry, and full-scale ink restoration. Transforming old tattoos into refined, lasting art.',
    image: '/images/Sagar.png',
    instagram: 'https://instagram.com/sagar_ink',
  }
];

export default function Artists() {
  const handleSeeWork = (e, artistName) => {
    // Allow default anchor scroll to #work
    // Then update hash so PortfolioGrid can read the filter
    setTimeout(() => {
      window.history.replaceState(null, '', `#work?artist=${encodeURIComponent(artistName)}`);
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    }, 10);
  };

  return (
    <section id="artists" className="py-20 sm:py-32 border-b border-ink/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-bloodRed mb-2 block">
            Masters of Ink
          </span>
          <h2 className="font-serif text-3xl xs:text-4xl sm:text-6xl font-bold tracking-tight text-ink">
            Bangalore's Dedicated Artists
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12">
          {ARTISTS.map((artist, idx) => (
            <div key={idx} className="group flex flex-col sm:flex-row gap-5 sm:gap-8 items-start">

              {/* Artist Portrait */}
              <div className="w-full sm:w-56 md:w-64 aspect-[3/4] rounded-2xl overflow-hidden border border-ink/15 bg-ink/5 shrink-0">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-full object-cover fine-art-img"
                  loading="lazy"
                />
              </div>

              {/* Bio & Specialties */}
              <div className="flex-1 flex flex-col justify-between h-full space-y-4 sm:space-y-6 w-full">
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ink">{artist.name}</h3>
                    <a
                      href={artist.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-warmGray hover:text-bloodRed transition-colors shrink-0"
                      aria-label="Instagram Profile"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                  </div>
                  <p className="text-[10px] sm:text-xs uppercase tracking-widest text-bloodRed font-semibold mt-1">
                    {artist.role}
                  </p>

                  <p className="text-warmGray text-sm leading-relaxed mt-4">
                    {artist.bio}
                  </p>

                  {/* Specialty Pills */}
                  <div className="flex flex-wrap gap-2 mt-5 sm:mt-6">
                    {artist.specialties.map((spec, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-3 py-1 rounded-full border border-ink/15 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-ink"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-5 pt-4 border-t border-ink/10">
                  {/* See Work */}
                  <a
                    href="#work"
                    onClick={(e) => handleSeeWork(e, artist.name)}
                    className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-warmGray hover:text-ink transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>See Work</span>
                  </a>

                  {/* Book */}
                  <a
                    href={`https://wa.me/917795875799?text=Hi%20Art%20Garage,%20I%20would%20like%20to%20book%20a%20session%20with%20${encodeURIComponent(artist.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-ink hover:text-bloodRed transition-colors"
                  >
                    <span>Book With Artist</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}