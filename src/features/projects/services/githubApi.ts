import type { GitHubCommit, GitHubRepository } from '../types';

const GITHUB_API_URL = 'https://api.github.com';

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${GITHUB_API_URL}${path}`, {
    headers: { Accept: 'application/vnd.github+json' },
  });

  if (!response.ok) {
    throw new Error(`GitHub API respondeu com status ${response.status}.`);
  }

  return response.json() as Promise<T>;
}

export function getRepository(owner: string, repository: string) {
  return request<GitHubRepository>(`/repos/${owner}/${repository}`);
}

export async function getLatestCommit(owner: string, repository: string) {
  const commits = await request<GitHubCommit[]>(`/repos/${owner}/${repository}/commits?per_page=1`);
  return commits[0] ?? null;
}

