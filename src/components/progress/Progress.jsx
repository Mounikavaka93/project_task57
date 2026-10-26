import { useState } from 'react'
import { progressLabels, progressSeries, records, workoutMix } from '../../data/site'
import AreaChart from '../ui/AreaChart'
import Container from '../ui/Container'
import DonutChart from '../ui/DonutChart'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

export default function Progress() {
  const [metric, setMetric] = useState('minutes')
  const series = progressSeries[metric]
  const latest = series.values[series.values.length - 1]
  const previous = series.values[series.values.length - 2]
  const delta = latest - previous
  const percent = Math.round((delta / previous) * 100)

  return (
    <section id="progress" className="bg-cream py-20 sm:py-24" aria-labelledby="progress-heading">
      <Container>
        <SectionHeading
          id="progress-heading"
          eyebrow="04 — Progress"
          title="Eight weeks, drawn out."
          text="Switch between training minutes and calories. Hover or focus a week on the chart to read the exact value."
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-5">
          <Reveal className="min-w-0 lg:col-span-3">
            <article className="card-shadow h-full min-w-0 rounded-[1.8rem] border border-sand bg-paper p-4 sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-mist">This week vs last</p>
                  <p className="mt-2 font-display text-4xl font-extrabold">
                    {delta > 0 ? '+' : ''}
                    {delta.toLocaleString()} {series.unit}
                  </p>
                  <p className="mt-1 text-sm text-ink/65">
                    {percent > 0 ? '+' : ''}
                    {percent}% from W7 to W8
                  </p>
                </div>
                <div className="flex rounded-full bg-cream p-1" role="tablist" aria-label="Chart metric">
                  {[
                    ['minutes', 'Minutes'],
                    ['calories', 'Calories'],
                  ].map(([id, label]) => (
                    <button
                      key={id}
                      type="button"
                      role="tab"
                      aria-selected={metric === id}
                      onClick={() => setMetric(id)}
                      className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                        metric === id ? 'bg-ink text-cream' : 'text-ink/70 hover:text-ink'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-4">
                <AreaChart
                  key={metric}
                  values={series.values}
                  labels={progressLabels}
                  unit={series.unit}
                />
              </div>
            </article>
          </Reveal>

          <Reveal delay={100} className="lg:col-span-2">
            <article className="flex h-full flex-col rounded-[1.8rem] bg-pine p-5 text-cream sm:p-6">
              <h3 className="font-display text-2xl font-extrabold">Workout mix</h3>
              <p className="mt-1 text-sm text-cream/65">Share of logged sessions across the four styles.</p>
              <div className="mt-4">
                <DonutChart segments={workoutMix} center="32%" caption="cardio" />
              </div>
              <ul className="mt-2 space-y-2">
                {workoutMix.map((segment) => (
                  <li key={segment.label} className="flex items-center justify-between text-sm">
                    <span className="inline-flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ background: segment.color }} />
                      {segment.label}
                    </span>
                    <span className="font-bold">{segment.value}%</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {records.map((record, index) => (
            <Reveal key={record.label} delay={index * 60} tilt tiltMax={7}>
              <article className="card-shadow h-full rounded-3xl border border-sand bg-paper p-5">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-mist">{record.label}</p>
                <p className="mt-3 font-display text-3xl font-extrabold">{record.value}</p>
                <p className="mt-2 text-sm text-ink/65">{record.note}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
