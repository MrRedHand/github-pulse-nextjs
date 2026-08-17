import type { Commit, Repository } from "@/entities/repository/model/types";
import { calculateHealthScore } from "@/entities/repository/model/health-score";
import { CommitList } from "./CommitList";
import { HealthScoreBadge } from "./HealthScoreBadge";
import { ReadmeSection } from "./ReadmeSection";
import { RepositoryHeader } from "./RepositoryHeader";
import { RepositoryStats } from "./RepositoryStats";

type Props = {
  repository: Repository;
  commits: Commit[];
  readme: string;
};

export function RepositoryPage({ repository, commits, readme }: Props) {
  const healthScore = calculateHealthScore(repository, commits.length);

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <RepositoryHeader repository={repository} />
      <RepositoryStats repository={repository} />
      <HealthScoreBadge score={healthScore} />
      <CommitList commits={commits} />
      <ReadmeSection content={readme} />
    </main>
  );
}
