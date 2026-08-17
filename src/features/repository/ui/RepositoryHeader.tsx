import type { Repository } from "@/entities/repository/model/types";

type Props = { repository: Repository };

export function RepositoryHeader({ repository }: Props) {
  return (
    <header>
      <a
        href={repository.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-zinc-500 hover:underline"
      >
        {repository.owner}
      </a>
      <h1 className="text-3xl font-bold tracking-tight">{repository.name}</h1>
      {repository.description && (
        <p className="mt-2 text-lg text-zinc-600">{repository.description}</p>
      )}
    </header>
  );
}
