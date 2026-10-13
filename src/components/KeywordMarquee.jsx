// Marquee keyword strip — SEO keyword visibility + UX flair
const KEYWORDS = [
  '✦ Epoxy Flooring', '✦ 3D Floor Design', '✦ Metallic Floors',
  '✦ Marble Effect Walls', '✦ Balcony Garden Design', '✦ Indoor Plants',
  '✦ Biophilic Interiors', '✦ Garden Landscaping', '✦ Smart Plant Care',
  '✦ Luxury Home Decor', '✦ Interior Design', '✦ Home Renovation',
  '✦ 3D Walls', '✦ Epoxy Marble Granules', '✦ Home Beautification',
];

export default function KeywordMarquee({ reverse = false, accentColor = '#7B61FF' }) {
  const track = [...KEYWORDS, ...KEYWORDS]; // doubled for seamless loop

  return (
    <div
      className="relative overflow-hidden py-3 md:py-4 border-y"
      style={{ borderColor: `${accentColor}20` }}
      aria-hidden="true"
    >
      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-16 md:w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #0A0A0F, transparent)' }} />
      <div className="absolute inset-y-0 right-0 w-16 md:w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #0A0A0F, transparent)' }} />

      <div
        className="flex whitespace-nowrap"
        style={{
          animation: `marquee ${reverse ? '22s' : '28s'} linear infinite ${reverse ? 'reverse' : ''}`,
          willChange: 'transform',
        }}
      >
        {track.map((word, i) => (
          <span
            key={i}
            className="font-ui text-[10px] md:text-xs tracking-[0.25em] uppercase mx-5 md:mx-8 flex-shrink-0"
            style={{ color: `${accentColor}80` }}
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}
