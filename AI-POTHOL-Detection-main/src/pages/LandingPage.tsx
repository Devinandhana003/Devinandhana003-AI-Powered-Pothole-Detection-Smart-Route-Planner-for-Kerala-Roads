import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ScanSearch, Map, Activity, Shield, BarChart3, Zap, GitBranchIcon, Target, Globe, Cpu, Layers, Radar, ArrowRight, CheckCircle } from 'lucide-react'
import { features, teamMembers, impactStats } from '../data/dummy'

const iconMap: Record<string, React.ElementType> = { ScanSearch, Map, Activity, Shield, BarChart3, Zap, Target, Globe }

const colorClasses: Record<string, string> = {
  cyan: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
  blue: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  green: 'text-green-400 bg-green-400/10 border-green-400/20',
  orange: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
  pink: 'text-pink-400 bg-pink-400/10 border-pink-400/20',
  yellow: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
}

const pipelineSteps = [
  { icon: Cpu, title: 'Data Collection', desc: 'Images/videos from dashcams, drones, citizen reports' },
  { icon: Layers, title: 'Preprocessing', desc: 'Resize, normalize, augment for model input' },
  { icon: Radar, title: 'YOLOv8 Detection', desc: 'Real-time object detection with 97%+ accuracy' },
  { icon: Shield, title: 'Severity Analysis', desc: 'Depth estimation and risk classification' },
  { icon: Map, title: 'Geotagging', desc: 'GPS coordinates and map integration' },
  { icon: Zap, title: 'Alert Dispatch', desc: 'Instant notifications to authorities' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-800" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,212,255,0.1) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />

        <motion.div className="relative z-10 max-w-4xl mx-auto text-center" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <motion.div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-400/10 border border-cyan-400/20 mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <span className="text-cyan-400 text-sm font-medium">AI-Powered Road Safety</span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-white">AI-Based</span>
            <br />
            <span className="gradient-text">Pothole Detection</span>
            <br />
            <span className="text-gray-400 text-3xl sm:text-4xl lg:text-5xl">& Intelligent Route Optimization</span>
          </h1>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
            Leverage deep learning and graph algorithms to detect road hazards in real-time and automatically compute the safest routes for commuters.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/dashboard" className="neon-btn flex items-center gap-2">
              <ScanSearch size={18} />
              Launch Dashboard
            </Link>
            <Link to="/detection" className="flex items-center gap-2 px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white transition-all">
              Try Detection
              <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-white mb-4">Powerful Features</h2>
            <p className="text-gray-400 max-w-xl mx-auto">Cutting-edge technology for smarter, safer roads</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => {
              const Icon = iconMap[feature.icon] || ScanSearch
              return (
                <motion.div key={i} className="glass-card p-6 hover:border-cyan-400/30 transition-all duration-300" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${colorClasses[feature.color]}`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pipeline */}
      <section className="py-20 px-4 bg-dark-800/30">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-white mb-4">AI Detection Pipeline</h2>
            <p className="text-gray-400">From raw input to actionable insights in seconds</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pipelineSteps.map((step, i) => (
              <motion.div key={i} className="relative glass-card p-5" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center flex-shrink-0">
                    <step.icon size={20} className="text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">{step.title}</h4>
                    <p className="text-gray-400 text-sm">{step.desc}</p>
                  </div>
                </div>
                {i < pipelineSteps.length - 1 && <div className="hidden lg:block absolute top-1/2 -right-3 w-6 border-t border-cyan-400/30" />}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Route Optimization */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-bold text-white mb-4">Intelligent Route Optimization</h2>
              <p className="text-gray-400 mb-6">Our graph-based algorithms analyze road conditions, traffic patterns, and real-time hazard data to compute the safest possible routes.</p>

              <div className="space-y-4">
                {['Weighted graph with road damage scores', 'Real-time hazard integration', 'Multi-objective optimization (time vs safety)', 'Alternative route suggestions with risk profiles'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-cyan-400 flex-shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>

              <Link to="/routes" className="inline-flex items-center gap-2 mt-8 neon-btn">
                <Map size={18} />
                Try Route Optimizer
              </Link>
            </motion.div>

            <motion.div className="glass-card p-6" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="h-64 bg-gradient-to-br from-dark-700 to-dark-800 rounded-lg flex items-center justify-center relative overflow-hidden">
                <svg viewBox="0 0 200 100" className="w-full h-full opacity-30">
                  <path d="M20,80 Q50,50 100,60 T180,20" stroke="#22c55e" strokeWidth="2" fill="none" strokeDasharray="4,2" />
                  <path d="M20,80 Q70,30 100,40 T180,30" stroke="#eab308" strokeWidth="1.5" fill="none" strokeDasharray="2,2" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-cyan-400">94%</p>
                    <p className="text-gray-400 text-sm">Safety Score</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-20 px-4 bg-dark-800/30">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-white mb-4">Real-World Impact</h2>
            <p className="text-gray-400">Making roads safer, one detection at a time</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactStats.map((stat, i) => {
              const Icon = iconMap[stat.icon] || BarChart3
              return (
                <motion.div key={i} className="glass-card p-6 text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <div className="w-12 h-12 rounded-full bg-cyan-400/10 flex items-center justify-center mx-auto mb-4">
                    <Icon size={24} className="text-cyan-400" />
                  </div>
                  <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-white mb-4">Meet the Team</h2>
            <p className="text-gray-400">The minds behind PotholeAI</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {teamMembers.map((member, i) => (
              <motion.div key={i} className="glass-card p-6 text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="w-16 h-16 rounded-full bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-cyan-400 font-bold">{member.avatar}</span>
                </div>
                <h4 className="font-medium text-white mb-1">{member.name}</h4>
                <p className="text-cyan-400 text-sm mb-2">{member.role}</p>
                <p className="text-gray-500 text-xs">{member.expertise}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div className="glass-card neon-border p-8 text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-bold text-white mb-4">Ready to make roads safer?</h2>
            <p className="text-gray-400 mb-6">Join us in revolutionizing road safety with AI technology.</p>
            <Link to="/dashboard" className="neon-btn inline-flex items-center gap-2">
              Get Started
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ScanSearch size={20} className="text-cyan-400" />
            <span className="font-bold text-white">Pothole<span className="text-cyan-400">AI</span></span>
          </div>
          <p className="text-gray-500 text-sm">2026 AI-Based Road Safety. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
