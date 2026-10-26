import { useState } from 'react'
import { bmiBand, bmiFromImperial, bmiFromMetric, roundBmi } from '../../utils/bmi'
import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'

const bands = [
  { id: 'under', label: 'Under', width: '14%', color: '#8fd4ff' },
  { id: 'healthy', label: 'Healthy', width: '26%', color: '#d8ff4a' },
  { id: 'over', label: 'Over', width: '20%', color: '#ffb020' },
  { id: 'obese', label: 'Obese', width: '40%', color: '#ff5a36' },
]

function parseNumber(value) {
  const number = Number(value)
  return Number.isFinite(number) ? number : NaN
}

export default function BmiCalculator() {
  const [unit, setUnit] = useState('metric')
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [feet, setFeet] = useState('')
  const [inches, setInches] = useState('')
  const [pounds, setPounds] = useState('')
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)

  function clearResult() {
    setResult(null)
    setError('')
  }

  function calculate(event) {
    event.preventDefault()
    if (unit === 'metric') {
      const cm = parseNumber(height)
      const kg = parseNumber(weight)
      if (cm < 80 || cm > 250) {
        setError('Enter a height between 80 and 250 cm.')
        setResult(null)
        return
      }
      if (kg < 25 || kg > 300) {
        setError('Enter a weight between 25 and 300 kg.')
        setResult(null)
        return
      }
      setError('')
      setResult(roundBmi(bmiFromMetric(cm, kg)))
      return
    }

    const ft = parseNumber(feet)
    const inch = parseNumber(inches)
    const lb = parseNumber(pounds)
    if (ft < 3 || ft > 8 || inch < 0 || inch > 11) {
      setError('Enter a height from 3 ft 0 in to 8 ft 11 in.')
      setResult(null)
      return
    }
    if (lb < 55 || lb > 660) {
      setError('Enter a weight between 55 and 660 lb.')
      setResult(null)
      return
    }
    setError('')
    setResult(roundBmi(bmiFromImperial(ft, inch, lb)))
  }

  function useSample() {
    setUnit('metric')
    setHeight('170')
    setWeight('68')
    setFeet('5')
    setInches('7')
    setPounds('150')
    setError('')
    setResult(roundBmi(bmiFromMetric(170, 68)))
  }

  const band = result == null ? null : bmiBand(result)
  const marker = result == null ? null : Math.min(100, Math.max(0, ((result - 15) / 25) * 100))

  return (
    <section id="bmi" className="bg-pine py-20 text-cream sm:py-24" aria-labelledby="bmi-heading">
      <Container className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div>
          <SectionHeading
            id="bmi-heading"
            light
            eyebrow="06 — BMI"
            title="Height, weight, one number."
            text="Body mass index is a screening guide for adults. It does not measure body fat directly and it is not a medical diagnosis."
          />
          <ul className="mt-8 space-y-3">
            {[
              ['Under 18.5', 'Underweight'],
              ['18.5 – 24.9', 'Healthy range'],
              ['25 – 29.9', 'Overweight'],
              ['30 and above', 'Obese range'],
            ].map(([range, label]) => (
              <li key={label} className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
                <span className="font-semibold">{label}</span>
                <span className="text-cream/60">{range}</span>
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={calculate} className="rounded-[1.8rem] bg-paper p-5 text-ink sm:p-7" noValidate>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-display text-2xl font-extrabold">Calculator</p>
            <div className="flex rounded-full bg-cream p-1" role="group" aria-label="Units">
              {[
                ['metric', 'Metric'],
                ['imperial', 'Imperial'],
              ].map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={unit === id}
                  onClick={() => {
                    setUnit(id)
                    clearResult()
                  }}
                  className={`rounded-full px-4 py-2 text-sm font-bold ${unit === id ? 'bg-ink text-cream' : 'text-ink/70'}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {unit === 'metric' ? (
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-semibold" htmlFor="height-cm">
                Height (cm)
                <input
                  id="height-cm"
                  className="field"
                  inputMode="decimal"
                  value={height}
                  placeholder="170"
                  onChange={(event) => {
                    setHeight(event.target.value)
                    clearResult()
                  }}
                />
              </label>
              <label className="block text-sm font-semibold" htmlFor="weight-kg">
                Weight (kg)
                <input
                  id="weight-kg"
                  className="field"
                  inputMode="decimal"
                  value={weight}
                  placeholder="68"
                  onChange={(event) => {
                    setWeight(event.target.value)
                    clearResult()
                  }}
                />
              </label>
            </div>
          ) : (
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <label className="block text-sm font-semibold" htmlFor="height-ft">
                Feet
                <input
                  id="height-ft"
                  className="field"
                  inputMode="numeric"
                  value={feet}
                  placeholder="5"
                  onChange={(event) => {
                    setFeet(event.target.value)
                    clearResult()
                  }}
                />
              </label>
              <label className="block text-sm font-semibold" htmlFor="height-in">
                Inches
                <input
                  id="height-in"
                  className="field"
                  inputMode="decimal"
                  value={inches}
                  placeholder="7"
                  onChange={(event) => {
                    setInches(event.target.value)
                    clearResult()
                  }}
                />
              </label>
              <label className="block text-sm font-semibold sm:col-span-1" htmlFor="weight-lb">
                Pounds
                <input
                  id="weight-lb"
                  className="field"
                  inputMode="decimal"
                  value={pounds}
                  placeholder="150"
                  onChange={(event) => {
                    setPounds(event.target.value)
                    clearResult()
                  }}
                />
              </label>
            </div>
          )}

          {error ? (
            <p className="mt-4 text-sm font-semibold text-ember" role="alert">
              {error}
            </p>
          ) : null}

          <div className="mt-5 flex flex-col gap-3 min-[420px]:flex-row">
            <button type="submit" className="btn btn-dark">
              Calculate BMI
            </button>
            <button type="button" className="btn btn-line" onClick={useSample}>
              Try 170 cm · 68 kg
            </button>
          </div>

          <div className="mt-6 rounded-3xl bg-cream p-4 sm:p-5" aria-live="polite">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-mist">Your BMI</p>
                <p className={`mt-1 font-display font-extrabold ${result == null ? 'text-4xl text-ink/20' : 'text-5xl'}`}>
                  {result ?? '–'}
                </p>
              </div>
              {band ? (
                <p className="rounded-full bg-ink px-3 py-1 text-sm font-bold text-volt">{band.label}</p>
              ) : (
                <p className="text-sm text-ink/55">Enter your numbers</p>
              )}
            </div>
            <div className="relative mt-5">
              <div className="flex h-3 overflow-hidden rounded-full">
                {bands.map((item) => (
                  <span key={item.id} style={{ width: item.width, background: item.color }} />
                ))}
              </div>
              {marker != null ? (
                <span
                  className="absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border-2 border-ink bg-paper shadow transition-[left] duration-500"
                  style={{ left: `clamp(0px, calc(${marker}% - 10px), calc(100% - 20px))` }}
                />
              ) : null}
            </div>
            <div className="mt-2 flex justify-between text-[11px] font-semibold text-mist">
              <span>15</span>
              <span>40</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ink/70">
              {band ? band.copy : 'The marker lands on the scale after you calculate. The colored bands match the ranges on the left.'}
            </p>
          </div>
        </form>
      </Container>
    </section>
  )
}
