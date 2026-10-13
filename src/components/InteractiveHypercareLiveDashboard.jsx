import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Initial interactive plant telemetry data matching user's dashboard image
const INITIAL_PLANTS = [
  { id: 'monstera', name: 'Monstera Deliciosa', status: 'Thriving', moisture: 78, n: 82, light: 8.2, ph: 6.4, temp: 23.5, probe: 'B8', tag: 'Aroid', stateColor: '#28CA41', icon: '🌿' },
  { id: 'fiddle', name: 'Fiddle Leaf Fig', status: 'Good', moisture: 64, n: 74, light: 7.5, ph: 6.2, temp: 23.8, probe: 'B1', tag: 'Ficus', stateColor: '#28CA41', icon: '🌱' },
  { id: 'ferns', name: 'Boston Ferns', status: 'Optimal', moisture: 82, n: 79, light: 5.8, ph: 6.0, temp: 22.9, probe: 'B2', tag: 'Fern', stateColor: '#28CA41', icon: '🪴' },
  { id: 'bougainvillea', name: 'Bougainvillea', status: 'Watering Scheduled', moisture: 42, n: 68, light: 9.4, ph: 6.5, temp: 24.2, probe: 'B3', tag: 'Flowering', stateColor: '#FFBD2E', icon: '🌸' },
  { id: 'ivy', name: 'English Ivy', status: 'Excellent', moisture: 75, n: 85, light: 6.2, ph: 6.3, temp: 23.1, probe: 'B7', tag: 'Climber', stateColor: '#28CA41', icon: '🍃' },
];

