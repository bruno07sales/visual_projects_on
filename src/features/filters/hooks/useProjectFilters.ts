import { useEffect, useMemo, useState } from 'react';
import type { Project } from '../../projects/types';
import type { ProjectFilterValues } from '../types';
import { filterProjects } from '../utils/filterProjects';
import { readPreferences, writePreferences } from '../../../storage/preferencesStorage';

const initialFilters: ProjectFilterValues = { name: '', status: 'all', priority: 'all' };

export function useProjectFilters(projects: Project[]) {
  const [filters, setFilters] = useState(() => readPreferences() ?? initialFilters);
  const filteredProjects = useMemo(() => filterProjects(projects, filters), [projects, filters]);
  useEffect(() => writePreferences(filters), [filters]);
  return { filters, setFilters, filteredProjects, resetFilters: () => setFilters(initialFilters) };
}
