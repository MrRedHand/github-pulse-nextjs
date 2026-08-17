export type GitHubRepositoryDto = {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string | null;
  pushed_at: string;
  owner: {
    login: string;
    html_url: string;
  };
};

export type GitHubCommitDto = {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string | null;
      date: string;
    };
  };
  html_url: string;
};
