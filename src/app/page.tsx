import { RepositorySearchForm } from "@/features/search/ui/RepositorySearchForm";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-20">
      <div className="w-full max-w-md text-center">
        <h1 className="text-4xl font-bold tracking-tight">GitHub DevPulse</h1>
        <p className="mt-3 text-zinc-600">
          Analyze the health of any public GitHub repository
        </p>
        <div className="mt-8">
          <RepositorySearchForm />
        </div>
        <p className="mt-6 text-sm text-zinc-400">
          Try <span className="font-mono text-zinc-500">vercel/next.js</span>
        </p>
      </div>
    </main>
  );
}
