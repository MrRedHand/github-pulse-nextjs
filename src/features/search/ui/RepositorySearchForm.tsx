"use client";

import { parseRepoSlug } from "@/shared/lib/parse-repo-slug";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function RepositorySearchForm() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const slug = parseRepoSlug(query);
    if (!slug) {
      setError("Enter a valid repository, e.g. vercel/next.js");
      return;
    }

    setError(null);
    router.push(`/repo/${slug.owner}/${slug.name}`);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <label htmlFor="repo-search" className="sr-only">
        Repository
      </label>
      <div className="flex gap-2">
        <input
          id="repo-search"
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (error) setError(null);
          }}
          placeholder="owner/repo or github.com/owner/repo"
          className="flex-1 rounded-lg border border-zinc-300 px-4 py-2.5 text-sm outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
        />
        <button
          type="submit"
          className="rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-700"
        >
          Analyze
        </button>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
