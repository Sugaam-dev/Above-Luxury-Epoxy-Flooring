import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

// The 5 user-provided luxury balcony transformation photos
const BALCONY_SLIDES = [
  {
    id: 'ocean-lounge',
    title: '3D Sea Shore Epoxy Balcony & Smart Night Lighting',
    image: '/images/hero_balcony_ocean_lounge.jpg',
    tag: '3D SHORELINE & BIOPHILIC LOUNGE',
    highlights: [
      '3D Sea Shore Epoxy Flooring',
      'Automated Hypercare & Soil Sensors',
      'Smart Night-Time Ambient Lighting',
      'Custom Seating & Hidden Storage'
    ]
  },
  {
    id: 'emerald-biophilic',
    title: 'Bespoke Vertical Garden & Emerald Agate Floor',
    image: '/images/hero_balcony_emerald_biophilic.jpg',
    tag: 'TROPICAL SANCTUARY & METALLIC MARBLE',
    highlights: [
      'Bespoke Balcony Garden Design',
      'Automated Plant Monitoring & Hypercare',
      'Marble-Textured Feature Wall',
      'Metallic & 3D Epoxy Flooring'
    ]
  },
  {
    id: 'bonsai-metallic',
    title: 'Zen Bonsai Feature, Fluted Wood & Fluid Metallic Floor',
    image: '/images/hero_balcony_bonsai_metallic.jpg',
    tag: 'MINIMAL LUXURY & ARCHITECTURAL WOOD',
    highlights: [
      'Compact Balcony Design & Beautification',
      'Marble Texture Wall Services',
      'Seamless Metallic Liquid Floor',
      '3D Walls & Custom Linear Illumination'
    ]
  },
  {
    id: 'sunset-warm',
    title: 'Warm Twilight Balcony Lounge with Amber Vein Epoxy',
    image: '/images/hero_balcony_sunset_warm.jpg',
    tag: 'WARM WOOD & TWILIGHT RETREAT',
    highlights: [
      'Warm Timber Lounger & Hidden Storage',
      'Suspended Biophilic Planters',
      'Metallic Amber Swirl Flooring',
      'Smart Accent Strip Lighting'
    ]
  },
  {
    id: 'ocean-pergola',
    title: 'Modern Terrace Pergola with Ocean Wave Reflection',
    image: '/images/hero_balcony_pure_clean.jpg',
    tag: 'CONTEMPORARY SKYLINE BALCONY',
    highlights: [
      'Ocean Wave High-Gloss Epoxy',
      'Vertical Fern & Plant Wall',
      'Built-in Modular Bench Seating',
      'Glass Balustrade View Framing'
    ]
  }
];

const STAT_ITEMS = [
  { value: '200+', label: 'Projects Completed' },
  { value: '3',    label: 'Core Services' },
  { value: '100%', label: 'Satisfaction Rate' },
  { value: '5★',   label: 'Client Rating' },
];

