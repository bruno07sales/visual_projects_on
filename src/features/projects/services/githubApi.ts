import type { GitHubCommit, GitHubLanguagesJson, GitHubRepositoryJson } from '../types';

const GITHUB_API_URL = 'https://api.github.com';

function getHeaders() {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

async function request(path: string): Promise<unknown> {
  const response = await fetch(`${GITHUB_API_URL}${path}`, {
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error(`GitHub API respondeu com status ${response.status}.`);
  }

  return response.json() as Promise<unknown>;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export function parseRepositoryJson(value: unknown): GitHubRepositoryJson {
  if (!isRecord(value)) throw new Error('JSON de repositório inválido.');
  const requiredStrings = ['name', 'html_url', 'updated_at'] as const;
  const requiredNumbers = ['stargazers_count', 'forks_count', 'open_issues_count'] as const;
  if (
    requiredStrings.some((field) => typeof value[field] !== 'string') ||
    requiredNumbers.some((field) => typeof value[field] !== 'number') ||
    !isRecord(value.owner) || typeof value.owner.login !== 'string' ||
    (value.description !== null && typeof value.description !== 'string') ||
    (value.language !== null && typeof value.language !== 'string')
  ) throw new Error('JSON de repositório inválido.');
  return value as unknown as GitHubRepositoryJson;
}

export function parseRepositoryListJson(value: unknown): GitHubRepositoryJson[] {
  if (!Array.isArray(value)) throw new Error('JSON da lista de repositórios inválido.');
  return value.map(parseRepositoryJson);
}

export function parseCommitListJson(value: unknown): GitHubCommit[] {
  if (!Array.isArray(value)) throw new Error('JSON de commits inválido.');
  for (const item of value) {
    if (!isRecord(item) || typeof item.sha !== 'string' || typeof item.html_url !== 'string' || !isRecord(item.commit)) {
      throw new Error('JSON de commits inválido.');
    }
    const author = item.commit.author;
    if (typeof item.commit.message !== 'string' || (author !== null && (!isRecord(author) || typeof author.date !== 'string'))) {
      throw new Error('JSON de commits inválido.');
    }
  }
  return value as GitHubCommit[];
}

export function parseLanguagesJson(value: unknown): GitHubLanguagesJson {
  if (!isRecord(value) || Object.values(value).some((bytes) => typeof bytes !== 'number')) {
    throw new Error('JSON de linguagens inválido.');
  }
  return value as GitHubLanguagesJson;
}

export async function getRepository(owner: string, repository: string) {
  return parseRepositoryJson(await request(`/repos/${owner}/${repository}`));
}

export async function getPublicRepositories(owner: string) {
  const repositories: GitHubRepositoryJson[] = [];
  const perPage = 100;

  for (let page = 1; ; page += 1) {
    const result = parseRepositoryListJson(
      await request(`/users/${encodeURIComponent(owner)}/repos?type=owner&sort=updated&per_page=${perPage}&page=${page}`),
    );
    repositories.push(...result);
    if (result.length < perPage) return repositories;
  }
}

export async function getLatestCommit(owner: string, repository: string) {
  const commits = parseCommitListJson(await request(`/repos/${owner}/${repository}/commits?per_page=1`));
  return commits[0] ?? null;
}

export async function getLanguages(owner: string, repository: string) {
  const languages = parseLanguagesJson(await request(`/repos/${owner}/${repository}/languages`));
  return Object.keys(languages);
}
