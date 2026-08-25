export type ProjectStatus = 'planned' | 'active' | 'paused' | 'completed';
export type ProjectPriority = 'low' | 'medium' | 'high';

export interface ProjectConfig {
  owner: string;
  repository: string;
  customName: string;
  progress: number;
  status: ProjectStatus;
  priority: ProjectPriority;
  nextTask: string;
  deadline: string | null;
  featured: boolean;
  publishedUrl: string | null;
}

/** Campos do JSON retornado por GET /repos/{owner}/{repo}. */
export interface GitHubRepositoryJson {
  name: string;
  owner: { login: string };
  description: string | null;
  html_url: string;
  updated_at: string;
  stargazers_count: number;
  forks_count: number;
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

/** JSON retornado por GET /repos/{owner}/{repo}/languages. */
export type GitHubLanguagesJson = Record<string, number>;

export interface GitHubProjectData {
  description: string;
  primaryLanguage: string | null;
  stars: number;
  forks: number;
  openIssues: number;
  lastCommit: GitHubCommit | null;
  updatedAt: string;
  repositoryUrl: string;
  languages: string[];
}

export interface Project extends ProjectConfig, GitHubProjectData {
  name: string;
}
