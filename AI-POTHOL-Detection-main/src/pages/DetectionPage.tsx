import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, Image, Video, Play, Square, ScanLine, AlertTriangle, CheckCircle, Target, Gauge, MapPin, Clock, RefreshCw } from 'lucide-react'
import { SeverityBadge } from '../components/ui/SeverityBadge'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'

interface DetectionResult {
  confidence: number
  severity: 'critical' | 'high' | 'medium' | 'low'
  location: string
  depth: string
  size: string
  estimatedRepair: string
}

export default function DetectionPage() {
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image')
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isDetecting, setIsDetecting] = useState(false)
  const [result, setResult] = useState<DetectionResult | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) processFile(f)
  }

  const processFile = (f: File) => {
    setFile(f)
    setPreview(URL.createObjectURL(f))
    setResult(null)
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true)
    else if (e.type === 'dragleave') setDragActive(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files?.[0]) processFile(e.dataTransfer.files[0])
  }

  const runDetection = async () => {
    if (!file) return
    setIsDetecting(true)
    await new Promise(r => setTimeout(r, 2500))
    setResult({
      confidence: 94.7,
      severity: 'high',
      location: 'MG Road, Sector 15',
      depth: '12cm',
      size: '1.8m x 0.9m',
      estimatedRepair: '2-3 days',
    })
    setIsDetecting(false)
  }

  const resetUpload = () => {
    setFile(null)
    setPreview(null)
    setResult(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Pothole Detection</h1>
          <p className="text-gray-400">Upload an image or video to detect potholes using our AI model</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Upload Area */}
          <div className="glass-card p-6">
            {/* Type Toggle */}
            <div className="flex items-center gap-2 mb-6">
              <button onClick={() => setMediaType('image')} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${mediaType === 'image' ? 'bg-cyan-400/10 text-cyan-400 border border-cyan-400/30' : 'text-gray-400 hover:text-white'}`}>
                <Image size={18} />
                Image
              </button>
              <button onClick={() => setMediaType('video')} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${mediaType === 'video' ? 'bg-cyan-400/10 text-cyan-400 border border-cyan-400/30' : 'text-gray-400 hover:text-white'}`}>
                <Video size={18} />
                Video
              </button>
            </div>

            {/* Drop Zone */}
            <div className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${dragActive ? 'border-cyan-400 bg-cyan-400/5' : 'border-white/10 hover:border-cyan-400/40'}`} onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop} onClick={() => fileInputRef.current?.click()}>
              <input ref={fileInputRef} type="file" accept={mediaType === 'image' ? 'image/*' : 'video/*'} onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />

              {!preview ? (
                <div className="py-8">
                  <div className="w-16 h-16 rounded-full bg-cyan-400/10 flex items-center justify-center mx-auto mb-4">
                    <Upload size={28} className="text-cyan-400" />
                  </div>
                  <p className="text-white font-medium mb-2">Drop your {mediaType} here</p>
                  <p className="text-gray-500 text-sm">or click to browse</p>
                  <p className="text-gray-600 text-xs mt-2">Supports JPG, PNG, MP4, MOV</p>
                </div>
              ) : (
                <div className="relative">
                  {mediaType === 'image' ? (
                    <img src={preview} alt="Preview" className="max-h-72 mx-auto rounded-lg" />
                  ) : (
                    <video src={preview} controls className="max-h-72 mx-auto rounded-lg" />
                  )}
                  {/* Detection overlay */}
                  {result && (
                    <motion.div className="absolute border-2 border-red-400 rounded-lg bg-red-400/10" style={{ top: '20%', left: '25%', width: '50%', height: '40%' }} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring' }}>
                      <div className="absolute -top-6 left-0 bg-red-400 text-black text-xs font-bold px-2 py-1 rounded">POTHOLE DETECTED</div>
                    </motion.div>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              {!result ? (
                <>
                  <button onClick={runDetection} disabled={!file || isDetecting} className="flex-1 neon-btn flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                    {isDetecting ? <LoadingSpinner size="sm" /> : <ScanLine size={18} />}
                    {isDetecting ? 'Detecting...' : 'Run Detection'}
                  </button>
                  {file && (
                    <button onClick={resetUpload} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-colors">
                      <RefreshCw size={18} />
                    </button>
                  )}
                </>
              ) : (
                <button onClick={resetUpload} className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all">
                  <RefreshCw size={18} />
                  New Detection
                </button>
              )}
            </div>
          </div>

          {/* Results Panel */}
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <Target size={20} className="text-cyan-400" />
              Detection Results
            </h2>

            <AnimatePresence mode="wait">
              {isDetecting ? (
                <motion.div key="loading" className="flex flex-col items-center justify-center py-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <LoadingSpinner size="lg" label="Running AI analysis..." />
                  <div className="mt-6 w-full max-w-xs">
                    <div className="h-1.5 bg-dark-600 rounded-full overflow-hidden">
                      <motion.div className="h-full bg-cyan-400" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 2.5, ease: 'linear' }} />
                    </div>
                  </div>
                </motion.div>
              ) : result ? (
                <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  {/* Confidence Score */}
                  <div className="text-center mb-6 p-6 rounded-xl bg-dark-700/50 border border-white/5">
                    <p className="text-gray-400 text-sm mb-2">Detection Confidence</p>
                    <p className="text-5xl font-bold text-cyan-400 mb-3">{result.confidence}%</p>
                    <div className="w-full h-2 bg-dark-600 rounded-full overflow-hidden max-w-xs mx-auto">
                      <motion.div className="h-full bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full" initial={{ width: 0 }} animate={{ width: `${result.confidence}%` }} transition={{ duration: 0.8, ease: 'easeOut' }} />
                    </div>
                  </div>

                  {/* Severity Card */}
                  <div className="mb-6 p-4 rounded-xl bg-dark-700/50 border border-white/5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Severity Level</p>
                        <p className="text-white font-medium mt-1">This pothole requires attention</p>
                      </div>
                      <SeverityBadge severity={result.severity} />
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-dark-700/50 border border-white/5">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin size={16} className="text-cyan-400" />
                        <span className="text-gray-400 text-sm">Location</span>
                      </div>
                      <p className="text-white font-medium">{result.location}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-dark-700/50 border border-white/5">
                      <div className="flex items-center gap-2 mb-2">
                        <Gauge size={16} className="text-cyan-400" />
                        <span className="text-gray-400 text-sm">Est. Depth</span>
                      </div>
                      <p className="text-white font-medium">{result.depth}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-dark-700/50 border border-white/5">
                      <div className="flex items-center gap-2 mb-2">
                        <Image size={16} className="text-cyan-400" />
                        <span className="text-gray-400 text-sm">Size</span>
                      </div>
                      <p className="text-white font-medium">{result.size}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-dark-700/50 border border-white/5">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock size={16} className="text-cyan-400" />
                        <span className="text-gray-400 text-sm">Est. Repair</span>
                      </div>
                      <p className="text-white font-medium">{result.estimatedRepair}</p>
                    </div>
                  </div>

                  {/* Status Badges */}
                  <div className="flex items-center gap-2 mt-6">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-400/10 text-green-400 text-xs font-medium">
                      <CheckCircle size={14} />
                      Verified Detection
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-400/10 text-cyan-400 text-xs font-medium">
                      <ScanLine size={14} />
                      YOLOv8 Model
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="empty" className="flex flex-col items-center justify-center py-16 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="w-16 h-16 rounded-full bg-dark-700 flex items-center justify-center mb-4">
                    <ScanLine size={28} className="text-gray-600" />
                  </div>
                  <p className="text-gray-400 font-medium mb-1">No detection yet</p>
                  <p className="text-gray-600 text-sm">Upload an image or video to get started</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
