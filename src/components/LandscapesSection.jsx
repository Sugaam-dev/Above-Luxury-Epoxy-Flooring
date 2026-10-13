import { motion } from 'framer-motion';
import BeforeAfterSlider from './BeforeAfterSlider';
import ScrollableGalleryFrame from './ScrollableGalleryFrame';

const fu = (d = 0) => ({
  initial:     { opacity: 0, y: 44 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, margin: '-60px' },
  transition:  { duration: 0.95, delay: d, ease: [0.16,1,0.3,1] },
});

const SERVICES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M16 4 C16 4 8 11 8 19 a8 8 0 0016 0 C24 11 16 4 16 4Z" stroke="#2E7D32" strokeWidth="1.5" fill="rgba(46,125,50,0.1)"/>
        <path d="M16 19 v9" stroke="#2E7D32" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Balcony Design',
    desc: 'Transformative balcony environments that turn empty slabs into living sanctuaries.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="16" cy="16" r="12" stroke="#2E7D32" strokeWidth="1.5" fill="rgba(46,125,50,0.08)"/>
        <path d="M10 22 Q16 10 22 22" stroke="#2E7D32" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M16 10 v12" stroke="#2E7D32" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="2 2"/>
      </svg>
    ),
    title: 'Garden Landscaping',
    desc: 'Complete garden design and landscaping for homes, terraces, and commercial spaces.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect x="4" y="12" width="24" height="16" rx="3" stroke="#2E7D32" strokeWidth="1.5" fill="rgba(46,125,50,0.08)"/>
        <path d="M10 12 V8 a6 6 0 0112 0 v4" stroke="#2E7D32" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="16" cy="20" r="2.5" fill="#2E7D32" opacity="0.6"/>
      </svg>
    ),
    title: 'Biophilic Interiors',
    desc: 'Bringing nature indoors through considered plant placement and living wall design.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M6 26 L16 8 L26 26" stroke="#2E7D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="rgba(46,125,50,0.08)"/>
        <path d="M10 20 h12" stroke="#2E7D32" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Terrace Gardens',
    desc: 'Full terrace garden solutions with seasonal planting schedules and garden supplies.',
  },
];

// Landscape "before": concrete grey slab
const BEFORE_BG = `
  linear-gradient(170deg, rgba(100,100,110,0.95) 0%, rgba(140,140,150,0.9) 50%, rgba(90,90,100,0.95) 100%),
  repeating-linear-gradient(0deg, transparent, transparent 29px, rgba(255,255,255,0.04) 30px),
  repeating-linear-gradient(90deg, transparent, transparent 29px, rgba(255,255,255,0.04) 30px)
`;

// Landscape "after": lush garden
const AFTER_BG = `
  radial-gradient(ellipse at 30% 20%, rgba(27,94,32,0.9) 0%, rgba(46,125,50,0.7) 40%, rgba(81,162,52,0.6) 70%, transparent 100%),
  radial-gradient(ellipse at 70% 80%, rgba(33,150,60,0.8) 0%, rgba(56,142,60,0.6) 50%, transparent 80%),
  radial-gradient(ellipse at 50% 50%, rgba(100,190,80,0.3) 0%, transparent 70%),
  linear-gradient(160deg, #0d2010 0%, #1B5E20 40%, #2E7D32 70%, #388E3C 100%)
`;

