import { motion } from 'framer-motion';

// ─────────────────────────────────────────
// 1. LANDSCAPE SKETCH — Bird's-eye garden plan
//    Watercolour tree canopies, paths, planters
// ─────────────────────────────────────────
export function LandscapeSketch({ className = '' }) {
  return (
    <svg
      viewBox="0 0 420 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Garden landscape planning sketch"
    >
      <defs>
        {/* Watercolour paper filter */}
        <filter id="ls-paper" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" seed="2" result="noise"/>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G"/>
        </filter>
        <filter id="ls-blur">
          <feGaussianBlur stdDeviation="2.5"/>
        </filter>
      </defs>

      {/* ── Warm paper background ── */}
      <rect width="420" height="300" fill="#F5F0E2" rx="12"/>
      {/* Subtle grid like graph paper */}
      {Array.from({ length: 14 }).map((_, i) => (
        <line key={`gv${i}`} x1={i*30} y1="0" x2={i*30} y2="300" stroke="#C8BB99" strokeWidth="0.4" opacity="0.5"/>
      ))}
      {Array.from({ length: 11 }).map((_, i) => (
        <line key={`gh${i}`} x1="0" y1={i*30} x2="420" y2={i*30} stroke="#C8BB99" strokeWidth="0.4" opacity="0.5"/>
      ))}

      {/* ── Walkway / path (organic curves) ── */}
      <path d="M 60 280 Q 100 240 130 210 Q 160 185 200 175 Q 240 165 270 150 Q 310 130 360 100"
        stroke="#8B7355" strokeWidth="8" strokeLinecap="round" opacity="0.18" filter="url(#ls-blur)"/>
      <path d="M 60 280 Q 100 240 130 210 Q 160 185 200 175 Q 240 165 270 150 Q 310 130 360 100"
        stroke="#8B7355" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="6 3" opacity="0.55"/>

      {/* ── Secondary path ── */}
      <path d="M 200 175 Q 210 230 220 280"
        stroke="#8B7355" strokeWidth="1.4" strokeLinecap="round" strokeDasharray="5 3" opacity="0.4"/>

      {/* ── Planting bed (organic blob) ── */}
      <path d="M 30 120 Q 50 90 80 85 Q 110 80 120 100 Q 130 120 110 140 Q 90 155 60 148 Q 35 140 30 120Z"
        fill="#7CB342" opacity="0.18" filter="url(#ls-blur)"/>
      <path d="M 30 120 Q 50 90 80 85 Q 110 80 120 100 Q 130 120 110 140 Q 90 155 60 148 Q 35 140 30 120Z"
        stroke="#4A7C25" strokeWidth="1.2" opacity="0.5"/>

      {/* ── Large tree canopies (circles from above) ── */}
      {/* Big tree top-left */}
      <circle cx="90" cy="75" r="40" fill="#AED581" opacity="0.35" filter="url(#ls-blur)"/>
      <circle cx="90" cy="75" r="40" stroke="#558B2F" strokeWidth="1.5" opacity="0.7"/>
      <circle cx="90" cy="75" r="26" stroke="#7CB342" strokeWidth="1" strokeDasharray="3 2" opacity="0.5"/>
      <circle cx="90" cy="75" r="8" fill="#558B2F" opacity="0.25"/>
      {/* Trunk cross mark */}
      <line x1="86" y1="75" x2="94" y2="75" stroke="#558B2F" strokeWidth="1.2" opacity="0.6"/>
      <line x1="90" y1="71" x2="90" y2="79" stroke="#558B2F" strokeWidth="1.2" opacity="0.6"/>
      <line x1="85" y1="95" x2="95" y2="95" stroke="#558B2F" strokeWidth="1" opacity="0.3"/>

      {/* Mid tree */}
      <circle cx="230" cy="105" r="34" fill="#C5E1A5" opacity="0.4" filter="url(#ls-blur)"/>
      <circle cx="230" cy="105" r="34" stroke="#558B2F" strokeWidth="1.4" opacity="0.65"/>
      <circle cx="230" cy="105" r="20" stroke="#7CB342" strokeWidth="0.9" strokeDasharray="3 2" opacity="0.45"/>
      <circle cx="230" cy="105" r="7" fill="#558B2F" opacity="0.2"/>
      <line x1="226" y1="105" x2="234" y2="105" stroke="#558B2F" strokeWidth="1.1" opacity="0.55"/>
      <line x1="230" y1="101" x2="230" y2="109" stroke="#558B2F" strokeWidth="1.1" opacity="0.55"/>
      <line x1="225" y1="125" x2="235" y2="125" stroke="#558B2F" strokeWidth="1" opacity="0.3"/>

      {/* Small trees right */}
      <circle cx="340" cy="75" r="26" fill="#DCEDC8" opacity="0.45" filter="url(#ls-blur)"/>
      <circle cx="340" cy="75" r="26" stroke="#558B2F" strokeWidth="1.2" opacity="0.6"/>
      <circle cx="340" cy="75" r="15" stroke="#8BC34A" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.4"/>
      <line x1="336" y1="75" x2="344" y2="75" stroke="#558B2F" strokeWidth="1" opacity="0.5"/>
      <line x1="340" y1="71" x2="340" y2="79" stroke="#558B2F" strokeWidth="1" opacity="0.5"/>

      <circle cx="380" cy="140" r="20" fill="#C5E1A5" opacity="0.4" filter="url(#ls-blur)"/>
      <circle cx="380" cy="140" r="20" stroke="#558B2F" strokeWidth="1.1" opacity="0.6"/>
      <line x1="376" y1="140" x2="384" y2="140" stroke="#558B2F" strokeWidth="1" opacity="0.5"/>
      <line x1="380" y1="136" x2="380" y2="144" stroke="#558B2F" strokeWidth="1" opacity="0.5"/>

      {/* Small shrubs / bushes */}
      <circle cx="160" cy="220" r="14" fill="#AED581" opacity="0.5" filter="url(#ls-blur)"/>
      <circle cx="160" cy="220" r="14" stroke="#558B2F" strokeWidth="1" opacity="0.55"/>
      <circle cx="185" cy="235" r="10" fill="#C5E1A5" opacity="0.45" filter="url(#ls-blur)"/>
      <circle cx="185" cy="235" r="10" stroke="#558B2F" strokeWidth="1" opacity="0.5"/>
      <circle cx="290" cy="185" r="18" fill="#AED581" opacity="0.42" filter="url(#ls-blur)"/>
      <circle cx="290" cy="185" r="18" stroke="#558B2F" strokeWidth="1.1" opacity="0.55"/>
      <circle cx="320" cy="200" r="12" fill="#C5E1A5" opacity="0.4" filter="url(#ls-blur)"/>
      <circle cx="320" cy="200" r="12" stroke="#558B2F" strokeWidth="1" opacity="0.5"/>

      {/* ── Water feature (small circle) ── */}
      <circle cx="155" cy="148" r="18" fill="#B3E5FC" opacity="0.5" filter="url(#ls-blur)"/>
      <circle cx="155" cy="148" r="18" stroke="#0288D1" strokeWidth="1.1" opacity="0.5" strokeDasharray="4 2"/>
      <circle cx="155" cy="148" r="10" stroke="#0288D1" strokeWidth="0.7" opacity="0.3"/>
      <text x="152" y="152" fontFamily="serif" fontSize="10" fill="#0288D1" opacity="0.6">~</text>

      {/* ── Amber/warm accent blob (like reference image) ── */}
      <path d="M 350 240 Q 370 220 395 230 Q 415 240 410 265 Q 400 285 375 280 Q 350 272 350 240Z"
        fill="#FFB300" opacity="0.2" filter="url(#ls-blur)"/>
      <path d="M 350 240 Q 370 220 395 230 Q 415 240 410 265 Q 400 285 375 280 Q 350 272 350 240Z"
        stroke="#E65100" strokeWidth="1" opacity="0.35"/>

      {/* ── Dimension/annotation lines ── */}
      <line x1="30" y1="270" x2="410" y2="270" stroke="#8B7355" strokeWidth="0.8" strokeDasharray="4 3" opacity="0.4"/>
      <line x1="30" y1="260" x2="30" y2="280" stroke="#8B7355" strokeWidth="0.8" opacity="0.45"/>
      <line x1="410" y1="260" x2="410" y2="280" stroke="#8B7355" strokeWidth="0.8" opacity="0.45"/>
      <text x="195" y="283" fontFamily="serif" fontSize="9" fill="#8B7355" opacity="0.6" textAnchor="middle">Balcony Width — 12m</text>

      {/* North arrow */}
      <g transform="translate(390,25)">
        <line x1="0" y1="12" x2="0" y2="-2" stroke="#8B7355" strokeWidth="1.2" opacity="0.7"/>
        <path d="M-4 4 L0 -4 L4 4" fill="#8B7355" opacity="0.7"/>
        <text x="0" y="22" fontFamily="serif" fontSize="9" fill="#8B7355" opacity="0.65" textAnchor="middle">N</text>
      </g>

      {/* Hatch marks for plant beds */}
      {[0,1,2,3,4].map(i=>(
        <line key={i} x1={38+i*8} y1={112+i*3} x2={46+i*8} y2={104+i*3} stroke="#4A7C25" strokeWidth="0.7" opacity="0.35"/>
      ))}

      {/* Label */}
      <text x="12" y="295" fontFamily="serif" fontSize="8" fill="#8B7355" opacity="0.55" fontStyle="italic">Garden Layout — Concept Plan</text>
    </svg>
  );
}

