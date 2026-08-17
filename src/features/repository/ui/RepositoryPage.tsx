import type { Commit, Repository } from "@/entities/repository/model/types";
import { calculateHealthScore } from "@/entities/repository/model/health-score";
import { CommitList } from "./CommitList";
import { HealthScoreBadge } from "./HealthScoreBadge";
import { ReadmeSection } from "./ReadmeSection";
import { RepositoryHeader } from "./RepositoryHeader";
import { RepositoryStats } from "./RepositoryStats";
import { Suspense } from "react";
import { ReadmeLoader } from "./ReadmeLoader";

type Props = {
  repository: Repository;
  commits: Commit[];
};

export function RepositoryPage({ repository, commits }: Props) {
  const healthScore = calculateHealthScore(repository, commits.length);

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <div className="rounded-xl border border-zinc-200 bg-white p-8 shadow-sm">
        <RepositoryHeader repository={repository} />
        <RepositoryStats repository={repository} />
        <HealthScoreBadge score={healthScore} />
        <CommitList commits={commits} />
      </div>
      <Suspense
        fallback={
          <div className="mt-6 h-48 animate-pulse rounded-xl bg-zinc-200" />
        }
      >
        <ReadmeLoader owner={repository.owner} name={repository.name} />
      </Suspense>
    </main>
  );
}
