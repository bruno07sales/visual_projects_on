import { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import {
  parseGitHubSource,
  readRepositorySources,
  sourceApiUrl,
  sourceKey,
  writeRepositorySources,
  type RepositorySource,
} from '../../../storage/repositorySourcesStorage';

export function RepositorySources() {
  const [apiUrl, setApiUrl] = useState('');
  const [sources, setSources] = useState(readRepositorySources);
  const [error, setError] = useState<string | null>(null);

  function addSource() {
    const source = parseGitHubSource(apiUrl);
    if (!source) {
      setError('Informe um link válido de perfil ou repositório do GitHub.');
      return;
    }
    if (sources.some((item) => sourceKey(item) === sourceKey(source))) {
      setError('Esta fonte já foi adicionada.');
      return;
    }
    const nextSources = [...sources, source];
    setSources(nextSources);
    writeRepositorySources(nextSources);
    setApiUrl('');
    setError(null);
  }

  function removeSource(source: RepositorySource) {
    const nextSources = sources.filter((item) => sourceKey(item) !== sourceKey(source));
    setSources(nextSources);
    writeRepositorySources(nextSources);
  }

  return (
    <section className="space-y-5 rounded-xl border border-slate-200 bg-white p-5">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Adicionar link do GitHub</h2>
        <p className="mt-1 text-sm text-slate-600">Cole o link de um perfil ou repositório. A API correspondente será encontrada automaticamente.</p>
      </div>
      <div className="rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
        <p><code>https://github.com/proprietario/repositorio</code></p>
        <p className="mt-1"><code>https://github.com/usuario</code></p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input aria-label="Link do GitHub" placeholder="Cole o link do GitHub" value={apiUrl}
          onChange={(event) => setApiUrl(event.target.value)}
          onKeyDown={(event) => { if (event.key === 'Enter') addSource(); }} />
        <Button onClick={addSource}>Adicionar</Button>
      </div>
      {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
      {sources.length === 0 ? (
        <p className="text-sm text-slate-500">Nenhuma fonte cadastrada. A dashboard não exibirá repositórios.</p>
      ) : (
        <ul className="divide-y divide-slate-200">
          {sources.map((source) => (
            <li key={sourceKey(source)} className="flex items-center justify-between gap-4 py-3">
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{source.type === 'account' ? 'Conta pública' : 'Repositório'}</p>
                <code className="block overflow-hidden text-ellipsis text-sm">{sourceApiUrl(source)}</code>
              </div>
              <Button className="shrink-0 bg-red-700 hover:bg-red-600" onClick={() => removeSource(source)}>Remover</Button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
