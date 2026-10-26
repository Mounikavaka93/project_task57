import { useInView, usePrefersReducedMotion } from '../../hooks/useInView'

export default function DonutChart({ segments, center, caption = 'this mix' }) {
  const { ref, inView } = useInView()
  const reduce = usePrefersReducedMotion()
  const shown = inView || reduce
  const size = 210
  const stroke = 20
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const gap = 8
  const total = segments.reduce((sum, segment) => sum + segment.value, 0)
  const arcs = segments.reduce((list, segment) => {
    const start = list.reduce((sum, arc) => sum + arc.sweep, 0)
    const sweep = (segment.value / total) * circumference
    list.push({
      label: segment.label,
      color: segment.color,
      start,
      sweep,
      length: Math.max(0, sweep - gap),
    })
    return list
  }, [])

  return (
    <div ref={ref} className="relative mx-auto grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90" aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,253,248,0.08)" strokeWidth={stroke} />
        {arcs.map((arc) => (
          <circle
            key={arc.label}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={arc.color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${shown ? arc.length : 0} ${circumference}`}
            strokeDashoffset={-arc.start}
            className={reduce ? undefined : 'transition-all duration-1000 ease-out'}
          />
        ))}
      </svg>
      <div className="absolute text-center">
        <p className="font-display text-4xl font-extrabold text-cream">{center}</p>
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-cream/60">{caption}</p>
      </div>
    </div>
  )
}
