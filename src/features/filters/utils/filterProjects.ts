import type { Project } from '../../projects/types';
import type { ProjectFilterValues } from '../types';

export function filterProjects(projects: Project[], filters: ProjectFilterValues) {
  const normalizedName = filters.name.trim().toLocaleLowerCase('pt-BR');

  return projects.filter((project) => {
    const matchesName = project.name.toLocaleLowerCase('pt-BR').includes(normalizedName);
    const matchesStatus = filters.status === 'all' || project.status === filters.status;
    const matchesPriority = filters.priority === 'all' || project.priority === filters.priority;
    return matchesName && matchesStatus && matchesPriority;
  });
}

