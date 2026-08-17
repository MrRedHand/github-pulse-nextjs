import { GitHubRepositoryDto } from "@/shared/types/github-dto";
import { Repository } from "../model/types";
import { githubFetch } from "./github-client";
import { cache } from "react";

function mapRepositoryDto(dto: GitHubRepositoryDto): Repository {
  return {
    owner: dto.owner.login,
    name: dto.name,
    fullName: dto.full_name,
    description: dto.description,
    url: dto.html_url,
    stars: dto.stargazers_count,
    forks: dto.forks_count,
    openIssues: dto.open_issues_count,
    language: dto.language,
    lastPushedAt: dto.pushed_at,
  };
}

export const getRepository = cache(
  async (owner: string, name: string): Promise<Repository> => {
    const dto = await githubFetch<GitHubRepositoryDto>({
      path: `/repos/${owner}/${name}`,
    });

    return mapRepositoryDto(dto);
  },
);
