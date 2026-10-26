import { brand, navLinks, socials } from '../../data/site'
import Container from '../ui/Container'
import { IconMail, IconPhone, IconPin, IconPulse, SocialIcon } from '../ui/Icons'

const explore = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'goals', label: 'Goals' },
  { id: 'bmi', label: 'BMI calculator' },
]

const year = new Date().getFullYear()

export default function Footer() {

  return (
    <footer className="bg-ink text-cream">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <a href="#home" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-volt text-ink">
                <IconPulse className="h-5 w-5" />
              </span>
              <span className="font-display text-lg font-extrabold tracking-[0.16em]">STRYDE</span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/70">
              A fitness tracker for workouts, meals, and weekly numbers — built to stay readable on a phone or a wide desk.
            </p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-volt">Quick links</p>
            <ul className="mt-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a href={`#${link.id}`} className="text-sm text-cream/75 transition hover:text-volt">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-volt">Explore</p>
            <ul className="mt-4 space-y-2">
              {explore.map((link) => (
                <li key={link.id}>
                  <a href={`#${link.id}`} className="text-sm text-cream/75 transition hover:text-volt">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-volt">Contact</p>
            <ul className="mt-4 space-y-3 text-sm text-cream/75">
              <li>
                <a href={`mailto:${brand.email}`} className="inline-flex items-center gap-2 hover:text-volt">
                  <IconMail className="h-4 w-4 text-volt" />
                  {brand.email}
                </a>
              </li>
              <li>
                <a href={`tel:${brand.phone.replace(/[^\d+]/g, '')}`} className="inline-flex items-center gap-2 hover:text-volt">
                  <IconPhone className="h-4 w-4 text-volt" />
                  {brand.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-volt" />
                <span>{brand.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-cream/60">© {year} STRYDE. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <a href="#home" className="text-sm text-cream/70 transition hover:text-volt">
              Back to top
            </a>
            <ul className="flex gap-2">
              {socials.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-cream transition hover:-translate-y-0.5 hover:bg-volt hover:text-ink"
                  >
                    <SocialIcon id={social.id} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  )
}
