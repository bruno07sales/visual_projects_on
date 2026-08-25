import type { ProjectStatus } from '../types';

const statusPresentation: Record<ProjectStatus, { label: string; className: string }> = {
  planned: { label: 'Planejado', className: 'bg-slate-100 text-slate-700' },
  active: { label: 'Ativo', className: 'bg-emerald-100 text-emerald-700' },
  paused: { label: 'Pausado', className: 'bg-amber-100 text-amber-700' },
  completed: { label: 'Concluído', className: 'bg-blue-100 text-blue-700' },
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  const presentation = statusPresentation[status];
  return <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${presentation.className}`}>{presentation.label}</span>;
}

