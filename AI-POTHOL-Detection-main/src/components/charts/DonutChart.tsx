import { motion } from 'framer-motion'

interface DonutSlice {
  value: number
  color: string
  label: string
}

interface DonutChartProps {
  data: DonutSlice[]
  size?: number
  centerValue?: string
  centerLabel?: string
}

export function DonutChart({ data, size = 140, centerValue, centerLabel }: DonutChartProps) {
  const total = data.reduce((sum, d) => sum + d.value, 0)
  const radius = (size - 18) / 2
  const circumference = 2 * Math.PI * radius
  let cumulativePercent = 0

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {data.map((slice, i) => {
          const percent = slice.value / total
          const strokeDasharray = `${percent * circumference} ${circumference}`
          const strokeDashoffset = -cumulativePercent * circumference
          cumulativePercent += percent
          return <motion.circle key={i} cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={slice.color} strokeWidth="18" strokeDasharray={strokeDasharray} strokeDashoffset={strokeDashoffset} strokeLinecap="round" initial={{ strokeDasharray: `0 ${circumference}` }} animate={{ strokeDasharray }} transition={{ duration: 0.8, delay: i * 0.1 }} />
        })}
      </svg>
      {(centerLabel || centerValue) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {centerValue && <p className="text-xl font-bold text-white">{centerValue}</p>}
          {centerLabel && <p className="text-xs text-gray-400">{centerLabel}</p>}
        </div>
      )}
    </div>
  )
}
