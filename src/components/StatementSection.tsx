import React, { useEffect, useRef, useState } from 'react';

export const StatementSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress as section passes through viewport
      // Starts when section top enters bottom of viewport (rect.top <= windowHeight)
      // Completes when section is centered or near top
      const totalDistance = windowHeight + rect.height;
      const currentPos = windowHeight - rect.top;
      const progress = Math.min(Math.max(currentPos / (totalDistance * 0.75), 0), 1);

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Words array for the statement
  // We emphasize the primary requirement: "DON'T BLEND IN."
  const introWords = ["IN", "A", "WORLD", "OF", "GREY", "SUBMISSION,"];
  const coreStatement = ["DON'T", "BLEND", "IN."];
  const outroWords = [
    "WEAR", "THE", "VOLTAGE.",
    "BORN", "FOR", "HIGH", "FREQUENCY.",
    "DESIGNED", "TO", "BE", "STARED", "AT."
  ];

  // Total words count to calculate progressive revelation
  const allWords = [...introWords, ...coreStatement, ...outroWords];

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black text-white py-32 sm:py-40 px-4 sm:px-6 lg:px-8 overflow-hidden select-none"
    >
      {/* Subtle background tech markers */}
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-neutral-500 mb-12 border-b border-neutral-800 pb-4">
          <span>PHILOSOPHY // 00</span>
          <span>HIGH-VISIBILITY MANIFEST</span>
          <span className="text-[#B4E33D]">VOLT: ACTIVE</span>
        </div>

        {/* Lead-in phrase */}
        <div className="flex flex-wrap gap-x-3 gap-y-1 mb-8 text-sm sm:text-base md:text-xl font-mono uppercase tracking-widest text-neutral-500">
          {introWords.map((word, i) => {
            const threshold = (i + 1) / (allWords.length + 2);
            const isLit = scrollProgress >= threshold;
            return (
              <span
                key={i}
                className={`transition-colors duration-300 ${
                  isLit ? 'text-white font-bold' : 'text-neutral-700'
                }`}
              >
                {word}
              </span>
            );
          })}
        </div>

        {/* PRIMARY CORE STATEMENT: "DON'T BLEND IN." */}
        <div className="my-10">
          <h2 className="font-display font-black text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[11.5rem] tracking-tighter uppercase leading-[0.85] flex flex-wrap gap-x-6 sm:gap-x-10 gap-y-2">
            {coreStatement.map((word, i) => {
              // Core statement words illuminate decisively as user approaches center
              const wordGlobalIndex = introWords.length + i;
              const threshold = wordGlobalIndex / (allWords.length + 1);
              const isLit = scrollProgress >= threshold;

              return (
                <span
                  key={i}
                  className={`transition-all duration-500 transform inline-block cursor-default ${
                    isLit
                      ? 'text-[#B4E33D] drop-shadow-[0_0_35px_rgba(180,227,61,0.45)] scale-100'
                      : 'text-neutral-800 scale-98'
                  }`}
                >
                  {word}
                </span>
              );
            })}
          </h2>
        </div>

        {/* Outro statement words */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-lg sm:text-2xl md:text-3xl font-display font-bold uppercase tracking-tight max-w-4xl mt-12 text-neutral-500">
          {outroWords.map((word, i) => {
            const wordGlobalIndex = introWords.length + coreStatement.length + i;
            const threshold = wordGlobalIndex / (allWords.length + 1);
            const isLit = scrollProgress >= threshold;

            return (
              <span
                key={i}
                className={`transition-colors duration-300 ${
                  isLit ? 'text-white' : 'text-neutral-800'
                }`}
              >
                {word}
              </span>
            );
          })}
        </div>

        {/* Scroll Progress Bar indicator */}
        <div className="mt-20 pt-8 border-t border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-500">
          <div className="flex items-center gap-3">
            <span>SCROLL REVEAL INDEX:</span>
            <div className="w-32 sm:w-48 h-1 bg-neutral-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#B4E33D] transition-all duration-150"
                style={{ width: `${Math.round(scrollProgress * 100)}%` }}
              />
            </div>
            <span className="font-mono text-[#B4E33D] tabular-nums">
              {Math.round(scrollProgress * 100)}%
            </span>
          </div>
          <span className="hidden sm:inline-block text-[11px] uppercase tracking-wider text-neutral-600">
            [TRANSMISSION 01-VOLT]
          </span>
        </div>
      </div>
    </section>
  );
};
