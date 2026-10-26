import { useEffect, useState } from 'react'
import { navLinks } from '../../data/site'
import { IconClose, IconMenu, IconPulse } from '../ui/Icons'

const sectionAlias = {
  home: 'home',
  dashboard: 'home',
  workouts: 'workouts',
  progress: 'progress',
  goals: 'progress',
  bmi: 'progress',
  nutrition: 'nutrition',
  contact: 'contact',
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const ids = Object.keys(sectionAlias)
    const nodes = ids.map((id) => document.getElementById(id)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target?.id) setActive(sectionAlias[visible.target.id] ?? 'home')
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0.1, 0.25, 0.5] },
    )
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 lg:px-6">
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-volt focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <div className="relative z-10 mx-auto flex max-w-[1440px] items-center justify-between gap-3 rounded-2xl border border-white/10 bg-ink/80 px-3 py-2 shadow-lg backdrop-blur-md sm:px-4">
        <a href="#home" className="flex items-center gap-2.5 text-cream" onClick={close}>
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-volt text-ink">
            <IconPulse className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-extrabold tracking-[0.16em]">STRYDE</span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              aria-current={active === link.id ? 'page' : undefined}
              className={`rounded-full px-3 py-2 text-sm font-semibold transition ${
                active === link.id ? 'bg-volt text-ink' : 'text-cream/80 hover:bg-white/10 hover:text-cream'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href="#workouts" className="btn btn-primary hidden sm:inline-flex">
            Start training
          </a>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-xl border border-white/15 text-cream lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      {open ? (
        <>
          <button
            type="button"
            className="fixed inset-0 -z-10 bg-ink/70 lg:hidden"
            aria-label="Close menu"
            onClick={close}
          />
          <nav
            id="mobile-nav"
            aria-label="Mobile"
            className="relative z-10 mx-auto mt-2 max-h-[calc(100vh-5.5rem)] max-w-[1440px] overflow-y-auto rounded-3xl border border-white/10 bg-pine p-4 shadow-2xl lg:hidden"
          >
            <ul className="flex flex-col">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={close}
                    aria-current={active === link.id ? 'page' : undefined}
                    className={`block rounded-2xl px-4 py-3 font-display text-2xl font-bold ${
                      active === link.id ? 'bg-volt text-ink' : 'text-cream hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a href="#workouts" onClick={close} className="btn btn-primary mt-3 w-full sm:hidden">
              Start training
            </a>
          </nav>
        </>
      ) : null}
    </header>
  )
}
