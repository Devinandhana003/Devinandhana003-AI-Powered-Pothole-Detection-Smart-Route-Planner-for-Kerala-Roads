import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  icon: ReactNode
  change?: number
  color?: 'cyan' | 'blue' | 'green' | 'orange' | 'red'
  suffix?: string
}

const colorMap = {
  cyan: 'text-cyan-400 bg-cyan-400/10',
  blue: 'text-blue-400 bg-blue-400/10',
  green: 'text-green-400 bg-green-400/10',
  orange: 'text-orange-400 bg-orange-400/10',
  red: 'text-red-400 bg-red-400/10',
}

export function StatCard({ title, value, icon, change, color = 'cyan', suffix }: StatCardProps) {
  return (
    <motion.div className="stat-card" whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm text-gray-400 font-medium">{title}</p>
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${colorMap[color]}`}>{icon}</div>
      </div>
      <div className="flex items-end gap-2">
        <p className="text-2xl font-bold text-white">{value}{suffix && <span className="text-lg ml-0.5">{suffix}</span>}</p>
      </div>
      {change !== undefined && (
        <div className={`flex items-center gap-1 mt-2 text-xs ${change >= 0 ? 'text-red-400' : 'text-green-400'}`}>
          {change >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          <span>{Math.abs(change)} from yesterday</span>
        </div>
      )}
    </motion.div>
  )
}
