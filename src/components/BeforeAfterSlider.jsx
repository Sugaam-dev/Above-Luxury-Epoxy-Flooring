import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

export default function BeforeAfterSlider({
  beforeBg, afterBg,
  beforeLabel = 'Before',
  afterLabel  = 'After ABOVE°',
  height      = '400px',
  className   = '',
}) {
  const [pos, setPos]         = useState(50);
  const isDragging            = useRef(false);
  const containerRef          = useRef(null);

  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

  const updatePos = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPos(clamp(((clientX - rect.left) / rect.width) * 100, 2, 98));
  }, []);

  // Mouse
  const onMouseDown = (e) => { isDragging.current = true; updatePos(e.clientX); };
  const onMouseMove = (e) => { if (isDragging.current) updatePos(e.clientX); };
  const onMouseUp   = ()  => { isDragging.current = false; };

  // Touch
  const onTouchStart = (e) => { isDragging.current = true; updatePos(e.touches[0].clientX); };
  const onTouchMove  = (e) => { if (isDragging.current) updatePos(e.touches[0].clientX); };
  const onTouchEnd   = ()  => { isDragging.current = false; };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-2xl select-none touch-none ${className}`}
      style={{ height, cursor: 'ew-resize' }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Before (full width background) */}
      <div className="absolute inset-0" style={{ background: beforeBg }} />

      {/* After (clipped to left of handle) */}
      <div
        className="absolute inset-0 transition-none"
        style={{
          background: afterBg,
          clipPath: `polygon(0 0, ${pos}% 0, ${pos}% 100%, 0 100%)`,
        }}
      />

      {/* Labels */}
      <div className="absolute bottom-4 left-4 z-10">
        <span className="font-ui text-[10px] tracking-[0.25em] uppercase px-2.5 py-1 rounded-full"
          style={{ background: 'rgba(46,125,50,0.85)', color: 'white', backdropFilter: 'blur(6px)' }}>
          {afterLabel}
        </span>
      </div>
      <div className="absolute bottom-4 right-4 z-10">
        <span className="font-ui text-[10px] tracking-[0.25em] uppercase px-2.5 py-1 rounded-full"
          style={{ background: 'rgba(0,0,0,0.55)', color: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(6px)' }}>
          {beforeLabel}
        </span>
      </div>

      {/* Handle line */}
      <div className="ba-handle" style={{ left: `${pos}%` }}>
        <div className="ba-circle">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path d="M7 4L3 10l4 6" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13 4l4 6-4 6" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Drag hint (fades after first interaction) */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: pos === 50 ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-x-0 bottom-14 flex justify-center pointer-events-none z-10"
      >
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full"
          style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}>
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
            <path d="M7 10H3M3 10l3-3M3 10l3 3M13 10h4M17 10l-3-3M17 10l-3 3" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span className="font-ui text-[9px] tracking-widest uppercase text-white/80">Drag to Compare</span>
        </div>
      </motion.div>
    </div>
  );
}
