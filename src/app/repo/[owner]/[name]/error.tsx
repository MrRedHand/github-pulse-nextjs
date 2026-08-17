"use client";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function RepositoryError({ error, reset }: Props) {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="mt-2 text-zinc-600">
        Failed to load repository data. This might be a temporary GitHub API
        issue.
      </p>
      <p className="mt-4 text-sm text-zinc-400">{error.message}</p>
      <button
        onClick={reset}
        className="mt-6 rounded-lg bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-700"
      >
        Try again
      </button>
    </main>
  );
}
