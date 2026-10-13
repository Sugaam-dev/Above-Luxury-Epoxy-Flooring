import { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import BeforeAfterSlider from './BeforeAfterSlider';
import ScrollableGalleryFrame from './ScrollableGalleryFrame';

const fu = (d = 0) => ({
  initial:     { opacity: 0, y: 44 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, margin: '-60px' },
  transition:  { duration: 0.95, delay: d, ease: [0.16,1,0.3,1] },
});

const TAGS = [
  { id: 'all',            label: 'All Surfaces' },
  { id: '3d-floors',      label: '3D Floors' },
  { id: 'metallic',       label: 'Metallic Floors' },
  { id: 'single-color',   label: 'Single Color' },
  { id: 'marble-granules',label: 'Marble Granules' },
  { id: 'marble-walls',   label: 'Marble Walls' },
  { id: '3d-walls',       label: '3D Walls' },
  { id: 'epoxy-paint',    label: 'Epoxy Paint' },
];

// CSS gradient backgrounds simulating each surface type
const SURFACE_BG = {
  '3d-floors':       'linear-gradient(145deg,#0d0d1a 0%,#1a1040 40%,#0d0d1a 100%), repeating-linear-gradient(45deg,transparent,transparent 20px,rgba(123,97,255,0.12) 20px,rgba(123,97,255,0.12) 22px)',
  'metallic':        'linear-gradient(135deg,#1a1a1a 0%,#3a3a4a 25%,#c8c8d8 50%,#3a3a4a 75%,#1a1a1a 100%)',
  'single-color':    'linear-gradient(160deg,#0a0a14 0%,#1a1a3a 100%)',
  'marble-granules': 'radial-gradient(ellipse at 30% 20%,#f0e8d5 0%,#e0d0b0 40%,#d0b880 70%,#c4a060 100%)',
  'marble-walls':    'linear-gradient(135deg,#f5f5f0 0%,#e8e8e0 30%,#d0d0c8 60%,#f0f0ea 100%)',
  '3d-walls':        'linear-gradient(145deg,#1a1018 0%,#2a1528 40%,#180d16 100%)',
  'epoxy-paint':     'linear-gradient(160deg,#0a0f1a 0%,#1a2040 50%,#0a0f1a 100%)',
};

const PORTFOLIO = [
  { id:1, tag:'3d-floors',       title:'Ocean Depth 3D Floor',         room:'Living Room',   loc:'Pune',      accent:'#7B61FF' },
  { id:2, tag:'metallic',        title:'Liquid Silver Metallic',       room:'Master Suite',  loc:'Mumbai',    accent:'#C8D6E5' },
  { id:3, tag:'single-color',    title:'Midnight Black Epoxy',         room:'Office Lobby',  loc:'Pune',      accent:'#A08BFF' },
  { id:4, tag:'marble-granules', title:'Rose Marble Granule Floor',    room:'Kitchen',       loc:'Pune',      accent:'#E8D5B0' },
  { id:5, tag:'marble-walls',    title:'Carrara Marble Texture Wall',  room:'Living Room',   loc:'Bangalore', accent:'#D0C8B8' },
  { id:6, tag:'3d-walls',        title:'Geometric 3D Feature Wall',    room:'Dining Area',   loc:'Pune',      accent:'#C080E0' },
  { id:7, tag:'epoxy-paint',     title:'Navy Epoxy Paint Finish',      room:'Garage Floor',  loc:'Pune',      accent:'#60A0E0' },
  { id:8, tag:'3d-floors',       title:'Lava Effect 3D Epoxy',         room:'Restaurant',    loc:'Mumbai',    accent:'#FF8060' },
  { id:9, tag:'metallic',        title:'Bronze Champagne Metallic',    room:'Hotel Lobby',   loc:'Pune',      accent:'#E8A050' },
];

const FLOOR_BEFORE = `
  repeating-linear-gradient(0deg,transparent,transparent 49px,rgba(120,120,120,0.3) 50px),
  repeating-linear-gradient(90deg,transparent,transparent 49px,rgba(120,120,120,0.3) 50px),
  linear-gradient(160deg,#aaaaaa,#888888)
`;
const FLOOR_AFTER = `
  radial-gradient(ellipse at 30% 30%,rgba(160,160,255,0.6) 0%,transparent 50%),
  radial-gradient(ellipse at 70% 70%,rgba(100,100,200,0.5) 0%,transparent 50%),
  radial-gradient(ellipse at 50% 80%,rgba(200,180,255,0.4) 0%,transparent 40%),
  linear-gradient(145deg,#0d0d1a,#1a1040,#0d0d1a)
`;

function PortfolioCard({ item, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.88 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16,1,0.3,1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl overflow-hidden group cursor-pointer"
      style={{ height: 'clamp(200px, 26vw, 280px)' }}
    >
      {/* Background */}
      <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
        style={{ background: SURFACE_BG[item.tag] || SURFACE_BG['single-color'] }} />

      {/* Shimmer sweep */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: 'linear-gradient(135deg,transparent 30%,rgba(255,255,255,0.07) 50%,transparent 70%)' }} />

      {/* Tag pill */}
      <div className="absolute top-3 left-3 z-10">
        <span className="font-ui text-[9px] tracking-widest uppercase px-2.5 py-1 rounded-full"
          style={{ background: `${item.accent}20`, border: `1px solid ${item.accent}40`, color: item.accent, backdropFilter: 'blur(8px)' }}>
          {TAGS.find(t => t.id === item.tag)?.label}
        </span>
      </div>

      {/* Bottom info panel */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-4"
        style={{ background: 'linear-gradient(to top,rgba(0,0,0,0.85) 0%,transparent 100%)' }}>
        <div className="font-heading font-bold text-white text-sm md:text-base leading-tight">{item.title}</div>
        <div className="flex items-center gap-2 mt-1">
          <span className="font-ui text-[9px] tracking-widest uppercase text-white/50">{item.room}</span>
          <span className="text-white/30">·</span>
          <span className="font-ui text-[9px] tracking-widest uppercase text-white/50">{item.loc}</span>
        </div>
      </div>

      {/* Hover CTA */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 z-10 flex items-center justify-center"
      >
        <span className="font-ui text-[10px] tracking-[0.2em] uppercase px-4 py-2 rounded-full"
          style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', color: 'white', backdropFilter: 'blur(12px)' }}>
          View Project →
        </span>
      </motion.div>
    </motion.div>
  );
}

export default function SurfacesSection() {
  const [activeTag, setActiveTag] = useState('all');

  const filtered = activeTag === 'all'
    ? PORTFOLIO
    : PORTFOLIO.filter(p => p.tag === activeTag);

  return (
    <section id="surfaces" className="relative bg-charcoal-mid section-offset"
      style={{ background: 'linear-gradient(180deg,#111118 0%,#1C1C2A 50%,#111118 100%)' }}>

      {/* ── Intro ── */}
      <div className="py-20 md:py-28 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14 md:mb-16">
            <div>
              <motion.div {...fu(0)} className="flex items-center gap-3 mb-5">
                <div className="h-3 w-3 rounded-full bg-champagne" />
                <span className="section-label text-champagne/70">Pillar 02</span>
              </motion.div>
              <motion.h2 {...fu(0.08)}
                className="font-heading font-bold text-white leading-tight"
                style={{ fontSize: 'clamp(2rem, 5vw, 3.8rem)' }}
              >
                Defying{' '}
                <span className="text-gradient-champagne">Surfaces</span>
                <br />
                <span className="text-stellar/60 font-light text-2xl md:text-3xl">
                  3D Floors · Metallic · Epoxy · Marble
                </span>
              </motion.h2>
            </div>
            <motion.p {...fu(0.15)} className="font-body text-stellar/50 text-sm md:text-base leading-relaxed max-w-md lg:text-right">
              Next-generation surface solutions where material science meets visual artistry.
              The best alternative to conventional tiles — built to outlast and outshine.
            </motion.p>
          </div>

          {/* Real Project Gallery (Scrollable Frame) */}
          <motion.div {...fu(0.08)} className="mb-10">
            <ScrollableGalleryFrame
              title="Architectural Surface Portfolio &amp; 3D Floor Real-Life Installations"
              badge="VERIFIED SURFACING INSTALLATIONS"
              accentColor="#E8D5B0"
              aspectRatio="aspect-[16/9]"
              items={[
                {
                  src: "/images/surfaces_triptych.jpg",
                  title: "Triptych of 3D Coastal Epoxy, Emerald Agate & Liquid Marble",
                  desc: "Three distinct architectural finishes: Ocean depth 3D wave effect on balcony, swirling emerald agate metallic in living area, and golden marble vein in suite bedroom.",
                  location: "Residential Installations, Pune & Mumbai",
                  tag: "NEXT-GEN SURFACES"
                },
                {
                  src: "/images/balcony_garden_hero.jpg",
                  title: "High-Gloss Emerald Agate Balcony Floor with Biophilic Wall",
                  desc: "Mirror-finish metallic epoxy flooring seamlessly paired with dense botanical gardens and atmospheric evening downlights.",
                  location: "Penthouse Balcony, Pune",
                  tag: "METALLIC FLOORING"
                }
              ]}
            />
          </motion.div>

          {/* Before/After for surfaces + Architectural Cross-section Sketch */}
          <motion.div {...fu(0.1)} className="mb-14 md:mb-16">
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center mb-8">
              <div>
                <h3 className="font-heading font-bold text-white text-xl md:text-2xl mb-3">
                  See the Transformation
                </h3>
                <p className="font-body text-stellar/50 text-sm md:text-base leading-relaxed mb-5">
                  From bare concrete to a stunning 3D epoxy floor — drag the slider to see how
                  ABOVE° transforms your floor into a work of art. Our surfaces aren't just floors;
                  they're statements.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['3D Epoxy', 'Metallic Finish', 'Marble Effect', 'Custom Color'].map(t => (
                    <span key={t} className="tag-violet">{t}</span>
                  ))}
                </div>
                <a
                  href="https://wa.me/918888159579?text=Hi%20ABOVE%C2%B0!%20I'm%20looking%20for%20an%20Epoxy%20/%203D%20Flooring%20quotation."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sage font-ui text-xs tracking-wider hover:underline"
                >
                  💬 Get Instant Floor Estimate on WhatsApp: +91 88881 59579 →
                </a>
              </div>
              <BeforeAfterSlider
                beforeBg={FLOOR_BEFORE}
                afterBg={FLOOR_AFTER}
                beforeLabel="Plain Concrete"
                afterLabel="ABOVE° 3D Epoxy"
                height="clamp(260px, 40vw, 380px)"
                className="shadow-2xl"
              />
            </div>
          </motion.div>

          {/* ── Portfolio filter + grid ── */}
          <motion.div {...fu(0)}>
            <h3 className="font-heading font-bold text-white text-xl md:text-2xl mb-6 text-center">
              Our Surface Portfolio
            </h3>

            {/* Filter tags — scrollable on mobile */}
            <div className="flex gap-2 overflow-x-auto pb-2 mb-8 md:mb-10 scrollbar-hide justify-start md:justify-center flex-nowrap md:flex-wrap">
              {TAGS.map(tag => (
                <button
                  key={tag.id}
                  onClick={() => setActiveTag(tag.id)}
                  className={`tag-violet whitespace-nowrap flex-shrink-0 ${activeTag === tag.id ? 'active' : ''}`}
                >
                  {tag.label}
                </button>
              ))}
            </div>

            {/* Grid */}
            <LayoutGroup>
              <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                <AnimatePresence mode="popLayout">
                  {filtered.map((item, i) => (
                    <PortfolioCard key={item.id} item={item} index={i} />
                  ))}
                </AnimatePresence>
              </motion.div>
            </LayoutGroup>

            {/* CTA */}
            <motion.div {...fu(0.2)} className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center mt-10 md:mt-12">
              <a href="#contact" className="btn-violet">
                Request a Custom Surface Quote →
              </a>
              <a
                href="https://wa.me/918888159579?text=Hi%20ABOVE%C2%B0!%20Please%20share%20your%20surface%20catalogue."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-white border-sage/40 text-sage hover:bg-sage/10"
              >
                💬 WhatsApp Catalogue (+91 88881 59579)
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── Services list (reference-style flat list with icons) ── */}
      <div className="border-t border-white/6 py-10 md:py-14 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4 md:gap-6">
            {TAGS.filter(t => t.id !== 'all').map((t, i) => (
              <motion.div key={t.id} {...fu(0.07 * i)}
                className="flex flex-col items-center text-center gap-2 cursor-pointer group"
                onClick={() => { setActiveTag(t.id); document.getElementById('surfaces')?.scrollIntoView({ behavior:'smooth' }); }}
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/6 border border-white/10 flex items-center justify-center group-hover:border-violet/40 group-hover:bg-violet/10 transition-all">
                  <div className="w-4 h-4 rounded-sm" style={{ background: SURFACE_BG[t.id], transform: 'scale(0.8)' }} />
                </div>
                <span className="font-ui text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-stellar/50 group-hover:text-violet/80 transition-colors leading-tight">{t.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