export default function LandscapesSection() {
  return (
    <section id="landscapes" className="relative bg-cream section-offset">

      {/* ── Section intro: light sage bg like reference ── */}
      <div className="bg-forest-pale py-20 md:py-28 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">

            {/* Left: text */}
            <div>
              <motion.div {...fu(0)} className="flex items-center gap-3 mb-5">
                <div className="h-3 w-3 rounded-full bg-forest" />
                <span className="section-label text-forest">Pillar 01</span>
              </motion.div>

              <motion.h2 {...fu(0.08)}
                className="font-heading font-bold leading-tight mb-5"
                style={{ fontSize: 'clamp(2rem, 5vw, 3.8rem)' }}
              >
                Elevated{' '}
                <span className="text-gradient-green">Landscapes</span>
                <br />& Garden Design
              </motion.h2>

              <motion.p {...fu(0.15)} className="font-body text-ink/65 text-sm md:text-base lg:text-lg leading-relaxed mb-6 max-w-lg">
                We believe your outdoor space should be the most breathtaking room in your home.
                Our landscape designers craft bespoke <strong className="text-forest">balcony gardens</strong>,
                curated <strong className="text-forest">terrace landscapes</strong>, and immersive
                <strong className="text-forest"> biophilic living spaces</strong> —
                transforming every square foot of outdoor area into a gravity-defying green sanctuary.
              </motion.p>

              <motion.p {...fu(0.2)} className="font-display italic text-forest text-lg md:text-xl leading-relaxed mb-8">
                "Your garden. From concept to canopy, we can design and build it."
              </motion.p>

              <motion.div {...fu(0.28)} className="flex flex-col sm:flex-row gap-3">
                <a href="#contact" className="btn-green w-full sm:w-auto">Design My Garden →</a>
                <a href="https://wa.me/918888159579?text=Hi%20ABOVE%C2%B0!%20I'd%20like%20to%20schedule%20a%20Free%20Site%20Visit%20for%20balcony%20/%20garden%20design." target="_blank" rel="noopener noreferrer" className="btn-outline-green w-full sm:w-auto">💬 Free Site Visit</a>
              </motion.div>

              {/* Service pills */}
              <motion.div {...fu(0.35)} className="flex flex-wrap gap-2 mt-6">
                {SERVICES.map(s => (
                  <span key={s.title} className="tag-green">{s.title}</span>
                ))}
              </motion.div>
            </div>

            {/* Right: scrollable iframe gallery + before/after slider + architectural sketch overlay */}
            <div className="space-y-6">
              {/* Real Project Gallery (Scrollable Frame) */}
              <motion.div {...fu(0.08)}>
                <ScrollableGalleryFrame
                  title="Completed Biophilic Balcony Sanctuary"
                  badge="REAL PROJECT PHOTOGRAPHY"
                  accentColor="#2E7D32"
                  items={[
                    {
                      src: "/images/balcony_garden_hero.jpg",
                      title: "Lush Vertical Living Garden & Liquid Marble Floor",
                      desc: "Full balcony transformation featuring dense living plant walls, automated misting, ambient pendant illumination, and hammock lounge.",
                      location: "Pune Sky Villa, Floor 14",
                      tag: "BALCONY LANDSCAPING"
                    },
                    {
                      src: "/images/surfaces_triptych.jpg",
                      title: "Indoor-Outdoor Biophilic Integration & 3D Waterscape",
                      desc: "Complete architectural view from ocean shore 3D epoxy balcony to living room emerald agate flooring.",
                      location: "Luxury Penthouse, Maharashtra",
                      tag: "FULL RESIDENCE"
                    }
                  ]}
                />
              </motion.div>

              <motion.div {...fu(0.12)}>
                <BeforeAfterSlider
                  beforeBg={BEFORE_BG}
                  afterBg={AFTER_BG}
                  beforeLabel="Before"
                  afterLabel="After ABOVE°"
                  height="clamp(240px, 30vw, 320px)"
                  className="shadow-xl"
                />
                <p className="font-ui text-[10px] tracking-[0.2em] uppercase text-ash mt-2 text-center">
                  ← Drag slider to reveal the green transformation
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Service cards grid (reference-style card grid) ── */}
      <div className="py-16 md:py-20 px-5 sm:px-8 bg-cream">
        <div className="max-w-7xl mx-auto">
          <motion.h3 {...fu(0)} className="font-heading font-bold text-2xl md:text-3xl text-ink mb-3 text-center">
            We Offer Hard &amp; Soft Landscape Solutions
          </motion.h3>
          <motion.p {...fu(0.08)} className="font-body text-ash text-center mb-10 md:mb-12 text-sm md:text-base max-w-xl mx-auto">
            Every service is delivered with meticulous attention to your site, climate, and vision.
          </motion.p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {SERVICES.map((s, i) => (
              <motion.div key={s.title} {...fu(0.1 * i)} className="card-light p-6 md:p-7 group">
                <div className="w-12 h-12 rounded-xl bg-forest-pale flex items-center justify-center mb-4 group-hover:bg-forest/10 transition-colors">
                  {s.icon}
                </div>
                <h4 className="font-heading font-bold text-ink text-base md:text-lg mb-2 leading-tight">{s.title}</h4>
                <p className="font-body text-ash/80 text-sm leading-relaxed">{s.desc}</p>
                <a href="#contact" className="inline-flex items-center gap-1 text-forest font-ui text-[10px] tracking-widest uppercase mt-4 group-hover:gap-2 transition-all">
                  Learn More →
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA stripe (green bar like references) ── */}
      <motion.div {...fu(0)} className="stripe-accent py-8 md:py-10 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
          <div>
            <div className="font-ui text-[10px] tracking-[0.25em] uppercase text-white/60 mb-1">
              Your garden. From concept to canopy.
            </div>
            <h3 className="font-heading font-bold text-white text-xl md:text-2xl">
              Don't settle for boring landscape. <span className="text-white/80">We can build it.</span>
            </h3>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a href="#contact" className="btn-outline-white">Get Free Quote</a>
            <a href="https://wa.me/918888159579" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-5 py-3 text-white font-ui text-sm font-medium hover:bg-white/25 transition-colors">
              💬 +91 88881 59579
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
