import { useRef } from 'react'
import { usePrefersReducedMotion } from '../../hooks/useInView'

export default function Tilt({ children, className = '', max = 9, rounded = 'rounded-[1.6rem]' }) {
  const surface = useRef(null)
  const reduce = usePrefersReducedMotion()

  function move(event) {
    const node = surface.current
    if (!node || reduce || event.pointerType === 'touch') return
    const bounds = node.getBoundingClientRect()
    const px = (event.clientX - bounds.left) / bounds.width
    const py = (event.clientY - bounds.top) / bounds.height
    const rotateX = (0.5 - py) * max
    const rotateY = (px - 0.5) * max * 1.2
    node.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(14px)`
    const glare = node.querySelector('[data-glare]')
    if (glare) {
      glare.style.opacity = '1'
      glare.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.42), transparent 46%)`
    }
  }

  function leave() {
    const node = surface.current
    if (!node) return
    node.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)'
    const glare = node.querySelector('[data-glare]')
    if (glare) glare.style.opacity = '0'
  }

  return (
    <div className={`h-full [perspective:980px] ${className}`}>
      <div
        ref={surface}
        onPointerMove={move}
        onPointerLeave={leave}
        className={`relative h-full ${rounded} transition-transform duration-200 ease-out will-change-transform [transform-style:preserve-3d]`}
      >
        {children}
        <span
          data-glare
          className={`pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 ${rounded}`}
        />
      </div>
    </div>
  )
}
