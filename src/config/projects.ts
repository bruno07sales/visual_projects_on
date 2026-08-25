import type { ProjectConfig } from '../features/projects/types';

export const projectsConfig: ProjectConfig[] = [];

export function createDefaultProjectConfig(repository: string, owner: string): ProjectConfig {
  return {
    owner,
    repository,
    customName: '',
    progress: 0,
    status: 'planned',
    priority: 'low',
    nextTask: 'Definir próxima tarefa',
    deadline: null,
    featured: false,
    publishedUrl: null,
  };
}
