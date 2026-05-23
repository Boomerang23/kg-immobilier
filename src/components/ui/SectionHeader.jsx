export default function SectionHeader({ label, title, description, align = 'center', light = false }) {
  const alignClass =
    align === 'left' ? 'text-left items-start' : 'text-center items-center mx-auto'

  return (
    <div className={`mb-12 flex max-w-2xl flex-col gap-4 sm:mb-16 ${alignClass}`}>
      {label && (
        <span
          className={`text-xs font-medium uppercase tracking-[0.25em] ${
            light ? 'text-gold-300' : 'text-gold-500'
          }`}
        >
          {label}
        </span>
      )}
      <h2
        className={`font-display text-3xl leading-tight sm:text-4xl lg:text-5xl ${
          light ? 'text-white' : 'text-charcoal'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`text-base leading-relaxed sm:text-lg ${
            light ? 'text-beige-200' : 'text-charcoal-muted'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  )
}
