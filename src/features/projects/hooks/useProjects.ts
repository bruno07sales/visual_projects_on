import { useCallback, useEffect, useState } from 'react';
import { projectsConfig } from '../../../config/projects';
import { readProjectCache, writeProjectCache } from '../../../storage/projectCache';
import { getLatestCommit, getRepository } from '../services/githubApi';
import type { Project } from '../types';
import { toProject } from '../utils/projectMappers';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(() => readProjectCache() ?? []);
  const [isLoading, setIsLoading] = useState(projects.length === 0);
  const [error, setError] = useState<string | null>(null);

  const loadProjects = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const loadedProjects = await Promise.all(
        projectsConfig.map(async (config) => {
          const [repository, commit] = await Promise.all([
            getRepository(config.owner, config.repository),
            getLatestCommit(config.owner, config.repository),
          ]);
          return toProject(config, repository, commit);
        }),
      );
      setProjects(loadedProjects);
      writeProjectCache(loadedProjects);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Não foi possível carregar os projetos.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadProjects();
  }, [loadProjects]);

  return { projects, isLoading, error, refresh: loadProjects };
}

