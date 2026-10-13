import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Gardens',  href: '#landscapes' },
  { label: 'Surfaces', href: '#surfaces' },
  { label: 'Hypercare',href: '#hypercare' },
  { label: 'Gallery',  href: '#surfaces' },
  { label: 'Contact',  href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0,   opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16,1,0.3,1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/92 backdrop-blur-xl border-b border-black/6 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-[72px] md:h-20">

        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="relative w-8 h-8 md:w-9 md:h-9">
            <div className={`absolute inset-0 rounded-full transition-colors duration-300 ${scrolled ? 'bg-forest/10' : 'bg-white/15'}`} />
            <div className={`absolute inset-1 rounded-full flex items-center justify-center transition-colors duration-300 ${scrolled ? 'bg-forest text-white' : 'bg-white/20 border border-white/40 text-white'}`}>
              <span className="font-heading font-bold text-xs">A</span>
            </div>
          </div>
          <div>
            <div className={`font-heading font-bold text-base md:text-lg tracking-widest uppercase leading-none transition-colors ${scrolled ? 'text-ink' : 'text-white'}`}>
              ABOVE<span className={scrolled ? 'text-forest' : 'text-sage'}>°</span>
            </div>
            <div className={`font-ui text-[8px] tracking-[0.25em] uppercase leading-none transition-colors ${scrolled ? 'text-ash' : 'text-white/60'}`}>
              Concept Living
            </div>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={l.href}
              className={`font-ui text-xs tracking-[0.18em] uppercase relative group transition-colors duration-300 ${scrolled ? 'text-ash hover:text-ink' : 'text-white/70 hover:text-white'}`}>
              {l.label}
              <span className={`absolute -bottom-0.5 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 rounded-full ${scrolled ? 'bg-forest' : 'bg-sage'}`} />
            </a>
          ))}
        </nav>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <a href="https://wa.me/918888159579?text=Hi%20ABOVE%C2%B0!%20I'm%20interested%20in%20your%20services."
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden lg:flex items-center gap-2 font-ui text-xs tracking-wider transition-colors duration-300 ${scrolled ? 'text-forest' : 'text-sage'}`}>
            <span className="text-sm">💬</span>
            +91 88881 59579
          </a>
          <a href="#contact" className={`hidden md:inline-flex btn-green text-xs py-2.5 px-5`}>
            Free Consultation
          </a>
          {/* Hamburger */}
          <button onClick={() => setOpen(v => !v)} className="md:hidden flex flex-col gap-1.5 p-2" aria-label="Menu">
            <span className={`block w-6 h-0.5 transition-transform duration-300 ${scrolled ? 'bg-ink' : 'bg-white'} ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-4 h-0.5 transition-opacity duration-300 ${scrolled ? 'bg-ink' : 'bg-white'} ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 transition-transform duration-300 ${scrolled ? 'bg-ink' : 'bg-white'} ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{   opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16,1,0.3,1] }}
            className="md:hidden bg-white/98 backdrop-blur-2xl border-b border-black/10 overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col px-6 py-6 gap-5">
              {NAV_LINKS.map((l) => (
                <a key={l.label} href={l.href} onClick={() => setOpen(false)}
                  className="font-ui text-base tracking-[0.2em] uppercase text-ink font-semibold hover:text-forest transition-colors py-1">
                  {l.label}
                </a>
              ))}
              <div className="divider-light my-1" />
              <a
                href="https://wa.me/918888159579"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 text-forest font-ui text-sm font-bold py-1"
              >
                💬 WhatsApp: +91 88881 59579
              </a>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="btn-green text-center py-3.5 shadow-lg w-full"
              >
                Free Consultation
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
