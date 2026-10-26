import { useState } from 'react'
import { brand, contactTopics } from '../../data/site'
import Container from '../ui/Container'
import { IconCheck, IconMail, IconPhone, IconPin } from '../ui/Icons'
import SectionHeading from '../ui/SectionHeading'

const emptyForm = { name: '', email: '', topic: contactTopics[0], message: '' }

export default function Contact() {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(null)

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  function validate(values) {
    const next = {}
    if (values.name.trim().length < 2) next.name = 'Please enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      next.email = 'Enter a valid email address.'
    }
    if (values.message.trim().length < 12) {
      next.message = 'Add a few more words so we can help (12+ characters).'
    }
    return next
  }

  function onSubmit(event) {
    event.preventDefault()
    const next = validate(form)
    setErrors(next)
    const first = ['name', 'email', 'message'].find((field) => next[field])
    if (first) {
      document.getElementById(first)?.focus()
      return
    }
    setSent({ name: form.name.trim(), topic: form.topic })
    setForm(emptyForm)
  }

  return (
    <section id="contact" className="bg-[#ebe6dc] py-20 sm:py-24" aria-labelledby="contact-heading">
      <Container className="grid items-start gap-10 lg:grid-cols-2">
        <div>
          <SectionHeading
            id="contact-heading"
            eyebrow="08 — Contact"
            title="Write the studio."
            text="Questions about coaching, memberships, or the tracker itself. This form stays in the browser — nothing is sent to a server."
          />
          <ul className="mt-8 space-y-4">
            <li>
              <a href={`mailto:${brand.email}`} className="flex items-center gap-3 font-semibold hover:text-moss">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-ink text-volt">
                  <IconMail />
                </span>
                {brand.email}
              </a>
            </li>
            <li>
              <a href={`tel:${brand.phone.replace(/[^\d+]/g, '')}`} className="flex items-center gap-3 font-semibold hover:text-moss">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-ink text-volt">
                  <IconPhone />
                </span>
                {brand.phone}
              </a>
            </li>
            <li className="flex items-start gap-3 font-semibold">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-ink text-volt">
                <IconPin />
              </span>
              <span>
                {brand.address}
                <span className="mt-1 block text-sm font-medium text-ink/60">{brand.hours}</span>
              </span>
            </li>
          </ul>
        </div>

        <div className="card-shadow rounded-[1.8rem] border border-sand bg-paper p-5 sm:p-7">
          {sent ? (
            <div className="rise" role="status">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-volt text-ink">
                <IconCheck />
              </span>
              <h3 className="mt-4 font-display text-3xl font-extrabold">Note received.</h3>
              <p className="mt-2 text-ink/70">
                Thanks, {sent.name}. A {sent.topic.toLowerCase()} message is ready in this demo. In a live app it would go to the studio inbox.
              </p>
              <button type="button" className="btn btn-dark mt-6" onClick={() => setSent(null)}>
                Write another
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-semibold" htmlFor="name">
                  Name
                  <input
                    id="name"
                    name="name"
                    className="field"
                    autoComplete="name"
                    value={form.name}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    onChange={(event) => update('name', event.target.value)}
                  />
                  {errors.name ? (
                    <span id="name-error" className="mt-1 block text-sm font-medium text-ember">
                      {errors.name}
                    </span>
                  ) : null}
                </label>
                <label className="block text-sm font-semibold" htmlFor="email">
                  Email
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="field"
                    autoComplete="email"
                    value={form.email}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    onChange={(event) => update('email', event.target.value)}
                  />
                  {errors.email ? (
                    <span id="email-error" className="mt-1 block text-sm font-medium text-ember">
                      {errors.email}
                    </span>
                  ) : null}
                </label>
              </div>
              <label className="mt-4 block text-sm font-semibold" htmlFor="topic">
                Topic
                <select
                  id="topic"
                  name="topic"
                  className="field field-select"
                  value={form.topic}
                  onChange={(event) => update('topic', event.target.value)}
                >
                  {contactTopics.map((topic) => (
                    <option key={topic}>{topic}</option>
                  ))}
                </select>
              </label>
              <label className="mt-4 block text-sm font-semibold" htmlFor="message">
                Message
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="field resize-y"
                  value={form.message}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  onChange={(event) => update('message', event.target.value)}
                />
                {errors.message ? (
                  <span id="message-error" className="mt-1 block text-sm font-medium text-ember">
                    {errors.message}
                  </span>
                ) : null}
              </label>
              <button type="submit" className="btn btn-dark mt-5">
                Send message
              </button>
            </form>
          )}
        </div>
      </Container>
    </section>
  )
}
