import type { Project } from '../features/projects/types';

const CACHE_KEY = 'github-dashboard:projects';
const CACHE_TTL = 15 * 60 * 1000;

interface ProjectCache {
  savedAt: number;
  projects: Project[];
}

export function readProjectCache(): Project[] | null {
  try {
    const rawCache = localStorage.getItem(CACHE_KEY);
    if (!rawCache) return null;
    const cache = JSON.parse(rawCache) as ProjectCache;
    return Date.now() - cache.savedAt <= CACHE_TTL ? cache.projects : null;
  } catch {
    return null;
  }
}

export function writeProjectCache(projects: Project[]) {
  const cache: ProjectCache = { savedAt: Date.now(), projects };
  localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
}

