import React, { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, Sparkles } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Rajesh Mehta',
    location: 'Viman Nagar, Pune',
    rating: 5,
    text: 'H.P. Enterprises transformed our kitchen completely. The Hafele stainless steel trolley systems are butter-smooth, and the teak wood paneling with marble countertops gave our home an Italian penthouse feel. Hukampal ji is a true master craftsman!',
    service: 'Modular Kitchen & Marble Inlay',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    location: 'Kharadi, Pune',
    rating: 5,
    text: 'Locked out of our house on a Sunday at 11 PM because our main door Godrej latch jammed with the key inside. H.P. Enterprises emergency technician arrived in 40 minutes, opened the lock without a single scratch on our door, and replaced the cylinder on the spot. Lifesavers!',
    service: '24/7 Urgent Lock Open & Repair',
  },
  {
    id: 3,
    name: 'Suresh & Anjali Patil',
    location: 'Wagholi, Pune',
    rating: 5,
    text: 'Got our entire 3BHK furnished — teak wardrobes, acoustic wood fluting, aluminum soundproof balcony sliders, and pleated mosquito nets. The precision joinery and quality of timber used is unbelievable. Highly recommended!',
    service: 'Full Home Furniture & Woodwork',
  },
  {
    id: 4,
    name: 'Deepak Joshi',
    location: 'Dhanori, Pune',
    rating: 5,
    text: 'The heavy aluminum sliding partitions and 12mm toughened glass enclosures for my architectural office are top-notch. Clean, on schedule, with genuine Sleek & Hafele hardware throughout. Best interior carpenters in Lohegaon.',
    service: 'Aluminum & Architectural Glass',
  },
];

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-gold fill-gold drop-shadow' : 'text-ivory/20'}`}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [headerRef, inView] = useInView(0.1);
  const intervalRef = useRef(null);

  const total = TESTIMONIALS.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  // Auto-advance
  useEffect(() => {
    intervalRef.current = setInterval(next, 6000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const handleNav = (fn) => {
    clearInterval(intervalRef.current);
    fn();
    intervalRef.current = setInterval(next, 6000);
  };

  const t = TESTIMONIALS[current];

  return (
    <section 
      id="testimonials" 
      className="py-24 sm:py-32 relative overflow-hidden section-offset"
      style={{
        backgroundImage: `
          radial-gradient(ellipse at 50% 50%, rgba(201, 168, 76, 0.08) 0%, transparent 60%),
          linear-gradient(180deg, rgba(14, 12, 10, 0.96) 0%, rgba(10, 9, 8, 0.98) 100%),
          url('/assets/italian-marble-dark.jpg')
        `,
        backgroundSize: 'cover',
      }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-charcoal-900/90 mb-3 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span className="text-gold text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase">
              Client Testimonials
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-ivory mb-4">
            Words of Trust &amp; Satisfaction
          </h2>

          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
        </div>

        {/* Carousel Card with Italian Marble & Teak Finish */}
        <div 
          className={`relative transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} 
          style={{ transitionDelay: '150ms' }}
        >
          <div
            key={t.id}
            className="relative rounded-3xl p-8 sm:p-12 md:p-14 overflow-hidden border border-gold/25 shadow-2xl shadow-black/80"
            style={{
              backgroundImage: `
                linear-gradient(145deg, rgba(26, 21, 17, 0.95) 0%, rgba(12, 10, 8, 0.98) 100%),
                url('/assets/italian-marble-dark.jpg')
              `,
              backgroundSize: 'cover',
            }}
          >
            {/* Teak Wood Top Accent Cap */}
            <div 
              className="absolute top-0 inset-x-0 h-2"
              style={{
                backgroundImage: `url('/assets/teak-wood-grain.jpg')`,
                backgroundSize: '200px',
              }}
            />

            {/* Big Decorative Gold Quote Mark */}
            <Quote className="absolute top-8 right-8 w-24 h-24 text-gold/10 pointer-events-none" strokeWidth={1} />

            <div className="flex flex-col sm:flex-row sm:items-start gap-6 relative z-10">
              {/* Initials Avatar */}
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-ivory font-serif font-extrabold text-2xl flex-shrink-0 shadow-xl border border-gold/40"
                style={{
                  backgroundImage: `
                    linear-gradient(135deg, rgba(201, 168, 76, 0.4) 0%, rgba(140, 88, 40, 0.6) 100%),
                    url('/assets/teak-wood-grain.jpg')
                  `,
                  backgroundSize: 'cover',
                }}
              >
                {t.name.charAt(0)}
              </div>

              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <p className="font-serif font-bold text-ivory text-xl">{t.name}</p>
                    <p className="text-gold/80 text-xs mt-0.5 tracking-wide">{t.location}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <StarRating rating={t.rating} />
                    <span className="text-xs text-gold font-medium bg-gold/10 px-3 py-1 rounded-full border border-gold/25 shadow-sm">
                      {t.service}
                    </span>
                  </div>
                </div>

                <blockquote className="text-ivory/80 text-base sm:text-lg leading-relaxed font-light italic mt-4">
                  "{t.text}"
                </blockquote>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={() => handleNav(prev)}
              className="p-3 bg-charcoal-900/90 hover:bg-gold/10 border border-gold/20 hover:border-gold text-ivory/70 hover:text-gold rounded-xl transition-all duration-200 shadow-lg"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleNav(() => setCurrent(i))}
                  className={`rounded-full transition-all duration-300 ${
                    i === current ? 'w-8 h-2.5 bg-gradient-to-r from-gold to-gold-light' : 'w-2.5 h-2.5 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => handleNav(next)}
              className="p-3 bg-charcoal-900/90 hover:bg-gold/10 border border-gold/20 hover:border-gold text-ivory/70 hover:text-gold rounded-xl transition-all duration-200 shadow-lg"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
