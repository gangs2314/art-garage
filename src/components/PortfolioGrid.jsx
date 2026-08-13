import React, { useState, useEffect } from 'react';
import { ArrowUpRight, X, MessageCircle } from 'lucide-react';

const CATEGORIES = ['All', 'Sudee', 'Sagar'];

const ARTWORKS = [
  // ─── SUDEE ───
  {
    id: 1,
    artist: 'Sudee',
    title: 'Wolf & Sacred Geometry Sleeve',
    category: 'Portrait & Realism',
    time: '10 Hours Session',
    image: '/images/sudee/su1.jpg',
    description: 'Split-style wolf portrait blending photorealistic fur detail with sacred geometry, a celestial compass, and a moonlit mountain landscape.'
  },
  {
    id: 2,
    artist: 'Sudee',
    title: 'Ornamental Guardian Full Sleeve',
    category: 'Fine Line & Mandala',
    time: '12 Hours (2 Sessions)',
    image: '/images/sudee/su2.PNG',
    description: 'Intricate ornamental blackwork sleeve centered around a fierce guardian face, layered with mandala patterns, dotwork shading, and lotus geometry.'
  },
  {
    id: 3,
    artist: 'Sudee',
    title: 'Goddess Kali Portrait',
    category: 'Portrait & Realism',
    time: '9 Hours Session',
    image: '/images/sudee/su3.PNG',
    description: 'Hyper-realistic Kali portrait featuring a skull garland, trident, and a vibrant red tongue accent against deep black-and-grey contrast.'
  },
  {
    id: 4,
    artist: 'Sudee',
    title: 'Hyper-Realistic Lion',
    category: 'Portrait & Realism',
    time: '7 Hours Session',
    image: '/images/sudee/su4.png',
    description: 'Striking lion portrait with piercing blue eyes, capturing every strand of mane detail in smooth black-and-grey realism.'
  },
  {
    id: 5,
    artist: 'Sudee',
    title: 'Crowned Flame Skull',
    category: '3D & Depth',
    time: '8 Hours Session',
    image: '/images/sudee/su5.png',
    description: 'Dark realism skull crowned with flames and piercing red eyes, wrapped in tattered fabric and a detailed sword hilt.'
  },
  {
    id: 6,
    artist: 'Sudee',
    title: 'Serpent & Spider Lily',
    category: 'Fine Line & Mandala',
    time: '3 Hours Session',
    image: '/images/sudee/su12.png',
    description: 'Delicate fine-line serpent intertwined with vivid red spider lilies, placed elegantly across the collarbone.'
  },
  {
    id: 7,
    artist: 'Sudee',
    title: 'Shiva Ascetic Portrait',
    category: 'Portrait & Realism',
    time: '10 Hours Session',
    image: '/images/sudee/su13.png',
    description: 'Full forearm portrait of a Shiva-inspired ascetic with flowing dreadlocks, a thick beard, rudraksha beads, and a centered third eye.'
  },
    {
    id: 8,
    artist: 'Sudee',
    title: 'Sacred Geometry Blackwork Sleeve',
    category: 'Fine Line & Mandala',
    time: '6 Hours Session',
    image: '/images/sudee/su7.png',
    description: 'Bold ornamental blackwork sleeve featuring layered diamond geometry, dotwork shading, and symmetrical tribal patterns.'
  },
  {
    id: 9,
    artist: 'Sudee',
    title: 'Crimson Dragon Forearm',
    category: 'Portrait & Realism',
    time: '8 Hours Session',
    image: '/images/sudee/su8.png',
    description: 'Dynamic Japanese-inspired dragon wrapped around the forearm, brought to life with deep black ink and striking red accents.'
  },
  {
    id: 10,
    artist: 'Sudee',
    title: 'Hyper-Realistic Tiger',
    category: 'Portrait & Realism',
    time: '7 Hours Session',
    image: '/images/sudee/su11.png',
    description: 'Intense tiger portrait capturing every stripe and fur texture in meticulous black-and-grey realism.'
  },
    {
    id: 11,
    artist: 'Sagar',
    title: 'Rose & Skull Realism',
    category: 'Portrait & Realism',
    time: '7 Hours Session',
    image: '/images/sagar/sa1.png',
    description: 'Vivid realism composition blending a detailed skull with deep red roses and ornamental filigree on the forearm.'
  },
  {
    id: 12,
    artist: 'Sagar',
    title: 'Dark Portrait Sleeve',
    category: 'Portrait & Realism',
    time: '6 Hours Session',
    image: '/images/sagar/sa2.png',
    description: 'Black-and-grey portrait piece with dramatic contrast and smooth gradient shading wrapping the forearm.'
  },
  {
    id: 13,
    artist: 'Sagar',
    title: 'Ornamental Blackwork Band',
    category: 'Fine Line & Mandala',
    time: '5 Hours Session',
    image: '/images/sagar/sa3.png',
    description: 'Dense ornamental blackwork cuff featuring interlocking patterns and subtle red highlights for depth.'
  },
  {
    id: 14,
    artist: 'Sagar',
    title: 'Mystic Portrait Realism',
    category: 'Portrait & Realism',
    time: '8 Hours Session',
    image: '/images/sagar/sa4.png',
    description: 'Hyper-realistic mystic face portrait with intense gaze, framed by dark ornamental background work.'
  },
  {
    id: 15,
    artist: 'Sagar',
    title: 'Sacred Geometry Shield',
    category: 'Fine Line & Mandala',
    time: '6 Hours Session',
    image: '/images/sagar/sa5.png',
    description: 'Symmetrical sacred geometry centerpiece with mandala layering and precise dotwork detailing.'
  },
  {
    id: 16,
    artist: 'Sagar',
    title: 'Geometric Blackout Sleeve',
    category: 'Fine Line & Mandala',
    time: '7 Hours Session',
    image: '/images/sagar/sa6.png',
    description: 'Full-coverage geometric blackout sleeve with clean linework and ornamental pattern repetition.'
  },
  {
    id: 17,
    artist: 'Sagar',
    title: 'Dark King Skull',
    category: '3D & Depth',
    time: '9 Hours Session',
    image: '/images/sagar/sa7.png',
    description: 'Intricate dark realism skull crowned with ornamental elements, deep shadows, and textured bone detail.'
  },
];

