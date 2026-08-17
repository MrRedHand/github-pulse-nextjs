import type { Repository } from "@/entities/repository/model/types";

type Props = { repository: Repository };

const stats = [
  { label: "Stars", key: "stars" as const },
  { label: "Forks", key: "forks" as const },
  { label: "Open Issues", key: "openIssues" as const },
  { label: "Language", key: "language" as const },
];

export function RepositoryStats({ repository }: Props) {
  const lastUpdate = new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
  }).format(new Date(repository.lastPushedAt));
  return (
    <section className="mt-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map(({ label, key }) => (
          <div key={key} className="rounded-lg border border-zinc-200 p-4">
            <p className="text-sm text-zinc-500">{label}</p>
            <p className="text-2xl font-semibold">{repository[key] ?? "—"}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-zinc-500">Last updated: {lastUpdate}</p>
    </section>
  );
}
