import { useInView, usePrefersReducedMotion } from '../../hooks/useInView'

export default function Reveal({ children, className = '', delay = 0 }) {
  const { ref, inView } = useInView()
  const reduce = usePrefersReducedMotion()
  const shown = inView || reduce

  return (
    <div
      ref={ref}
      className={`${reduce ? '' : 'transition duration-700 ease-out'} ${shown ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'} ${className}`}
      style={reduce ? undefined : { transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
