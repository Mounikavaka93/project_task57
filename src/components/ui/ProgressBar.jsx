import { useInView, usePrefersReducedMotion } from '../../hooks/useInView'

export default function ProgressBar({
  value,
  label = 'Progress',
  tone = 'moss',
  trackClass = 'bg-sand',
  valueClass = 'text-ink',
}) {
  const { ref, inView } = useInView()
  const reduce = usePrefersReducedMotion()
  const shown = inView || reduce
  const percent = Math.max(0, Math.min(100, value))
  const fill = tone === 'volt' ? 'bg-volt' : 'bg-moss'

  return (
    <div ref={ref}>
      <div className={`mb-2 flex items-center justify-between text-sm ${valueClass}`}>
        <span className="opacity-70">{label}</span>
        <span className="font-semibold">{Math.round(percent)}%</span>
      </div>
      <div
        className={`h-2.5 overflow-hidden rounded-full ${trackClass}`}
        role="progressbar"
        aria-valuenow={Math.round(percent)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div
          className={`h-full rounded-full ${fill} ${reduce ? '' : 'transition-[width] duration-700 ease-out'}`}
          style={{ width: shown ? `${percent}%` : '0%' }}
        />
      </div>
    </div>
  )
}
