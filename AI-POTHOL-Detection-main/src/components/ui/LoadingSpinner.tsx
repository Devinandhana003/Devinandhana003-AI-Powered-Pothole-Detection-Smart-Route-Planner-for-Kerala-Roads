import { motion } from 'framer-motion'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  label?: string
}

const sizeMap = { sm: 24, md: 40, lg: 64 }

export function LoadingSpinner({ size = 'md', label }: LoadingSpinnerProps) {
  const s = sizeMap[size]
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: s, height: s }}>
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-cyan-400/20"
          style={{ borderTopColor: '#00d4ff' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div className="absolute inset-2 rounded-full border-2 border-cyan-400/10" style={{ borderBottomColor: '#00d4ff' }} animate={{ rotate: -360 }} transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }} />
      </div>
      {label && <p className="text-sm text-gray-400 font-medium">{label}</p>}
    </div>
  )
}
