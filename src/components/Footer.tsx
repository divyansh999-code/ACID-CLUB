import React, { useState } from 'react';
import { ArrowUp, Instagram, Twitter, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('hello@acidclub.in');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#0A0A0A] text-white pt-20 pb-12 border-t-2 border-black select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-neutral-800">
          
          {/* Brand & Motto */}
          <div className="md:col-span-5 space-y-4">
            <h3 className="font-display font-black text-4xl sm:text-5xl uppercase tracking-tighter text-[#B4E33D]">
              ACID CLUB
            </h3>
            <p className="font-display font-bold text-2xl sm:text-3xl uppercase tracking-tight text-white leading-tight">
              "DESIGNED TO BE STARED AT."
            </p>
            <p className="font-sans-clean text-xs text-neutral-400 max-w-sm leading-relaxed">
              Architectural techwear & high-visibility street garments engineered for extreme urban contrast. All drops limited and numbered.
            </p>
          </div>

          {/* Contact & Social Links */}
          <div className="md:col-span-4 space-y-4">
            <div className="text-xs font-mono font-bold tracking-widest uppercase text-neutral-500">
              COMMUNICATIONS & INQUIRIES
            </div>
            <div className="space-y-3 font-mono text-sm">
              <div>
                <span className="text-neutral-500 text-xs block">DIRECT DISPATCH:</span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="text-white hover:text-[#B4E33D] transition-colors flex items-center gap-2 cursor-pointer font-bold"
                >
                  <Mail className="w-4 h-4 text-[#B4E33D]" />
                  <span>hello@acidclub.in</span>
                  <span className="text-[10px] bg-neutral-800 px-1.5 py-0.5 text-neutral-400">
                    {copiedEmail ? 'COPIED ✓' : 'COPY'}
                  </span>
                </button>
              </div>

              <div>
                <span className="text-neutral-500 text-xs block">INSTAGRAM FREQUENCY:</span>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white hover:text-[#B4E33D] transition-colors flex items-center gap-2"
                >
                  <Instagram className="w-4 h-4 text-[#B4E33D]" />
                  <span>@acidclub.wear</span>
                </a>
              </div>

              <div>
                <span className="text-neutral-500 text-xs block">PRIMARY TRANSMISSION:</span>
                <span className="text-neutral-300">NEW DELHI // GLOBAL DELIVERY</span>
              </div>
            </div>
          </div>

          {/* Navigation & Policies */}
          <div className="md:col-span-3 space-y-4">
            <div className="text-xs font-mono font-bold tracking-widest uppercase text-neutral-500">
              ARCHIVE & LOGISTICS
            </div>
            <ul className="space-y-2 text-xs font-mono text-neutral-400">
              <li>
                <a href="#drops" className="hover:text-white transition-colors">
                  ▶ DROP 01 APPARATUS
                </a>
              </li>
              <li>
                <a href="#lookbook" className="hover:text-white transition-colors">
                  ▶ LOOKBOOK MATRIX
                </a>
              </li>
              <li>
                <a href="#manifesto" className="hover:text-white transition-colors">
                  ▶ MANIFESTO CODEX
                </a>
              </li>
              <li>
                <span className="text-neutral-600">▶ AUTHENTICITY REGISTRY (SOON)</span>
              </li>
            </ul>

            <div className="pt-4">
              <button
                onClick={scrollToTop}
                className="flex items-center gap-2 px-3 py-2 bg-neutral-900 border border-neutral-700 hover:border-[#B4E33D] text-xs font-mono text-neutral-300 hover:text-white transition-colors cursor-pointer"
              >
                <span>BACK TO SUMMIT</span>
                <ArrowUp className="w-3.5 h-3.5 text-[#B4E33D]" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-neutral-500 gap-4">
          <div>
            © {new Date().getFullYear()} ACID CLUB®. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6">
            <span>CURRENCY: INR (₹)</span>
            <span>ENCRYPTED PROTOCOL</span>
            <span>TERMS & PRIVACY</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
