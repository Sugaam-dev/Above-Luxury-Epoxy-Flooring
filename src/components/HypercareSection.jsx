import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import UnifiedHypercareDashboardFrame from './UnifiedHypercareDashboardFrame';

const fu = (d = 0) => ({
  initial:     { opacity: 0, y: 44 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, margin: '-60px' },
  transition:  { duration: 0.95, delay: d, ease: [0.16,1,0.3,1] },
});

// ── Animated dashboard mockup ──
const PLANTS = [
  { name: 'Monstera Deliciosa', health: 96, moisture: 72, light: 85, status: 'Thriving' },
  { name: 'Fiddle Leaf Fig',    health: 88, moisture: 58, light: 90, status: 'Good' },
  { name: 'Peace Lily',         health: 92, moisture: 81, light: 64, status: 'Thriving' },
  { name: 'Golden Pothos',      health: 78, moisture: 44, light: 70, status: 'Needs Water' },
];
const METRICS = [
  { label: 'Soil Moisture', unit: '%', color: '#52D68A' },
  { label: 'Light Exposure', unit: '%', color: '#FCD34D' },
  { label: 'Overall Health', unit: '%', color: '#60A5FA' },
];

function DashboardBar({ value, color, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="dash-bar">
      <motion.div
        className="dash-fill"
        initial={{ width: '0%' }}
        animate={inView ? { width: `${value}%` } : { width: '0%' }}
        transition={{ duration: 1.4, delay, ease: [0.16,1,0.3,1] }}
        style={{ background: `linear-gradient(90deg, ${color}80, ${color})` }}
      />
    </div>
  );
}