// Parse artist filter from URL hash: #work?artist=Sudee
const getArtistFromHash = () => {
  const hash = window.location.hash; // e.g. "#work?artist=Sudee"
  const match = hash.match(/[?&]artist=([^&]+)/);
  return match ? decodeURIComponent(match[1]) : 'All';
};

export default function PortfolioGrid() {
  const [selectedCat, setSelectedCat] = useState(getArtistFromHash());
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [activeModal]);

  // Listen for hash changes from "See Work" clicks
  useEffect(() => {
    const handleHashChange = () => {
      const artist = getArtistFromHash();
      if (CATEGORIES.includes(artist)) {
        setSelectedCat(artist);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    // Also check on mount in case user landed with hash
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const filtered = selectedCat === 'All'
    ? ARTWORKS
    : ARTWORKS.filter(item => item.artist === selectedCat);

  return (
    <section id="work" className="py-20 sm:py-32 border-b border-ink/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-6">
          <div>
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-bloodRed mb-2 block">
              Curated Gallery
            </span>
            <h2 className="font-serif text-3xl xs:text-4xl sm:text-6xl font-bold tracking-tight text-ink">
              Recent Work
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            {CATEGORIES.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedCat(cat);
                  // Clear the artist param from hash when manually switching
                  window.history.replaceState(null, '', '#work');
                }}
                className={`px-3 sm:px-4 py-2 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all duration-300 ${
                  selectedCat === cat
                    ? 'bg-ink text-bone'
                    : 'bg-transparent border border-ink/15 text-warmGray hover:border-ink hover:text-ink'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {filtered.map((art) => (
            <div
              key={art.id}
              onClick={() => setActiveModal(art)}
              className="group cursor-pointer rounded-2xl overflow-hidden border border-ink/15 bg-ink/5 relative aspect-[4/5]"
            >
              <img
                src={art.image}
                alt={art.title}
                className="w-full h-full object-cover fine-art-img"
                loading="lazy"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 p-4 sm:p-6 flex flex-col justify-end text-bone">
                <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-widest text-mutedGold mb-1">
                  {art.artist} • {art.category} • {art.time}
                </span>
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-serif text-lg sm:text-2xl font-bold">{art.title}</h3>
                  <ArrowUpRight className="w-5 h-5 shrink-0" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Detail Modal */}
      {activeModal && (
        <div
          onClick={() => setActiveModal(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 dark-glass-panel overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full bg-bone text-ink rounded-3xl overflow-hidden border border-white/20 shadow-2xl grid grid-cols-1 md:grid-cols-2 relative my-8"
          >

            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-ink/80 text-bone flex items-center justify-center hover:bg-bloodRed transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-square md:aspect-auto h-64 sm:h-80 md:h-full bg-ink/5">
              <img
                src={activeModal.image}
                alt={activeModal.title}
                className="w-full h-full object-cover fine-art-img"
              />
            </div>

            <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-bloodRed">
                  {activeModal.artist} — {activeModal.category}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold mt-2 mb-4">
                  {activeModal.title}
                </h3>
                <p className="text-warmGray text-sm sm:text-base leading-relaxed">
                  {activeModal.description}
                </p>
                <div className="mt-6 pt-6 border-t border-ink/10 flex items-center justify-between text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-warmGray">
                  <span>Session Length:</span>
                  <span className="text-ink">{activeModal.time}</span>
                </div>
              </div>

              <a
                href={`https://wa.me/917795875799?text=Hi%20Art%20Garage,%20I%20want%20to%20inquire%20about%20a%20custom%20tattoo%20similar%20to:%20${encodeURIComponent(activeModal.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 sm:py-4 rounded-xl bg-ink text-bone font-semibold text-[11px] sm:text-xs tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-[#25D366] hover:text-white transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Inquire About Similar Work</span>
              </a>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}