import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const fu = (d = 0) => ({
  initial:     { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, margin: '-60px' },
  transition:  { duration: 0.9, delay: d, ease: [0.16,1,0.3,1] },
});

const REVIEWS = [
  {
    text: `ABOVE° transformed our bare concrete balcony into a lush tropical garden. Their landscaping team understood our vision instantly — it now feels like we have an extra room. Every guest asks about it.`,
    name: 'Rahul & Priya S.', loc: 'Koregaon Park, Pune', service: 'Balcony Garden Design', stars: 5,
  },
  {
    text: `The 3D epoxy floor in our living room is absolutely stunning. I had seen it in magazines but never thought I could have it at home. ABOVE°'s finish is flawless. Best alternative to tiles we ever chose.`,
    name: 'Arjun K.', loc: 'Baner, Pune', service: '3D Epoxy Flooring', stars: 5,
  },
  {
    text: `Hypercare is genuinely the most invisible luxury. My indoor plant collection went from constantly stressed to thriving, and I haven't had to think about watering in three months. Worth every rupee.`,
    name: 'Neha M.', loc: 'Mumbai', service: 'Hypercare Plant Monitoring', stars: 5,
  },
];

function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 16 16" fill="#FCD34D">
          <path d="M8 1l2 4.5H15l-4 3 1.5 5L8 11 3.5 13.5 5 8.5 1 5.5h5z"/>
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  return (
    <section className="bg-cream py-20 md:py-28 px-5 sm:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div {...fu(0)} className="flex items-center justify-center gap-3 mb-5">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-forest/50" />
          <span className="section-label text-forest/60">Client Stories</span>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-forest/50" />
        </motion.div>
        <motion.h2 {...fu(0.08)}
          className="font-heading font-bold text-ink text-center mb-3"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
        >
          We Don't Settle for{' '}
          <span className="text-gradient-green">Ordinary.</span>
        </motion.h2>
        <motion.p {...fu(0.15)} className="text-center text-ash text-sm md:text-base font-body mb-10 md:mb-14 max-w-xl mx-auto">
          Real transformations. Real clients. Real results.
        </motion.p>

        <motion.div {...fu(0.2)}
          className="card-light rounded-3xl p-6 sm:p-8 md:p-10 relative overflow-hidden mb-6">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-forest via-sage to-forest opacity-60" />

          <AnimatePresence mode="wait">
            <motion.div key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.16,1,0.3,1] }}
            >
              <div className="flex items-center gap-3 mb-5">
                <Stars count={REVIEWS[active].stars} />
                <span className="font-ui text-[10px] tracking-widest uppercase px-3 py-1 rounded-full"
                  style={{ background: 'rgba(46,125,50,0.1)', border: '1px solid rgba(46,125,50,0.2)', color: '#2E7D32' }}>
                  {REVIEWS[active].service}
                </span>
              </div>

              <blockquote className="font-display italic text-lg md:text-2xl text-ink/85 leading-relaxed mb-7">
                "{REVIEWS[active].text}"
              </blockquote>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-forest/12 border border-forest/20 flex items-center justify-center">
                  <span className="font-heading font-bold text-forest text-sm">{REVIEWS[active].name[0]}</span>
                </div>
                <div>
                  <div className="font-heading font-bold text-ink text-sm">{REVIEWS[active].name}</div>
                  <div className="font-ui text-[10px] text-ash">{REVIEWS[active].loc}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Dot nav */}
        <div className="flex items-center justify-center gap-2.5">
          {REVIEWS.map((_, i) => (
            <button key={i} onClick={() => setActive(i)}
              className="rounded-full transition-all duration-300"
              style={{ width: i === active ? '28px' : '8px', height: '8px',
                background: i === active ? '#2E7D32' : 'rgba(46,125,50,0.25)' }}
              aria-label={`Review ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
