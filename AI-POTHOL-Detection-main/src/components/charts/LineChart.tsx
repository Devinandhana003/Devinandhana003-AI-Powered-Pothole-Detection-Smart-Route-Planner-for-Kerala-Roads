import { motion } from 'framer-motion'

interface DataPoint {
  label: string
  value: number
}

interface LineChartProps {
  data: DataPoint[]
  color?: string
  height?: number
}

export function LineChart({ data, color = '#00d4ff', height = 100 }: LineChartProps) {
  const width = 300
  const padding = { top: 10, right: 10, bottom: 24, left: 10 }
  const chartWidth = width - padding.left - padding.right
  const chartHeight = height - padding.top - padding.bottom
  const max = Math.max(...data.map(d => d.value))
  const min = Math.min(...data.map(d => d.value))
  const range = max - min || 1

  const points = data.map((d, i) => ({
    x: padding.left + (i / (data.length - 1)) * chartWidth,
    y: padding.top + chartHeight - ((d.value - min) / range) * chartHeight,
    label: d.label,
  }))

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  const areaD = `${pathD} L ${points[points.length - 1].x} ${padding.top + chartHeight} L ${points[0].x} ${padding.top + chartHeight} Z`

  return (
    <div className="w-full overflow-hidden">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full" preserveAspectRatio="none">
        <defs><linearGradient id={`grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity="0.3" /><stop offset="100%" stopColor={color} stopOpacity="0" /></linearGradient></defs>
        <motion.path d={areaD} fill={`url(#grad-${color.replace('#', '')})`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} />
        <motion.path d={pathD} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, ease: 'easeInOut' }} />
        {points.map((p, i) => <motion.circle key={i} cx={p.x} cy={p.y} r="3" fill={color} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.8 + i * 0.05 }} />)}
        {points.map((p, i) => <text key={i} x={p.x} y={height - 4} textAnchor="middle" fontSize="8" fill="#6b7280">{p.label}</text>)}
      </svg>
    </div>
  )
}
