export default function RepositoryLoading() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <div className="h-4 w-24 animate-pulse rounded bg-zinc-200" />
      <div className="mt-2 h-9 w-64 animate-pulse rounded bg-zinc-200" />
      <div className="mt-2 h-5 w-full animate-pulse rounded bg-zinc-200" />

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-20 animate-pulse rounded-lg border border-zinc-200 bg-zinc-50"
          />
        ))}
      </div>

      <div className="mt-8 h-32 animate-pulse rounded-lg bg-zinc-100" />
      <div className="mt-8 space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-12 animate-pulse rounded bg-zinc-100" />
        ))}
      </div>
    </main>
  );
}
