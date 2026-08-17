import "server-only";

const GITHUB_API_BASE = "https://api.github.com";

type GitHubClientOptions = {
  path: string;
  searchParams?: Record<string, string>;
};

export async function githubFetch<T>(options: GitHubClientOptions): Promise<T> {
  const token = process.env.GITHUB_TOKEN;

  const url = new URL(`${GITHUB_API_BASE}${options.path}`);

  if (options.searchParams) {
    Object.entries(options.searchParams).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }

  const response = await fetch(url.toString(), {
    headers: {
      Accept: "application/vnd.github+json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new GitHubNotFoundError(options.path);
    }
    throw new GitHubApiError(response.status, options.path);
  }
  return response.json() as Promise<T>;
}

export class GitHubNotFoundError extends Error {
  constructor(path: string) {
    super(`GitHub resource not found: ${path}`);
    this.name = "GitHubNotFoundError";
  }
}
export class GitHubApiError extends Error {
  constructor(status: number, path: string) {
    super(`GitHub API error ${status} for ${path}`);
    this.name = "GitHubApiError";
  }
}
