interface XPProgressProps { value: number; max: number; compact?: boolean }

export function XPProgress({ value, max, compact = false }: XPProgressProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))
  return (
    <div className={`xp-track${compact ? ' compact' : ''}`} role="progressbar" aria-valuemin={0} aria-valuemax={max} aria-valuenow={value}>
      <span style={{ width: `${percentage}%` }} />
    </div>
  )
}
