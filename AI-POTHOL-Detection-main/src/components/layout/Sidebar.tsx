import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, ScanSearch, Map, Activity, Settings, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/detection', icon: ScanSearch, label: 'Detection' },
  { to: '/routes', icon: Map, label: 'Route Optimizer' },
]

export function Sidebar() {
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <motion.aside animate={{ width: collapsed ? 72 : 240 }} transition={{ duration: 0.3 }} className="fixed left-0 top-16 bottom-0 z-40 flex flex-col bg-dark-800/80 backdrop-blur-xl border-r border-white/5 overflow-hidden">
      <div className="flex-1 px-3 pt-6 pb-4 space-y-1 overflow-y-auto">
        {navItems.map(({ to, icon: Icon, label }) => {
          const active = location.pathname === to
          return (
            <Link key={to} to={to} className={`sidebar-link ${active ? 'active' : ''}`} title={collapsed ? label : undefined}>
              <Icon className="icon flex-shrink-0" size={20} />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="text-sm font-medium whitespace-nowrap">{label}</motion.span>
                )}
              </AnimatePresence>
            </Link>
          )
        })}
      </div>
      <div className="px-3 pb-4 border-t border-white/5 pt-3">
        <button onClick={() => setCollapsed(!collapsed)} className="sidebar-link w-full">
          {collapsed ? <ChevronRight size={20} className="flex-shrink-0" /> : <ChevronLeft size={20} className="flex-shrink-0" />}
          <AnimatePresence>
            {!collapsed && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-medium whitespace-nowrap">Collapse</motion.span>}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  )
}
