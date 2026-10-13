import { useState } from 'react';
import { motion } from 'framer-motion';

const fu = (d = 0) => ({
  initial:     { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, margin: '-50px' },
  transition:  { duration: 0.9, delay: d, ease: [0.16,1,0.3,1] },
});

const INPUT_CLS = `
  w-full bg-white border border-black/10 rounded-xl px-4 py-3.5
  font-body text-ink text-sm placeholder:text-ash/50
  focus:outline-none focus:border-forest/40 focus:ring-2 focus:ring-forest/10
  transition-all duration-300
`;

export default function ContactFooter() {
  const [form, setForm]   = useState({ name:'', email:'', phone:'', service:'', message:'' });
  const [sent, setSent]   = useState(false);
  const handleChange = e  => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = e  => { e.preventDefault(); setSent(true); };

  return (
    <>
      {/* ── Smart CTA Banner ── */}
      <section className="relative overflow-hidden py-16 md:py-20 px-5 sm:px-8 stripe-accent">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle,white 1px,transparent 1px)', backgroundSize:'32px 32px' }} />
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <motion.div {...fu(0)} className="font-ui text-[10px] tracking-[0.3em] uppercase text-white/60 mb-3">
                Start Your Transformation
              </motion.div>
              <motion.h2 {...fu(0.07)}
                className="font-heading font-bold text-white leading-tight mb-4"
                style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3.2rem)' }}
              >
                Thoughtful improvements to make your outdoor space a genuine appearance.
              </motion.h2>
              <motion.div {...fu(0.15)} className="flex flex-col sm:flex-row gap-3">
                <a href="#contact" className="btn-outline-white">Book Free Consult →</a>
                <a href="https://wa.me/918888159579?text=Hi%20ABOVE%C2%B0!%20I'd%20like%20to%20consult%20about%20transforming%20my%20space."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-5 py-3 text-white font-ui text-sm font-medium hover:bg-white/25 transition-colors">
                  💬 WhatsApp: +91 88881 59579
                </a>
              </motion.div>
            </div>
            <motion.div {...fu(0.15)} className="grid grid-cols-2 gap-4">
              {[
                { icon:'🌿', label:'Garden Design',    href:'#landscapes' },
                { icon:'🪨', label:'Epoxy Flooring',   href:'#surfaces' },
                { icon:'💧', label:'Smart Plant Care', href:'#hypercare' },
                { icon:'🏠', label:'Interior Design',  href:'#contact' },
              ].map(s => (
                <a key={s.label} href={s.href}
                  className="flex flex-col items-center gap-2 bg-white/10 hover:bg-white/20 transition-all rounded-2xl p-4 md:p-5 backdrop-blur-sm border border-white/15 group">
                  <span className="text-2xl md:text-3xl">{s.icon}</span>
                  <span className="font-ui text-[10px] md:text-xs tracking-widest uppercase text-white/80 text-center group-hover:text-white transition-colors">{s.label}</span>
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Contact form ── */}
      <section id="contact" className="bg-cream py-20 md:py-28 px-5 sm:px-8 section-offset">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fu(0)} className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-forest/50" />
            <span className="section-label text-forest/60">Free Consultation</span>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-forest/50" />
          </motion.div>
          <motion.h2 {...fu(0.08)}
            className="font-heading font-bold text-ink text-center mb-3"
            style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3rem)' }}
          >
            Your Space Is Ready
            <br /><span className="text-gradient-green">To Break Free.</span>
          </motion.h2>
          <motion.p {...fu(0.15)} className="font-body text-ash text-center text-sm md:text-base mb-10 max-w-lg mx-auto">
            Whether you need luxury epoxy flooring, a balcony garden makeover, or a smart plant care system —
            tell us your space and we'll show you what it can become.
          </motion.p>

          {/* Quick WhatsApp helper bar */}
          <div className="mb-6 p-4 rounded-2xl bg-forest-pale border border-forest/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">⚡</span>
              <div>
                <div className="font-heading font-bold text-forest text-sm">Need a quick response?</div>
                <div className="font-ui text-xs text-forest/70">Chat directly with our design architects on WhatsApp.</div>
              </div>
            </div>
            <a
              href="https://wa.me/918888159579?text=Hi%20ABOVE%C2%B0!%20I'm%20looking%20for%20a%20consultation."
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-[#25D366] text-white font-ui text-xs font-semibold tracking-wider hover:bg-[#128C7E] transition-colors flex items-center gap-1.5 shadow-sm shrink-0"
            >
              <span>💬</span> Chat +91 88881 59579
            </a>
          </div>

          {!sent ? (
            <motion.form {...fu(0.2)} onSubmit={handleSubmit}
              className="card-light rounded-3xl p-6 sm:p-8 md:p-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {[
                  { name:'name',  type:'text',  label:'Full Name',     placeholder:'Your name',       req:true },
                  { name:'email', type:'email', label:'Email Address', placeholder:'your@email.com',  req:true },
                  { name:'phone', type:'tel',   label:'Phone Number / WhatsApp',  placeholder:'+91 88881 59579', req:false },
                ].map(f => (
                  <div key={f.name} className={f.name === 'name' ? 'sm:col-span-2 md:col-span-1' : ''}>
                    <label className="font-ui text-[10px] tracking-[0.2em] uppercase text-ash/70 mb-1.5 block">{f.label}</label>
                    <input name={f.name} type={f.type} placeholder={f.placeholder}
                      value={form[f.name]} onChange={handleChange} required={f.req}
                      className={INPUT_CLS} />
                  </div>
                ))}
                <div>
                  <label className="font-ui text-[10px] tracking-[0.2em] uppercase text-ash/70 mb-1.5 block">Service Interest</label>
                  <select name="service" value={form.service} onChange={handleChange}
                    className={INPUT_CLS + ' cursor-pointer'} style={{ colorScheme:'light' }}>
                    <option value="">Select a service</option>
                    <option value="epoxy">Epoxy / 3D Flooring</option>
                    <option value="landscapes">Balcony Garden &amp; Landscaping</option>
                    <option value="hypercare">Smart Plant Care (Hypercare)</option>
                    <option value="marble">Marble Effect Walls / 3D Walls</option>
                    <option value="all">All Services</option>
                  </select>
                </div>
              </div>
              <div className="mb-6">
                <label className="font-ui text-[10px] tracking-[0.2em] uppercase text-ash/70 mb-1.5 block">Tell Us About Your Space</label>
                <textarea name="message" placeholder="Describe your space, vision, or questions..."
                  value={form.message} onChange={handleChange} rows={4}
                  className={INPUT_CLS + ' resize-none'} />
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button type="submit" className="btn-green w-full sm:w-auto">
                  Book My Free Consultation →
                </button>
                <p className="font-ui text-[9px] uppercase tracking-widest text-ash/45 text-center">
                  No commitment · Response within 24 hrs
                </p>
              </div>
            </motion.form>
          ) : (
            <motion.div initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }}
              transition={{ duration:0.5, ease:[0.16,1,0.3,1] }}
              className="card-light rounded-3xl p-12 text-center">
              <motion.div initial={{ scale:0 }} animate={{ scale:1 }}
                transition={{ type:'spring', stiffness:200, delay:0.15 }}
                className="w-14 h-14 rounded-full bg-forest/10 border border-forest/20 flex items-center justify-center mx-auto mb-5">
                <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
                  <path d="M7 14l5 5 9-9" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
              <h3 className="font-heading font-bold text-2xl text-ink mb-3">Your Journey Begins.</h3>
              <p className="font-body text-ash text-base max-w-sm mx-auto mb-4">
                We'll be in touch within 24 hours to schedule your free consultation.
              </p>
              <a
                href="https://wa.me/918888159579?text=Hi%20ABOVE%C2%B0!%20I%20just%20submitted%20a%20consultation%20form."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-forest font-ui text-xs font-semibold tracking-wider hover:underline"
              >
                💬 Want an immediate update? Tap to message on WhatsApp
              </a>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-charcoal border-t border-white/6 px-5 sm:px-8 py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 mb-10">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-full bg-forest/25 border border-forest/40 flex items-center justify-center">
                  <span className="font-heading font-bold text-sage text-sm">A</span>
                </div>
                <span className="font-heading font-bold text-lg text-white tracking-widest uppercase">
                  ABOVE<span className="text-sage">°</span>
                </span>
              </div>
              <p className="font-body text-stellar/40 text-sm leading-relaxed mb-4">
                Concept Living Studio, Pune. Premium epoxy flooring, garden landscaping &amp; smart plant care.
              </p>
              <a
                href="https://wa.me/918888159579"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sage font-ui text-sm font-medium hover:text-sage/70 transition-colors flex items-center gap-1.5"
              >
                💬 +91 88881 59579 (WhatsApp)
              </a>
            </div>
            {[
              { title:'Services', links:[['Epoxy Flooring','#surfaces'],['3D Floor Design','#surfaces'],['Garden Landscaping','#landscapes'],['Smart Plant Care','#hypercare'],['Interior Design','#contact']] },
              { title:'Company', links:[['Our Story','#'],['Portfolio','#surfaces'],['Testimonials','#'],['Careers','#']] },
              { title:'Connect', links:[['WhatsApp: +91 88881 59579','https://wa.me/918888159579'],['Instagram','#'],['Pinterest','#'],['LinkedIn','#']] },
            ].map(col => (
              <div key={col.title}>
                <div className="font-ui text-[9px] tracking-[0.3em] uppercase text-stellar/30 mb-4">{col.title}</div>
                {col.links.map(([l, h]) => (
                  <a key={l} href={h}
                    target={h.startsWith('http') ? '_blank' : '_self'}
                    rel={h.startsWith('http') ? 'noopener noreferrer' : ''}
                    className="block font-body text-xs md:text-sm text-stellar/45 hover:text-stellar mb-2.5 transition-colors">{l}</a>
                ))}
              </div>
            ))}
          </div>
          <div className="h-px bg-white/6 mb-6" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
            <p className="font-ui text-[9px] tracking-[0.2em] uppercase text-stellar/25">
              © 2024 ABOVE° Concept Living, Pune. All rights reserved.
            </p>
            <p className="font-display italic text-stellar/20 text-xs">
              Engineered for those who live above the ordinary.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
