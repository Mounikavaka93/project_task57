import { getTodayIndex, heartZone, highlights, stepGoal, weekActivity, workouts } from '../../data/site'
import AnimatedNumber from '../ui/AnimatedNumber'
import Container from '../ui/Container'
import { CategoryIcon, IconArrow } from '../ui/Icons'
import ProgressRing from '../ui/ProgressRing'

export default function Hero() {
  const today = weekActivity[getTodayIndex()]
  const stepPercent = Math.round((today.steps / stepGoal) * 100)
  const weekMinutes = weekActivity.reduce((sum, day) => sum + day.minutes, 0)
  const maxMinutes = Math.max(...weekActivity.map((day) => day.minutes))

  return (
    <section id="home" className="relative overflow-hidden bg-ink text-cream">
      <div className="hero-grid">
        <Container className="relative grid items-center gap-12 pb-16 pt-32 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16 lg:pb-20 lg:pt-36">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-volt">01 — Personal tracker</p>
            <h1 className="mt-4 max-w-xl font-display text-[2.55rem] font-extrabold leading-[0.95] tracking-tight min-[380px]:text-5xl sm:text-6xl lg:text-7xl">
              Measure the work.{' '}
              <span className="text-volt">Feel the change.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/75 sm:text-lg">
              STRYDE keeps workouts, meals, and weekly momentum in one place. Log a session, read the charts, and keep each goal tied to a number you can actually move.
            </p>
            <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row">
              <a href="#workouts" className="btn btn-primary">
                Browse workouts
                <IconArrow />
              </a>
              <a href="#progress" className="btn btn-ghost">
                View progress
              </a>
            </div>
            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-white/10 pt-6">
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-wider text-mist">Today</dt>
                <dd className="mt-1 font-display text-2xl font-bold sm:text-3xl">{today.day}</dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-wider text-mist">Minutes</dt>
                <dd className="mt-1 font-display text-2xl font-bold sm:text-3xl">{today.minutes}</dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-wider text-mist">Heart rate</dt>
                <dd className="mt-1 font-display text-2xl font-bold sm:text-3xl">{today.hr}</dd>
              </div>
            </dl>
          </div>

          <div className="min-w-0">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {workouts.map((style) => (
                <a
                  key={style.id}
                  href="#workouts"
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 transition hover:border-volt/50 hover:bg-white/[0.08]"
                >
                  <span
                    className="grid h-9 w-9 place-items-center rounded-xl text-ink"
                    style={{ background: style.accent }}
                  >
                    <CategoryIcon id={style.id} className="h-4 w-4" />
                  </span>
                  <p className="mt-3 font-display text-base font-bold leading-none">{style.name}</p>
                  <p className="mt-1 text-xs text-cream/60">{style.focus}</p>
                </a>
              ))}
            </div>

            <div className="mt-3 rounded-[1.75rem] border border-white/10 bg-gradient-to-b from-canopy to-pine p-4 shadow-2xl sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-cream/80">Today · {today.day}</p>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-volt" />
                    <span className="relative h-2.5 w-2.5 rounded-full bg-volt" />
                  </span>
                  Live
                </span>
              </div>

              <div className="mt-4 grid gap-3 min-[400px]:grid-cols-2">
                <div className="rounded-2xl bg-ink/45 p-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-mist">Steps</p>
                  <p className="mt-2 font-display text-3xl font-extrabold">{today.steps.toLocaleString()}</p>
                  <div className="mt-3 flex items-center gap-3">
                    <ProgressRing
                      value={stepPercent}
                      size={64}
                      stroke={7}
                      track="rgba(255,255,255,0.12)"
                      label="Daily step progress"
                    >
                      <span className="text-[11px] font-bold">{stepPercent}%</span>
                    </ProgressRing>
                    <p className="text-xs leading-snug text-cream/65">of {stepGoal.toLocaleString()} daily goal</p>
                  </div>
                </div>
                <div className="rounded-2xl bg-ink/45 p-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-mist">Heart rate</p>
                  <p className="mt-2 font-display text-3xl font-extrabold">
                    {today.hr}
                    <span className="ml-1 text-sm font-semibold text-cream/60">bpm</span>
                  </p>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-ember"
                      style={{ width: `${Math.min(100, ((today.hr - 60) / 120) * 100)}%` }}
                    />
                  </div>
                  <p className="mt-2 text-xs text-cream/65">{heartZone(today.hr)}</p>
                </div>
              </div>

              <div className="mt-3 rounded-2xl bg-ink/45 p-4">
                <div className="flex items-center justify-between text-xs font-semibold text-cream/70">
                  <span>Week minutes</span>
                  <span>{weekMinutes} min</span>
                </div>
                <div className="mt-3 flex h-16 items-end gap-1.5">
                  {weekActivity.map((day) => (
                    <div key={day.day} className="flex h-full min-w-0 flex-1 flex-col justify-end">
                      <div
                        className={`rounded-md ${day.day === today.day ? 'bg-volt' : 'bg-white/20'}`}
                        style={{ height: `${Math.max(18, (day.minutes / maxMinutes) * 100)}%` }}
                        title={`${day.day}: ${day.minutes} min`}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-2 flex gap-1.5">
                  {weekActivity.map((day) => (
                    <span
                      key={day.short}
                      className={`flex-1 text-center text-[10px] font-bold uppercase tracking-wide ${day.day === today.day ? 'text-volt' : 'text-cream/45'}`}
                    >
                      {day.short}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between gap-3 rounded-2xl bg-volt px-4 py-4 text-ink">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em]">Up next</p>
                  <p className="font-display text-lg font-extrabold">Lower Body Power</p>
                </div>
                <p className="text-sm font-bold">40 min</p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <div className="bg-volt text-ink">
        <Container className="grid grid-cols-2 gap-6 py-6 md:grid-cols-4">
          {highlights.map((item) => (
            <div key={item.label}>
              <p className="font-display text-3xl font-extrabold sm:text-4xl">
                <AnimatedNumber value={item.value} />
              </p>
              <p className="mt-1 text-sm font-semibold">{item.label}</p>
            </div>
          ))}
        </Container>
      </div>
    </section>
  )
}
