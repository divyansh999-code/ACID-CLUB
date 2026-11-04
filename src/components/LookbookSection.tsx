import React, { useState } from 'react';
import { ArrowUpRight, Layers, Eye, Shield } from 'lucide-react';

interface Look {
  id: string;
  name: string;
  sub: string;
  pieces: string[];
  gradient: string;
  ambient: string;
  notes: string;
  specs: string;
}

const LOOKS: Look[] = [
  {
    id: 'look-01',
    name: 'FULL VOLTAGE PILOT',
    sub: 'SIGNATURE DROP 01 TRIAD',
    pieces: ['Voltage Puffer Vest (L)', 'Static Turtleneck (M)', 'Sticker Beanie (OS)'],
    gradient: 'from-[#0A0A0A] via-[#1F2C0B] to-[#B4E33D]',
    ambient: '#B4E33D',
    notes: 'The archetypal Acid Club silhouette. High-visibility lime outerwear balanced by deep pitch-black structural layers and double-patch knit headwear.',
    specs: 'THERMAL GRADE: -5°C TO 15°C // HIGH REFLECTIVITY'
  },
  {
    id: 'look-02',
    name: 'STEALTH INTERCEPT',
    sub: 'LOW-LUMINANCE TACTICAL',
    pieces: ['Static Turtleneck (L)', 'Graphite Tactical Slacks', 'Clear Frame Optics'],
    gradient: 'from-[#050505] via-[#141414] to-[#262626]',
    ambient: '#FFFFFF',
    notes: 'Zero reflection profile. Seamless tubular cotton blend sits close to chest with extended thumb loop cuffs for tactical mobility.',
    specs: 'BREATHABILITY: 850 G/M² // ERGONOMIC SEAMS'
  },
  {
    id: 'look-03',
    name: 'STREET MATRIX',
    sub: 'URBAN DAY-CYCLE RUN',
    pieces: ['Sticker Beanie (OS)', 'Technical Modular Sling', 'Acid Club Band'],
    gradient: 'from-[#172007] via-[#485C13] to-[#B4E33D]',
    ambient: '#B4E33D',
    notes: 'Focus on cranial accentuation. Vibrant 7-gauge lime ribbing cuts through concrete cityscapes with embroidered star & smiley icons.',
    specs: 'UV STABILITY: CLASS 5 // HYPOALLERGENIC'
  }
];

export const LookbookSection: React.FC = () => {
  const [activeLookIndex, setActiveLookIndex] = useState(0);
  const activeLook = LOOKS[activeLookIndex];

  return (
    <section id="lookbook" className="w-full py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-black/15">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-black/10 gap-4">
        <div>
          <div className="text-xs font-mono font-bold tracking-widest uppercase text-black/50 mb-2">
            EDITORIAL // CAPSULE 01
          </div>
          <h2 className="font-display font-black text-5xl sm:text-6xl md:text-7xl uppercase tracking-tighter text-black leading-none">
            LOOKBOOK
          </h2>
        </div>
        <p className="text-xs font-mono uppercase text-black/60 max-w-xs md:text-right">
          STYLING MATRIX & FIELD COORDINATES FOR HIGH-FREQUENCY CONDITIONS.
        </p>
      </div>

      {/* Lookbook Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left: Interactive Look Selector list */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            {LOOKS.map((look, index) => {
              const isSelected = index === activeLookIndex;
              return (
                <button
                  key={look.id}
                  onClick={() => setActiveLookIndex(index)}
                  className={`w-full text-left p-5 border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-black text-white border-black shadow-md'
                      : 'bg-white text-black border-black/15 hover:border-black'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono font-bold uppercase mb-1">
                    <span className={isSelected ? 'text-[#B4E33D]' : 'text-black/50'}>
                      LOOK 0{index + 1}
                    </span>
                    <span className="text-[10px] tracking-widest opacity-60">
                      {isSelected ? 'ACTIVE VIEW' : 'SELECT'}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-2xl uppercase tracking-tight">
                    {look.name}
                  </h3>
                  <div className="text-xs font-mono opacity-80 mt-1">
                    {look.sub}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Look Details Box */}
          <div className="bg-[#EBEBE8] p-6 border border-black/15">
            <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-black/60 mb-2 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5" />
              <span>COORDINATE BREAKDOWN</span>
            </div>
            <ul className="space-y-1.5 text-xs font-mono font-semibold text-black mb-4">
              {activeLook.pieces.map((p, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="text-[#658514]">━</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <div className="text-xs font-sans-clean text-black/70 leading-relaxed border-t border-black/10 pt-3">
              {activeLook.notes}
            </div>
          </div>
        </div>

        {/* Right: Dramatic CSS Graphic Frame */}
        <div className="lg:col-span-8 flex flex-col">
          <div
            className={`w-full h-full min-h-[460px] lg:min-h-[580px] bg-gradient-to-br ${activeLook.gradient} p-8 sm:p-12 flex flex-col justify-between border border-black relative overflow-hidden select-none transition-all duration-700`}
          >
            {/* Top row */}
            <div className="flex items-center justify-between z-10">
              <div className="bg-black/70 px-3 py-1 text-xs font-mono font-bold text-[#B4E33D] tracking-widest uppercase">
                LOOK 0{activeLookIndex + 1} // FIELD TESTED
              </div>
              <div className="text-white/60 font-mono text-xs uppercase tracking-wider">
                {activeLook.specs}
              </div>
            </div>

            {/* Giant Center Typography */}
            <div className="my-auto z-10 py-8">
              <div className="text-xs font-mono tracking-widest text-white/60 uppercase mb-2">
                SYSTEM IDENTIFIER:
              </div>
              <h4 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl text-white uppercase tracking-tighter leading-[0.85]">
                {activeLook.name}
              </h4>
              <div className="mt-4 flex flex-wrap gap-2">
                {activeLook.pieces.map((piece, i) => (
                  <span
                    key={i}
                    className="bg-black/50 text-white/90 text-xs font-mono px-2.5 py-1 backdrop-blur-sm border border-white/10"
                  >
                    {piece}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom row */}
            <div className="flex items-end justify-between z-10 border-t border-white/10 pt-4 text-white/80 font-mono text-xs">
              <div>ACID CLUB LABS // NEW DELHI</div>
              <div className="text-right text-[#B4E33D] font-bold">
                HIGH VOLTAGE APPAREL
              </div>
            </div>

            {/* Geometric watermark grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-10 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};
