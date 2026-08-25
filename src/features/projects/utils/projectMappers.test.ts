import { describe, expect, it } from 'vitest';
import { githubRepositoryJson, projectConfig } from '../../../test/fixtures';
import { toProject } from './projectMappers';

describe('toProject', () => {
  it('combina a configuração manual com os dados externos', () => {
    expect(toProject(projectConfig, githubRepositoryJson, null, ['TypeScript', 'CSS'])).toMatchObject({
      name: 'Projeto visual', stars: 10, forks: 2,
      languages: ['TypeScript', 'CSS'], progress: 60,
    });
  });
});
