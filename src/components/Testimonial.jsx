import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TESTIMONIALS = [
  {
    quote: `Walking into my home after ABOVE° finished the 3D epoxy floor feels like entering a different dimension. Every guest stops the moment they step in — it's the most talked-about feature of our home renovation.`,
    name: 'Rahul S.',
    location: 'Pune, India',
    service: 'Epoxy Flooring',
  },
  {
    quote: `Our balcony garden went from dead concrete to a living sanctuary in three weeks. ABOVE°'s landscape design team understood our space better than any interior designer we had consulted before.`,
    name: 'Priya M.',
    location: 'Mumbai, India',
    service: 'Garden Landscaping',
  },
  {
    quote: `I haven't thought about watering my plants or buying garden supplies in four months. Hypercare just works. It's the most invisible luxury I've ever added to our home decor.`,
    name: 'Arjun K.',
    location: 'Bangalore, India',
    service: 'Smart Plant Care',
  },
];

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, margin: '-60px' },
  transition:  { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
});

export default function Testimonial() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative py-24 md:py-36 px-5 sm:px-8 overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0 z-0"
        style={{ background: 'linear-gradient(180deg, #0A0A0F 0%, #0E0820 50%, #0A0A0F 100%)' }} />
      <div className="absolute inset-0 z-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(123,97,255,0.06) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-3xl md:max-w-4xl mx-auto text-center">
        {/* Header */}
        <motion.div {...fadeUp(0)} className="flex items-center justify-center gap-3 mb-5 md:mb-6">
          <div className="h-px w-8 md:w-12 bg-gradient-to-r from-transparent to-violet/60" />
          <span className="section-label">Trusted by Those Who Demand More</span>
          <div className="h-px w-8 md:w-12 bg-gradient-to-l from-transparent to-violet/60" />
        </motion.div>

        <motion.h2 {...fadeUp(0.1)}
          className="font-heading font-bold mb-10 md:mb-16 leading-tight"
          style={{ fontSize: 'clamp(1.6rem, 4vw, 3rem)' }}
        >
          We Don't Just Raise the Bar.{' '}
          <span className="text-gradient-violet">We Remove the Ceiling.</span>
        </motion.h2>

        {/* Card */}
        <motion.div {...fadeUp(0.2)}
          className="glass-card shimmer rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 relative overflow-hidden mb-6 md:mb-8"
          style={{ border: '1px solid rgba(123,97,255,0.12)' }}
        >
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet/50 to-transparent" />

          {/* Big quote mark */}
          <div className="font-display text-6xl md:text-8xl text-violet/12 leading-none mb-4 md:mb-6 select-none text-left">
            "
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={active}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <blockquote className="font-display text-base sm:text-lg md:text-2xl font-light italic text-stellar/90 leading-relaxed mb-6 md:mb-8 text-left">
                {TESTIMONIALS[active].quote}
              </blockquote>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-violet/18 border border-violet/28 flex items-center justify-center flex-shrink-0">
                    <span className="font-heading font-bold text-violet text-sm">
                      {TESTIMONIALS[active].name[0]}
                    </span>
                  </div>
                  <div className="text-left">
                    <div className="font-ui font-medium text-xs md:text-sm text-stellar">{TESTIMONIALS[active].name}</div>
                    <div className="font-ui text-[10px] md:text-xs text-ash">{TESTIMONIALS[active].location}</div>
                  </div>
                </div>
                <div className="sm:ml-auto">
                  <span className="font-ui text-[9px] md:text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full"
                    style={{ background: 'rgba(123,97,255,0.1)', border: '1px solid rgba(123,97,255,0.22)', color: '#A08BFF' }}>
                    {TESTIMONIALS[active].service}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Dot nav */}
        <div className="flex items-center justify-center gap-2 md:gap-3">
          {TESTIMONIALS.map((_, i) => (
            <button key={i} onClick={() => setActive(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === active ? '28px' : '8px',
                height: '8px',
                background: i === active ? '#7B61FF' : 'rgba(123,97,255,0.28)',
              }}
              aria-label={`Review ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
