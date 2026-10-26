import { useMemo, useState } from 'react'
import {
  getTodayIndex,
  heartZone,
  minuteGoal,
  stepGoal,
  weekActivity,
} from '../../data/site'
import AnimatedNumber from '../ui/AnimatedNumber'
import Container from '../ui/Container'
import { IconClock, IconFlame, IconHeart, IconSteps } from '../ui/Icons'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

export default function Dashboard() {
  const [selected, setSelected] = useState(getTodayIndex)
  const day = weekActivity[selected]
  const maxMinutes = Math.max(...weekActivity.map((item) => item.minutes))
  const totals = useMemo(
    () =>
      weekActivity.reduce(
        (sum, item) => ({
          steps: sum.steps + item.steps,
          calories: sum.calories + item.calories,
          minutes: sum.minutes + item.minutes,
        }),
        { steps: 0, calories: 0, minutes: 0 },
      ),
    [],
  )
  const stepPercent = Math.round((day.steps / stepGoal) * 100)
  const minutePercent = Math.round((day.minutes / minuteGoal) * 100)
  const hrLeft = Math.min(100, Math.max(0, ((day.hr - 60) / 120) * 100))

  return (
    <section id="dashboard" className="bg-cream py-20 sm:py-24" aria-labelledby="dashboard-heading">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="dashboard-heading"
            eyebrow="02 — Dashboard"
            title="Today, at a glance."
            text="Steps, workout calories, minutes, and heart rate from a sample training week. Choose a day to inspect it."
          />
          <p className="text-sm font-medium text-ink/60">Sample week · numbers update when you pick a day</p>
        </div>

        <div className="mt-8 grid grid-cols-7 gap-1.5 sm:gap-2" role="tablist" aria-label="Days of the week">
          {weekActivity.map((item, index) => {
            const isSelected = index === selected
            const isToday = index === getTodayIndex()
            return (
              <button
                key={item.day}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelected(index)}
                className={`rounded-2xl px-1 py-2 text-center transition sm:px-2 ${
                  isSelected ? 'bg-ink text-cream' : 'bg-paper text-ink hover:-translate-y-0.5 hover:bg-sand'
                }`}
              >
                <span className="block text-[10px] font-bold uppercase tracking-wider opacity-70 sm:text-[11px]">
                  {item.short}
                </span>
                <span className="mt-0.5 hidden text-sm font-semibold sm:block">{item.day}</span>
                <span
                  className={`mx-auto mt-1 block h-1 w-1 rounded-full ${isToday ? 'bg-volt' : 'bg-transparent'}`}
                />
              </button>
            )
          })}
        </div>

        <div key={day.day} className="rise mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-live="polite">
          <Reveal tilt>
            <article className="card-shadow h-full rounded-3xl border border-sand bg-paper p-5">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-mist">Daily steps</p>
                <IconSteps className="h-5 w-5 text-moss" />
              </div>
              <p className="mt-4 font-display text-4xl font-extrabold">
                <AnimatedNumber value={day.steps} />
              </p>
              <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-sand">
                <div className="h-full rounded-full bg-moss transition-[width] duration-700" style={{ width: `${Math.min(stepPercent, 100)}%` }} />
              </div>
              <p className="mt-2 text-sm text-ink/65">{stepPercent}% of {stepGoal.toLocaleString()}</p>
            </article>
          </Reveal>

          <Reveal delay={80} tilt>
            <article className="card-shadow h-full rounded-3xl border border-sand bg-paper p-5">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-mist">Calories burned</p>
                <IconFlame className="h-5 w-5 text-ember" />
              </div>
              <p className="mt-4 font-display text-4xl font-extrabold">
                <AnimatedNumber value={day.calories} />
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ink/65">
                Workout calories for {day.day}. The week total is {totals.calories.toLocaleString()} kcal.
              </p>
            </article>
          </Reveal>

          <Reveal delay={140} tilt>
            <article className="card-shadow h-full rounded-3xl border border-sand bg-paper p-5">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-mist">Workout duration</p>
                <IconClock className="h-5 w-5 text-moss" />
              </div>
              <p className="mt-4 font-display text-4xl font-extrabold">
                <AnimatedNumber value={day.minutes} />
                <span className="ml-1 text-lg text-ink/50">min</span>
              </p>
              <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-sand">
                <div className="h-full rounded-full bg-volt transition-[width] duration-700" style={{ width: `${Math.min(minutePercent, 100)}%` }} />
              </div>
              <p className="mt-2 text-sm text-ink/65">{minutePercent}% of a {minuteGoal}-minute target</p>
            </article>
          </Reveal>

          <Reveal delay={200} tilt tiltMax={8}>
            <article className="card-shadow h-full rounded-3xl border border-sand bg-ink p-5 text-cream">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-cream/60">Heart rate</p>
                <span className="relative grid h-10 w-10 place-items-center">
                  <span className="pulse-ring absolute inset-0 rounded-full bg-ember/40" />
                  <span className="beat relative grid h-8 w-8 place-items-center rounded-full bg-ember text-white">
                    <IconHeart className="h-4 w-4" />
                  </span>
                </span>
              </div>
              <p className="mt-4 font-display text-4xl font-extrabold">
                <AnimatedNumber value={day.hr} />
                <span className="ml-1 text-lg text-cream/50">bpm</span>
              </p>
              <div className="relative mt-5 h-2.5 rounded-full bg-white/10">
                <div className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-ink bg-volt" style={{ left: `calc(${hrLeft}% - 8px)` }} />
              </div>
              <p className="mt-3 text-sm text-cream/70">{heartZone(day.hr)}</p>
            </article>
          </Reveal>
        </div>

        <Reveal className="mt-4">
          <article className="card-shadow rounded-3xl border border-sand bg-paper p-5 sm:p-7">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h3 className="font-display text-2xl font-extrabold">Weekly activity</h3>
                <p className="mt-1 text-sm text-ink/65">Minutes trained each day. The selected day is highlighted.</p>
              </div>
              <p className="text-sm font-semibold text-ink/70">
                {totals.steps.toLocaleString()} steps · {totals.calories.toLocaleString()} kcal · {totals.minutes} min
              </p>
            </div>
            <div className="mt-6 flex h-48 items-end gap-2 sm:gap-3">
              {weekActivity.map((item, index) => {
                const height = Math.max(8, (item.minutes / maxMinutes) * 100)
                const isSelected = index === selected
                return (
                  <button
                    key={item.day}
                    type="button"
                    onClick={() => setSelected(index)}
                    aria-label={`${item.day}, ${item.minutes} minutes`}
                    aria-pressed={isSelected}
                    className="group flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2"
                  >
                    <span className={`text-[11px] font-bold ${isSelected ? 'text-ink' : 'text-mist'}`}>{item.minutes}</span>
                    <span className="relative w-full flex-1">
                      <span
                        className={`absolute inset-x-0 bottom-0 rounded-xl transition-all duration-500 group-hover:opacity-80 ${isSelected ? 'bg-ink' : 'bg-moss/80'}`}
                        style={{ height: `${height}%` }}
                      />
                    </span>
                    <span className={`text-xs font-semibold ${isSelected ? 'text-ink' : 'text-mist'}`}>
                      <span className="sm:hidden">{item.short}</span>
                      <span className="hidden sm:inline">{item.day}</span>
                    </span>
                  </button>
                )
              })}
            </div>
          </article>
        </Reveal>
      </Container>
    </section>
  )
}
