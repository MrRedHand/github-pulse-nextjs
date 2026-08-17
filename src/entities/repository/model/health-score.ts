import { Repository } from "./types";

export type HealthScoreBreakdown = {
  total: number;
  activity: number;
  maintenance: number;
  community: number;
  issueHealth: number;
};

function daysSince(dateStr: string): number {
  return Date.now() - new Date(dateStr).getTime() / (1000 * 60 * 60 * 24);
}

function scoreActivity(lastPushedAt: string, commitCount: number): number {
  const days = daysSince(lastPushedAt);
  const pushScore =
    days < 7 ? 100 : days <= 30 ? 80 : days <= 90 ? 50 : days <= 180 ? 25 : 10;
  const commitScore = Math.min(commitCount * 10, 100);
  return Math.round(pushScore * 0.6 + commitScore * 0.4);
}

function scoreMaintenance(lastPushedAt: string): number {
  const days = daysSince(lastPushedAt);
  if (days <= 14) return 100;
  if (days <= 60) return 75;
  if (days <= 120) return 50;
  if (days <= 365) return 25;
  return 10;
}

function scoreCommunity(stars: number, forks: number): number {
  const starScore =
    stars >= 10000
      ? 100
      : stars >= 1000
        ? 85
        : stars >= 100
          ? 70
          : stars >= 10
            ? 50
            : 25;
  const forkScore =
    forks >= 1000 ? 100 : forks >= 100 ? 75 : forks >= 10 ? 50 : 25;
  return Math.round(starScore * 0.7 + forkScore * 0.3);
}

function scoreIssueHealth(openIssues: number, stars: number): number {
  if (stars === 0) return openIssues === 0 ? 100 : 50;
  const ratio = openIssues / stars;
  if (ratio <= 0.01) return 100;
  if (ratio <= 0.05) return 80;
  if (ratio <= 0.1) return 60;
  if (ratio <= 0.25) return 40;
  return 20;
}

export function calculateHealthScore(
  repository: Repository,
  commitCount: number,
): HealthScoreBreakdown {
  const activity = scoreActivity(repository.lastPushedAt, commitCount);
  const maintenance = scoreMaintenance(repository.lastPushedAt);
  const community = scoreCommunity(repository.stars, repository.forks);
  const issueHealth = scoreIssueHealth(repository.openIssues, repository.stars);
  const total = Math.round(
    activity * 0.35 + maintenance * 0.25 + community * 0.2 + issueHealth * 0.2,
  );
  return { total, activity, maintenance, community, issueHealth };
}