export default function Hero() {
  const ref = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const smoothY = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });
  const contentY = useTransform(smoothY, [0, 1], ['0%', '16%']);
  const contentO = useTransform(smoothY, [0, 0.75], [1, 0]);

  // Auto-advance slides every 6 seconds unless user pauses/hovers
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveSlide(curr => (curr + 1) % BALCONY_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const current = BALCONY_SLIDES[activeSlide];

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#07090C]"
      aria-label="Premium Epoxy Flooring, Garden Landscaping & Smart Plant Care in Pune"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ── Background Slideshow with Real Balcony Photos ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <img
              src={current.image}
              alt={current.title}
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>

        {/* Cinematic Gradient Overlays:
            - Left subtle shadow for clarity
            - Right heavy gradient to give the typography, CTAs, and trust badges crisp readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/90 md:from-black/40 md:via-black/65 md:to-[#07090CEE]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090C] via-transparent to-black/60" />

        {/* Subtle grid pattern for architectural feel */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* ── Floating Interactive Concept Callout (Desktop: top-left, Mobile/Tablet: below eyebrow/headline) ── */}
      <div className="hidden lg:block absolute left-6 xl:left-8 top-28 xl:top-32 z-20 max-w-sm pointer-events-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.6 }}
            className="p-4 rounded-2xl bg-black/70 backdrop-blur-xl border border-white/15 shadow-2xl text-white"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-ui text-[9px] tracking-widest uppercase font-bold text-emerald-300">
                {current.tag}
              </span>
            </div>
            <h3 className="font-heading text-sm font-bold text-white mb-2 leading-snug">
              {current.title}
            </h3>
            <div className="space-y-1 pt-1 border-t border-white/10">
              {current.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2 text-[11px] font-ui text-white/80">
                  <span className="text-emerald-400 text-xs">✦</span>
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Thumbnail Selector Pills */}
        <div className="flex items-center gap-2 mt-4">
          {BALCONY_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setActiveSlide(idx)}
              className={`group relative h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                idx === activeSlide
                  ? 'w-16 border-emerald-400 ring-2 ring-emerald-500/40'
                  : 'w-10 border-white/20 opacity-60 hover:opacity-100 hover:border-white/50'
              }`}
              title={slide.title}
            >
              <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent" />
            </button>
          ))}
          <span className="font-ui text-[10px] text-white/60 ml-1">
            0{activeSlide + 1} / 0{BALCONY_SLIDES.length}
          </span>
        </div>
      </div>

      {/* ── Main Hero Content (Responsive grid layout on tablet & mobile) ── */}
      <motion.div
        style={{ y: contentY, opacity: contentO }}
        className="relative z-10 flex flex-col items-center lg:items-end justify-center px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 pt-24 pb-8 sm:py-20 md:py-28 min-h-[90vh] flex-1"
      >
        <div className="w-full md:max-w-2xl lg:max-w-none lg:w-[50%] xl:w-[46%] text-left">
          
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4"
          >
            <div className="h-px w-8 sm:w-10 bg-emerald-400" />
            <span className="font-ui text-[9px] sm:text-[10px] md:text-xs tracking-[0.3em] uppercase text-emerald-300 font-semibold">
              Concept Living · Pune
            </span>
          </motion.div>

          {/* H1 Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading font-black text-white leading-[1.08] mb-4"
            style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.8rem)' }}
          >
            Let Us Bring{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-green-400">
              Life
            </span>{' '}
            To Your Space.
          </motion.h1>

          {/* Subtitle Copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-body text-white/80 text-sm md:text-base lg:text-lg leading-relaxed mb-3 max-w-lg"
          >
            Premium epoxy flooring, 3D floor designs, bespoke balcony garden landscaping,
            and intelligent automated plant care — all under one visionary studio.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="font-display italic text-emerald-300/90 text-sm md:text-base mb-8"
          >
            "We don't settle for boring spaces."
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.7 }}
            className="flex flex-col sm:flex-row gap-3 mb-8"
          >
            <a href="#landscapes" className="btn-green w-full sm:w-auto shadow-lg shadow-emerald-900/40">
              Explore Services →
            </a>
            <a href="#contact" className="btn-outline-white w-full sm:w-auto">
              Book Free Consultation
            </a>
          </motion.div>

          {/* WhatsApp Direct Action Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <a
              href="https://wa.me/918888159579?text=Hi%20ABOVE%C2%B0!%20I'm%20interested%20in%20elevating%20my%20balcony%20space."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-2.5 pr-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-lg text-emerald-300 group-hover:scale-105 transition-transform">
                💬
              </div>
              <div>
                <div className="font-ui text-[9px] tracking-widest uppercase text-white/50 leading-none mb-0.5">
                  WhatsApp / Call Direct
                </div>
                <div className="font-ui font-bold text-emerald-400 text-sm tracking-wider">
                  +91 88881 59579
                </div>
              </div>
            </a>
          </motion.div>

          {/* Trust Service Pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.15, duration: 0.7 }}
            className="flex flex-wrap gap-2 mt-8"
          >
            {['Epoxy Floors', '3D Floors', 'Garden Design', 'Smart Plant Care', 'Interior Design'].map(t => (
              <span
                key={t}
                className="font-ui text-[9px] tracking-widest uppercase px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 hover:border-emerald-400/50 hover:text-white transition-colors"
              >
                {t}
              </span>
            ))}
          </motion.div>

          {/* Mobile & Tablet Slide Selector Bar */}
          <div className="lg:hidden mt-8 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between mb-2 text-[10px] font-ui">
              <span className="text-white/60">Featured Balcony Style:</span>
              <span className="text-emerald-400 font-bold">{current.tag}</span>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {BALCONY_SLIDES.map((slide, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`flex-shrink-0 h-11 rounded-lg overflow-hidden border-2 transition-all duration-300 relative ${
                    idx === activeSlide
                      ? 'w-16 border-emerald-400 ring-2 ring-emerald-500/40'
                      : 'w-11 border-white/20 opacity-60'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                  <span className="absolute bottom-0 right-0 bg-black/70 text-[8px] font-ui px-1 text-white">
                    0{idx + 1}
                  </span>
                </button>
              ))}
            </div>
          </div>

        </div>
      </motion.div>

      {/* ── Stats Stripe Bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full stripe-accent shadow-2xl"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 md:py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 divide-y-0 md:divide-x md:divide-white/20">
            {STAT_ITEMS.map((s, i) => (
              <div key={i} className="flex items-center gap-3 md:justify-center md:px-6">
                <div>
                  <div className="font-heading font-black text-white text-xl md:text-2xl">{s.value}</div>
                  <div className="font-ui text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-white/80">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