// ─────────────────────────────────────────
// 2. SURFACES SKETCH — Floor perspective + cross-section
//    Architectural drawing style
// ─────────────────────────────────────────
export function SurfacesSketch({ className = '' }) {
  return (
    <svg
      viewBox="0 0 420 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Epoxy floor design architectural sketch"
    >
      <defs>
        <filter id="ss-blur"><feGaussianBlur stdDeviation="2"/></filter>
        <pattern id="hatch" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="8" stroke="#9966CC" strokeWidth="1" opacity="0.3"/>
        </pattern>
      </defs>

      {/* Paper background */}
      <rect width="420" height="300" fill="#F2EFE8" rx="12"/>
      {Array.from({ length: 14 }).map((_, i) => (
        <line key={i} x1={i*30} y1="0" x2={i*30} y2="300" stroke="#C8BB99" strokeWidth="0.35" opacity="0.45"/>
      ))}
      {Array.from({ length: 11 }).map((_, i) => (
        <line key={i} x1="0" y1={i*30} x2="420" y2={i*30} stroke="#C8BB99" strokeWidth="0.35" opacity="0.45"/>
      ))}

      {/* ── Perspective floor grid (main visual) ── */}
      {/* Vanishing point at ~(210, 80) */}
      {/* Floor horizontal lines */}
      {[140,160,180,200,220,240,260,280].map((y, i) => {
        const spread = (y - 80) * 0.9;
        return (
          <line key={i}
            x1={210 - spread} y1={y}
            x2={210 + spread} y2={y}
            stroke="#4A3728" strokeWidth={0.6 + i*0.1} opacity={0.3 + i*0.04}/>
        );
      })}
      {/* Floor vertical (vanishing) lines */}
      {[-8,-6,-4,-2,0,2,4,6,8].map((offset, i) => {
        const x = 210 + offset * 25;
        return (
          <line key={i}
            x1={210} y1={80}
            x2={x + offset * 8} y2={285}
            stroke="#4A3728" strokeWidth={0.7} opacity={0.3}/>
        );
      })}

      {/* ── 3D Epoxy pattern on floor ── */}
      {/* Swirling depth effect cells */}
      <ellipse cx="160" cy="220" rx="28" ry="8" fill="#7B61FF" opacity="0.15" filter="url(#ss-blur)"/>
      <ellipse cx="210" cy="245" rx="35" ry="10" fill="#A08BFF" opacity="0.2" filter="url(#ss-blur)"/>
      <ellipse cx="260" cy="225" rx="24" ry="7" fill="#7B61FF" opacity="0.15" filter="url(#ss-blur)"/>
      <ellipse cx="185" cy="260" rx="20" ry="6" fill="#C8B4FF" opacity="0.18" filter="url(#ss-blur)"/>
      <ellipse cx="240" cy="265" rx="18" ry="5" fill="#9066CC" opacity="0.15" filter="url(#ss-blur)"/>

      {/* Metallic shimmer strokes on floor */}
      <path d="M 120 200 Q 170 195 210 200 Q 260 205 300 198" stroke="#C8D6E5" strokeWidth="1.2" opacity="0.4" strokeLinecap="round"/>
      <path d="M 130 215 Q 175 210 210 215 Q 255 220 295 213" stroke="#C8D6E5" strokeWidth="0.9" opacity="0.3" strokeLinecap="round"/>
      <path d="M 140 235 Q 180 228 210 233 Q 248 238 285 232" stroke="#A8B8C8" strokeWidth="0.8" opacity="0.3" strokeLinecap="round"/>

      {/* ── Cross-section legend (right side) ── */}
      <g transform="translate(305, 100)">
        {/* Section label */}
        <text x="50" y="-8" fontFamily="serif" fontSize="9" fill="#4A3728" opacity="0.7" textAnchor="middle">Section A-A</text>
        <line x1="0" y1="-4" x2="100" y2="-4" stroke="#4A3728" strokeWidth="0.8" opacity="0.5"/>

        {/* Layer stack */}
        {[
          { y:0,  h:12, fill:'#E8D5B0', label:'Top Coat (UV)',    color:'#8B6914' },
          { y:12, h:10, fill:'#A08BFF', label:'3D Epoxy Layer',   color:'#5840E0' },
          { y:22, h:10, fill:'#C8D6E5', label:'Mid Coat',         color:'#4A6070' },
          { y:32, h:10, fill:'#E8E8E0', label:'Primer',           color:'#666660' },
          { y:42, h:14, fill:'#B0A890', label:'Concrete Slab',    color:'#5A5040' },
        ].map((l, i) => (
          <g key={i}>
            <rect x="0" y={l.y} width="45" height={l.h} fill={l.fill} opacity="0.55" rx="1"/>
            <rect x="0" y={l.y} width="45" height={l.h} fill="none" stroke={l.color} strokeWidth="0.8" opacity="0.5" rx="1"/>
            <line x1="48" y1={l.y + l.h/2} x2="58" y2={l.y + l.h/2} stroke={l.color} strokeWidth="0.7" opacity="0.55"/>
            <text x="60" y={l.y + l.h/2 + 3} fontFamily="serif" fontSize="7.5" fill={l.color} opacity="0.8">{l.label}</text>
          </g>
        ))}
        {/* Total height arrow */}
        <line x1="-8" y1="0" x2="-8" y2="56" stroke="#4A3728" strokeWidth="0.8" opacity="0.5"/>
        <line x1="-11" y1="0" x2="-5" y2="0" stroke="#4A3728" strokeWidth="0.8" opacity="0.5"/>
        <line x1="-11" y1="56" x2="-5" y2="56" stroke="#4A3728" strokeWidth="0.8" opacity="0.5"/>
        <text x="-18" y="32" fontFamily="serif" fontSize="7" fill="#4A3728" opacity="0.6" transform="rotate(-90,-18,32)">6–8mm</text>
      </g>

      {/* ── Surface type swatches (left side) ── */}
      <g transform="translate(18, 110)">
        <text x="0" y="-6" fontFamily="serif" fontSize="8.5" fill="#4A3728" opacity="0.65" fontStyle="italic">Surface Options</text>
        {[
          { fill:'linear-gradient(135deg,#1a1040,#7B61FF)', label:'3D Epoxy',      stroke:'#7B61FF' },
          { fill:'linear-gradient(135deg,#888,#ddd)',       label:'Metallic',      stroke:'#aaa' },
          { fill:'linear-gradient(135deg,#E8D5B0,#C4A97A)', label:'Marble Gran.', stroke:'#C4A97A' },
          { fill:'linear-gradient(135deg,#f5f5f0,#d0d0c8)', label:'Marble Wall', stroke:'#aaa' },
        ].map((s, i) => (
          <g key={i} transform={`translate(0,${i*22})`}>
            <rect x="0" y="0" width="22" height="16" rx="3"
              fill={s.fill} stroke={s.stroke} strokeWidth="0.8" opacity="0.75"/>
            <text x="27" y="11" fontFamily="serif" fontSize="8" fill="#4A3728" opacity="0.7">{s.label}</text>
          </g>
        ))}
      </g>

      {/* ── Elevation arrow ── */}
      <g opacity="0.5">
        <line x1="80" y1="285" x2="80" y2="135" stroke="#4A3728" strokeWidth="0.9" strokeDasharray="4 3"/>
        <path d="M76 140 L80 130 L84 140" fill="#4A3728"/>
        <text x="64" y="210" fontFamily="serif" fontSize="8" fill="#4A3728" transform="rotate(-90,64,210)">Floor Level</text>
      </g>

      {/* Label */}
      <text x="12" y="295" fontFamily="serif" fontSize="8" fill="#4A3728" opacity="0.55" fontStyle="italic">Epoxy Surface — Design Concept</text>

      {/* Ruler marks at bottom */}
      {[0,1,2,3,4,5,6,7,8].map(i => (
        <g key={i} transform={`translate(${90+i*30},285)`}>
          <line x1="0" y1="-3" x2="0" y2="3" stroke="#4A3728" strokeWidth="0.7" opacity="0.4"/>
          <text x="0" y="11" fontFamily="serif" fontSize="6" fill="#4A3728" opacity="0.4" textAnchor="middle">{i}</text>
        </g>
      ))}
      <text x="370" y="295" fontFamily="serif" fontSize="7" fill="#4A3728" opacity="0.4">m</text>
    </svg>
  );
}

