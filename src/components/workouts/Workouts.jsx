import { useEffect, useMemo, useState } from 'react'
import { difficultyTone, workouts as seedWorkouts } from '../../data/site'
import Container from '../ui/Container'
import { CategoryIcon, IconCheck } from '../ui/Icons'
import ProgressBar from '../ui/ProgressBar'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

function averageProgress(exercises) {
  return Math.round(exercises.reduce((sum, exercise) => sum + exercise.progress, 0) / exercises.length)
}

export default function Workouts() {
  const [library, setLibrary] = useState(() => seedWorkouts.map((category) => ({
    ...category,
    exercises: category.exercises.map((exercise) => ({ ...exercise })),
  })))
  const [activeId, setActiveId] = useState('cardio')
  const [loggedId, setLoggedId] = useState(null)
  const active = library.find((category) => category.id === activeId) ?? library[0]

  const summary = useMemo(() => {
    const calories = active.exercises.reduce((sum, exercise) => sum + exercise.calories, 0)
    return { calories, progress: averageProgress(active.exercises) }
  }, [active])

  useEffect(() => {
    if (!loggedId) return undefined
    const timer = setTimeout(() => setLoggedId(null), 1000)
    return () => clearTimeout(timer)
  }, [loggedId])

  function logExercise(exerciseId) {
    setLibrary((current) =>
      current.map((category) => {
        if (category.id !== active.id) return category
        return {
          ...category,
          exercises: category.exercises.map((exercise) =>
            exercise.id === exerciseId
              ? { ...exercise, progress: Math.min(100, exercise.progress + 10) }
              : exercise,
          ),
        }
      }),
    )
    setLoggedId(exerciseId)
  }

  function resetLibrary() {
    setLibrary(seedWorkouts.map((category) => ({
      ...category,
      exercises: category.exercises.map((exercise) => ({ ...exercise })),
    })))
    setLoggedId(null)
  }

  return (
    <section id="workouts" className="bg-pine py-20 text-cream sm:py-24" aria-labelledby="workouts-heading">
      <Container>
        <SectionHeading
          id="workouts-heading"
          light
          eyebrow="03 — Workouts"
          title="Four ways to train."
          text="Cardio, strength, yoga, and HIIT. Open a style to see each exercise, then log a session to move its progress."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {library.map((category, index) => {
            const selected = category.id === active.id
            const progress = averageProgress(category.exercises)
            return (
              <Reveal key={category.id} delay={index * 70}>
                <button
                  type="button"
                  onClick={() => setActiveId(category.id)}
                  aria-pressed={selected}
                  className={`flex h-full w-full flex-col rounded-[1.6rem] border p-5 text-left transition duration-300 hover:-translate-y-1 ${
                    selected ? 'border-volt bg-white/10' : 'border-white/10 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className="grid h-12 w-12 place-items-center rounded-2xl text-ink"
                      style={{ background: category.accent }}
                    >
                      <CategoryIcon id={category.id} />
                    </span>
                    <span className="font-display text-sm font-bold text-cream/40">{category.index}</span>
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-extrabold">{category.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/70">{category.summary}</p>
                  <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <dt className="text-[11px] font-bold uppercase tracking-wider text-cream/45">Focus</dt>
                      <dd className="mt-1 font-semibold">{category.focus}</dd>
                    </div>
                    <div>
                      <dt className="text-[11px] font-bold uppercase tracking-wider text-cream/45">Sessions</dt>
                      <dd className="mt-1 font-semibold">{category.exercises.length}</dd>
                    </div>
                  </dl>
                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-volt" style={{ width: `${progress}%` }} />
                  </div>
                  <p className="mt-2 text-xs font-semibold text-cream/60">{progress}% logged</p>
                </button>
              </Reveal>
            )
          })}
        </div>

        <div key={active.id} className="rise mt-6 rounded-[1.8rem] bg-cream p-4 text-ink sm:p-6 lg:p-8">
          <div className="flex flex-col gap-4 border-b border-sand pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-start gap-3">
              <span
                className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-ink"
                style={{ background: active.accent }}
              >
                <CategoryIcon id={active.id} />
              </span>
              <div>
                <h3 className="font-display text-2xl font-extrabold sm:text-3xl">{active.name}</h3>
                <p className="mt-1 text-sm text-ink/65">
                  {summary.calories.toLocaleString()} kcal across {active.exercises.length} sessions · {summary.progress}% average progress
                </p>
              </div>
            </div>
            <button type="button" className="btn btn-line btn-sm self-start" onClick={resetLibrary}>
              Reset progress
            </button>
          </div>

          <ul className="mt-5 space-y-4">
            {active.exercises.map((exercise) => {
              const complete = exercise.progress >= 100
              return (
                <li key={exercise.id} className="rounded-3xl border border-sand bg-paper p-4 sm:p-5">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0">
                      <h4 className="font-display text-xl font-extrabold">{exercise.name}</h4>
                      <p className="mt-1 text-sm text-ink/65">{exercise.cue}</p>
                    </div>
                    <button
                      type="button"
                      className="btn btn-dark btn-sm shrink-0"
                      onClick={() => logExercise(exercise.id)}
                      disabled={complete}
                    >
                      {complete ? (
                        <>
                          <IconCheck className="h-4 w-4" />
                          Complete
                        </>
                      ) : loggedId === exercise.id ? (
                        'Logged'
                      ) : (
                        'Log session'
                      )}
                    </button>
                  </div>

                  <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <div className="rounded-2xl bg-cream px-3 py-2">
                      <dt className="text-[11px] font-bold uppercase tracking-wider text-mist">Duration</dt>
                      <dd className="mt-1 font-semibold">{exercise.duration}</dd>
                    </div>
                    <div className="rounded-2xl bg-cream px-3 py-2">
                      <dt className="text-[11px] font-bold uppercase tracking-wider text-mist">Difficulty</dt>
                      <dd className="mt-1">
                        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold ${difficultyTone[exercise.difficulty]}`}>
                          {exercise.difficulty}
                        </span>
                      </dd>
                    </div>
                    <div className="rounded-2xl bg-cream px-3 py-2">
                      <dt className="text-[11px] font-bold uppercase tracking-wider text-mist">Calories burned</dt>
                      <dd className="mt-1 font-semibold">{exercise.calories} kcal</dd>
                    </div>
                    <div className="rounded-2xl bg-cream px-3 py-2">
                      <dt className="text-[11px] font-bold uppercase tracking-wider text-mist">Status</dt>
                      <dd className="mt-1 font-semibold">{complete ? 'Complete' : 'In progress'}</dd>
                    </div>
                  </dl>

                  <div className="mt-4">
                    <ProgressBar value={exercise.progress} label="Progress" tone={complete ? 'volt' : 'moss'} />
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </Container>
    </section>
  )
}
