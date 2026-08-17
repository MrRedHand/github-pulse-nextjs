import Link from "next/link";

export default function RepositoryNotFound() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10 text-center">
      <h1 className="text-2xl font-bold">Repository not found</h1>
      <p className="mt-2 text-zinc-600">
        This repository doesn&apos;t exist or is not accessible.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-lg bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-700"
      >
        Back to search
      </Link>
    </main>
  );
}