// ─────────────────────────────────────────
// 3. HYPERCARE SKETCH — Sensor network plan
//    IoT placement diagram, garden monitoring
// ─────────────────────────────────────────
export function HypercareSketch({ className = '' }) {
  return (
    <svg
      viewBox="0 0 420 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Smart plant monitoring sensor network sketch"
    >
      <defs>
        <filter id="hs-blur"><feGaussianBlur stdDeviation="2.5"/></filter>
        <filter id="hs-glow">
          <feGaussianBlur stdDeviation="3" result="glow"/>
          <feMerge><feMergeNode in="glow"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Paper */}
      <rect width="420" height="300" fill="#F0EDE4" rx="12"/>
      {Array.from({ length: 14 }).map((_, i) => (
        <line key={i} x1={i*30} y1="0" x2={i*30} y2="300" stroke="#C8BB99" strokeWidth="0.35" opacity="0.4"/>
      ))}
      {Array.from({ length: 11 }).map((_, i) => (
        <line key={i} x1="0" y1={i*30} x2="420" y2={i*30} stroke="#C8BB99" strokeWidth="0.35" opacity="0.4"/>
      ))}

      {/* ── Balcony/room outline ── */}
      <rect x="20" y="20" width="380" height="260" rx="4"
        stroke="#8B7355" strokeWidth="1.5" strokeDasharray="8 4" opacity="0.4" fill="rgba(245,240,228,0.3)"/>
      <text x="28" y="35" fontFamily="serif" fontSize="8.5" fill="#8B7355" opacity="0.55">Balcony / Garden Zone</text>

      {/* ── Hub / gateway (center) ── */}
      <circle cx="210" cy="150" r="22" fill="#52D68A" opacity="0.15" filter="url(#hs-blur)"/>
      <circle cx="210" cy="150" r="22" stroke="#2D8A56" strokeWidth="1.5" opacity="0.7"/>
      <circle cx="210" cy="150" r="14" stroke="#52D68A" strokeWidth="1" strokeDasharray="3 2" opacity="0.5"/>
      <circle cx="210" cy="150" r="6" fill="#2D8A56" opacity="0.5"/>
      {/* Wifi icon inside hub */}
      <path d="M205 147 Q210 143 215 147" stroke="#52D68A" strokeWidth="1.2" strokeLinecap="round" opacity="0.8"/>
      <path d="M203 144 Q210 138 217 144" stroke="#52D68A" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
      <text x="210" y="168" fontFamily="serif" fontSize="7.5" fill="#2D8A56" opacity="0.75" textAnchor="middle">Hub</text>

      {/* ── Sensor placement + radii + plants ── */}
      {/* Sensor data: [cx, cy, plantName, sensorType, color] */}
      {[
        { cx:80,  cy:75,  name:'Monstera',    type:'Moisture', col:'#2D8A56', rad:32 },
        { cx:340, cy:80,  name:'Fiddle Leaf', type:'Light',    col:'#FBC02D', rad:28 },
        { cx:70,  cy:225, name:'Peace Lily',  type:'Soil+',    col:'#0288D1', rad:30 },
        { cx:355, cy:220, name:'Golden Pothos',type:'Humidity',col:'#8BC34A', rad:26 },
        { cx:180, cy:255, name:'Fern',         type:'Moisture', col:'#2D8A56', rad:22 },
        { cx:265, cy:60,  name:'Aloe Vera',    type:'Light',    col:'#FBC02D', rad:20 },
      ].map((s, i) => (
        <g key={i}>
          {/* Sensor range radius */}
          <circle cx={s.cx} cy={s.cy} r={s.rad}
            stroke={s.col} strokeWidth="0.9" strokeDasharray="4 3" opacity="0.4" fill="none"/>
          <circle cx={s.cx} cy={s.cy} r={s.rad * 0.6}
            fill={s.col} opacity="0.08" filter="url(#hs-blur)"/>

          {/* Connection line to hub */}
          <line x1={s.cx} y1={s.cy} x2="210" y2="150"
            stroke={s.col} strokeWidth="0.9" strokeDasharray="5 4" opacity="0.35"/>

          {/* Plant circle (pot/canopy) */}
          <circle cx={s.cx} cy={s.cy} r="14"
            fill="#AED581" opacity="0.35" filter="url(#hs-blur)"/>
          <circle cx={s.cx} cy={s.cy} r="14"
            stroke="#558B2F" strokeWidth="1.1" opacity="0.6"/>
          <circle cx={s.cx} cy={s.cy} r="6"
            stroke="#7CB342" strokeWidth="0.8" strokeDasharray="2 1" opacity="0.4"/>

          {/* Sensor dot */}
          <circle cx={s.cx} cy={s.cy} r="3" fill={s.col} opacity="0.9"/>
          <circle cx={s.cx} cy={s.cy} r="5.5" stroke={s.col} strokeWidth="0.8" opacity="0.4"/>

          {/* Plant label */}
          <text x={s.cx} y={s.cy + 26}
            fontFamily="serif" fontSize="7.5" fill="#4A3728" opacity="0.65"
            textAnchor="middle">{s.name}</text>
          {/* Sensor type tag */}
          <rect x={s.cx - 20} y={s.cy + 30} width="40" height="10" rx="3"
            fill={s.col} opacity="0.15" stroke={s.col} strokeWidth="0.6"/>
          <text x={s.cx} y={s.cy + 38}
            fontFamily="serif" fontSize="6.5" fill={s.col} opacity="0.75"
            textAnchor="middle">{s.type}</text>
        </g>
      ))}

      {/* ── Data icons near hub ── */}
      {/* Moisture droplet */}
      <g transform="translate(245,130)" opacity="0.6">
        <path d="M0 -8 Q-5 0 -5 4 A5 5 0 0010 4 Q5 0 0 -8Z" fill="#0288D1" opacity="0.3" stroke="#0288D1" strokeWidth="0.8"/>
        <text x="8" y="3" fontFamily="serif" fontSize="7" fill="#0288D1">72%</text>
      </g>
      {/* Sun icon */}
      <g transform="translate(170,125)" opacity="0.6">
        <circle cx="0" cy="0" r="5" fill="#FBC02D" opacity="0.3" stroke="#FBC02D" strokeWidth="0.8"/>
        {[0,45,90,135,180,225,270,315].map(a => {
          const rad = a * Math.PI / 180;
          return <line key={a} x1={Math.cos(rad)*6} y1={Math.sin(rad)*6} x2={Math.cos(rad)*9} y2={Math.sin(rad)*9}
            stroke="#FBC02D" strokeWidth="0.8" strokeLinecap="round" opacity="0.7"/>;
        })}
        <text x="12" y="3" fontFamily="serif" fontSize="7" fill="#FBC02D">85%</text>
      </g>

      {/* ── Legend ── */}
      <g transform="translate(290,210)">
        <rect x="0" y="0" width="115" height="68" rx="4" fill="rgba(245,240,228,0.85)" stroke="#8B7355" strokeWidth="0.8" opacity="0.8"/>
        <text x="8" y="14" fontFamily="serif" fontSize="8" fill="#4A3728" opacity="0.8" fontWeight="bold">Legend</text>
        <circle cx="12" cy="25" r="4" fill="#2D8A56" opacity="0.7"/>
        <text x="20" y="28" fontFamily="serif" fontSize="7.5" fill="#4A3728" opacity="0.7">Moisture Sensor</text>
        <circle cx="12" cy="38" r="4" fill="#FBC02D" opacity="0.7"/>
        <text x="20" y="41" fontFamily="serif" fontSize="7.5" fill="#4A3728" opacity="0.7">Light Sensor</text>
        <circle cx="12" cy="51" r="4" fill="#0288D1" opacity="0.7"/>
        <text x="20" y="54" fontFamily="serif" fontSize="7.5" fill="#4A3728" opacity="0.7">Soil Nutrient</text>
        <line x1="8" y1="61" x2="24" y2="61" stroke="#666" strokeWidth="0.9" strokeDasharray="4 2" opacity="0.6"/>
        <text x="28" y="64" fontFamily="serif" fontSize="7.5" fill="#4A3728" opacity="0.7">Data Link</text>
      </g>

      {/* Label */}
      <text x="12" y="295" fontFamily="serif" fontSize="8" fill="#4A3728" opacity="0.55" fontStyle="italic">Hypercare Sensor Network — Placement Plan</text>
    </svg>
  );
}

// ─────────────────────────────────────────
// Animated wrapper — reveals on scroll
// ─────────────────────────────────────────
export function AnimatedSketch({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
