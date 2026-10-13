import { useState } from 'react';
import { motion } from 'framer-motion';

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 48 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, margin: '-50px' },
  transition:  { duration: 1, delay, ease: [0.16, 1, 0.3, 1] },
});

const SERVICES = [
  {
    id: 'landscapes',
    index: '01',
    name: 'Elevated Landscapes',
    h2: 'Balcony Garden Design & Landscaping',
    tagline: 'Where nature is designed, not just grown.',
    accentHex: '#7B61FF',
    glowRgb: '123,97,255',
    gradientText: 'text-gradient-violet',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M14 3C14 3 7 9 7 17a7 7 0 0014 0C21 9 14 3 14 3z" stroke="#7B61FF" strokeWidth="1.4" fill="none"/>
        <path d="M14 17v8" stroke="#7B61FF" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M9 21l5-3 5 3" stroke="#7B61FF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    description: `Your balcony is not a ledge. Your garden is not an afterthought. In the hands of ABOVE°, outdoor spaces become your most breathtaking room.

We design high-end balcony environments, curated garden landscapes, and immersive biophilic living areas for homes and apartments across Pune. From selecting the right plants and garden supplies to sculpting the entire layout — every detail is intentional, every sightline composed.

Whether you're searching for a balcony makeover, a terrace garden designer, or complete outdoor landscaping, ABOVE° delivers green living elevated to fine art.`,
    cta: 'Design My Garden',
    features: ['Balcony Garden', 'Terrace Landscaping', 'Biophilic Interiors', 'Garden Supplies', 'Outdoor Plants', 'Seasonal Planting'],
  },
  {
    id: 'surfaces',
    index: '02',
    name: 'Defying Surfaces',
    h2: 'Luxury Epoxy Flooring & 3D Wall Design',
    tagline: 'The floor is no longer just something you walk on.',
    accentHex: '#E8D5B0',
    glowRgb: '232,213,176',
    gradientText: 'text-gradient-champagne',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="3" y="15" width="22" height="10" rx="2" stroke="#E8D5B0" strokeWidth="1.4" fill="none"/>
        <path d="M3 15l11-11 11 11" stroke="#E8D5B0" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 25v-7h4v7" stroke="#E8D5B0" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    description: `We work at the boundary where material science meets visual artistry. Our surfacing division transforms floors and walls into gallery-quality statements that redefine every room.

Our complete flooring and wall portfolio: immersive 3D epoxy floors that create stunning depth effects · liquid metallic floor finishes that shift with light · gallery-grade single-color epoxy floors · richly textured epoxy marble granule finishes · marble-effect wall treatments · sculptural 3D feature walls · precision-applied epoxy paint for long-lasting beauty.

The best alternative to conventional tiles and standard flooring — our surfaces are built to outlast, outshine, and outperform everything else on the market.`,
    cta: 'View Floor Designs',
    features: ['3D Epoxy Floors', 'Metallic Floors', 'Epoxy Marble Granules', 'Marble Effect Walls', '3D Wall Design', 'Epoxy Paint', 'Tiles Alternative'],
  },
  {
    id: 'hypercare',
    index: '03',
    name: 'Weightless Hypercare',
    h2: 'Automated Plant Care & Smart Garden Systems',
    tagline: 'Your garden, alive. Your involvement, optional.',
    accentHex: '#52D68A',
    glowRgb: '82,214,138',
    gradientText: 'text-gradient-sage',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="14" cy="14" r="9" stroke="#52D68A" strokeWidth="1.4" fill="none"/>
        <circle cx="14" cy="14" r="3.5" fill="#52D68A" opacity="0.35"/>
        <circle cx="14" cy="14" r="1.5" fill="#52D68A"/>
        <path d="M14 5v4M14 19v4M5 14h4M19 14h4" stroke="#52D68A" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    description: `The most luxurious thing in the world is not owning beautiful things — it is owning beautiful things that take care of themselves.

Hypercare is ABOVE°'s intelligent indoor and outdoor plant monitoring system. A network of discreet sensors tracks soil moisture, nutrient levels, light exposure, and climate conditions in real time — providing automated, hands-free care for all your indoor plants, balcony gardens, and outdoor landscaping.

For plant lovers who demand lush, thriving greenery without the daily effort of manual watering and garden maintenance, Hypercare is the definitive smart garden solution.`,
    cta: 'Activate Hypercare',
    features: ['Soil Monitoring', 'Nutrient Sensing', 'Indoor Plants', 'Outdoor Plants', 'Auto Watering', 'Live Dashboard'],
  },
];

function ServiceCard({ service, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      {...fadeUp(0.12 * index)}
      className="relative rounded-2xl md:rounded-3xl overflow-hidden flex flex-col shimmer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'linear-gradient(145deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.015) 60%, rgba(0,0,0,0.18) 100%)',
        backdropFilter: 'blur(18px)',
        border: `1px solid ${hovered ? service.accentHex + '45' : 'rgba(200,214,229,0.08)'}`,
        boxShadow: hovered
          ? `0 28px 70px rgba(0,0,0,0.6), 0 0 50px rgba(${service.glowRgb},0.15)`
          : '0 8px 32px rgba(0,0,0,0.4)',
        transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
      }}
    >
      {/* Top accent bar */}
      <div className="absolute top-0 inset-x-0 h-px transition-all duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${service.accentHex}, transparent)`, opacity: hovered ? 1 : 0.35 }} />

      {/* Glow corner */}
      <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full pointer-events-none transition-opacity duration-700"
        style={{ background: `radial-gradient(circle, rgba(${service.glowRgb},0.2) 0%, transparent 70%)`, opacity: hovered ? 1 : 0 }} />

      <div className="relative z-10 p-6 md:p-8 flex flex-col flex-1">
        {/* Card header */}
        <div className="flex items-start justify-between mb-5 md:mb-6">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-11 h-11 md:w-13 md:h-13 rounded-xl flex items-center justify-center transition-all duration-400 flex-shrink-0"
              style={{
                background: hovered ? `rgba(${service.glowRgb},0.12)` : 'rgba(255,255,255,0.04)',
                border: `1px solid ${hovered ? service.accentHex + '40' : 'rgba(255,255,255,0.06)'}`,
                boxShadow: hovered ? `0 0 24px rgba(${service.glowRgb},0.25)` : 'none',
              }}
            >
              {service.icon}
            </div>
            <div>
              <div className="font-ui text-[9px] md:text-[10px] tracking-[0.25em] uppercase text-ash mb-0.5">{service.index}</div>
              <h3 className={`font-heading font-bold text-base md:text-xl ${service.gradientText} leading-tight`}>
                {service.name}
              </h3>
            </div>
          </div>
          <motion.div animate={{ rotate: hovered ? 45 : 0 }} transition={{ duration: 0.3 }}
            className="text-ash/35 mt-0.5 flex-shrink-0 ml-2">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M4 16L16 4M16 4H8M16 4v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </div>

        {/* SEO h2 (visually hidden but present for SEO) */}
        <h2 className="sr-only">{service.h2}</h2>

        {/* Tagline */}
        <p className="font-display italic text-sm md:text-lg mb-4 md:mb-5 leading-snug"
          style={{ color: service.accentHex + 'CC' }}>
          "{service.tagline}"
        </p>

        <div className="divider-silver mb-4 md:mb-5" />

        {/* Description */}
        <div className="font-body text-ash/75 text-xs md:text-sm leading-[1.9] mb-5 md:mb-6 flex-1 whitespace-pre-line">
          {service.description}
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap gap-1.5 md:gap-2 mb-5 md:mb-6">
          {service.features.map((f) => (
            <span key={f}
              className="font-ui text-[9px] md:text-[10px] tracking-widest uppercase px-2.5 py-1 md:px-3 md:py-1.5 rounded-full"
              style={{ background: `${service.accentHex}12`, border: `1px solid ${service.accentHex}25`, color: service.accentHex }}>
              {f}
            </span>
          ))}
        </div>

        {/* CTA link */}
        <motion.a
          href="#contact"
          className="inline-flex items-center gap-2 font-ui text-[10px] md:text-xs tracking-[0.2em] uppercase mt-auto transition-colors duration-300"
          style={{ color: service.accentHex }}
          animate={{ x: hovered ? 4 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {service.cta} →
        </motion.a>
      </div>
    </motion.article>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative py-24 md:py-36 lg:py-40 px-5 sm:px-8 section-offset">
      <div className="absolute inset-0 bg-void-900 z-0" />
      <div className="absolute inset-0 z-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(123,97,255,0.065) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-20">
          <motion.div {...fadeUp(0)} className="flex items-center justify-center gap-3 mb-5 md:mb-6">
            <div className="h-px w-8 md:w-12 bg-gradient-to-r from-transparent to-violet/60" />
            <span className="section-label">Our Three Disciplines</span>
            <div className="h-px w-8 md:w-12 bg-gradient-to-l from-transparent to-violet/60" />
          </motion.div>

          <motion.h2 {...fadeUp(0.1)}
            className="font-heading font-bold leading-tight mb-4 md:mb-6"
            style={{ fontSize: 'clamp(2rem, 5.5vw, 4rem)' }}
          >
            Epoxy Floors. Garden Landscapes.{' '}
            <span className="text-gradient-violet block md:inline">Intelligent Plant Care.</span>
          </motion.h2>

          <motion.p {...fadeUp(0.2)}
            className="font-body text-ash max-w-xl md:max-w-2xl mx-auto text-sm md:text-lg leading-relaxed">
            Premium flooring, biophilic garden design, and smart plant monitoring systems —
            three disciplines that together transform any home into a living work of art.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {SERVICES.map((s, i) => <ServiceCard key={s.id} service={s} index={i} />)}
        </div>
      </div>
    </section>
  );
}
