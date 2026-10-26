import { useId, useState } from 'react'
import { useInView, usePrefersReducedMotion } from '../../hooks/useInView'

export default function AreaChart({ values, labels, unit }) {
  const { ref, inView } = useInView()
  const reduce = usePrefersReducedMotion()
  const shown = inView || reduce
  const [active, setActive] = useState(values.length - 1)
  const gradientId = useId().replace(/:/g, '')

  const width = 720
  const height = 260
  const pad = { l: 64, r: 16, t: 18, b: 32 }
  const max = Math.max(...values) * 1.18
  const innerW = width - pad.l - pad.r
  const innerH = height - pad.t - pad.b
  const points = values.map((value, index) => {
    const x = pad.l + (index / (values.length - 1)) * innerW
    const y = pad.t + innerH - (value / max) * innerH
    return { x, y, value }
  })
  const line = points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join(' ')
  const area = `${line} L ${points[points.length - 1].x.toFixed(1)} ${(pad.t + innerH).toFixed(1)} L ${points[0].x.toFixed(1)} ${(pad.t + innerH).toFixed(1)} Z`
  const ticks = [0, 0.5, 1].map((step) => ({
    y: pad.t + innerH - step * innerH,
    label: Math.round(max * step).toLocaleString(),
  }))
  const current = points[active]

  return (
    <div ref={ref} className="max-w-full">
      <div className="max-w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-56 min-w-[40rem] w-full sm:h-auto"
        role="img"
        aria-label={`Training chart from ${labels[0]} to ${labels[labels.length - 1]}, ending at ${values[values.length - 1].toLocaleString()} ${unit}`}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d8ff4a" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#d8ff4a" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {ticks.map((tick) => (
          <g key={tick.label}>
            <line x1={pad.l} x2={width - pad.r} y1={tick.y} y2={tick.y} stroke="rgba(8,17,13,0.08)" />
            <text x={pad.l - 8} y={tick.y + 4} textAnchor="end" fontSize="12" fill="#7f8d85">
              {tick.label}
            </text>
          </g>
        ))}
        <path d={area} fill={`url(#${gradientId})`} opacity={shown ? 1 : 0} />
        <path
          d={line}
          fill="none"
          stroke="#173228"
          strokeWidth="3"
          strokeLinejoin="round"
          strokeLinecap="round"
          style={{
            strokeDasharray: 1400,
            strokeDashoffset: shown ? 0 : 1400,
            transition: reduce ? 'none' : 'stroke-dashoffset 1.1s ease',
          }}
        />
        {shown ? (
          <line x1={current.x} x2={current.x} y1={pad.t} y2={pad.t + innerH} stroke="rgba(8,17,13,0.12)" />
        ) : null}
        {points.map((point, index) => (
          <g key={labels[index]}>
            <circle
              cx={point.x}
              cy={point.y}
              r={active === index ? 6 : 4}
              fill={active === index ? '#d8ff4a' : '#173228'}
              stroke="#fffdf8"
              strokeWidth="2"
            />
            <text x={point.x} y={height - 8} textAnchor="middle" fontSize="12" fill="#7f8d85">
              {labels[index]}
            </text>
          </g>
        ))}
        {points.map((point, index) => {
          const slot = innerW / values.length
          return (
            <rect
              key={`${labels[index]}-hit`}
              x={point.x - slot / 2}
              y={pad.t}
              width={slot}
              height={innerH}
              fill="transparent"
              tabIndex={0}
              role="button"
              aria-label={`${labels[index]}: ${point.value.toLocaleString()} ${unit}`}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
            />
          )
        })}
      </svg>
      </div>
      <p className="mt-2 text-sm text-ink/70" aria-live="polite">
        <span className="font-semibold text-ink">{labels[active]}</span>
        {' · '}
        {values[active].toLocaleString()} {unit}
      </p>
      <table className="sr-only">
        <caption>Weekly training {unit}</caption>
        <thead>
          <tr>
            <th>Week</th>
            <th>{unit}</th>
          </tr>
        </thead>
        <tbody>
          {labels.map((label, index) => (
            <tr key={label}>
              <td>{label}</td>
              <td>{values[index].toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
