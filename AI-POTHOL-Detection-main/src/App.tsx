import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/layout/Navbar'
import LandingPage from './pages/LandingPage'
import DashboardPage from './pages/DashboardPage'
import DetectionPage from './pages/DetectionPage'
import RoutesPage from './pages/RoutesPage'

function App() {
  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/detection" element={<DetectionPage />} />
        <Route path="/routes" element={<RoutesPage />} />
      </Routes>
    </div>
  )
}

export default App
