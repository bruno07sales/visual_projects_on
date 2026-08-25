import type { Project } from '../types';

export function DashboardSummary({ projects }: { projects: Project[] }) {
  const active = projects.filter((project) => project.status === 'active').length;
  const completed = projects.filter((project) => project.status === 'completed').length;

  return (
    <section className="grid gap-3 sm:grid-cols-3" aria-label="Resumo dos projetos">
      {[
        ['Total', projects.length],
        ['Ativos', active],
        ['Concluídos', completed],
      ].map(([label, value]) => (
        <div key={label} className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-sm text-slate-500">{label}</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
        </div>
      ))}
    </section>
  );
}

