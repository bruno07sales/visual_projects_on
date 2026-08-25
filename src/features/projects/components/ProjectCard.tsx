import type { Project } from '../types';
import { ProgressBar } from './ProgressBar';
import { StatusBadge } from './StatusBadge';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex h-full flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">{project.name}</h2>
          <p className="mt-1 text-sm text-slate-600">{project.description}</p>
        </div>
        <StatusBadge status={project.status} />
      </div>
      <div className="flex flex-wrap gap-2">
        {project.technologies.map((technology) => (
          <span key={technology} className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-700">{technology}</span>
        ))}
      </div>
      <ProgressBar value={project.progress} />
      <dl className="grid grid-cols-2 gap-3 text-sm">
        <div><dt className="text-slate-500">Issues abertas</dt><dd className="font-medium">{project.openIssues}</dd></div>
        <div><dt className="text-slate-500">Prioridade</dt><dd className="font-medium capitalize">{project.priority}</dd></div>
      </dl>
      <p className="text-sm"><span className="text-slate-500">Próxima tarefa:</span> {project.nextTask}</p>
      <a className="mt-auto text-sm font-medium text-blue-700 hover:underline" href={project.repositoryUrl} target="_blank" rel="noreferrer">Ver código no GitHub</a>
    </article>
  );
}

