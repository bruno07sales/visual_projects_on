import type { GitHubCommit, GitHubRepositoryJson, ProjectConfig } from '../../features/projects/types';

export const projectConfig: ProjectConfig = {
  owner: 'octocat', repository: 'Hello-World', customName: 'Projeto visual',
  progress: 60, status: 'active', priority: 'high', nextTask: 'Publicar',
  deadline: '2026-12-31', featured: true, publishedUrl: 'https://example.com',
};

// Este cenário não deve ser importado pela configuração usada em produção.
export const nonexistentRepositoryConfig: ProjectConfig = {
  owner: 'usuario-inexistente-visual-projects-on', repository: 'repositorio-inexistente',
  customName: 'Repositório inexistente', progress: 0, status: 'planned', priority: 'low',
  nextTask: 'Validar tratamento de erro', deadline: null, featured: false, publishedUrl: null,
};

export const githubRepositoryJson: GitHubRepositoryJson = {
  name: 'Hello-World', owner: { login: 'octocat' }, description: 'Descrição recebida do GitHub',
  html_url: 'https://github.com/octocat/Hello-World', updated_at: '2026-01-01T00:00:00Z',
  stargazers_count: 10, forks_count: 2, open_issues_count: 1, language: 'TypeScript',
};

export const githubCommitListJson: GitHubCommit[] = [{
  sha: 'abc123', html_url: 'https://github.com/octocat/Hello-World/commit/abc123',
  commit: { message: 'Atualiza o projeto', author: { date: '2026-01-01T00:00:00Z' } },
}];

export const githubLanguagesJson = { TypeScript: 8000, CSS: 2000 };
