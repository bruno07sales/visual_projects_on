export type ProjectStatus = 'planned' | 'active' | 'paused' | 'completed';
export type ProjectPriority = 'low' | 'medium' | 'high';

export interface ProjectConfig {
  owner: string;
  repository: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  progress: number;
  nextTask: string;
  technologies: string[];
}

export interface GitHubRepository {
  name: string;
  description: string | null;
  html_url: string;
  updated_at: string;
  open_issues_count: number;
  language: string | null;
}

export interface GitHubCommit {
  sha: string;
  html_url: string;
  commit: {
    message: string;
    author: { date: string } | null;
  };
}

export interface Project extends ProjectConfig {
  name: string;
  description: string;
  repositoryUrl: string;
  updatedAt: string;
  openIssues: number;
  lastCommit: GitHubCommit | null;
}

