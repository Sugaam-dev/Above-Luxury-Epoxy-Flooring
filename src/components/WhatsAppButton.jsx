import { motion } from 'framer-motion';

const WA_NUMBER = '918888159579';
const WA_MSG    = encodeURIComponent("Hi ABOVE°! I'm interested in your services. Please tell me more.");
const WA_URL    = `https://wa.me/${WA_NUMBER}?text=${WA_MSG}`;

export default function WhatsAppButton() {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2.5, type: 'spring', stiffness: 200, damping: 18 }}
      className="fixed bottom-5 right-5 md:bottom-7 md:right-7 z-[9990] flex flex-col items-end gap-2"
    >
      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, x: 10, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ delay: 3.5, duration: 0.5 }}
        className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-full text-white font-ui text-[10px] tracking-wider"
        style={{
          background: 'rgba(37,211,102,0.92)',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 4px 16px rgba(37,211,102,0.4)',
        }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        Chat with us on WhatsApp
      </motion.div>

      {/* Main button */}
      <a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
        style={{
          background: 'linear-gradient(135deg, #25D366, #128C7E)',
          boxShadow: '0 6px 24px rgba(37,211,102,0.55)',
        }}
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full animate-ping"
          style={{ background: 'rgba(37,211,102,0.35)' }} />

        {/* WhatsApp SVG icon */}
        <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <path d="M16 3C8.82 3 3 8.82 3 16c0 2.3.62 4.55 1.8 6.52L3 29l6.68-1.75A13 13 0 0016 29c7.18 0 13-5.82 13-13S23.18 3 16 3z"
            fill="white"/>
          <path d="M23.5 20.5c-.3.85-1.75 1.6-2.4 1.67-.64.08-1.25.3-4.2-1.05-3.5-1.55-5.75-5.15-5.92-5.38-.16-.23-1.35-1.8-1.35-3.44 0-1.63.86-2.43 1.16-2.76.3-.33.66-.41.88-.41s.43.01.62.01c.2 0 .46-.08.72.55.26.63 1.1 2.68 1.2 2.88.1.2.16.43.04.68-.12.25-.18.4-.36.62-.18.22-.38.49-.54.66-.18.18-.36.38-.15.74.2.36.9 1.48 1.92 2.4 1.32 1.17 2.43 1.53 2.77 1.7.34.17.54.14.74-.08.2-.22.86-1 1.08-1.35.22-.34.45-.29.76-.17.3.12 1.92.9 2.25 1.07.33.17.55.25.63.38.08.13.08.75-.22 1.6z"
            fill="#25D366"/>
        </svg>
      </a>

      {/* Number label */}
      <div className="font-ui text-[9px] tracking-widest text-center"
        style={{ color: 'rgba(37,211,102,0.8)' }}>
        +91 88881 59579
      </div>
    </motion.div>
  );
}
