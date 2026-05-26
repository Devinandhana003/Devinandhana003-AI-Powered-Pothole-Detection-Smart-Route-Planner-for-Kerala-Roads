import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'
import { motion } from 'framer-motion'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/5 border border-white/10 hover:border-cyan-400/40 transition-all"
    >
      <motion.div key={theme} initial={{ rotate: -30, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} transition={{ duration: 0.2 }}>
        {theme === 'dark' ? <Sun size={16} className="text-yellow-400" /> : <Moon size={16} className="text-cyan-400" />}
      </motion.div>
    </motion.button>
  )
}
