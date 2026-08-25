import type { ProjectFilterValues } from '../features/filters/types';

const PREFERENCES_KEY = 'github-dashboard:preferences';

export function readPreferences(): ProjectFilterValues | null {
  try {
    const value = localStorage.getItem(PREFERENCES_KEY);
    return value ? (JSON.parse(value) as ProjectFilterValues) : null;
  } catch {
    return null;
  }
}

export function writePreferences(preferences: ProjectFilterValues) {
  localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
}

