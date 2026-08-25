import type { GitHubCommit, GitHubRepositoryJson, Project, ProjectConfig } from '../types';

export function toProject(
  config: ProjectConfig,
  repository: GitHubRepositoryJson,
  lastCommit: GitHubCommit | null,
  languages: string[],
): Project {
  return {
    ...config,
    name: config.customName.trim() || repository.name,
    description: repository.description ?? 'Sem descrição.',
    repositoryUrl: repository.html_url,
    updatedAt: repository.updated_at,
    primaryLanguage: repository.language,
    stars: repository.stargazers_count,
    forks: repository.forks_count,
    openIssues: repository.open_issues_count,
    lastCommit,
    languages,
  };
}
