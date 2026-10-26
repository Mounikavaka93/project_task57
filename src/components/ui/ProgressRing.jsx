import { useInView, usePrefersReducedMotion } from '../../hooks/useInView'

export default function ProgressRing({
  value,
  size = 112,
  stroke = 10,
  color = '#d8ff4a',
  track = 'rgba(8,17,13,0.1)',
  label = 'Progress',
  children,
}) {
  const { ref, inView } = useInView()
  const reduce = usePrefersReducedMotion()
  const shown = inView || reduce
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const percent = Math.max(0, Math.min(100, value))
  const offset = circumference - ((shown ? percent : 0) / 100) * circumference

  return (
    <div
      ref={ref}
      className="relative inline-grid place-items-center"
      style={{ width: size, height: size }}
      role="progressbar"
      aria-valuenow={Math.round(percent)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={track} strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={reduce ? undefined : 'transition-[stroke-dashoffset] duration-1000 ease-out'}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">{children}</div>
    </div>
  )
}
