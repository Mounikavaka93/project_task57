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

export default function App() {
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
