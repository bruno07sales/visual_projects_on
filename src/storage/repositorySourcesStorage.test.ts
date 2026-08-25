import { describe, expect, it } from 'vitest';
import { parseGitHubSource } from './repositorySourcesStorage';

describe('parseGitHubSource', () => {
  it('converte o link comum de um repositório', () => {
    expect(parseGitHubSource('https://github.com/octocat/Hello-World')).toEqual({
      type: 'repository', owner: 'octocat', repository: 'Hello-World',
    });
  });

  it('converte o link comum de um perfil em fonte de conta', () => {
    expect(parseGitHubSource('https://github.com/octocat')).toEqual({
      type: 'account', owner: 'octocat',
    });
  });

  it('aceita a API de um repositório', () => {
    expect(parseGitHubSource('https://api.github.com/repos/octocat/Hello-World')).toEqual({
      type: 'repository', owner: 'octocat', repository: 'Hello-World',
    });
  });

  it('aceita a API de todos os repositórios públicos de uma conta', () => {
    expect(parseGitHubSource('https://api.github.com/users/octocat/repos')).toEqual({
      type: 'account', owner: 'octocat',
    });
  });

  it('recusa endereços externos e caminhos inválidos', () => {
    expect(parseGitHubSource('https://example.com/repos/a/b')).toBeNull();
    expect(parseGitHubSource('https://api.github.com/users/octocat')).toBeNull();
  });
});