export default function InteractiveHypercareLiveDashboard() {
  const [activePlantId, setActivePlantId] = useState('monstera');
  const [autoPilot, setAutoPilot] = useState(true);
  const [dispenseState, setDispenseState] = useState('idle'); // idle, dispensing, complete
  const [activeProbe, setActiveProbe] = useState('B8');
  const [liveMoisture, setLiveMoisture] = useState(78);
  const [reservoirLevel, setReservoirLevel] = useState(85);
  const [activeTab, setActiveTab] = useState('live'); // 'live' | 'diagram'

  const activePlant = INITIAL_PLANTS.find(p => p.id === activePlantId) || INITIAL_PLANTS[0];

  useEffect(() => {
    setLiveMoisture(activePlant.moisture);
    setActiveProbe(activePlant.probe);
  }, [activePlantId]);

  // Handle manual micro-enrichment pulse
  const triggerNutrientEnrichment = () => {
    if (dispenseState !== 'idle') return;
    setDispenseState('dispensing');
    setTimeout(() => {
      setLiveMoisture(prev => Math.min(prev + 8, 92));
      setReservoirLevel(prev => Math.max(prev - 2, 70));
      setDispenseState('complete');
      setTimeout(() => setDispenseState('idle'), 3500);
    }, 1800);
  };

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-emerald-500/25 bg-[#07130D] text-white shadow-2xl relative select-none">
      
      {/* ── Dashboard Header ── */}
      <div className="px-4 py-3 bg-[#0A1A12] border-b border-emerald-500/20 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57] inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28CA41] inline-block" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-black text-sm md:text-base tracking-wider text-emerald-400">
                HYPERCARE // LIVE DASHBOARD
              </span>
              <span className="flex items-center gap-1 bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.5 rounded-full text-[9px] font-ui text-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                LIVE TELEMETRY
              </span>
            </div>
            <p className="text-[10px] text-white/50 font-ui">
              ACTIVE LOCATION: HOME BALCONY (ZONE 1) • PUNE RESIDENCE
            </p>
          </div>
        </div>

        {/* Global Controls & Health Score */}
        <div className="flex items-center gap-4 ml-auto">
          <div className="hidden sm:flex items-center gap-2 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1.5 rounded-xl">
            <span className="text-[10px] font-ui text-emerald-300/80 uppercase">Balcony Health</span>
            <span className="font-heading font-bold text-lg text-emerald-400">96%</span>
            <div className="w-6 h-6 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin" />
          </div>

          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1 rounded-xl">
            <span className="text-[10px] font-ui text-white/70">Auto-Pilot:</span>
            <button
              onClick={() => setAutoPilot(!autoPilot)}
              className={`w-10 h-5 rounded-full p-0.5 transition-colors duration-300 flex items-center ${
                autoPilot ? 'bg-emerald-500 justify-end' : 'bg-gray-600 justify-start'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white shadow-md" />
            </button>
            <span className={`text-[10px] font-ui font-bold ${autoPilot ? 'text-emerald-400' : 'text-gray-400'}`}>
              {autoPilot ? 'ON' : 'MANUAL'}
            </span>
          </div>

          <div className="flex border border-white/10 rounded-lg p-0.5 bg-black/40 text-[10px] font-ui">
            <button
              onClick={() => setActiveTab('live')}
              className={`px-2.5 py-1 rounded ${activeTab === 'live' ? 'bg-emerald-600 text-white font-bold' : 'text-white/60 hover:text-white'}`}
            >
              Interactive Controls
            </button>
            <button
              onClick={() => setActiveTab('diagram')}
              className={`px-2.5 py-1 rounded ${activeTab === 'diagram' ? 'bg-emerald-600 text-white font-bold' : 'text-white/60 hover:text-white'}`}
            >
              Original System UI
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'diagram' ? (
        /* High-Res View of original user dashboard image with zoom-in capability */
        <div className="relative group">
          <img
            src="/images/hypercare_dashboard.jpg"
            alt="Hypercare Live Dashboard architecture"
            className="w-full h-auto object-cover"
          />
          <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full text-xs text-emerald-300 font-ui border border-emerald-500/30">
            Tap 'Interactive Controls' to test live buttons & telemetry
          </div>
        </div>
      ) : (
        /* ── Full Interactive Live Simulation Mirroring the Image ── */
        <div className="p-3 md:p-5 grid grid-cols-1 lg:grid-cols-12 gap-4">
          
          {/* Left Column: ZONES & FLORA (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <div className="flex items-center justify-between pb-1 border-b border-white/10">
              <span className="font-ui text-xs font-bold uppercase tracking-wider text-emerald-300">
                Zones &amp; Flora
              </span>
              <span className="text-[10px] text-white/40 font-ui">Click plant to inspect</span>
            </div>

            <div className="space-y-2">
              {INITIAL_PLANTS.map(p => {
                const isSelected = p.id === activePlantId;
                return (
                  <motion.div
                    key={p.id}
                    onClick={() => setActivePlantId(p.id)}
                    whileHover={{ x: 3 }}
                    className={`p-2.5 rounded-xl cursor-pointer transition-all border ${
                      isSelected
                        ? 'bg-emerald-950/70 border-emerald-400 shadow-md ring-1 ring-emerald-500/40'
                        : 'bg-white/[0.03] border-white/10 hover:border-emerald-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl">{p.icon}</span>
                        <div>
                          <h4 className="font-heading text-xs font-bold text-white">{p.name}</h4>
                          <span
                            className="text-[10px] font-ui"
                            style={{ color: p.status === 'Watering Scheduled' ? '#FFBD2E' : '#28CA41' }}
                          >
                            ● {p.status}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-ui text-white/50 block">Probe {p.probe}</span>
                        <span className="text-xs font-bold text-emerald-300">{p.moisture}% moist</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Micro-Irrigation Reservoir status widget */}
            <div className="p-3 rounded-xl bg-black/40 border border-white/10 mt-auto">
              <div className="flex justify-between items-center text-[11px] font-ui mb-1.5">
                <span className="text-white/70">MICRO-IRRIGATION RESERVOIR</span>
                <span className="text-emerald-400 font-bold">{reservoirLevel}% FULL</span>
              </div>
              <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden relative">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 rounded-full"
                  animate={{ width: `${reservoirLevel}%` }}
                  transition={{ duration: 0.8 }}
                />
              </div>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5 text-[10px] text-white/50 font-ui">
                <span>Next Dispense: 19:00 IST</span>
                <button
                  onClick={triggerNutrientEnrichment}
                  disabled={dispenseState !== 'idle'}
                  className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase transition-colors ${
                    dispenseState === 'dispensing'
                      ? 'bg-amber-500 text-black animate-pulse'
                      : dispenseState === 'complete'
                      ? 'bg-emerald-500 text-black'
                      : 'bg-emerald-600/80 hover:bg-emerald-500 text-white'
                  }`}
                >
                  {dispenseState === 'dispensing' ? '⚡ Dispensing...' : dispenseState === 'complete' ? '✓ Dosed' : 'Dose Now'}
                </button>
              </div>
            </div>
          </div>

          {/* Center Column: ECOSYSTEM METRICS & AUTOMATION (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <div className="flex items-center justify-between pb-1 border-b border-white/10">
              <span className="font-ui text-xs font-bold uppercase tracking-wider text-emerald-300">
                Ecosystem Metrics // {activePlant.name}
              </span>
              <span className="text-[10px] text-emerald-400/80 font-ui">Sensor Active</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {/* Soil Moisture Gauge */}
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="flex items-center justify-between text-[11px] font-ui mb-1">
                  <span className="text-white/70">SOIL MOISTURE</span>
                  <span className="text-emerald-300 font-bold">{liveMoisture}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden mb-1">
                  <motion.div
                    className="h-full bg-emerald-400 rounded-full"
                    animate={{ width: `${liveMoisture}%` }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
                <span className="text-[9px] text-white/40 font-ui">Target Range: 70-85%</span>
              </div>

              {/* Nutrients N-P-K */}
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="flex items-center justify-between text-[11px] font-ui mb-1">
                  <span className="text-white/70">NUTRIENTS (N-P-K)</span>
                  <span className="text-teal-300 font-bold">{activePlant.n}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden mb-1">
                  <div className="h-full bg-teal-400 rounded-full" style={{ width: `${activePlant.n}%` }} />
                </div>
                <span className="text-[9px] text-teal-300/80 font-ui">Status: Rich Organic</span>
              </div>

              {/* Sunlight Exposure */}
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="flex items-center justify-between text-[11px] font-ui mb-1">
                  <span className="text-white/70">SUNLIGHT UV</span>
                  <span className="text-amber-300 font-bold">{activePlant.light} hrs</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden mb-1">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: `${(activePlant.light / 12) * 100}%` }} />
                </div>
                <span className="text-[9px] text-white/40 font-ui">Ambient: UV Index 4</span>
              </div>

              {/* Sub-Surface pH */}
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="flex items-center justify-between text-[11px] font-ui mb-1">
                  <span className="text-white/70">SUB-SURFACE pH</span>
                  <span className="text-cyan-300 font-bold">{activePlant.ph}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden mb-1">
                  <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${(activePlant.ph / 8) * 100}%` }} />
                </div>
                <span className="text-[9px] text-cyan-300/80 font-ui">Balanced Acidic Soil</span>
              </div>
            </div>

            {/* 7-Day Biophilic Trend Graph Simulation */}
            <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex-1 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[11px] font-ui mb-2">
                <span className="text-white/70">7-DAY BIOPHILIC TREND</span>
                <span className="text-emerald-400 text-[10px]">● Moisture ● Light ● Vigor</span>
              </div>
              <div className="h-20 flex items-end gap-1.5 pt-2">
                {[68, 72, 70, 75, 74, 80, liveMoisture].map((val, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                    <motion.div
                      className="w-full rounded-t bg-gradient-to-t from-emerald-600 to-teal-300"
                      initial={{ height: 0 }}
                      animate={{ height: `${(val / 100) * 100}%` }}
                      transition={{ duration: 0.5, delay: idx * 0.05 }}
                    />
                    <span className="text-[8px] text-white/40 font-ui">D{idx + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Realtime Alert Banner */}
            <div className="p-2.5 rounded-lg bg-emerald-950/80 border border-emerald-500/30 flex items-center gap-2 text-[11px] font-ui text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
              <span>
                <strong>HYPERCARE ALERT:</strong> Soil enrichment applied at optimal thresholds for{' '}
                <span className="text-white underline">{activePlant.name}</span>.
              </span>
            </div>
          </div>

          {/* Right Column: BALCONY SENSOR MAP (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <div className="flex items-center justify-between pb-1 border-b border-white/10">
              <span className="font-ui text-xs font-bold uppercase tracking-wider text-emerald-300">
                Balcony Map
              </span>
              <span className="text-[10px] text-emerald-400 font-ui">8 Probes Online</span>
            </div>

            {/* Interactive Balcony Layout Contour */}
            <div className="p-3 rounded-xl bg-black/50 border border-white/10 relative h-64 flex items-center justify-center overflow-hidden">
              <svg viewBox="0 0 160 260" className="w-full h-full max-h-60" fill="none">
                {/* Organic Balcony boundary path */}
                <path
                  d="M 30 20 C 70 15, 130 15, 140 40 C 145 70, 110 90, 110 130 C 110 170, 145 190, 140 220 C 130 245, 70 245, 30 240 C 15 200, 15 60, 30 20 Z"
                  fill="#0D2418"
                  stroke="#28CA41"
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                  opacity="0.8"
                />

                {/* Sensor Probes Markers */}
                {[
                  { id: 'B8', x: 80, y: 40, plant: 'Monstera' },
                  { id: 'B1', x: 50, y: 100, plant: 'Fiddle Leaf' },
                  { id: 'B2', x: 60, y: 135, plant: 'Boston Ferns' },
                  { id: 'B3', x: 55, y: 165, plant: 'Bougainvillea' },
                  { id: 'B7', x: 120, y: 170, plant: 'English Ivy' },
                  { id: 'B6', x: 125, y: 130, plant: 'Perennials' },
                  { id: 'B4', x: 85, y: 220, plant: 'Terrace Lawn' },
                ].map(probe => {
                  const isActive = activeProbe === probe.id;
                  return (
                    <g
                      key={probe.id}
                      onClick={() => {
                        const matching = INITIAL_PLANTS.find(pl => pl.probe === probe.id);
                        if (matching) setActivePlantId(matching.id);
                      }}
                      className="cursor-pointer group"
                    >
                      <circle
                        cx={probe.x}
                        cy={probe.y}
                        r={isActive ? "10" : "6"}
                        fill={isActive ? "#28CA41" : "#0A5C2B"}
                        className="transition-all duration-300"
                        opacity={isActive ? "0.9" : "0.6"}
                      />
                      {isActive && (
                        <circle
                          cx={probe.x}
                          cy={probe.y}
                          r="16"
                          stroke="#28CA41"
                          strokeWidth="1"
                          className="animate-ping opacity-75"
                        />
                      )}
                      <text
                        x={probe.x}
                        y={probe.y + 3}
                        fontSize="6"
                        fill="#FFFFFF"
                        fontFamily="sans-serif"
                        textAnchor="middle"
                        fontWeight="bold"
                      >
                        {probe.id}
                      </text>
                    </g>
                  );
                })}
              </svg>

              <div className="absolute bottom-2 left-2 right-2 text-center bg-black/80 backdrop-blur-sm py-1 rounded text-[9px] font-ui text-emerald-300">
                Selected: Probe {activeProbe} ({activePlant.name})
              </div>
            </div>

            <div className="text-[10px] text-white/50 font-ui text-center">
              💡 Tap any probe pin on the contour map to inspect that botanical zone.
            </div>
          </div>

        </div>
      )}

      {/* Footer System Status Bar */}
      <div className="px-4 py-2 bg-black/60 border-t border-emerald-500/20 flex flex-wrap items-center justify-between text-[10px] font-ui text-white/60">
        <div className="flex items-center gap-3">
          <span>OUTDOOR: 24°C</span>
          <span>HUMIDITY: 62%</span>
          <span>WIND: CALM BREEZE</span>
        </div>
        <div className="flex items-center gap-2 text-emerald-400">
          <span>● Mesh Network: 8/8 Online</span>
          <span>Latency: 28ms</span>
        </div>
      </div>
    </div>
  );
}
