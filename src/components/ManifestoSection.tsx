import React from 'react';
import { Zap, ShieldCheck, Eye } from 'lucide-react';

export const ManifestoSection: React.FC = () => {
  const principles = [
    {
      num: '01',
      title: 'WEAR THE VOLTAGE',
      icon: Zap,
      desc: 'The modern city wants you in muted greys, beige, and passive camouflage. We inject high-voltage acid lime into the urban stream. Visibility is autonomy.'
    },
    {
      num: '02',
      title: 'TACTICAL RIGOR',
      icon: ShieldCheck,
      desc: 'Streetwear without engineering is costume. Every baffle, rib knit, and AquaGuard seam is stress-tested for sub-zero weather, rain, and nocturnal exploration.'
    },
    {
      num: '03',
      title: 'DESIGNED TO BE STARED AT',
      icon: Eye,
      desc: 'We build for heads that turn. Bold condensed typography, twin smiley patches, and sharp architectural silhouettes that command presence in every room.'
    }
  ];

  return (
    <section id="manifesto" className="w-full py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-black/15">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-black/10 gap-4">
        <div>
          <div className="text-xs font-mono font-bold tracking-widest uppercase text-black/50 mb-2">
            CODEX // PRINCIPLES
          </div>
          <h2 className="font-display font-black text-5xl sm:text-6xl md:text-7xl uppercase tracking-tighter text-black leading-none">
            THE MANIFESTO
          </h2>
        </div>
        <div className="text-xs font-mono font-bold uppercase tracking-wider text-black/70">
          WE BUILD HYPER-VISIBLE UNIFORMS FOR THE NEW REBELLION.
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {principles.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.num}
              className="p-8 bg-[#EBEBE8] border border-black/15 flex flex-col justify-between hover:border-black transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="font-display font-black text-4xl text-black">
                    {item.num}
                  </span>
                  <div className="p-2 bg-black text-[#B4E33D]">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="font-display font-bold text-2xl uppercase tracking-tight text-black mb-3">
                  {item.title}
                </h3>

                <p className="font-sans-clean text-xs text-black/70 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-black/10 text-[10px] font-mono text-black/40 uppercase tracking-widest">
                ACID CLUB CLAUSE // {item.num}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
