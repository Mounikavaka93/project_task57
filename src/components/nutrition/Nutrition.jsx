import { meals } from '../../data/site'
import Container from '../ui/Container'
import { IconBowl } from '../ui/Icons'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

const totals = meals.reduce(
  (sum, meal) => ({
    calories: sum.calories + meal.calories,
    protein: sum.protein + meal.protein,
    carbs: sum.carbs + meal.carbs,
    fat: sum.fat + meal.fat,
    fiber: sum.fiber + meal.fiber,
  }),
  { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 },
)

const macroParts = [
  { label: 'Protein', grams: totals.protein, kcal: totals.protein * 4, className: 'bg-volt' },
  { label: 'Carbohydrates', grams: totals.carbs, kcal: totals.carbs * 4, className: 'bg-ice' },
  { label: 'Fat', grams: totals.fat, kcal: totals.fat * 9, className: 'bg-ember' },
]
const macroKcal = macroParts.reduce((sum, part) => sum + part.kcal, 0)

const nutrientRows = [
  ['Calories', `${totals.calories.toLocaleString()} kcal`],
  ['Protein', `${totals.protein} g`],
  ['Carbohydrates', `${totals.carbs} g`],
  ['Fat', `${totals.fat} g`],
  ['Fiber', `${totals.fiber} g`],
]

export default function Nutrition() {
  return (
    <section id="nutrition" className="bg-cream py-20 sm:py-24" aria-labelledby="nutrition-heading">
      <Container>
        <SectionHeading
          id="nutrition-heading"
          eyebrow="07 — Nutrition"
          title="A day of eating, with the math."
          text="Four plates from a sample plan. Each card lists calories, protein, carbohydrates, fat, and fiber."
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)]">
          <Reveal>
            <aside className="h-fit rounded-[1.8rem] bg-ink p-5 text-cream sm:p-6 lg:sticky lg:top-28">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-volt">Daily total</p>
              <p className="mt-3 font-display text-5xl font-extrabold">{totals.calories.toLocaleString()}</p>
              <p className="text-sm text-cream/60">kilocalories</p>
              <div className="mt-5 flex h-3 overflow-hidden rounded-full bg-white/10">
                {macroParts.map((part) => (
                  <span
                    key={part.label}
                    className={part.className}
                    style={{ width: `${(part.kcal / macroKcal) * 100}%` }}
                    title={`${part.label} ${part.grams}g`}
                  />
                ))}
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                {macroParts.map((part) => (
                  <li key={part.label} className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2">
                      <span className={`h-2.5 w-2.5 rounded-full ${part.className}`} />
                      {part.label}
                    </span>
                    <span className="font-semibold">{part.grams} g</span>
                  </li>
                ))}
              </ul>
              <dl className="mt-5 space-y-2 border-t border-white/10 pt-4">
                {nutrientRows.map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between text-sm">
                    <dt className="text-cream/60">{label}</dt>
                    <dd className="font-semibold">{value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-xs leading-relaxed text-cream/50">
                Sample meal plan for the interface. It is not personalized nutrition advice.
              </p>
            </aside>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {meals.map((meal, index) => (
              <Reveal key={meal.id} delay={index * 70} className={`h-full ${index === 0 ? 'sm:col-span-2' : ''}`}>
                <article className="card-shadow flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-sand bg-paper transition duration-300 hover:-translate-y-1">
                  <div className="flex items-end justify-between px-5 py-6" style={{ background: meal.tint }}>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ink/55">{meal.course}</p>
                      <h3 className="mt-2 font-display text-2xl font-extrabold text-ink sm:text-3xl">{meal.name}</h3>
                    </div>
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-ink text-volt">
                      <IconBowl />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-sm leading-relaxed text-ink/70">{meal.description}</p>
                    <p className="mt-2 text-xs font-bold uppercase tracking-wider text-mist">{meal.prep} prep</p>
                    <dl className="mt-4 grid grid-cols-2 gap-2 min-[420px]:grid-cols-3 sm:grid-cols-5">
                      {[
                        ['Calories', `${meal.calories}`],
                        ['Protein', `${meal.protein}g`],
                        ['Carbs', `${meal.carbs}g`],
                        ['Fat', `${meal.fat}g`],
                        ['Fiber', `${meal.fiber}g`],
                      ].map(([label, value]) => (
                        <div key={label} className="rounded-2xl bg-cream px-2 py-2 text-center">
                          <dt className="text-[10px] font-bold uppercase tracking-wider text-mist">{label}</dt>
                          <dd className="mt-1 text-sm font-bold">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
