import { clearProjectCache } from './projectCache';

const SOURCES_KEY = 'github-dashboard:repository-sources';

export type RepositorySource =
  | { type: 'repository'; owner: string; repository: string }
  | { type: 'account'; owner: string };

export function parseGitHubSource(value: string): RepositorySource | null {
  try {
    const url = new URL(value.trim());
    const parts = url.pathname.split('/').filter(Boolean);
    if (url.protocol !== 'https:') return null;
    if (url.hostname === 'github.com' || url.hostname === 'www.github.com') {
      if (parts.length === 1) return { type: 'account', owner: decodeURIComponent(parts[0]) };
      if (parts.length === 2) {
        return {
          type: 'repository',
          owner: decodeURIComponent(parts[0]),
          repository: decodeURIComponent(parts[1].replace(/\.git$/, '')),
        };
      }
      return null;
    }
    if (url.hostname === 'api.github.com') {
      if (parts.length === 3 && parts[0] === 'repos') {
        return { type: 'repository', owner: decodeURIComponent(parts[1]), repository: decodeURIComponent(parts[2]) };
      }
      if (parts.length === 3 && parts[0] === 'users' && parts[2] === 'repos') {
        return { type: 'account', owner: decodeURIComponent(parts[1]) };
      }
    }
    return null;
  } catch {
    return null;
  }
}

export function sourceKey(source: RepositorySource) {
  return source.type === 'account' ? `account:${source.owner}` : `repository:${source.owner}/${source.repository}`;
}

export function sourceApiUrl(source: RepositorySource) {
  return source.type === 'account'
    ? `https://api.github.com/users/${source.owner}/repos`
    : `https://api.github.com/repos/${source.owner}/${source.repository}`;
}

export function readRepositorySources(): RepositorySource[] {
  try {
    const value = localStorage.getItem(SOURCES_KEY);
    if (!value) return [];
    const sources = JSON.parse(value) as Array<RepositorySource | { owner: string; repository: string }>;
    return sources.map((source) => 'type' in source ? source : { type: 'repository', ...source });
  } catch {
    return [];
  }
}

export function writeRepositorySources(sources: RepositorySource[]) {
  localStorage.setItem(SOURCES_KEY, JSON.stringify(sources));
  clearProjectCache();
}
