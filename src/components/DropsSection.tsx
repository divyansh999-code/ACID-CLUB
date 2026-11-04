import React, { useState } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { Check, ShieldAlert, Sparkles, ChevronRight, Info } from 'lucide-react';

interface DropsSectionProps {
  onAddToCart: (product: Product, size: string) => void;
}

export const DropsSection: React.FC<DropsSectionProps> = ({ onAddToCart }) => {
  // Selected size state for each product
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({
    'voltage-puffer-vest': 'L',
    'static-turtleneck': 'M',
    'sticker-beanie': 'ONE SIZE',
  });

  // Track button "ADDED" state per product
  const [addedState, setAddedState] = useState<Record<string, boolean>>({});
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);

  const handleSizeSelect = (productId: string, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const handleAdd = (product: Product) => {
    const size = selectedSizes[product.id] || product.sizes[0];
    onAddToCart(product, size);

    setAddedState((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedState((prev) => ({ ...prev, [product.id]: false }));
    }, 1400);
  };

  return (
    <section id="drops" className="w-full py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-black/15 gap-4">
        <div>
          <div className="text-xs font-mono font-bold tracking-widest uppercase text-black/50 mb-2">
            CATALOGUE // DROP 01
          </div>
          <h2 className="font-display font-black text-5xl sm:text-6xl md:text-7xl uppercase tracking-tighter text-black leading-none">
            LATEST DROPS
          </h2>
        </div>
        <div className="text-right flex flex-col items-start md:items-end">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-black/60">
            LIMITED QUANTITY RELEASE
          </span>
          <span className="text-xs font-mono text-[#4d660f] font-semibold">
            WORLDWIDE DISPATCH // PRE-AUTHENTICATED
          </span>
        </div>
      </div>

      {/* 3 Drops Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {PRODUCTS.map((product, idx) => {
          const isAdded = !!addedState[product.id];
          const currentSize = selectedSizes[product.id] || product.sizes[0];

          return (
            <div
              key={product.id}
              className="group flex flex-col bg-white border border-black/15 hover:border-black transition-all duration-300 relative"
            >
              {/* Product Visual Container (Pure CSS gradients + Big Typography only) */}
              <div
                className={`relative w-full aspect-[4/5] sm:aspect-square md:aspect-[4/5] bg-gradient-to-br ${product.gradient} p-6 flex flex-col justify-between overflow-hidden cursor-pointer select-none`}
                onClick={() => setActiveModalProduct(product)}
              >
                {/* Visual Top row: Category tag & Badge */}
                <div className="flex items-center justify-between text-xs font-mono font-bold tracking-widest text-white/90 z-10">
                  <span className="bg-black/60 backdrop-blur-sm px-2 py-1 text-[11px] text-[#B4E33D]">
                    {product.category}
                  </span>
                  {product.badge && (
                    <span className="bg-black/40 backdrop-blur-sm px-2 py-0.5 text-[10px] text-white/70">
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Big Typography Graphic Centerpiece */}
                <div className="relative z-10 my-auto py-4">
                  <div className="font-display font-black text-6xl sm:text-7xl lg:text-8xl tracking-tighter uppercase leading-[0.82] text-white/90 group-hover:scale-105 transition-transform duration-500">
                    {idx === 0 && (
                      <>
                        VOLT<br />
                        <span className="text-[#B4E33D]">700</span>
                      </>
                    )}
                    {idx === 1 && (
                      <>
                        STAT<br />
                        <span className="text-neutral-400">IC</span>
                      </>
                    )}
                    {idx === 2 && (
                      <>
                        BEA<br />
                        <span className="text-[#B4E33D]">NIE</span>
                      </>
                    )}
                  </div>
                  <div className="mt-4 text-xs font-mono text-white/80 font-bold uppercase tracking-wider">
                    {product.tagline}
                  </div>
                </div>

                {/* Visual Bottom row: Quick specs button */}
                <div className="relative z-10 flex items-center justify-between text-white/80 text-[11px] font-mono">
                  <span>INSPECT APPARATUS</span>
                  <div className="flex items-center gap-1 group-hover:translate-x-1 transition-transform text-[#B4E33D]">
                    <span>SPECS</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Subtle tech background graphic mesh overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />
              </div>

              {/* Card Meta & Controls */}
              <div className="p-6 flex flex-col flex-grow justify-between bg-white">
                <div>
                  {/* Name and Price */}
                  <div className="flex items-baseline justify-between gap-2 mb-2">
                    <h3 className="font-display font-bold text-2xl uppercase tracking-tight text-black">
                      {product.name}
                    </h3>
                    <span className="font-mono font-bold text-lg text-black tabular-nums shrink-0">
                      {product.formattedPrice}
                    </span>
                  </div>

                  <p className="text-xs text-black/60 leading-relaxed line-clamp-2 mb-4 font-sans-clean">
                    {product.description}
                  </p>

                  {/* Size Selector */}
                  <div className="mb-6">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-black/50 mb-2 flex justify-between">
                      <span>SELECT SIZE:</span>
                      <span className="font-bold text-black">{currentSize}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((sz) => (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => handleSizeSelect(product.id, sz)}
                          className={`px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-wider transition-colors border cursor-pointer ${
                            currentSize === sz
                              ? 'bg-black text-[#B4E33D] border-black'
                              : 'bg-white text-black/70 border-black/20 hover:border-black'
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Add to Bag Action Button */}
                <button
                  type="button"
                  onClick={() => handleAdd(product)}
                  className={`w-full py-3.5 px-4 font-mono font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-98 ${
                    isAdded
                      ? 'bg-[#B4E33D] text-black shadow-inner'
                      : 'bg-black text-white hover:bg-neutral-800'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>ADDED TO BAG</span>
                    </>
                  ) : (
                    <span>ADD TO BAG — {product.formattedPrice}</span>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Technical Specifications Quick Modal */}
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#F4F4F2] max-w-lg w-full border-2 border-black p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setActiveModalProduct(null)}
              className="absolute top-4 right-4 text-xs font-mono font-bold uppercase tracking-wider bg-black text-white px-2.5 py-1 hover:bg-[#B4E33D] hover:text-black transition-colors"
            >
              CLOSE [ESC]
            </button>

            <div className="text-xs font-mono font-bold tracking-widest uppercase text-black/50 mb-1">
              SPEC SHEET // {activeModalProduct.category}
            </div>
            <h3 className="font-display font-black text-3xl uppercase tracking-tight text-black mb-1">
              {activeModalProduct.name}
            </h3>
            <div className="font-mono text-xl font-bold text-black mb-6">
              {activeModalProduct.formattedPrice}
            </div>

            <div className="mb-6">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-black/70 mb-3 border-b border-black/10 pb-1">
                ENGINEERING SPECIFICATIONS
              </h4>
              <ul className="space-y-2 text-xs font-mono text-black/80">
                {activeModalProduct.specs.map((spec, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#6c8e14] font-bold">▶</span>
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-xs text-black/70 leading-relaxed mb-6 font-sans-clean">
              {activeModalProduct.description}
            </p>

            <button
              onClick={() => {
                handleAdd(activeModalProduct);
                setActiveModalProduct(null);
              }}
              className="w-full py-3 bg-black text-[#B4E33D] font-mono font-bold text-xs uppercase tracking-wider hover:bg-neutral-800 transition-colors"
            >
              ADD TO BAG NOW
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
