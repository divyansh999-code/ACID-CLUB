import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown } from 'lucide-react';

interface HeroProps {
  onExploreDrops: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreDrops }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Coordinated tracking states for Parallax + 3D Face Tracking
  const [offsets, setOffsets] = useState({
    // Parallax
    backX: 0,
    backY: 0,
    videoX: 0,
    videoY: 0,
    frontX: 0,
    frontY: 0,
    // 3D Face Tracking Tilt
    rotateY: 0,
    rotateX: 0,
    tiltX: 0,
    tiltY: 0,
  });

  // Seamless BOOMERANG loop playback controller
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let animId: number;
    let isReversing = false;
    let lastTime = performance.now();

    video.muted = true;
    video.playsInline = true;

    const boomerangStep = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      if (video.duration && !isNaN(video.duration) && video.duration > 0) {
        if (!isReversing) {
          // Playing forward
          if (video.currentTime >= video.duration - 0.08 || video.ended) {
            isReversing = true;
            video.pause();
          }
        } else {
          // Reversing backward smoothly via requestAnimationFrame scrubbing
          const nextTime = video.currentTime - delta * 1.0;
          if (nextTime <= 0.06) {
            video.currentTime = 0;
            isReversing = false;
            video.play().catch(() => {});
          } else {
            video.currentTime = nextTime;
          }
        }
      }

      animId = requestAnimationFrame(boomerangStep);
    };

    const startPlayback = () => {
      video.currentTime = 0;
      video.play().catch(() => {});
      lastTime = performance.now();
      animId = requestAnimationFrame(boomerangStep);
    };

    if (video.readyState >= 1) {
      startPlayback();
    } else {
      video.addEventListener('loadedmetadata', startPlayback);
    }

    const handleEnded = () => {
      isReversing = true;
      video.pause();
    };
    video.addEventListener('ended', handleEnded);

    return () => {
      cancelAnimationFrame(animId);
      video.removeEventListener('loadedmetadata', startPlayback);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  // Unified Mouse Tracking Loop for 3D Face Tracking and Depth Parallax
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animId: number;
    let targetX = 0; // Normalized -1 to 1
    let targetY = 0; // Normalized -1 to 1
    let currentX = 0;
    let currentY = 0;
    let isMouseOverHero = false;
    let isTouchMode = false;

    // Detect touch-only devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      isTouchMode = true;
    }

    const handleMouseMove = (e: MouseEvent) => {
      isTouchMode = false;
      const rect = container.getBoundingClientRect();
      
      // Check if cursor is within hero bounds
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        isMouseOverHero = true;
        // Compute cursor position relative to hero centre, normalised -1 to 1 on both axes
        const relX = e.clientX - (rect.left + rect.width / 2);
        const relY = e.clientY - (rect.top + rect.height / 2);
        targetX = Math.max(-1, Math.min(1, relX / (rect.width / 2)));
        targetY = Math.max(-1, Math.min(1, relY / (rect.height / 2)));
      } else {
        // Outside hero
        if (isMouseOverHero) {
          isMouseOverHero = false;
          targetX = 0;
          targetY = 0;
        }
      }
    };

    const handleMouseLeave = () => {
      isMouseOverHero = false;
      targetX = 0;
      targetY = 0;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave);

    const trackingLoop = (time: number) => {
      if (isTouchMode || (!isMouseOverHero && targetX === 0 && targetY === 0 && Math.abs(currentX) < 0.005 && Math.abs(currentY) < 0.005)) {
        if (isTouchMode) {
          // Slow automatic sway on touch devices in the same rotation ranges
          targetX = Math.sin(time * 0.001) * 0.75;
          targetY = Math.cos(time * 0.0008) * 0.5;
        }
      }

      // Responsive, buttery lerp settling smoothly within half a second (factor: 0.1)
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;

      // Parallax values:
      // - Back headline moves up to ±35px
      // - Video layer moves up to ±15px
      // - Front outlined headline moves up to ±50px
      // Face tracking tilt values:
      // - rotateY: up to ±12deg (cursor left = turns left, cursor right = turns right)
      // - rotateX: up to ∓7deg (cursor up = tips up, cursor down = tips down)
      // - tilt translate: up to ±10px toward cursor
      setOffsets({
        backX: currentX * -35,
        backY: currentY * -20,
        videoX: currentX * 15,
        videoY: currentY * 10,
        frontX: currentX * 50,
        frontY: currentY * 30,
        rotateY: currentX * 12,
        rotateX: -currentY * 7,
        tiltX: currentX * 10,
        tiltY: currentY * 10,
      });

      animId = requestAnimationFrame(trackingLoop);
    };

    animId = requestAnimationFrame(trackingLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen min-h-[640px] max-h-[1050px] bg-[#F5F4F1] flex items-center justify-center overflow-hidden pt-16 select-none"
      style={{ backgroundColor: '#F5F4F1' }}
    >
      {/* Subtle technical corner accents */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-24 left-8 text-[10px] font-mono uppercase tracking-widest text-black/50">
          SYS.01 // TECHWEAR DIVISION
        </div>
        <div className="absolute top-24 right-8 text-[10px] font-mono uppercase tracking-widest text-black/50 text-right">
          LAT: 28.6139° N / HIGH-VOLTAGE
        </div>
      </div>

      {/* Hero Typography & Character Stacking Container */}
      <div className="relative w-full max-w-7xl h-full flex items-center justify-center pointer-events-none">

        {/* ========================================================================= */}
        {/* DEPTH LAYER 1 (BEHIND): Solid Black Headline (moves up to ±35px)         */}
        {/* ========================================================================= */}
        <div
          className="absolute inset-x-0 bottom-[12%] sm:bottom-[10%] md:bottom-[8%] flex items-center justify-center pointer-events-none z-10"
          style={{
            transform: `translate3d(${offsets.backX}px, ${offsets.backY}px, 0)`,
            willChange: 'transform',
          }}
          aria-hidden="true"
        >
          <h1 className="font-display font-black text-black tracking-tighter uppercase text-center leading-[0.8] text-[20vw] sm:text-[18vw] md:text-[17vw] lg:text-[16vw] xl:text-[15.5vw] whitespace-nowrap">
            ACID CLUB
          </h1>
        </div>

        {/* ========================================================================= */}
        {/* DEPTH LAYER 2 (MIDGROUND): 3D Perspective + Face Tracking Tilt Wrapper     */}
        {/* Moves up to ±15px parallax, rotates ±12° Y / ∓7° X, translates ±10px     */}
        {/* ========================================================================= */}
        <div
          className="relative z-20 flex items-center justify-center w-full max-w-[850px] h-[75vh] max-h-[820px] pointer-events-none"
          style={{
            perspective: '1000px',
            perspectiveOrigin: '50% 50%',
          }}
        >
          {/* 3D Tilting video wrapper with bottom 20% fade to transparent */}
          <div
            className="w-full h-full flex items-center justify-center pointer-events-none"
            style={{
              transform: `translate3d(${offsets.videoX + offsets.tiltX}px, ${offsets.videoY + offsets.tiltY}px, 0) rotateX(${offsets.rotateX}deg) rotateY(${offsets.rotateY}deg)`,
              transformStyle: 'preserve-3d',
              willChange: 'transform',
              maskImage: 'linear-gradient(to bottom, black 0%, black 80%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 80%, transparent 100%)',
            }}
          >
            <video
              ref={videoRef}
              src="/assets/aistudio/Make_him_look_left_4a63da90_1080p_fd5a9bb7.mp4"
              className="hero-video-mask w-full h-full object-contain pointer-events-none"
              style={{
                backgroundColor: '#F5F4F1',
                objectFit: 'contain',
              }}
              muted
              playsInline
              preload="auto"
              aria-label="ACID CLUB 3D Character wearing signature lime beanie, clear glasses, turtleneck, and puffer vest"
            >
              <source src="/hero.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* DEPTH LAYER 3 (FRONT): Outlined Copy (moves up to ±50px)                   */}
        {/* Positioned at video's lower edge so character stands INSIDE typography!    */}
        {/* ========================================================================= */}
        <div
          className="absolute inset-x-0 bottom-[12%] sm:bottom-[10%] md:bottom-[8%] flex items-center justify-center pointer-events-none z-30"
          style={{
            transform: `translate3d(${offsets.frontX}px, ${offsets.frontY}px, 0)`,
            willChange: 'transform',
          }}
        >
          <div className="font-display font-black text-outline-black tracking-tighter uppercase text-center leading-[0.8] text-[20vw] sm:text-[18vw] md:text-[17vw] lg:text-[16vw] xl:text-[15.5vw] whitespace-nowrap">
            ACID CLUB
          </div>
        </div>

      </div>

      {/* Floating CTA / Scroll indicator */}
      <div className="absolute bottom-6 inset-x-0 flex flex-col items-center justify-center z-30 pointer-events-auto">
        <button
          onClick={onExploreDrops}
          className="group flex flex-col items-center gap-1.5 text-xs font-mono font-bold tracking-widest uppercase text-black hover:text-[#7ba318] transition-colors cursor-pointer"
        >
          <span className="px-2 py-0.5 bg-black text-[#B4E33D] group-hover:bg-[#B4E33D] group-hover:text-black transition-colors">
            DROP 01 LIVE
          </span>
          <div className="flex items-center gap-1 text-[11px] text-black/60 group-hover:text-black">
            <span>SCROLL TO EXPLORE</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </div>
        </button>
      </div>

    </section>
  );
};
