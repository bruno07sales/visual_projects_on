import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import type { ProjectFilterValues } from '../types';

interface ProjectFiltersProps {
  filters: ProjectFilterValues;
  onChange: (filters: ProjectFilterValues) => void;
  onReset: () => void;
}

export function ProjectFilters({ filters, onChange, onReset }: ProjectFiltersProps) {
  return (
    <section className="grid gap-3 rounded-lg border border-slate-200 bg-white p-4 md:grid-cols-[2fr_1fr_1fr_auto]" aria-label="Filtros">
      <Input aria-label="Nome do projeto" placeholder="Buscar por nome" value={filters.name} onChange={(event) => onChange({ ...filters, name: event.target.value })} />
      <Select aria-label="Status" value={filters.status} onChange={(event) => onChange({ ...filters, status: event.target.value as ProjectFilterValues['status'] })}>
        <option value="all">Todos os status</option><option value="planned">Planejados</option><option value="active">Ativos</option><option value="paused">Pausados</option><option value="completed">Concluídos</option>
      </Select>
      <Select aria-label="Prioridade" value={filters.priority} onChange={(event) => onChange({ ...filters, priority: event.target.value as ProjectFilterValues['priority'] })}>
        <option value="all">Todas as prioridades</option><option value="high">Alta</option><option value="medium">Média</option><option value="low">Baixa</option>
      </Select>
      <Button onClick={onReset}>Limpar</Button>
    </section>
  );
}

