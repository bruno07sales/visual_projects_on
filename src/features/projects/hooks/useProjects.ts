import { useCallback, useEffect, useState } from 'react';
import { createDefaultProjectConfig, projectsConfig } from '../../../config/projects';
import { readProjectCache, writeProjectCache } from '../../../storage/projectCache';
import { readRepositorySources } from '../../../storage/repositorySourcesStorage';
import { getLanguages, getLatestCommit, getPublicRepositories, getRepository } from '../services/githubApi';
import type { Project } from '../types';
import { toProject } from '../utils/projectMappers';

export function useProjects() {
  const cachedProjects = readProjectCache();
  const [projects, setProjects] = useState<Project[]>(cachedProjects ?? []);
  const [isLoading, setIsLoading] = useState(cachedProjects === null);
  const [error, setError] = useState<string | null>(null);

  const loadProjects = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const sourceResults = await Promise.all(readRepositorySources().map((source) => (
        source.type === 'account'
          ? getPublicRepositories(source.owner)
          : getRepository(source.owner, source.repository).then((repository) => [repository])
      )));
      const repositories = sourceResults.flat().filter(
        (repository, index, items) => items.findIndex((item) => item.html_url === repository.html_url) === index,
      );
      const loadedProjects = await Promise.all(
        repositories.map(async (repository) => {
          const owner = repository.owner.login;
          const config = projectsConfig.find((item) => item.owner === owner && item.repository === repository.name)
            ?? createDefaultProjectConfig(repository.name, owner);
          const [commit, languages] = await Promise.all([
            getLatestCommit(config.owner, config.repository),
            getLanguages(config.owner, config.repository),
          ]);
          return toProject(config, repository, commit, languages);
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
    if (cachedProjects === null) void loadProjects();
    // O cache só é consultado na inicialização deste hook.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadProjects]);

  return { projects, isLoading, error, refresh: loadProjects };
}
