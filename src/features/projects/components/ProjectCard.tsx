import type { Project } from '../types';
import { ProgressBar } from './ProgressBar';
import { StatusBadge } from './StatusBadge';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex h-full flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-semibold text-slate-900">{project.name}</h2>
            {project.featured && <span className="rounded-full bg-violet-100 px-2 py-0.5 text-xs font-medium text-violet-700">Destaque</span>}
          </div>
          <p className="mt-1 text-sm text-slate-600">{project.description}</p>
        </div>
        <StatusBadge status={project.status} />
      </div>
      <div className="flex flex-wrap gap-2">
        {project.languages.map((language) => (
          <span key={language} className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-700">{language}</span>
        ))}
      </div>
      <ProgressBar value={project.progress} />
      <dl className="grid grid-cols-2 gap-3 text-sm">
        <div><dt className="text-slate-500">Issues abertas</dt><dd className="font-medium">{project.openIssues}</dd></div>
        <div><dt className="text-slate-500">Prioridade</dt><dd className="font-medium capitalize">{project.priority}</dd></div>
        <div><dt className="text-slate-500">Estrelas</dt><dd className="font-medium">{project.stars}</dd></div>
        <div><dt className="text-slate-500">Forks</dt><dd className="font-medium">{project.forks}</dd></div>
        <div className="col-span-2">
          <dt className="text-slate-500">Prazo</dt>
          <dd className="font-medium">{project.deadline ? new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(new Date(project.deadline)) : 'Sem prazo'}</dd>
        </div>
      </dl>
      <p className="text-sm"><span className="text-slate-500">Próxima tarefa:</span> {project.nextTask}</p>
      <div className="mt-auto flex gap-4">
        <a className="text-sm font-medium text-blue-700 hover:underline" href={project.repositoryUrl} target="_blank" rel="noreferrer">Ver código</a>
        {project.publishedUrl && <a className="text-sm font-medium text-blue-700 hover:underline" href={project.publishedUrl} target="_blank" rel="noreferrer">Abrir projeto</a>}
      </div>
    </article>
  );
}
