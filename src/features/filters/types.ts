import type { ProjectPriority, ProjectStatus } from '../projects/types';

export interface ProjectFilterValues {
  name: string;
  status: ProjectStatus | 'all';
  priority: ProjectPriority | 'all';
}

