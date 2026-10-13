import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 48 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, margin: '-60px' },
  transition:  { duration: 1, delay, ease: [0.16, 1, 0.3, 1] },
});

// Animated count-up hook
function useCountUp(target, inView, duration = 1600) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = null;
    const num = parseInt(target);
    if (isNaN(num)) { setVal(target); return; }
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(progress * num));
      if (progress < 1) requestAnimationFrame(step);
      else setVal(num);
    };
    requestAnimationFrame(step);
  }, [inView, target]);
  return val;
}

function StatCard({ value, label, suffix = '', delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const count = useCountUp(value, inView);
  return (
    <motion.div
      ref={ref}
      {...fadeUp(delay)}
      className="glass-card shimmer rounded-2xl p-4 md:p-5 text-center"
    >
      <div className="font-heading font-bold text-xl md:text-3xl stat-number text-gradient-violet mb-1">
        {typeof count === 'number' ? count : value}{suffix}
      </div>
      <div className="font-ui text-[9px] md:text-[10px] tracking-widest uppercase text-ash/70 leading-tight">
        {label}
      </div>
    </motion.div>
  );
}

const STATS = [
  { value: 200, suffix: '+', label: 'Spaces Elevated' },
  { value: 3,   suffix: '',  label: 'Core Disciplines' },
  { value: 100, suffix: '%', label: 'Hands-Free Promise' },
];

export default function Introduction() {
  return (
    <section id="philosophy" className="relative py-24 md:py-36 lg:py-40 px-5 sm:px-8 overflow-hidden section-offset">
      {/* BG glow */}
      <div className="absolute inset-0 pointer-events-none z-0"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(123,97,255,0.07) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center">

          {/* ── Left: Text ── */}
          <div>
            <motion.div {...fadeUp(0)} className="flex items-center gap-3 mb-6 md:mb-8">
              <div className="h-px w-10 bg-violet/60" />
              <span className="section-label">The Philosophy</span>
            </motion.div>

            <motion.h2 {...fadeUp(0.1)}
              className="font-heading font-bold leading-tight mb-6 md:mb-8"
              style={{ fontSize: 'clamp(1.9rem, 5vw, 4rem)' }}
            >
              Gravity Is{' '}
              <em className="text-gradient-silver font-display font-light not-italic">a Default.</em>
              <br />
              We Are{' '}
              <span className="text-gradient-violet">the Exception.</span>
            </motion.h2>

            <motion.div {...fadeUp(0.2)} className="space-y-4 font-body text-ash leading-[1.9] text-sm md:text-base lg:text-lg">
              <p>
                There is a version of your home that exists just above where you are now.
              </p>
              <p>
                A version where your <strong className="text-stellar/80">epoxy floor</strong> shimmers like a still lake — where your
                <strong className="text-stellar/80"> balcony garden</strong> grows with quiet intelligence. Where every
                surface, texture, and living element has been considered, calibrated, and elevated beyond
                anything a conventional <em>interior designer</em> or <em>flooring contractor</em> would conceive.
              </p>
              <p className="text-stellar/80">
                <span className="font-heading font-semibold text-violet">ABOVE°</span> is Pune's concept living studio —
                combining next-generation <strong className="text-stellar/70">decorative flooring</strong>, premium
                <strong className="text-stellar/70"> landscape design</strong>, and intelligent
                <strong className="text-stellar/70"> plant care technology</strong> under one visionary roof.
              </p>
              <p className="italic font-display text-base md:text-lg text-silver/75">
                What we do isn't heavy. That's rather the point.
              </p>
            </motion.div>

            <motion.div {...fadeUp(0.35)} className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-3">
              <a href="#services" className="btn-primary">Explore Our World →</a>
              <a href="#contact"  className="btn-ghost">Get Free Quote</a>
            </motion.div>
          </div>

          {/* ── Right: Cards ── */}
          <div className="flex flex-col gap-4 md:gap-5">
            {/* Manifesto card */}
            <motion.div {...fadeUp(0.2)}
              className="glass-card shimmer glow-border rounded-2xl md:rounded-3xl p-6 md:p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-violet via-violet/60 to-transparent" />
              <blockquote className="font-display text-lg md:text-2xl font-light italic text-stellar/85 leading-snug mb-4 md:mb-5">
                "Every home carries weight — the weight of neglect, of the ordinary,
                of a space that has forgotten its own potential."
              </blockquote>
              <p className="font-body text-ash text-xs md:text-sm">— ABOVE° Manifesto</p>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              {STATS.map((s, i) => (
                <StatCard key={s.label} value={s.value} suffix={s.suffix} label={s.label} delay={0.3 + i * 0.08} />
              ))}
            </div>

            {/* Location badge */}
            <motion.div {...fadeUp(0.5)}
              className="glass-card shimmer rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 flex items-center gap-3 md:gap-4"
            >
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-violet/12 flex items-center justify-center flex-shrink-0">
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-violet animate-pulse" />
              </div>
              <div className="min-w-0">
                <div className="font-ui text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-ash mb-0.5">Serving</div>
                <div className="font-body text-stellar/80 text-xs md:text-sm truncate">Pune · Mumbai · Maharashtra</div>
              </div>
              <div className="ml-auto shrink-0 h-6 w-px bg-violet/20" />
              <div className="font-display italic text-violet/70 text-xs md:text-sm shrink-0">Est. 2024</div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
