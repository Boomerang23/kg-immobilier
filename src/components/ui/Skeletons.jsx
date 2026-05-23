export function PropertyCardSkeleton() {
  return (
    <article className="overflow-hidden rounded-sm bg-white shadow-sm ring-1 ring-charcoal/5">
      <div className="aspect-[4/3] animate-pulse bg-beige-200" />
      <div className="space-y-3 p-5 sm:p-6">
        <div className="h-3 w-20 animate-pulse rounded-sm bg-beige-200" />
        <div className="h-6 w-3/4 animate-pulse rounded-sm bg-beige-200" />
        <div className="h-4 w-1/2 animate-pulse rounded-sm bg-beige-200" />
        <div className="h-7 w-2/5 animate-pulse rounded-sm bg-beige-200" />
      </div>
    </article>
  )
}

export function PropertyGridSkeleton({ count = 6 }) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <PropertyCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function PropertyDetailSkeleton() {
  return (
    <div className="animate-pulse space-y-8">
      <div className="aspect-[16/10] rounded-sm bg-beige-200" />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-3">
          <div className="h-8 w-2/3 rounded-sm bg-beige-200" />
          <div className="h-4 w-1/3 rounded-sm bg-beige-200" />
          <div className="h-10 w-1/2 rounded-sm bg-beige-200" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-full rounded-sm bg-beige-200" />
          <div className="h-4 w-full rounded-sm bg-beige-200" />
          <div className="h-4 w-4/5 rounded-sm bg-beige-200" />
        </div>
      </div>
    </div>
  )
}
