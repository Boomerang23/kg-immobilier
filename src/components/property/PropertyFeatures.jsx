function SpecItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-sm border border-beige-200 bg-beige-50 px-4 py-3.5 transition-colors hover:border-gold-300/50 hover:bg-white">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-gold-500/10 text-gold-600">
        {icon}
      </span>
      <div>
        <p className="text-xs uppercase tracking-wider text-charcoal-muted">{label}</p>
        <p className="font-medium text-charcoal">{value}</p>
      </div>
    </div>
  )
}

export default function PropertyFeatures({ property }) {
  const specs = [
    {
      label: 'Chambres',
      value: property.bedrooms,
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5M3.75 6.75h16.5M3.75 17.25h16.5" />
        </svg>
      ),
    },
    {
      label: 'Salles de bain',
      value: property.bathrooms,
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75h6M9 6.75a3 3 0 016 0M9 6.75V4.5m6 2.25V4.5m-9 12h12a2.25 2.25 0 002.25-2.25V9.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 9.75v6.75A2.25 2.25 0 006.75 18.75z" />
        </svg>
      ),
    },
    {
      label: 'Surface',
      value: `${property.area} m²`,
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v16.5h16.5M9 9l3 3 6-6" />
        </svg>
      ),
    },
    {
      label: 'Parking',
      value: `${property.parking} place${property.parking > 1 ? 's' : ''}`,
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9m9 9v3.75m-9-3.75v3.75m0 0H3.375a1.125 1.125 0 01-1.125-1.125V6.375c0-.621.504-1.125 1.125-1.125h17.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125H8.25z" />
        </svg>
      ),
    },
    {
      label: 'Étages',
      value: property.floors,
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
        </svg>
      ),
    },
    {
      label: 'Année',
      value: property.yearBuilt,
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
      ),
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 font-display text-2xl text-charcoal">Caractéristiques</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {specs.map((spec) => (
            <SpecItem key={spec.label} icon={spec.icon} label={spec.label} value={spec.value} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-4 font-display text-2xl text-charcoal">Équipements &amp; prestations</h3>
        <ul className="grid gap-2 sm:grid-cols-2">
          {property.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2.5 text-sm text-charcoal-muted">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-400/20 text-gold-600">
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
