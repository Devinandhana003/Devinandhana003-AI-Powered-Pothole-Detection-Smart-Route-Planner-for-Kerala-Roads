import { motion } from 'framer-motion'
import { ScanLine, AlertTriangle, CheckCircle, Clock, MapPin, TrendingUp, Activity, BarChart3 } from 'lucide-react'
import { Sidebar } from '../components/layout/Sidebar'
import { StatCard } from '../components/ui/StatCard'
import { SeverityBadge } from '../components/ui/SeverityBadge'
import { BarChart } from '../components/charts/BarChart'
import { DonutChart } from '../components/charts/DonutChart'
import { LineChart } from '../components/charts/LineChart'
import { MapView } from '../components/map/MapView'
import { potholeDetections, severityStats, weeklyData, alertsLive } from '../data/dummy'

export default function DashboardPage() {
  return (
    <div className="min-h-screen pt-16 flex">
      <Sidebar />

      <main className="flex-1 ml-0 md:ml-60 p-4 md:p-6 lg:p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Real-time overview of pothole detection and road safety metrics</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard title="Total Detected" value="2,438" icon={<ScanLine size={18} />} change={127} color="cyan" />
          <StatCard title="Critical Alerts" value="24" icon={<AlertTriangle size={18} />} change={3} color="red" />
          <StatCard title="Resolved" value="1,892" icon={<CheckCircle size={18} />} change={-156} color="green" />
          <StatCard title="Pending" value="546" icon={<Clock size={18} />} change={+42} color="orange" />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Map */}
          <div className="lg:col-span-2 glass-card p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-white">Live Detection Map</h2>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-gray-400">Real-time</span>
              </div>
            </div>
            <MapView compact />
          </div>

          {/* Live Alerts */}
          <div className="glass-card p-4">
            <h2 className="font-semibold text-white mb-4">Live Alerts</h2>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {alertsLive.map((alert, i) => (
                <motion.div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg bg-dark-700/50 hover:bg-dark-600/50 transition-colors cursor-pointer" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                  <div className={`w-2 h-2 rounded-full mt-2 ${alert.severity === 'critical' ? 'bg-red-400' : alert.severity === 'high' ? 'bg-orange-400' : 'bg-yellow-400'} animate-pulse`} />
                  <div className="flex-1">
                    <p className="text-sm text-white font-medium">{alert.location}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <SeverityBadge severity={alert.severity as 'critical' | 'high' | 'medium'} />
                      <span className="text-xs text-gray-500">{alert.time}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Weekly Trend */}
          <div className="glass-card p-4">
            <h2 className="font-semibold text-white mb-4">Weekly Detection Trend</h2>
            <BarChart data={weeklyData.map(d => ({ label: d.day, value: d.detected, value2: d.resolved }))} height={160} />
            <div className="flex items-center justify-center gap-6 mt-4 text-xs">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#00d4ff' }} />Detected</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#22c55e' }} />Resolved</div>
            </div>
          </div>

          {/* Severity Distribution */}
          <div className="glass-card p-4">
            <h2 className="font-semibold text-white mb-4">Severity Distribution</h2>
            <div className="flex items-center justify-center">
              <DonutChart data={severityStats.map(s => ({ value: s.count, color: s.color, label: s.label }))} centerValue="323" centerLabel="Total" />
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {severityStats.map(s => (
                <div key={s.label} className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
                  <span className="text-gray-400">{s.label}</span>
                  <span className="text-white font-medium ml-auto">{s.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Detection Accuracy */}
          <div className="glass-card p-4">
            <h2 className="font-semibold text-white mb-4">Detection Accuracy</h2>
            <div className="flex flex-col items-center justify-center h-40">
              <p className="text-4xl font-bold text-cyan-400 mb-2">97.3%</p>
              <p className="text-gray-400 text-sm">Model Accuracy</p>
              <div className="w-full max-w-xs mt-4 h-2 bg-dark-600 rounded-full overflow-hidden">
                <motion.div className="h-full bg-cyan-400 rounded-full" initial={{ width: 0 }} animate={{ width: '97.3%' }} transition={{ duration: 1, ease: 'easeOut' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Detections Table */}
        <div className="glass-card p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-white">Recent Detections</h2>
            <button className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b border-white/5">
                  <th className="pb-3 font-medium">Location</th>
                  <th className="pb-3 font-medium">Severity</th>
                  <th className="pb-3 font-medium">Confidence</th>
                  <th className="pb-3 font-medium">Size</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Time</th>
                </tr>
              </thead>
              <tbody>
                {potholeDetections.slice(0, 5).map((p, i) => (
                  <motion.tr key={p.id} className="border-b border-white/5 hover:bg-white/5 transition-colors" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-gray-500" />
                        <span className="text-white">{p.location}</span>
                      </div>
                    </td>
                    <td className="py-3"><SeverityBadge severity={p.severity as 'critical' | 'high' | 'medium' | 'low'} /></td>
                    <td className="py-3"><span className="text-cyan-400 font-medium">{p.confidence}%</span></td>
                    <td className="py-3 text-gray-400">{p.size}</td>
                    <td className="py-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${p.status === 'resolved' ? 'text-green-400 bg-green-400/10' : p.status === 'under repair' ? 'text-yellow-400 bg-yellow-400/10' : p.status === 'reported' ? 'text-blue-400 bg-blue-400/10' : 'text-red-400 bg-red-400/10'}`}>{p.status}</span>
                    </td>
                    <td className="py-3 text-gray-500">{p.timestamp}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
