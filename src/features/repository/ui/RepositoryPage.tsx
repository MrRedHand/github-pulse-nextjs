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
      <RepositoryHeader repository={repository} />
      <RepositoryStats repository={repository} />
      <HealthScoreBadge score={healthScore} />
      <CommitList commits={commits} />
      <Suspense
        fallback={
          <div className="mt-8 h-48 animate-pulse rounded-lg bg-zinc-100" />
        }
      >
        <ReadmeLoader owner={repository.owner} name={repository.name} />
      </Suspense>
    </main>
  );
}