function HypercareDashboard() {
  const [activePlant, setActivePlant] = useState(0);
  const p = PLANTS[activePlant];

  return (
    <div className="relative rounded-2xl overflow-hidden"
      style={{
        background: 'linear-gradient(145deg,rgba(10,20,10,0.98),rgba(20,40,20,0.96))',
        border: '1px solid rgba(82,214,138,0.15)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(82,214,138,0.08)',
      }}
    >
      {/* Dashboard top bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/6">
        <div className="flex gap-1.5">
          {['#FF5F57','#FFBD2E','#28CA41'].map(c => (
            <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
          ))}
        </div>
        <div className="mx-auto font-ui text-[10px] tracking-widest uppercase text-sage/60">
          Hypercare · Live Dashboard
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-sage animate-blink" />
          <span className="font-ui text-[9px] text-sage/60">LIVE</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-0">
        {/* Left: plant list */}
        <div className="col-span-1 border-r border-white/6 p-3 md:p-4">
          <div className="font-ui text-[8px] md:text-[9px] tracking-[0.2em] uppercase text-sage/40 mb-3">My Plants</div>
          {PLANTS.map((pl, i) => (
            <button key={i} onClick={() => setActivePlant(i)}
              className={`w-full flex items-center gap-2 p-2 md:p-2.5 rounded-lg mb-1.5 transition-all duration-300 text-left ${activePlant === i ? 'bg-sage/15' : 'hover:bg-white/4'}`}>
              <div className="w-6 h-6 md:w-7 md:h-7 rounded-full flex-shrink-0 flex items-center justify-center"
                style={{ background: 'rgba(82,214,138,0.15)', border: '1px solid rgba(82,214,138,0.2)' }}>
                <span className="text-xs">🌿</span>
              </div>
              <div className="min-w-0">
                <div className="font-ui text-[8px] md:text-[9px] text-stellar/80 leading-tight truncate">{pl.name.split(' ')[0]}</div>
                <div className={`font-ui text-[7px] md:text-[8px] leading-tight ${
                  pl.status === 'Thriving' ? 'text-sage' : pl.status === 'Good' ? 'text-yellow-400' : 'text-orange-400'
                }`}>{pl.status}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Center: main readouts */}
        <div className="col-span-2 p-3 md:p-5">
          <div className="flex items-start justify-between mb-4 md:mb-5">
            <div>
              <div className="font-ui text-[8px] md:text-[9px] tracking-widest uppercase text-sage/40 mb-0.5">Currently Viewing</div>
              <div className="font-heading font-bold text-stellar text-xs md:text-sm leading-tight">{p.name}</div>
            </div>
            <div className="text-right">
              <div className="font-heading font-bold text-sage text-xl md:text-2xl">{p.health}%</div>
              <div className="font-ui text-[8px] uppercase text-sage/50">Health Score</div>
            </div>
          </div>

          {/* Metric bars */}
          <div className="space-y-3 md:space-y-4 mb-4 md:mb-5">
            {[
              { label: 'Soil Moisture',  value: p.moisture, color: '#52D68A',  unit: '%' },
              { label: 'Light Exposure', value: p.light,    color: '#FCD34D',  unit: '%' },
              { label: 'Overall Health', value: p.health,   color: '#60A5FA',  unit: '%' },
            ].map((m, i) => (
              <div key={m.label}>
                <div className="flex justify-between mb-1">
                  <span className="font-ui text-[8px] md:text-[9px] tracking-widest uppercase" style={{ color: `${m.color}80` }}>{m.label}</span>
                  <span className="font-ui text-[8px] md:text-[9px] font-medium" style={{ color: m.color }}>{m.value}{m.unit}</span>
                </div>
                <DashboardBar value={m.value} color={m.color} delay={0.2 + i * 0.1} />
              </div>
            ))}
          </div>

          {/* Notification */}
          <div className="rounded-lg p-2.5 md:p-3"
            style={{ background: 'rgba(82,214,138,0.08)', border: '1px solid rgba(82,214,138,0.15)' }}>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse flex-shrink-0" />
              <span className="font-ui text-[8px] md:text-[9px] text-sage/80">
                {p.status === 'Needs Water' ? '⚠ Moisture low — auto-alert sent' : '✓ All conditions optimal'}
              </span>
            </div>
          </div>

          {/* Mini chart area (decorative) */}
          <div className="mt-3 md:mt-4">
            <div className="font-ui text-[8px] uppercase text-stellar/25 mb-2">7-Day Moisture Trend</div>
            <div className="flex items-end gap-1 h-8">
              {[62,58,71,68,74,72,p.moisture].map((v, i) => (
                <motion.div key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${(v / 100) * 32}px` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.06, ease: [0.16,1,0.3,1] }}
                  className="flex-1 rounded-t-sm"
                  style={{ background: i === 6 ? '#52D68A' : 'rgba(82,214,138,0.3)', minHeight: '4px' }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const FEATURES = [
  { icon: '🌡', title: 'Soil Intelligence', desc: 'Real-time moisture and nutrient sensing across all your indoor and outdoor plants.' },
  { icon: '☀️', title: 'Light Tracking', desc: 'Ambient light monitoring that adapts care schedules to seasonal and daily changes.' },
  { icon: '📊', title: 'Live Dashboard', desc: 'Clean mobile dashboard with health scores, trend charts, and intelligent alerts.' },
  { icon: '🤖', title: 'Auto Response', desc: 'Automated alerts and optional integration with smart watering systems.' },
];

export default function HypercareSection() {
  return (
    <section id="hypercare" className="relative section-offset"
      style={{ background: 'linear-gradient(180deg,#061510 0%,#0A1A10 50%,#061510 100%)' }}>

      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.12]"
        style={{ backgroundImage: 'radial-gradient(circle,rgba(82,214,138,0.7) 1px,transparent 1px)', backgroundSize: '44px 44px' }} />

      <div className="relative z-10 py-20 md:py-28 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="text-center mb-14 md:mb-18">
            <motion.div {...fu(0)} className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-sage/60" />
              <span className="section-label text-sage/70">Pillar 03</span>
              <div className="h-px w-10 bg-gradient-to-l from-transparent to-sage/60" />
            </motion.div>
            <motion.h2 {...fu(0.08)}
              className="font-heading font-bold text-white leading-tight mb-4"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.8rem)' }}
            >
              Weightless{' '}
              <span className="text-gradient-sage">Hypercare</span>
              <br />
              <span className="text-stellar/50 font-light text-xl md:text-2xl">Automated Plant &amp; Soil Intelligence</span>
            </motion.h2>
            <motion.p {...fu(0.15)} className="font-display italic text-sage/60 text-base md:text-xl max-w-2xl mx-auto">
              "The most advanced garden system in the world is the one you never have to think about."
            </motion.p>
          </div>

          {/* Unified Interactive Dashboard & Multi-Image Gallery (Combined into ONE Iframe Container) */}
          <motion.div {...fu(0.1)} className="mb-14">
            <UnifiedHypercareDashboardFrame />
          </motion.div>

          {/* Split: description & feature grid */}
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-start mb-14 md:mb-18">
            <div className="space-y-5">
              <motion.p {...fu(0.2)} className="font-body text-stellar/60 text-sm md:text-base lg:text-lg leading-relaxed">
                Hypercare is ABOVE°'s intelligent monitoring ecosystem — a discreet network of
                precision sensors embedded throughout your designed landscape. Whether indoors or
                on your balcony garden, the system tracks <strong className="text-sage/80">soil moisture</strong>,
                <strong className="text-sage/80"> nutrient levels</strong>,
                <strong className="text-sage/80"> light exposure</strong>, and environmental conditions 24/7.
              </motion.p>
              <motion.p {...fu(0.28)} className="font-body text-stellar/50 text-sm md:text-base leading-relaxed">
                No watering reminders. No guessing why a leaf turned. No seasonal anxiety.
                Just thriving, curated greenery — sustained by intelligence you never have to manage.
              </motion.p>
              <motion.p {...fu(0.35)} className="font-display italic text-lg text-sage/60 leading-relaxed">
                For those who want lush indoor plants and balcony gardens without the daily
                burden of garden maintenance — Hypercare is the only answer.
              </motion.p>

              <motion.div {...fu(0.5)} className="flex flex-col sm:flex-row gap-3 pt-2">
                <a href="#contact" className="btn-green w-full sm:w-auto"
                  style={{ background: 'linear-gradient(135deg,#2E7D32,#388E3C)' }}>
                  Activate Hypercare →
                </a>
                <a
                  href="https://wa.me/918888159579?text=Hi%20ABOVE%C2%B0!%20I'm%20interested%20in%20a%20Hypercare%20Smart%20Plant%20demo."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-white w-full sm:w-auto border-sage/40 text-sage hover:bg-sage/10"
                >
                  💬 WhatsApp Demo (+91 88881 59579)
                </a>
              </motion.div>
            </div>

            {/* Feature grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {FEATURES.map((f, i) => (
                <motion.div key={f.title} {...fu(0.3 + i * 0.07)}
                  className="rounded-xl p-4 md:p-5 group"
                  style={{ background: 'rgba(82,214,138,0.06)', border: '1px solid rgba(82,214,138,0.12)', transition: 'all 0.4s ease' }}
                  whileHover={{ borderColor: 'rgba(82,214,138,0.3)', background: 'rgba(82,214,138,0.1)', y: -4 }}
                >
                  <div className="text-2xl mb-2">{f.icon}</div>
                  <h4 className="font-heading font-bold text-sage text-sm md:text-base mb-1.5">{f.title}</h4>
                  <p className="font-body text-stellar/45 text-xs leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Stats stripe */}
          <motion.div {...fu(0.2)}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 rounded-2xl overflow-hidden"
            style={{ background: 'rgba(82,214,138,0.06)', border: '1px solid rgba(82,214,138,0.12)' }}
          >
            {[
              { v: '24/7', l: 'Continuous Monitoring' },
              { v: '4+',  l: 'Sensors Per Zone' },
              { v: '100%', l: 'Hands-Free Operation' },
              { v: 'Live', l: 'Mobile Dashboard' },
            ].map((s, i) => (
              <div key={i} className={`flex flex-col items-center text-center py-6 md:py-8 px-4 ${i < 3 ? 'md:border-r border-sage/10' : ''}`}>
                <div className="font-heading font-bold text-sage text-2xl md:text-3xl mb-1">{s.v}</div>
                <div className="font-ui text-[9px] md:text-[10px] tracking-widest uppercase text-sage/40">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
