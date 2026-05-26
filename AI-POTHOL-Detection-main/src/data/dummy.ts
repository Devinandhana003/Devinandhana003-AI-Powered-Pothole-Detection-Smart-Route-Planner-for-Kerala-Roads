export const potholeDetections = [
  { id: 1, location: 'MG Road, Bangalore', lat: 12.9716, lng: 77.5946, severity: 'critical', confidence: 97.3, timestamp: '2026-05-24 09:14', size: '2.4m', depth: '18cm', status: 'unresolved' },
  { id: 2, location: 'NH-48, Delhi', lat: 28.6139, lng: 77.209, severity: 'high', confidence: 91.5, timestamp: '2026-05-24 08:52', size: '1.8m', depth: '12cm', status: 'reported' },
  { id: 3, location: 'Anna Salai, Chennai', lat: 13.0827, lng: 80.2707, severity: 'medium', confidence: 85.2, timestamp: '2026-05-24 08:30', size: '1.1m', depth: '8cm', status: 'under repair' },
  { id: 4, location: 'FC Road, Pune', lat: 18.5204, lng: 73.8567, severity: 'low', confidence: 78.9, timestamp: '2026-05-24 07:45', size: '0.7m', depth: '4cm', status: 'resolved' },
  { id: 5, location: 'Park Street, Kolkata', lat: 22.5726, lng: 88.3639, severity: 'high', confidence: 93.1, timestamp: '2026-05-24 07:22', size: '1.5m', depth: '10cm', status: 'unresolved' },
  { id: 6, location: 'SG Highway, Ahmedabad', lat: 23.0225, lng: 72.5714, severity: 'critical', confidence: 98.7, timestamp: '2026-05-24 06:58', size: '3.1m', depth: '22cm', status: 'reported' },
]

export const severityStats = [
  { label: 'Critical', count: 24, color: '#ef4444', change: +3 },
  { label: 'High', count: 68, color: '#f97316', change: -5 },
  { label: 'Medium', count: 142, color: '#eab308', change: +12 },
  { label: 'Low', count: 89, color: '#22c55e', change: -8 },
]

export const weeklyData = [
  { day: 'Mon', detected: 42, resolved: 31 },
  { day: 'Tue', detected: 58, resolved: 44 },
  { day: 'Wed', detected: 35, resolved: 28 },
  { day: 'Thu', detected: 71, resolved: 52 },
  { day: 'Fri', detected: 63, resolved: 48 },
  { day: 'Sat', detected: 29, resolved: 25 },
  { day: 'Sun', detected: 18, resolved: 16 },
]

export const routes = [
  { id: 'safest', name: 'Safest Route', distance: '12.4 km', duration: '28 min', safetyScore: 94, potholes: 2, color: '#22c55e', description: 'Via Outer Ring Road' },
  { id: 'fastest', name: 'Fastest Route', distance: '9.8 km', duration: '22 min', safetyScore: 67, potholes: 11, color: '#eab308', description: 'Via NH-48' },
  { id: 'alternate', name: 'Alternate Route', distance: '14.2 km', duration: '34 min', safetyScore: 81, potholes: 5, color: '#3b82f6', description: 'Via State Highway 35' },
]

export const teamMembers = [
  { name: 'Dr. Arjun Mehta', role: 'AI/ML Lead', avatar: 'AM', expertise: 'Computer Vision, YOLOv8' },
  { name: 'Priya Sharma', role: 'Backend Engineer', avatar: 'PS', expertise: 'FastAPI, Python' },
  { name: 'Rohan Verma', role: 'Frontend Developer', avatar: 'RV', expertise: 'React, TypeScript' },
  { name: 'Anika Patel', role: 'Data Scientist', avatar: 'AP', expertise: 'Geo-spatial Analysis' },
  { name: 'Kiran Nair', role: 'DevOps Engineer', avatar: 'KN', expertise: 'Docker, Kubernetes' },
]

export const features = [
  { icon: 'ScanSearch', title: 'AI-Powered Detection', description: 'YOLOv8-based deep learning model detects potholes with 97%+ accuracy.', color: 'cyan' },
  { icon: 'Map', title: 'Intelligent Route Planning', description: 'Graph-based optimization for safest routes.', color: 'blue' },
  { icon: 'Activity', title: 'Real-Time Monitoring', description: 'Live telemetry pipeline processes thousands of road reports.', color: 'green' },
  { icon: 'Shield', title: 'Severity Classification', description: 'Multi-level severity scoring enables prioritized repairs.', color: 'orange' },
  { icon: 'BarChart3', title: 'Analytics Dashboard', description: 'Comprehensive visualizations track detection trends.', color: 'pink' },
  { icon: 'Zap', title: 'Edge Deployment', description: 'Optimized model runs on edge devices for on-device inference.', color: 'yellow' },
]

export const impactStats = [
  { value: '2.4M+', label: 'Potholes Detected', icon: 'ScanSearch' },
  { value: '98.3%', label: 'Detection Accuracy', icon: 'Target' },
  { value: '340K+', label: 'Routes Optimized', icon: 'Map' },
  { value: '12 Cities', label: 'Active Coverage', icon: 'Globe' },
]

export const alertsLive = [
  { id: 'a1', location: 'Silk Board Junction', severity: 'critical', time: '2 min ago' },
  { id: 'a2', location: 'Electronic City Flyover', severity: 'high', time: '5 min ago' },
  { id: 'a3', location: 'Hebbal Flyover', severity: 'medium', time: '11 min ago' },
  { id: 'a4', location: 'Marathahalli Bridge', severity: 'high', time: '18 min ago' },
]
