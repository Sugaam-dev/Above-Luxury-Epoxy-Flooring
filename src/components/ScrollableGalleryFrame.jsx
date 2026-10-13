import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScrollableGalleryFrame({
  items = [],
  title = "Project Visualiser",
  subtitle = "Swipe or click to view completed architectural installations",
  aspectRatio = "aspect-[16/10]",
  badge = "PORTFOLIO ARCHIVE",
  accentColor = "#2E7D32"
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  const prev = () => setCurrentIndex(i => (i === 0 ? items.length - 1 : i - 1));
  const next = () => setCurrentIndex(i => (i === items.length - 1 ? 0 : i + 1));

  if (!items.length) return null;
  const current = items[currentIndex];

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-black/10 bg-white/60 shadow-xl backdrop-blur-md">
      {/* Top frame navigation bar */}
      <div className="px-4 py-3 border-b border-black/5 bg-black/[0.02] flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accentColor }} />
          <span className="font-ui text-[10px] tracking-widest uppercase font-bold text-ink/80">{badge}</span>
          <span className="text-xs text-ash/40">|</span>
          <span className="font-heading font-semibold text-xs text-ink/90">{title}</span>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <span className="font-ui text-[11px] text-ash/80 mr-1">
            <span className="font-bold text-ink">{currentIndex + 1}</span> / {items.length}
          </span>
          <button
            onClick={prev}
            className="w-7 h-7 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-xs transition-colors"
            aria-label="Previous image"
          >
            ←
          </button>
          <button
            onClick={next}
            className="w-7 h-7 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-xs transition-colors"
            aria-label="Next image"
          >
            →
          </button>
        </div>
      </div>

      {/* Main active viewer viewport (scrollable & responsive iframe container) */}
      <div className={`relative w-full ${aspectRatio} overflow-hidden bg-black/90 group select-none`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.01 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <img
              src={current.src}
              alt={current.title || title}
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
            {/* Subtle gloss overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent pointer-events-none" />

            {/* In-viewport caption */}
            <div className="absolute bottom-3 left-4 right-4 z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-1 text-white pointer-events-none">
              <div>
                <span className="font-ui text-[9px] tracking-widest uppercase text-white/60 bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-sm">
                  {current.tag || "REAL TRANSFORMATION"}
                </span>
                <h4 className="font-heading text-base md:text-lg font-bold text-white mt-1 drop-shadow-md">
                  {current.title}
                </h4>
                {current.desc && (
                  <p className="font-body text-xs text-white/80 max-w-md hidden sm:block">
                    {current.desc}
                  </p>
                )}
              </div>
              {current.location && (
                <span className="font-ui text-[10px] text-white/70 italic shrink-0">
                  📍 {current.location}
                </span>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Floating Quick Navigation arrows inside viewport */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity z-20"
        >
          ‹
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity z-20"
        >
          ›
        </button>
      </div>

      {/* Horizontal Scrollable Thumbnail Strip (future-proof to accommodate dozens of images) */}
      <div className="p-3 bg-white/80 border-t border-black/5">
        <div className="flex items-center justify-between mb-2">
          <span className="font-ui text-[9px] uppercase tracking-wider text-ash/80">
            Scrollable Gallery Filmstrip (Drag or Swipe)
          </span>
          <span className="text-[10px] text-forest font-ui font-medium">
            {items.length} Photographs Available
          </span>
        </div>
        
        <div
          ref={containerRef}
          className="flex gap-2.5 overflow-x-auto pb-1 pt-0.5 scrollbar-thin scrollbar-thumb-forest/30 scroll-smooth snap-x"
          style={{ scrollbarWidth: 'thin' }}
        >
          {items.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative flex-shrink-0 w-24 h-16 md:w-28 md:h-18 rounded-lg overflow-hidden border-2 transition-all duration-300 snap-start group/thumb ${
                idx === currentIndex
                  ? 'border-forest ring-2 ring-forest/30 scale-102 shadow-md'
                  : 'border-transparent opacity-70 hover:opacity-100 hover:border-black/20'
              }`}
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/20 group-hover/thumb:bg-transparent" />
              <span className="absolute bottom-1 right-1 bg-black/60 text-white text-[8px] font-ui px-1 rounded">
                0{idx + 1}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
