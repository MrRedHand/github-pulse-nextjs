import "server-only";
import { GitHubNotFoundError } from "./github-client";

const GITHUB_REPO_BASE = "https://api.github.com/repos/";

export async function getReadme(owner: string, name: string): Promise<string> {
  const token = process.env.GITHUB_TOKEN;

  const response = await fetch(`${GITHUB_REPO_BASE}${owner}/${name}/readme`, {
    headers: {
      Accept: "application/vnd.github.raw+json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new GitHubNotFoundError(`/repos/${owner}/${name}/readme`);
    }
    throw new Error(`Failed to fetch README: ${response.status}`);
  }

  return response.text();
}
