export default function SectionHeading({
  id,
  eyebrow,
  title,
  text,
  light = false,
  align = 'left',
  className = '',
}) {
  const alignment = align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'
  return (
    <div data-nav-anchor className={`${alignment} ${className}`}>
      <p className={`text-xs font-bold uppercase tracking-[0.22em] ${light ? 'text-volt' : 'text-moss'}`}>
        {eyebrow}
      </p>
      <h2
        id={id}
        className={`mt-3 font-display text-[2rem] font-extrabold leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl ${light ? 'text-cream' : 'text-ink'}`}
      >
        {title}
      </h2>
      {text ? (
        <p className={`mt-4 text-base leading-relaxed sm:text-lg ${light ? 'text-cream/70' : 'text-ink/70'}`}>
          {text}
        </p>
      ) : null}
    </div>
  )
}
