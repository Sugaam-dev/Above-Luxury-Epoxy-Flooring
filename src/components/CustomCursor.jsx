import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef  = useRef(null);
  const auraRef = useRef(null);
  const pos     = useRef({ x: -100, y: -100 });
  const auraP   = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const move = e => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', move);
    let raf;
    const lerp = (a, b, t) => a + (b - a) * t;
    const tick = () => {
      auraP.current.x = lerp(auraP.current.x, pos.current.x, 0.1);
      auraP.current.y = lerp(auraP.current.y, pos.current.y, 0.1);
      if (dotRef.current)
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      if (auraRef.current)
        auraRef.current.style.transform = `translate(${auraP.current.x - 20}px, ${auraP.current.y - 20}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const el = () => {
      if (auraRef.current) { auraRef.current.style.width='44px'; auraRef.current.style.height='44px'; }
    };
    const ll = () => {
      if (auraRef.current) { auraRef.current.style.width='40px'; auraRef.current.style.height='40px'; }
    };
    document.querySelectorAll('a,button,[data-cursor]').forEach(b=>{b.addEventListener('mouseenter',el);b.addEventListener('mouseleave',ll);});
    return () => { cancelAnimationFrame(raf); window.removeEventListener('mousemove', move); };
  }, []);

  return (
    <>
      <div ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-2 h-2 rounded-full bg-forest hidden md:block"
        style={{ willChange:'transform', transition:'none' }} />
      <div ref={auraRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] w-10 h-10 rounded-full hidden md:block"
        style={{
          background:'radial-gradient(circle,rgba(46,125,50,0.25) 0%,transparent 70%)',
          filter:'blur(3px)', willChange:'transform',
          transition:'width 0.25s ease,height 0.25s ease',
        }} />
    </>
  );
}
