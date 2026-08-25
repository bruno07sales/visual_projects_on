import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Header } from '../components/layout/Header';
import { PageContainer } from '../components/layout/PageContainer';
import { RepositorySources } from '../features/projects/components/RepositorySources';
import { DashboardPage } from '../pages/DashboardPage';

export function App() {
  const [tab, setTab] = useState<'dashboard' | 'repositories'>('dashboard');

  if (tab === 'dashboard') {
    return (
      <div>
        <nav className="fixed bottom-4 right-4 z-10"><Button onClick={() => setTab('repositories')}>Repositórios</Button></nav>
        <DashboardPage />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <PageContainer>
        <div className="mb-6 flex items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">Repositórios</h1>
          <Button onClick={() => setTab('dashboard')}>Voltar à dashboard</Button>
        </div>
        <RepositorySources />
      </PageContainer>
    </div>
  );
}
