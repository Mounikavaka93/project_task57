import { useEffect } from 'react'
import Contact from './components/contact/Contact'
import Dashboard from './components/home/Dashboard'
import Hero from './components/home/Hero'
import Footer from './components/layout/Footer'
import Navbar from './components/layout/Navbar'
import Nutrition from './components/nutrition/Nutrition'
import BmiCalculator from './components/progress/BmiCalculator'
import Goals from './components/progress/Goals'
import Progress from './components/progress/Progress'
import Workouts from './components/workouts/Workouts'

function scrollBehavior() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
}

function scrollToSection(id) {
  if (id === 'home') {
    window.scrollTo({ top: 0, behavior: scrollBehavior() })
    return
  }

  const section = document.getElementById(id)
  if (!section) return

  const anchor = section.querySelector('[data-nav-anchor]') ?? section
  const bar = document.querySelector('[data-nav-bar]')
  const clearance = (bar?.getBoundingClientRect().bottom ?? 76) + 10
  const top = anchor.getBoundingClientRect().top + window.scrollY - clearance

  window.scrollTo({ top: Math.max(0, top), behavior: scrollBehavior() })
}

export default function App() {
  useEffect(() => {
    const onClick = (event) => {
      const link = event.target.closest('a[href^="#"]')
      if (!link) return
      const id = link.getAttribute('href').slice(1)
      if (!id || !document.getElementById(id)) return
      event.preventDefault()
      scrollToSection(id)
      window.history.pushState(null, '', `#${id}`)
    }

    document.addEventListener('click', onClick)
    const initial = window.location.hash.slice(1)
    if (initial) requestAnimationFrame(() => scrollToSection(initial))

    return () => document.removeEventListener('click', onClick)
  }, [])

  return (
    <div className="min-h-screen bg-cream text-ink">
      <Navbar />
      <main>
        <Hero />
        <Dashboard />
        <Workouts />
        <Progress />
        <Goals />
        <BmiCalculator />
        <Nutrition />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
