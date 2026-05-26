import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Navigation, Clock, Shield, AlertTriangle, Route as RouteIcon, Car, Fuel, ChevronRight, Check } from 'lucide-react'
import { MapView } from '../components/map/MapView'
import { routes } from '../data/dummy'

export default function RoutesPage() {
  const [source, setSource] = useState('Koramangala, Bangalore')
  const [destination, setDestination] = useState('Whitefield, Bangalore')
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const handleCalculate = async () => {
    setIsCalculating(true)
    await new Promise(r => setTimeout(r, 1800))
    setIsCalculating(false)
    setShowResults(true)
    setSelectedRoute('safest')
  }

  const getSafetyColor = (score: number) => {
    if (score >= 90) return 'text-green-400'
    if (score >= 75) return 'text-cyan-400'
    if (score >= 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Route Optimization</h1>
          <p className="text-gray-400">Find the safest route by analyzing road hazards and conditions</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input Panel */}
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <RouteIcon size={20} className="text-cyan-400" />
              Plan Your Route
            </h2>

            <div className="space-y-4 mb-6">
              <div>
                <label className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                  <Navigation size={16} className="text-cyan-400" />
                  Source
                </label>
                <input type="text" value={source} onChange={e => setSource(e.target.value)} className="w-full bg-dark-700 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/40 transition-colors" placeholder="Enter starting point" />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                  <MapPin size={16} className="text-green-400" />
                  Destination
                </label>
                <input type="text" value={destination} onChange={e => setDestination(e.target.value)} className="w-full bg-dark-700 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/40 transition-colors" placeholder="Enter destination" />
              </div>
            </div>

            <button onClick={handleCalculate} disabled={isCalculating} className="w-full neon-btn flex items-center justify-center gap-2 disabled:opacity-50">
              {isCalculating ? (
                <>
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                    <RouteIcon size={18} />
                  </motion.div>
                  Calculating...
                </>
              ) : (
                <>
                  <RouteIcon size={18} />
                  Optimize Route
                </>
              )}
            </button>

            {/* Results */}
            <AnimatePresence>
              {showResults && (
                <motion.div className="mt-6 space-y-3" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-white">Available Routes</h3>
                    <span className="text-xs text-gray-500">{routes.length} routes found</span>
                  </div>

                  {routes.map((route, i) => (
                    <motion.div key={route.id} className={`p-4 rounded-lg border cursor-pointer transition-all ${selectedRoute === route.id ? 'border-cyan-400 bg-cyan-400/5' : 'border-white/10 bg-dark-700/50 hover:border-white/20'}`} onClick={() => setSelectedRoute(route.id)} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: route.color }} />
                            <h4 className="font-medium text-white">{route.name}</h4>
                            {selectedRoute === route.id && <Check size={14} className="text-cyan-400" />}
                          </div>
                          <p className="text-gray-400 text-sm mb-3">{route.description}</p>
                          <div className="flex items-center gap-4 text-xs">
                            <div className="flex items-center gap-1 text-gray-500">
                              <Clock size={12} />
                              {route.duration}
                            </div>
                            <div className="flex items-center gap-1 text-gray-500">
                              <Car size={12} />
                              {route.distance}
                            </div>
                            <div className="flex items-center gap-1 text-gray-500">
                              <AlertTriangle size={12} />
                              {route.potholes} hazards
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-2xl font-bold ${getSafetyColor(route.safetyScore)}`}>{route.safetyScore}</p>
                          <p className="text-xs text-gray-500">Safety</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Map Visualization */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Route Visualization</h2>
              <div className="flex items-center gap-2 text-xs">
                <div className="flex items-center gap-1 px-2 py-1 rounded bg-green-400/10 text-green-400">
                  <Shield size={12} />
                  Safest
                </div>
                <div className="flex items-center gap-1 px-2 py-1 rounded bg-yellow-400/10 text-yellow-400">
                  <Clock size={12} />
                  Fastest
                </div>
              </div>
            </div>

            <MapView showRoute={showResults} />

            {showResults && selectedRoute && (
              <motion.div className="mt-6 grid grid-cols-3 gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="p-4 rounded-lg bg-dark-700/50 border border-white/5 text-center">
                  <Shield size={20} className={`mx-auto mb-2 ${getSafetyColor(routes.find(r => r.id === selectedRoute)?.safetyScore || 0)}`} />
                  <p className="text-xl font-bold text-white">{routes.find(r => r.id === selectedRoute)?.safetyScore}%</p>
                  <p className="text-xs text-gray-500">Safety Score</p>
                </div>
                <div className="p-4 rounded-lg bg-dark-700/50 border border-white/5 text-center">
                  <AlertTriangle size={20} className="mx-auto mb-2 text-orange-400" />
                  <p className="text-xl font-bold text-white">{routes.find(r => r.id === selectedRoute)?.potholes}</p>
                  <p className="text-xs text-gray-500">Known Hazards</p>
                </div>
                <div className="p-4 rounded-lg bg-dark-700/50 border border-white/5 text-center">
                  <Fuel size={20} className="mx-auto mb-2 text-cyan-400" />
                  <p className="text-xl font-bold text-white">~8.5L</p>
                  <p className="text-xs text-gray-500">Est. Fuel</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Route Details */}
        {showResults && selectedRoute && (
          <motion.div className="mt-6 glass-card p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h3 className="text-lg font-semibold text-white mb-4">Route Breakdown</h3>
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { label: 'Road Quality', value: 'Good', icon: '🛣️', detail: '85% smooth surface' },
                { label: 'Traffic Level', value: 'Moderate', icon: '🚗', detail: 'Peak hours: 8-10 AM' },
                { label: 'Risk Zones', value: '2 areas', icon: '⚠️', detail: 'Construction zone ahead' },
                { label: 'Alternative Stops', value: 'Available', icon: '⛽', detail: '3 fuel stations en route' },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-lg bg-dark-700/50 border border-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-gray-400 text-sm">{item.label}</span>
                  </div>
                  <p className="text-white font-medium">{item.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.detail}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
