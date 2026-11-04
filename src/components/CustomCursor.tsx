import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);

  useEffect(() => {
    // Only enable custom cursor on fine pointer devices (desktop mouse)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsFinePointer(mediaQuery.matches);

    const checkPointer = (e: MediaQueryListEvent) => {
      setIsFinePointer(e.matches);
    };
    mediaQuery.addEventListener('change', checkPointer);

    return () => mediaQuery.removeEventListener('change', checkPointer);
  }, []);

  useEffect(() => {
    if (!isFinePointer) return;

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setPosition({ x: targetX, y: targetY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = target.closest('button, a, input, select, textarea, [role="button"], .interactive-hover');
        setIsHovering(!!isClickable);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const loop = () => {
      // Lerp trailing ring
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      setTrail({ x: currentX, y: currentY });
      animId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, [isFinePointer, isVisible]);

  if (!isFinePointer || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Center dot */}
      <div
        className={`fixed -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-75 ${
          isHovering ? 'h-3 w-3 bg-[#B4E33D]' : 'h-2 w-2 bg-black'
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
      {/* Trailing ring */}
      <div
        className={`fixed -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-150 ease-out ${
          isHovering
            ? 'h-12 w-12 border-[#B4E33D] bg-[#B4E33D]/10 scale-125'
            : 'h-8 w-8 border-black/40 scale-100'
        }`}
        style={{
          left: `${trail.x}px`,
          top: `${trail.y}px`,
        }}
      />
    </div>
  );
};
