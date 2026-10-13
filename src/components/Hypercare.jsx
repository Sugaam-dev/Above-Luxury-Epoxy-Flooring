import { motion } from 'framer-motion';

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 48 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, margin: '-60px' },
  transition:  { duration: 1, delay, ease: [0.16, 1, 0.3, 1] },
});

const FEATURES = [
  {
    title: 'Constant Vigil',
    desc: '24/7 automated indoor and outdoor plant monitoring. Every vital sign of your balcony garden, terrace plants, or interior greenery — tracked continuously.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="14" cy="14" r="10" stroke="#52D68A" strokeWidth="1.2" fill="none"/>
        <path d="M9 14l3.5 3.5L19 10" stroke="#52D68A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Soil Intelligence',
    desc: 'Real-time soil moisture and nutrient sensing. Hypercare knows what your indoor plants and garden need — before they show any sign of stress.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="4" y="8" width="20" height="14" rx="3" stroke="#52D68A" strokeWidth="1.2" fill="none"/>
        <path d="M10 8V6a4 4 0 018 0v2" stroke="#52D68A" strokeWidth="1.2" strokeLinecap="round"/>
        <circle cx="14" cy="15" r="2.5" fill="#52D68A" opacity="0.45"/>
        <circle cx="14" cy="15" r="1"   fill="#52D68A"/>
      </svg>
    ),
  },
  {
    title: 'Climate Awareness',
    desc: 'Ambient light and climate tracking that adapts care protocols for all plant types — ideal for Pune\'s seasonal weather variations.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M14 4L7 9v10l7 5 7-5V9L14 4z" stroke="#52D68A" strokeWidth="1.2" fill="none" strokeLinejoin="round"/>
        <path d="M14 4v20M7 9l7 6 7-6" stroke="#52D68A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Live Dashboard',
    desc: 'A clean mobile and desktop dashboard gives you a live pulse on every plant — no app-switching, no garden maintenance guesswork.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="5" y="4" width="18" height="20" rx="3" stroke="#52D68A" strokeWidth="1.2" fill="none"/>
        <path d="M9 10h10M9 14h8M9 18h5" stroke="#52D68A" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
];

const DATA_CARDS = [
  { label: 'Soil Moisture', value: '68%' },
  { label: 'Light', value: 'Optimal' },
  { label: 'Nutrients', value: 'Balanced' },
];

