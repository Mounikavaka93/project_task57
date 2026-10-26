import { useInView, usePrefersReducedMotion } from '../../hooks/useInView'
import Tilt from './Tilt'

export default function Reveal({ children, className = '', delay = 0, tilt = false, tiltMax = 9 }) {
  const { ref, inView } = useInView()
  const reduce = usePrefersReducedMotion()
  const shown = inView || reduce
  const content = tilt ? (
    <Tilt className="h-full" max={tiltMax}>
      {children}
    </Tilt>
  ) : (
    children
  )

  return (
    <div ref={ref} className={`[perspective:1200px] ${className}`}>
      <div
        className={`h-full origin-top will-change-transform ${reduce ? '' : 'transition duration-700 ease-out'} ${
          shown ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          transform: shown || reduce ? 'rotateX(0deg) translateY(0px)' : 'rotateX(18deg) translateY(32px)',
          transitionDelay: reduce ? undefined : `${delay}ms`,
        }}
      >
        {content}
      </div>
    </div>
  )
}
