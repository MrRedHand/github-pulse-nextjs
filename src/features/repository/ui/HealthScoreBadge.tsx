import type { HealthScoreBreakdown } from "@/entities/repository/model/health-score";

type Props = { score: HealthScoreBreakdown };

function scoreColor(total: number): string {
  if (total >= 80) return "text-green-600 bg-green-50 border-green-200";
  if (total >= 60) return "text-yellow-600 bg-yellow-50 border-yellow-200";
  if (total >= 40) return "text-orange-600 bg-orange-50 border-orange-200";
  return "text-red-600 bg-red-50 border-red-200";
}

export function HealthScoreBadge({ score }: Props) {
  return (
    <section className="mt-8">
      <div className={`rounded-lg border p-6 ${scoreColor(score.total)}`}>
        <p className="text-sm font-medium tracking-wide uppercase">
          DevPulse Health Score
        </p>
        <p className="mt-1 text-5xl font-bold">{score.total}</p>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {(
          [
            ["Activity", score.activity],
            ["Maintenance", score.maintenance],
            ["Community", score.community],
            ["Issue Health", score.issueHealth],
          ] as const
        ).map(([label, value]) => (
          <div key={label} className="rounded border border-zinc-200 p-3">
            <p className="text-xs text-zinc-500">{label}</p>
            <p className="text-lg font-semibold">{value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
