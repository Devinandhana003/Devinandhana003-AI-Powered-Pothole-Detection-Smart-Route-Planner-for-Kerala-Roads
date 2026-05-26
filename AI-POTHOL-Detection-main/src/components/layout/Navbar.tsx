import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ScanSearch, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { ThemeToggle } from '../ui/ThemeToggle'

const links = [
  { to: '/', label: 'Home' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/detection', label: 'Detection' },
  { to: '/routes', label: 'Routes' },
]

export function Navbar() {
  const location = useLocation()
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-dark-900/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center">
              <ScanSearch size={16} className="text-cyan-400" />
            </div>
            <span className="font-bold text-white">Pothole<span className="text-cyan-400">AI</span></span>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            {links.map(link => (
              <Link key={link.to} to={link.to} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${location.pathname === link.to ? 'text-cyan-400 bg-cyan-400/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>{link.label}</Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link to="/dashboard" className="hidden md:flex neon-btn text-sm py-2">Open Dashboard</Link>
            <button className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10" onClick={() => setOpen(!open)}>{open ? <X size={18} /> : <Menu size={18} />}</button>
          </div>
        </div>
      </div>
      {open && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="md:hidden border-t border-white/5 bg-dark-900/95 backdrop-blur-xl px-4 py-3 space-y-1">
          {links.map(link => (
            <Link key={link.to} to={link.to} onClick={() => setOpen(false)} className={`block px-4 py-2.5 rounded-lg text-sm font-medium ${location.pathname === link.to ? 'text-cyan-400 bg-cyan-400/10' : 'text-gray-400'}`}>{link.label}</Link>
          ))}
        </motion.div>
      )}
    </nav>
  )
}
