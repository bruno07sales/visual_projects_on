import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  githubCommitListJson,
  githubLanguagesJson,
  githubRepositoryJson,
  nonexistentRepositoryConfig,
} from '../../../test/fixtures';
import { getRepository, parseCommitListJson, parseLanguagesJson, parseRepositoryJson, parseRepositoryListJson } from './githubApi';

afterEach(() => vi.restoreAllMocks());

describe('JSON do GitHub', () => {
  it('aceita os JSONs esperados da API', () => {
    expect(parseRepositoryJson(githubRepositoryJson)).toEqual(githubRepositoryJson);
    expect(parseCommitListJson(githubCommitListJson)).toEqual(githubCommitListJson);
    expect(parseLanguagesJson(githubLanguagesJson)).toEqual(githubLanguagesJson);
    expect(parseRepositoryListJson([githubRepositoryJson])).toEqual([githubRepositoryJson]);
  });

  it('recusa JSON de repositório incompleto', () => {
    expect(() => parseRepositoryJson({ name: 'incompleto' })).toThrow('JSON de repositório inválido');
  });

  it('trata repositório inexistente somente no teste', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('{}', { status: 404 }));
    await expect(getRepository(nonexistentRepositoryConfig.owner, nonexistentRepositoryConfig.repository))
      .rejects.toThrow('GitHub API respondeu com status 404');
  });
});
