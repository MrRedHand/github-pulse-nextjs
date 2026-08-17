import type { Commit } from "@/entities/repository/model/types";

type Props = { commits: Commit[] };

export function CommitList({ commits }: Props) {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold">Recent Commits</h2>
      {commits.length === 0 ? (
        <p className="mt-4 text-zinc-500">No commits found.</p>
      ) : (
        <ul className="mt-4 divide-y divide-zinc-200">
          {commits.map((commit) => (
            <li key={commit.sha} className="py-3">
              <a
                href={commit.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm text-zinc-500 hover:underline"
              >
                {commit.sha.slice(0, 7)}
              </a>
              <p className="mt-1 text-sm">{commit.message.split("\n")[0]}</p>
              <p className="mt-1 text-xs text-zinc-500">
                {commit.authorName ?? "Unknown"} ·{" "}
                {new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(
                  new Date(commit.date),
                )}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
