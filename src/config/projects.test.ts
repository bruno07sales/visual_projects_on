import { describe, expect, it } from 'vitest';
import { nonexistentRepositoryConfig } from '../test/fixtures';
import { createDefaultProjectConfig, projectsConfig } from './projects';

describe('projectsConfig', () => {
  it('não contém repositórios fixos', () => {
    expect(projectsConfig).toEqual([]);
  });

  it('cria dados manuais padrão para repositórios públicos sem configuração', () => {
    expect(createDefaultProjectConfig('novo-repositorio', 'usuario')).toMatchObject({
      owner: 'usuario', repository: 'novo-repositorio', status: 'planned', deadline: null,
      publishedUrl: null,
    });
  });

  it('não inclui o repositório inexistente na configuração de produção', () => {
    expect(projectsConfig).not.toContainEqual(nonexistentRepositoryConfig);
  });
});
