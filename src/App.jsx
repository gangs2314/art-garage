import React, { useState } from 'react';
import Navbar from './components/Navbar';
import OverlayMenu from './components/OverlayMenu';
import AuthorityDock from './components/AuthorityDock';
import Hero from './components/Hero';
import Manifesto from './components/Manifesto';
import PortfolioGrid from './components/PortfolioGrid';
import Artists from './components/Artists';
import Process from './components/Process';
import StudioSpace from './components/StudioSpace';
import FloatingContactBar from './components/FloatingContactBar';
import LocateModal from './components/LocateModal';
import Footer from './components/Footer';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLocateOpen, setIsLocateOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-bone text-ink">
      {/* Top Persistent Header */}
      <Navbar
        onOpenMenu={() => setIsMenuOpen(true)}
        onOpenLocate={() => setIsLocateOpen(true)}
      />

      {/* Architectural Dark Overlay Menu */}
      <OverlayMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onOpenLocate={() => {
          setIsMenuOpen(false);
          setIsLocateOpen(true);
        }}
      />

      {/* Interactive Location Map Modal */}
      <LocateModal
        isOpen={isLocateOpen}
        onClose={() => setIsLocateOpen(false)}
      />

      {/* Fixed Bottom-Left Authority Badges (Google 4.9★, Hygiene, Instagram) */}
      <AuthorityDock />

      {/* Main Editorial Page Flow */}
      <main className="relative z-10">
        <Hero onOpenLocate={() => setIsLocateOpen(true)} />
        <Manifesto />
        <PortfolioGrid />
        <Artists />
        <Process />
        <StudioSpace onOpenLocate={() => setIsLocateOpen(true)} />
      </main>

      {/* Dark Luxury Footer Band */}
      <Footer />

      {/* Omnipresent Floating Bottom Action Dock */}
      <FloatingContactBar />
    </div>
  );
}
