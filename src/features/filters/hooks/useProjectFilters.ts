import { useMemo, useState } from 'react';
import type { Project } from '../../projects/types';
import type { ProjectFilterValues } from '../types';
import { filterProjects } from '../utils/filterProjects';

const initialFilters: ProjectFilterValues = { name: '', status: 'all', priority: 'all' };

export function useProjectFilters(projects: Project[]) {
  const [filters, setFilters] = useState(initialFilters);
  const filteredProjects = useMemo(() => filterProjects(projects, filters), [projects, filters]);
  return { filters, setFilters, filteredProjects, resetFilters: () => setFilters(initialFilters) };
}

