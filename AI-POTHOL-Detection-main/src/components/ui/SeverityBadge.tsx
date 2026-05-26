interface SeverityBadgeProps {
  severity: 'critical' | 'high' | 'medium' | 'low'
}

const configs = {
  critical: { label: 'Critical', cls: 'severity-critical' },
  high: { label: 'High', cls: 'severity-high' },
  medium: { label: 'Medium', cls: 'severity-medium' },
  low: { label: 'Low', cls: 'severity-low' },
}

export function SeverityBadge({ severity }: SeverityBadgeProps) {
  const config = configs[severity]
  return <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${config.cls}`}>{config.label}</span>
}