export default function Hypercare() {
  return (
    <section id="hypercare" className="relative py-24 md:py-36 lg:py-40 px-5 sm:px-8 overflow-hidden section-offset"
      aria-label="Automated Indoor and Outdoor Plant Care System — Hypercare">
      {/* Background */}
      <div className="absolute inset-0 z-0"
        style={{ background: 'linear-gradient(180deg, #0A0A0F 0%, #061712 50%, #0A0A0F 100%)' }} />
      <div className="absolute inset-0 z-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(82,214,138,0.07) 0%, transparent 70%)' }} />
      {/* Dot grid */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.15]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(82,214,138,0.6) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }} />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-20">
          <motion.div {...fadeUp(0)} className="flex items-center justify-center gap-3 mb-5 md:mb-6">
            <div className="h-px w-8 md:w-12 bg-gradient-to-r from-transparent to-sage/60" />
            <span className="section-label text-sage/70">Smart Plant Care Technology</span>
            <div className="h-px w-8 md:w-12 bg-gradient-to-l from-transparent to-sage/60" />
          </motion.div>

          <motion.h2 {...fadeUp(0.1)}
            className="font-heading font-bold leading-tight mb-5 md:mb-6"
            style={{ fontSize: 'clamp(1.9rem, 5.5vw, 4rem)' }}
          >
            Automated Plant Monitoring.{' '}
            <span className="text-gradient-sage block md:inline">Invisible. Effortless.</span>
          </motion.h2>

          <motion.p {...fadeUp(0.2)}
            className="font-display italic text-base md:text-2xl text-sage/65 max-w-xl md:max-w-2xl mx-auto leading-relaxed px-2">
            "The most advanced garden system in the world is one you never have to think about."
          </motion.p>
        </div>

        {/* Main split layout */}
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 lg:gap-20 items-center mb-12 md:mb-20">

          {/* ── Sensor Orb visual ── */}
          <motion.div {...fadeUp(0.1)} className="relative flex justify-center">
            <div className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80">
              {/* Rings */}
              {[1.0, 1.45, 1.9].map((scale, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full border"
                  style={{ borderColor: `rgba(82,214,138,${0.22 - i * 0.06})` }}
                  animate={{ scale: [scale, scale * 1.025, scale], opacity: [0.5, 0.9, 0.5] }}
                  transition={{ duration: 4 + i, ease: 'easeInOut', repeat: Infinity, delay: i * 0.9 }}
                />
              ))}

              {/* Core */}
              <div className="absolute inset-0 rounded-full flex items-center justify-center"
                style={{ background: 'radial-gradient(circle at 35% 35%, rgba(82,214,138,0.22), rgba(82,214,138,0.05))' }}>
                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full flex items-center justify-center sensor-pulse"
                  style={{
                    background: 'linear-gradient(145deg, rgba(82,214,138,0.18), rgba(82,214,138,0.05))',
                    border: '1px solid rgba(82,214,138,0.35)',
                    boxShadow: '0 0 50px rgba(82,214,138,0.2)',
                    backdropFilter: 'blur(10px)',
                  }}>
                  <div className="text-center">
                    <div className="font-heading font-bold text-xl md:text-2xl text-sage">ON</div>
                    <div className="font-ui text-[8px] md:text-[9px] tracking-widest uppercase text-sage/55">Hypercare</div>
                  </div>
                </div>
              </div>

              {/* Orbiting sensor dots */}
              {[0, 90, 180, 270].map((deg, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-sage"
                  style={{
                    top: '50%', left: '50%',
                    boxShadow: '0 0 10px rgba(82,214,138,0.7)',
                    originX: '50%', originY: '50%',
                  }}
                  animate={{ rotate: [deg, deg + 360] }}
                  transition={{ duration: 12 - i * 1.5, ease: 'linear', repeat: Infinity }}
                  // position via CSS transform chain
                  // we do it differently — offset from center:
                >
                  {/* inner positioned relative to parent center */}
                </motion.div>
              ))}
              {/* Better: 4 absolute dots placed at top/right/bottom/left of orbit */}
              {[
                { top: '2%',  left: '50%', tx: '-50%' },
                { top: '50%', right: '2%', tx: '0' },
                { bottom: '2%', left: '50%', tx: '-50%' },
                { top: '50%', left: '2%', tx: '0' },
              ].map((pos, i) => (
                <motion.div key={`dot-${i}`}
                  className="absolute w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-sage"
                  style={{ ...pos, transform: `translate(${pos.tx},${pos.tx === '0' ? '-50%' : '-50%'})`, boxShadow: '0 0 12px rgba(82,214,138,0.8)' }}
                  animate={{ scale: [1, 1.6, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, delay: i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
                />
              ))}
            </div>

            {/* Floating data cards — repositioned for mobile safety */}
            <div className="absolute top-0 -right-2 sm:-right-6 md:-right-10">
              {DATA_CARDS.map((c, i) => (
                <motion.div
                  key={c.label}
                  className="glass-card shimmer rounded-xl px-3 py-2 md:px-4 md:py-3 mb-2 md:mb-3"
                  style={{ border: '1px solid rgba(82,214,138,0.2)' }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3 + i, delay: i * 0.8, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div className="font-ui text-[8px] md:text-[9px] tracking-[0.2em] uppercase text-ash/55 mb-0.5">{c.label}</div>
                  <div className="font-heading font-semibold text-sage text-xs md:text-sm">{c.value}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Body copy ── */}
          <div className="space-y-4 md:space-y-5 font-body text-ash leading-[1.9] text-sm md:text-base lg:text-lg">
            <motion.p {...fadeUp(0.2)}>Hypercare isn't a product. It's a philosophy made functional.</motion.p>
            <motion.p {...fadeUp(0.3)}>
              We embed a discreet network of precision sensors throughout your designed landscape —
              invisible to the eye, relentless in their work. Whether it's a curated indoor plant
              collection or an expansive outdoor balcony garden, the system monitors every variable
              and communicates through a clean, minimal dashboard available on any device.
            </motion.p>
            <motion.p {...fadeUp(0.4)} className="text-stellar/80">
              No plant watering reminders. No guessing why a leaf turned yellow. No seasonal garden maintenance anxiety.
              Just thriving, curated greenery — indoors and outdoors — sustained by intelligence you never have to manage.
            </motion.p>
            <motion.p {...fadeUp(0.45)} className="italic font-display text-sm md:text-lg text-sage/75">
              For those who want lush indoor plants and garden beauty without the daily burden of plant care,
              Hypercare is the only answer.
            </motion.p>
            <motion.div {...fadeUp(0.55)}>
              <a href="#contact"
                className="inline-flex items-center gap-2 font-ui text-[10px] md:text-xs tracking-[0.25em] uppercase text-sage hover:text-sage/70 transition-colors mt-2 md:mt-4">
                Welcome to Hands-Free Plant Care →
              </a>
            </motion.div>
          </div>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
          {FEATURES.map((f, i) => (
            <motion.div key={f.title} {...fadeUp(0.08 * i)}
              className="glass-card shimmer rounded-xl md:rounded-2xl p-4 md:p-6 group"
              style={{ border: '1px solid rgba(82,214,138,0.1)', transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)' }}
              whileHover={{ y: -6, borderColor: 'rgba(82,214,138,0.3)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(82,214,138,0.1)' }}
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center mb-3 md:mb-5"
                style={{ background: 'rgba(82,214,138,0.08)', border: '1px solid rgba(82,214,138,0.15)' }}>
                {f.icon}
              </div>
              <h4 className="font-heading font-semibold text-sage text-sm md:text-base mb-2 md:mb-3 leading-tight">{f.title}</h4>
              <p className="font-body text-ash/65 text-xs leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div {...fadeUp(0.3)} className="mt-10 md:mt-16 text-center">
          <a href="#contact" className="btn-primary" style={{
            background: 'linear-gradient(135deg, #52D68A 0%, #2A7A4E 100%)',
            boxShadow: '0 4px 24px rgba(82,214,138,0.38), inset 0 1px 0 rgba(255,255,255,0.2)',
          }}>
            Activate Smart Plant Care →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
