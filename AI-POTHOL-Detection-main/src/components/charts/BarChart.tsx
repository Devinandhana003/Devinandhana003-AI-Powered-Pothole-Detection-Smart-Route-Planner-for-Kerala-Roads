import { motion } from 'framer-motion'

interface BarChartProps {
  data: Array<{ label: string; value: number; value2?: number }>
  color?: string
  color2?: string
  height?: number
}

export function BarChart({ data, color = '#00d4ff', color2 = '#22c55e', height = 120 }: BarChartProps) {
  const max = Math.max(...data.map(d => Math.max(d.value, d.value2 || 0)))

  return (
    <div className="flex items-end gap-2 w-full" style={{ height }}>
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div className="w-full flex items-end gap-0.5" style={{ height: height - 20 }}>
            <motion.div className="flex-1 rounded-t-sm min-h-[2px]" style={{ backgroundColor: color, opacity: 0.85 }} initial={{ height: 0 }} animate={{ height: `${(d.value / max) * 100}%` }} transition={{ duration: 0.6, delay: i * 0.05 }} />
            {d.value2 !== undefined && <motion.div className="flex-1 rounded-t-sm min-h-[2px]" style={{ backgroundColor: color2, opacity: 0.75 }} initial={{ height: 0 }} animate={{ height: `${(d.value2 / max) * 100}%` }} transition={{ duration: 0.6, delay: i * 0.05 + 0.1 }} />}
          </div>
          <span className="text-xs text-gray-500 font-medium">{d.label}</span>
        </div>
      ))}
    </div>
  )
}
