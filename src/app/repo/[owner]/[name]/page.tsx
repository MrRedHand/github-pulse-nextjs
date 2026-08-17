import { getCommits } from "@/entities/repository/api/get-commits";
import { getReadme } from "@/entities/repository/api/get-readme";
import { getRepository } from "@/entities/repository/api/get-repository";
import { GitHubNotFoundError } from "@/entities/repository/api/github-client";
import { RepositoryPage } from "@/features/repository/ui/RepositoryPage";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ owner: string; name: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { owner, name } = await params;
  try {
    const repo = await getRepository(owner, name);
    return {
      title: `${repo.fullName} - DevPulse`,
      description: repo.description ?? `Health analytics for ${repo.fullName}`,
    };
  } catch {
    return { title: "Repository not found" };
  }
}

export default async function RepositoryRoutePage({ params }: PageProps) {
  const { owner, name } = await params;

  try {
    const [repository, commits, readme] = await Promise.all([
      getRepository(owner, name),
      getCommits(owner, name),
      getReadme(owner, name),
    ]);

    return (
      <RepositoryPage
        repository={repository}
        commits={commits}
        readme={readme}
      />
    );
  } catch (error) {
    if (error instanceof GitHubNotFoundError) {
      notFound();
    }
    throw error;
  }
}
