import React from 'react';

export const Marquee: React.FC = () => {
  const phrase = "ACID CLUB — WEAR THE VOLTAGE — NEW DROP LIVE — ";
  // Duplicate for seamless infinite loop
  const content = Array(8).fill(phrase).join('');

  return (
    <div className="w-full bg-black py-3 sm:py-3.5 overflow-hidden border-y border-black select-none z-30">
      <div className="animate-marquee whitespace-nowrap flex items-center">
        <span className="font-display font-black text-xl sm:text-2xl md:text-3xl tracking-wider text-[#B4E33D] uppercase">
          {content}
        </span>
        <span className="font-display font-black text-xl sm:text-2xl md:text-3xl tracking-wider text-[#B4E33D] uppercase">
          {content}
        </span>
      </div>
    </div>
  );
};
