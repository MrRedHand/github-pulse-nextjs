export type Repository = {
  owner: string;
  name: string;
  fullName: string;
  description: string | null;
  url: string;
  stars: number;
  forks: number;
  openIssues: number;
  language: string | null;
  lastPushedAt: string;
};

export type Commit = {
  sha: string;
  message: string;
  authorName: string | null;
  date: string;
  url: string;
};
