import { useEffect, useRef, useState } from 'react'
import { useInView, usePrefersReducedMotion } from '../../hooks/useInView'

export default function AnimatedNumber({ value, decimals = 0, duration = 900, className = '' }) {
  const { ref, inView } = useInView()
  const reduce = usePrefersReducedMotion()
  const [display, setDisplay] = useState(0)
  const previous = useRef(0)

  useEffect(() => {
    if (reduce || !inView) return undefined

    const from = previous.current
    const start = performance.now()
    let frame = 0

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - (1 - progress) ** 3
      setDisplay(from + (value - from) * eased)
      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      } else {
        previous.current = value
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [value, inView, reduce, duration])

  const shown = reduce ? value : display
  const formatted = shown.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return (
    <span ref={ref} className={className}>
      {formatted}
    </span>
  )
}
