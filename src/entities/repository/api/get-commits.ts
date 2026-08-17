import { GitHubCommitDto } from "@/shared/types/github-dto";
import { Commit } from "../model/types";
import { githubFetch } from "./github-client";
import { cache } from "react";

function mapCommitDto(dto: GitHubCommitDto): Commit {
  return {
    sha: dto.sha,
    message: dto.commit.message,
    authorName: dto.commit.author.name,
    date: dto.commit.author.date,
    url: dto.html_url,
  };
}

export const getCommits = cache(
  async (owner: string, name: string, perPage = 10): Promise<Commit[]> => {
    const dtos = await githubFetch<GitHubCommitDto[]>({
      path: `/repos/${owner}/${name}/commits`,
      searchParams: { per_page: String(perPage) },
    });

    return dtos.map(mapCommitDto);
  },
);
