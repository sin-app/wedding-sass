export function StatsSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-12 rounded-xl bg-white/5 animate-pulse" />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-20 rounded-xl bg-white/5 animate-pulse" />
        ))}
      </div>
    </div>
  );
}

export function TrendSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className="h-28 rounded-xl bg-white/5 animate-pulse" />
      ))}
    </div>
  );
}

export function ActivitySkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className="h-48 rounded-xl bg-white/5 animate-pulse" />
      ))}
    </div>
  );
}
