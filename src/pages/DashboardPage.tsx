import { Header } from '../components/layout/Header';
import { PageContainer } from '../components/layout/PageContainer';
import { ProjectFilters } from '../features/filters/components/ProjectFilters';
import { useProjectFilters } from '../features/filters/hooks/useProjectFilters';
import { DashboardSummary } from '../features/projects/components/DashboardSummary';
import { ProjectCard } from '../features/projects/components/ProjectCard';
import { useProjects } from '../features/projects/hooks/useProjects';

export function DashboardPage() {
  const { projects, isLoading, error } = useProjects();
  const { filters, setFilters, filteredProjects, resetFilters } = useProjectFilters(projects);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <PageContainer>
        <div className="space-y-6">
          <DashboardSummary projects={projects} />
          <ProjectFilters filters={filters} onChange={setFilters} onReset={resetFilters} />
          {isLoading && <p role="status">Carregando projetos...</p>}
          {error && <p role="alert" className="rounded-lg bg-red-50 p-4 text-red-700">{error}</p>}
          {!isLoading && !error && filteredProjects.length === 0 && <p>Nenhum projeto encontrado.</p>}
          <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3" aria-label="Projetos">
            {filteredProjects.map((project) => <ProjectCard key={`${project.owner}/${project.repository}`} project={project} />)}
          </section>
        </div>
      </PageContainer>
    </div>
  );
}

