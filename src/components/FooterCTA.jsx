import { useState } from 'react';
import { motion } from 'framer-motion';

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, margin: '-60px' },
  transition:  { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
});

const INPUT_CLS = `
  w-full bg-void-800/60 border border-silver/10 rounded-xl px-4 py-3.5 md:px-5 md:py-4
  font-body text-stellar text-sm placeholder:text-ash/45
  focus:outline-none focus:border-violet/45 focus:bg-void-800
  transition-all duration-300
`;

export default function FooterCTA() {
  const [form, setForm]   = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [sent, setSent]   = useState(false);
  const [focus, setFocus] = useState('');

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => { e.preventDefault(); setSent(true); };

  return (
    <>
      {/* ── Contact / CTA section ── */}
      <section id="contact" className="relative py-24 md:py-36 lg:py-40 px-5 sm:px-8 overflow-hidden section-offset"
        aria-label="Book a Free Home Design Consultation in Pune">
        {/* Background */}
        <div className="absolute inset-0 z-0"
          style={{ background: 'linear-gradient(180deg, #0A0A0F 0%, #110B30 40%, #0A0A0F 100%)' }} />
        <div className="absolute inset-0 z-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 55%, rgba(123,97,255,0.11) 0%, transparent 70%)' }} />

        {/* Floating orbs — overflow-hidden on parent */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-10 left-5 md:left-10 w-48 h-48 md:w-64 md:h-64 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(123,97,255,0.14) 0%, transparent 70%)', filter: 'blur(50px)', animation: 'floatSlow 9s ease-in-out infinite' }} />
          <div className="absolute bottom-20 right-5 md:right-10 w-56 h-56 md:w-80 md:h-80 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(82,214,138,0.08) 0%, transparent 70%)', filter: 'blur(60px)', animation: 'floatSlow 11s ease-in-out infinite', animationDelay: '3s' }} />
        </div>

        <div className="relative z-10 max-w-3xl md:max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10 md:mb-16">
            <motion.div {...fadeUp(0)} className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-8 md:w-12 bg-gradient-to-r from-transparent to-violet/60" />
              <span className="section-label">Book a Free Consultation</span>
              <div className="h-px w-8 md:w-12 bg-gradient-to-l from-transparent to-violet/60" />
            </motion.div>

            <motion.h2 {...fadeUp(0.1)}
              className="font-heading font-bold leading-tight mb-4 md:mb-6"
              style={{ fontSize: 'clamp(2rem, 5.5vw, 4rem)' }}
            >
              Your Space Is Ready
              <br />
              <span className="text-gradient-violet">To Break Free.</span>
            </motion.h2>

            <motion.p {...fadeUp(0.2)}
              className="font-body text-ash text-sm md:text-lg leading-relaxed max-w-lg mx-auto mb-3">
              Whether you're looking for luxury epoxy flooring, a balcony garden makeover, custom interior design,
              or a smart plant care system — tell us your space. We'll show you what it can become.
            </motion.p>
            <motion.p {...fadeUp(0.25)} className="font-ui text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-ash/55">
              Complimentary · Confidential · Transformative
            </motion.p>
          </div>

          {/* Form */}
          {!sent ? (
            <motion.form {...fadeUp(0.2)} onSubmit={handleSubmit}
              className="glass-card shimmer glow-border rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 relative overflow-hidden"
              style={{ border: '1px solid rgba(123,97,255,0.14)' }}
            >
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet/50 to-transparent rounded-t-3xl" />
              <div className="absolute top-0 left-0 w-48 h-48 md:w-64 md:h-64 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle at 0 0, rgba(123,97,255,0.07), transparent 70%)' }} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 mb-4 md:mb-5 relative z-10">
                {[
                  { name: 'name',  type: 'text',  label: 'Full Name',      placeholder: 'Your name',        req: true },
                  { name: 'email', type: 'email', label: 'Email Address',  placeholder: 'your@email.com',   req: true },
                  { name: 'phone', type: 'tel',   label: 'Phone Number',   placeholder: '+91 00000 00000',  req: false },
                ].map((f) => (
                  <div key={f.name} className={f.name === 'name' ? 'sm:col-span-2 md:col-span-1' : ''}>
                    <label className="font-ui text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-ash/65 mb-1.5 md:mb-2 block">
                      {f.label}
                    </label>
                    <input name={f.name} type={f.type} placeholder={f.placeholder}
                      value={form[f.name]} onChange={handleChange} required={f.req}
                      onFocus={() => setFocus(f.name)} onBlur={() => setFocus('')}
                      className={INPUT_CLS}
                      style={focus === f.name ? { boxShadow: '0 0 0 3px rgba(123,97,255,0.15)' } : {}}
                    />
                  </div>
                ))}

                <div>
                  <label className="font-ui text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-ash/65 mb-1.5 md:mb-2 block">
                    Service Interest
                  </label>
                  <select name="service" value={form.service} onChange={handleChange}
                    onFocus={() => setFocus('service')} onBlur={() => setFocus('')}
                    className={INPUT_CLS + ' cursor-pointer'}
                    style={{
                      colorScheme: 'dark',
                      ...(focus === 'service' ? { boxShadow: '0 0 0 3px rgba(123,97,255,0.15)' } : {}),
                    }}
                  >
                    <option value="">Select a service</option>
                    <option value="epoxy">Epoxy / 3D Flooring</option>
                    <option value="landscapes">Balcony Garden & Landscaping</option>
                    <option value="hypercare">Smart Plant Care (Hypercare)</option>
                    <option value="interior">Interior Design & Home Decor</option>
                    <option value="all">All Services</option>
                  </select>
                </div>
              </div>

              <div className="mb-6 md:mb-8 relative z-10">
                <label className="font-ui text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-ash/65 mb-1.5 md:mb-2 block">
                  Tell Us About Your Space
                </label>
                <textarea name="message" placeholder="Describe your space, vision, or questions (flooring type, garden size, indoor plant needs...)..."
                  value={form.message} onChange={handleChange} rows={4}
                  onFocus={() => setFocus('message')} onBlur={() => setFocus('')}
                  className={INPUT_CLS + ' resize-none'}
                  style={focus === 'message' ? { boxShadow: '0 0 0 3px rgba(123,97,255,0.15)' } : {}}
                />
              </div>

              <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3 md:gap-4">
                <button type="submit" className="btn-primary w-full sm:w-auto">
                  <span>Book My Free Consultation</span>
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <p className="font-ui text-[9px] md:text-[10px] tracking-widest uppercase text-ash/45 text-center sm:text-left">
                  No commitment · Response within 24hrs
                </p>
              </div>
            </motion.form>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card rounded-2xl md:rounded-3xl p-10 md:p-14 text-center"
              style={{ border: '1px solid rgba(123,97,255,0.25)' }}
            >
              <motion.div
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-violet/12 border border-violet/28 flex items-center justify-center mx-auto mb-5 md:mb-6"
              >
                <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
                  <path d="M7 14l5 5 9-9" stroke="#7B61FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
              <h3 className="font-heading font-bold text-xl md:text-2xl text-stellar mb-3">You're Floating Up.</h3>
              <p className="font-body text-ash text-sm md:text-lg leading-relaxed max-w-md mx-auto">
                We've received your request and will be in touch within 24 hours to begin transforming your space.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative border-t border-silver/5 px-5 sm:px-8 py-12 md:py-16 bg-void-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 mb-10 md:mb-14">
            {/* Brand col */}
            <div className="col-span-2 md:col-span-1">
              <a href="#" className="flex items-center gap-2.5 mb-4 md:mb-5">
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-violet/14 border border-violet/28 flex items-center justify-center">
                  <span className="text-violet text-xs font-heading font-bold">A</span>
                </div>
                <span className="font-heading font-bold text-base md:text-lg tracking-widest text-stellar uppercase">
                  ABOVE<span className="text-violet">°</span>
                </span>
              </a>
              <p className="font-body text-ash/65 text-xs md:text-sm leading-relaxed mb-4 md:mb-5">
                Concept Living Studio, Pune.<br />
                Premium epoxy flooring, balcony garden design &amp; smart plant care — engineered for those who live above the ordinary.
              </p>
              <div className="flex gap-2.5 md:gap-3">
                {['IG', 'IN', 'PT'].map((s) => (
                  <a key={s} href="#"
                    className="w-8 h-8 md:w-9 md:h-9 rounded-full border border-silver/10 flex items-center justify-center font-ui text-[9px] md:text-[10px] text-ash hover:border-violet/40 hover:text-violet transition-colors">
                    {s}
                  </a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <div className="font-ui text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-ash/45 mb-4 md:mb-5">Services</div>
              {[
                ['Epoxy Flooring', '#services'],
                ['3D Floor Design', '#services'],
                ['Garden Landscaping', '#services'],
                ['Smart Plant Care', '#hypercare'],
                ['Interior Design', '#services'],
              ].map(([l, h]) => (
                <a key={l} href={h} className="block font-body text-xs md:text-sm text-ash/65 hover:text-stellar mb-2.5 md:mb-3 transition-colors">{l}</a>
              ))}
            </div>

            {/* Company */}
            <div>
              <div className="font-ui text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-ash/45 mb-4 md:mb-5">Company</div>
              {['Our Story', 'The Technology', 'Press', 'Careers'].map((l) => (
                <a key={l} href="#" className="block font-body text-xs md:text-sm text-ash/65 hover:text-stellar mb-2.5 md:mb-3 transition-colors">{l}</a>
              ))}
            </div>

            {/* Connect */}
            <div>
              <div className="font-ui text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-ash/45 mb-4 md:mb-5">Connect</div>
              {['Instagram', 'Pinterest', 'LinkedIn', 'Contact Us'].map((l) => (
                <a key={l} href="#" className="block font-body text-xs md:text-sm text-ash/65 hover:text-stellar mb-2.5 md:mb-3 transition-colors">{l}</a>
              ))}
            </div>
          </div>

          <div className="divider-silver mb-6 md:mb-8" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4 text-center md:text-left">
            <p className="font-ui text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-ash/35">
              © 2024 ABOVE° Concept Living, Pune. All rights reserved.
            </p>
            <p className="font-display italic text-ash/25 text-xs md:text-sm order-last md:order-none">
              Engineered for those who live above the ordinary.
            </p>
            <div className="flex gap-4 md:gap-6">
              {['Privacy Policy', 'Terms'].map((l) => (
                <a key={l} href="#" className="font-ui text-[9px] md:text-[10px] tracking-[0.15em] uppercase text-ash/35 hover:text-ash/65 transition-colors">{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
