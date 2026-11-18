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

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0,   opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16,1,0.3,1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-700 ease-out ${
        scrolled
          ? 'navbar-scrolled'
          : 'navbar-top'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 flex items-center justify-between h-[72px] md:h-20">

        {/* ── Logo ── */}
        <a href="#" className="flex items-center gap-3 group shrink-0">
          <div className="relative w-9 h-9 md:w-10 md:h-10">
            <div className="absolute inset-0 rounded-full bg-white/10 group-hover:bg-emerald-500/20 transition-colors duration-300" />
            <div className="absolute inset-[3px] rounded-full flex items-center justify-center bg-emerald-500 text-white transition-all duration-300 group-hover:shadow-[0_0_16px_rgba(54,216,120,0.4)]">
              <span className="font-heading font-bold text-xs leading-none">A</span>
            </div>
          </div>
          <div>
            <div className="font-heading font-bold text-base md:text-lg tracking-[0.2em] uppercase leading-none text-white">
              ABOVE<span className="text-emerald-400">°</span>
            </div>
            <div className="font-ui text-[8px] md:text-[9px] tracking-[0.25em] uppercase leading-none text-white/50 mt-0.5">
              Concept Living
            </div>
          </div>
        </a>

        {/* ── Desktop Nav ── */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-9">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="nav-link font-ui text-[13px] font-medium tracking-[0.18em] uppercase relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] rounded-full bg-emerald-400 group-hover:w-full transition-all duration-400 ease-out" />
            </a>
          ))}
        </nav>

        {/* ── CTA & Phone & Mobile Toggle ── */}
        <div className="flex items-center gap-4 lg:gap-5 shrink-0">
          {/* Phone */}
          <a
            href="https://wa.me/918888159579?text=Hi%20ABOVE%C2%B0!%20I'm%20interested%20in%20your%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-2 font-ui text-[13px] font-medium tracking-wider text-white/70 hover:text-emerald-400 transition-colors duration-300"
          >
            <span className="text-sm">💬</span>
            +91 88881 59579
          </a>

          {/* Separator */}
          <div className="hidden lg:block w-px h-6 bg-white/15" />

          {/* CTA Button */}
          <a
            href="#contact"
            className="hidden md:inline-flex navbar-cta-btn"
          >
            Free Consultation
          </a>

          {/* ── Hamburger ── */}
          <button
            onClick={() => setOpen(v => !v)}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] rounded-lg hover:bg-white/10 transition-colors duration-200"
            aria-label="Menu"
          >
            <span className={`block w-5 h-[2px] bg-white rounded-full transition-all duration-300 origin-center ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-3.5 h-[2px] bg-white rounded-full transition-all duration-300 ${open ? 'opacity-0 scale-0' : ''}`} />
            <span className={`block w-5 h-[2px] bg-white rounded-full transition-all duration-300 origin-center ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden fixed inset-0 top-[72px] bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setOpen(false)}
            />
            {/* Drawer panel */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{   opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.16,1,0.3,1] }}
              className="md:hidden relative z-50 bg-[#0d1210]/98 backdrop-blur-2xl border-b border-white/8 overflow-hidden"
            >
              <div className="flex flex-col px-6 py-7 gap-1">
                {NAV_LINKS.map((l, i) => (
                  <motion.a
                    key={l.label}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.3 }}
                    className="font-ui text-[15px] font-medium tracking-[0.2em] uppercase text-white/90 hover:text-emerald-400 transition-colors py-3 border-b border-white/5 last:border-0"
                  >
                    {l.label}
                  </motion.a>
                ))}

                <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-4">
                  <a
                    href="https://wa.me/918888159579"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 text-emerald-400 font-ui text-sm font-semibold tracking-wide"
                  >
                    💬 WhatsApp: +91 88881 59579
                  </a>
                  <a
                    href="#contact"
                    onClick={() => setOpen(false)}
                    className="navbar-cta-btn text-center py-3.5 w-full"
                  >
                    Free Consultation
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
