export type RepoSlug = {
  owner: string;
  name: string;
};

export function parseRepoSlug(input: string): RepoSlug | null {
  const trimmed = input.trim().replace(/^https?:\/\/github\.com\//, "");
  const match = trimmed.match(/^([a-zA-Z0-9._-]+)\/([a-zA-Z0-9._-]+)\/?$/);

  if (!match) return null;

  return {
    owner: match[1],
    name: match[2],
  };
}
