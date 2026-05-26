import { motion } from 'framer-motion'
import { MapPin, Navigation, Zap } from 'lucide-react'
import { potholeDetections, alertsLive } from '../../data/dummy'

interface MapViewProps {
  showRoute?: boolean
  compact?: boolean
}

const severityColors: Record<string, string> = { critical: '#ef4444', high: '#f97316', medium: '#eab308', low: '#22c55e' }

export function MapView({ showRoute = false, compact = false }: MapViewProps) {
  return (
    <div className={`relative w-full ${compact ? 'h-64' : 'h-full min-h-[380px]'} rounded-xl overflow-hidden bg-gradient-to-br from-dark-950 to-dark-800`}>
      {/* Grid background */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(0,212,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      {/* Glow effects */}
      <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-cyan-400/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl" />
      {/* Simulated road network */}
      <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
        <g stroke="#00d4ff" strokeWidth="1.5" fill="none" strokeDasharray="4,4">
          <path d="M0,250 Q200,200 400,250 Q600,300 800,250" />
          <path d="M0,150 Q200,100 400,150 Q600,200 800,150" />
          <path d="M0,350 Q200,300 400,350 Q600,400 800,350" />
          <path d="M200,0 Q250,125 200,250 Q150,375 200,500" />
          <path d="M400,0 Q450,125 400,250 Q350,375 400,500" />
          <path d="M600,0 Q650,125 600,250 Q550,375 600,500" />
        </g>
        {showRoute && <motion.path d="M150,350 Q250,300 350,280 Q450,260 550,220 Q650,180 700,150" stroke="#22c55e" strokeWidth="3" fill="none" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2 }} />}
      </svg>
      {/* Pothole markers */}
      {potholeDetections.slice(0, 6).map((p, i) => {
        const x = 10 + (i % 3) * 30 + Math.sin(i * 1.5) * 8
        const y = 15 + Math.floor(i / 3) * 35 + Math.cos(i * 1.2) * 6
        return (
          <motion.div key={p.id} className="absolute" style={{ left: `${x}%`, top: `${y}%` }} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.1 }}>
            <div className="relative">
              <div className="absolute -inset-2 rounded-full opacity-30 animate-ping" style={{ backgroundColor: severityColors[p.severity] }} />
              <div className="w-3 h-3 rounded-full border-2 border-white/30 relative z-10" style={{ backgroundColor: severityColors[p.severity] }} />
            </div>
          </motion.div>
        )
      })}
      {/* Live alerts */}
      {alertsLive.map((alert, i) => {
        const x = 20 + i * 18
        const y = 55 + Math.sin(i * 0.8) * 12
        return (
          <motion.div key={alert.id} className="absolute" style={{ left: `${x}%`, top: `${y}%` }} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 + i * 0.15 }}>
            <div className="relative cursor-pointer group">
              <div className="absolute -inset-3 rounded-full bg-red-500/20 animate-pulse" />
              <Zap size={14} className="relative z-10 text-red-400" />
            </div>
          </motion.div>
        )
      })}
      {showRoute && (
        <>
          <motion.div className="absolute" style={{ left: '18%', top: '72%' }} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }}>
            <div className="w-8 h-8 rounded-full bg-cyan-400/20 border-2 border-cyan-400 flex items-center justify-center"><Navigation size={14} className="text-cyan-400" /></div>
          </motion.div>
          <motion.div className="absolute" style={{ left: '82%', top: '28%' }} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2.2 }}>
            <div className="w-8 h-8 rounded-full bg-green-400/20 border-2 border-green-400 flex items-center justify-center"><MapPin size={14} className="text-green-400" /></div>
          </motion.div>
        </>
      )}
      {/* Live indicator */}
      <div className="absolute top-3 left-3 flex items-center gap-2 bg-dark-800/70 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-1.5">
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-xs text-gray-300 font-medium">Live</span>
      </div>
    </div>
  )
}
