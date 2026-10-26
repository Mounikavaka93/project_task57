import { useState } from 'react'
import { initialGoals } from '../../data/site'
import Container from '../ui/Container'
import { GoalIcon, IconCheck } from '../ui/Icons'
import ProgressBar from '../ui/ProgressBar'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

function cloneGoals() {
  return initialGoals.map((goal) => ({ ...goal }))
}

function formatValue(value, step) {
  return step < 1 ? value.toFixed(1) : String(Math.round(value * 10) / 10).replace(/\.0$/, '')
}

export default function Goals() {
  const [goals, setGoals] = useState(cloneGoals)

  function logProgress(id) {
    setGoals((current) =>
      current.map((goal) => {
        if (goal.id !== id || goal.current >= goal.target) return goal
        const next = Math.min(goal.target, Math.round((goal.current + goal.step) * 10) / 10)
        return { ...goal, current: next }
      }),
    )
  }

  return (
    <section id="goals" className="bg-[#ebe6dc] py-20 sm:py-24" aria-labelledby="goals-heading">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            id="goals-heading"
            eyebrow="05 — Goals"
            title="The week, still open."
            text="Each goal has a target and a log button. Progress fills as you record the work — distance, sessions, steps, water, and sleep."
          />
          <button type="button" className="btn btn-line self-start" onClick={() => setGoals(cloneGoals())}>
            Reset week
          </button>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {goals.map((goal, index) => {
            const complete = goal.current >= goal.target
            const percent = Math.round((goal.current / goal.target) * 100)
            return (
              <Reveal key={goal.id} delay={index * 60} className="h-full">
                <article className={`card-shadow flex h-full flex-col rounded-[1.6rem] border bg-paper p-5 transition duration-300 hover:-translate-y-1 ${complete ? 'border-volt' : 'border-sand'}`}>
                  <div className="flex items-start justify-between gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-ink text-volt">
                      <GoalIcon id={goal.id} />
                    </span>
                    {complete ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-volt px-2.5 py-1 text-xs font-bold text-ink">
                        <IconCheck className="h-3.5 w-3.5" />
                        Met
                      </span>
                    ) : (
                      <span className="text-sm font-bold text-mist">{percent}%</span>
                    )}
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-extrabold">{goal.title}</h3>
                  <p className="mt-1 text-sm text-ink/65">{goal.detail}</p>
                  <p className="mt-4 font-display text-3xl font-extrabold">
                    {formatValue(goal.current, goal.step)}
                    <span className="ml-1 text-base font-semibold text-ink/45">/ {formatValue(goal.target, goal.step)} {goal.unit}</span>
                  </p>
                  <div className="mt-4">
                    <ProgressBar value={percent} label="Completion" tone={complete ? 'volt' : 'moss'} />
                  </div>
                  <button
                    type="button"
                    className="btn btn-dark btn-sm mt-5"
                    onClick={() => logProgress(goal.id)}
                    disabled={complete}
                  >
                    {complete ? 'Goal met' : 'Log progress'}
                  </button>
                </article>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
