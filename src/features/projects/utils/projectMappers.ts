import type { GitHubCommit, GitHubRepository, Project, ProjectConfig } from '../types';

export function toProject(
  config: ProjectConfig,
  repository: GitHubRepository,
  lastCommit: GitHubCommit | null,
): Project {
  return {
    ...config,
    name: repository.name,
    description: repository.description ?? 'Sem descrição.',
    repositoryUrl: repository.html_url,
    updatedAt: repository.updated_at,
    openIssues: repository.open_issues_count,
    lastCommit,
    technologies: Array.from(
      new Set([...config.technologies, ...(repository.language ? [repository.language] : [])]),
    ),
  };
}

