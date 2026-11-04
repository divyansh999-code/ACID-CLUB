import React, { useState } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';

interface TopBarProps {
  cartCount: number;
  onOpenCart: () => void;
  onScrollTo: (id: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({ cartCount, onOpenCart, onScrollTo }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    onScrollTo(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#F5F4F1]/90 backdrop-blur-md border-b border-black/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Brand wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-display font-black text-2xl tracking-tighter text-black uppercase whitespace-nowrap shrink-0 hover:text-[#7ba318] transition-colors"
        >
          ACID CLUB®
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono font-bold tracking-widest uppercase text-black/70">
          <button
            onClick={() => handleNavClick('drops')}
            className="hover:text-black transition-colors whitespace-nowrap cursor-pointer hover:underline underline-offset-4"
          >
            Drops
          </button>
          <button
            onClick={() => handleNavClick('lookbook')}
            className="hover:text-black transition-colors whitespace-nowrap cursor-pointer hover:underline underline-offset-4"
          >
            Lookbook
          </button>
          <button
            onClick={() => handleNavClick('manifesto')}
            className="hover:text-black transition-colors whitespace-nowrap cursor-pointer hover:underline underline-offset-4"
          >
            Manifesto
          </button>
        </nav>

        {/* Zone 3: Actions (Join the club CTA + Bag counter) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleNavClick('join')}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-mono font-bold tracking-wider uppercase text-[#B4E33D] bg-black hover:bg-neutral-800 transition-colors whitespace-nowrap cursor-pointer active:scale-95"
          >
            Join the club
          </button>

          {/* Bag counter button */}
          <button
            onClick={onOpenCart}
            aria-label="View shopping bag"
            className="group flex items-center gap-2 px-3 py-2 text-xs font-mono font-bold tracking-wider uppercase bg-black/5 hover:bg-black/10 border border-black/20 text-black transition-colors whitespace-nowrap cursor-pointer active:scale-95"
          >
            <ShoppingBag className="w-4 h-4 text-black group-hover:rotate-6 transition-transform" />
            <span className="tabular-nums">
              BAG ({cartCount})
            </span>
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="md:hidden p-2 text-black hover:bg-black/5 rounded cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F5F4F1] border-b border-black/20 px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3 font-mono text-sm font-bold uppercase tracking-wider">
            <button
              onClick={() => handleNavClick('drops')}
              className="text-left py-2 border-b border-black/5 text-black hover:text-[#7ba318]"
            >
              01 // Drops
            </button>
            <button
              onClick={() => handleNavClick('lookbook')}
              className="text-left py-2 border-b border-black/5 text-black hover:text-[#7ba318]"
            >
              02 // Lookbook
            </button>
            <button
              onClick={() => handleNavClick('manifesto')}
              className="text-left py-2 border-b border-black/5 text-black hover:text-[#7ba318]"
            >
              03 // Manifesto
            </button>
            <button
              onClick={() => handleNavClick('join')}
              className="w-full mt-2 py-3 bg-black text-[#B4E33D] text-center font-mono font-bold tracking-wider uppercase"
            >
              Join the club
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
