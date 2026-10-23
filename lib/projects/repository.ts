import type { CategorySlug, Project } from './types';

export type ProjectQuery = {
  search?: string;
  category?: CategorySlug | 'all';
  page?: number;
  pageSize?: number;
};

export type PaginatedResult<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export interface ProjectRepository {
  getProjects(query?: ProjectQuery): Promise<PaginatedResult<Project>>;
  getProject(creatorUsername: string, projectSlug: string): Promise<Project | null>;
}

/**
 * The app reads from local dummy data by default. Set PROJECTS_SOURCE=mongo
 * to switch to the MongoDB-backed implementation of the same interface.
 */
export async function getProjectRepository(): Promise<ProjectRepository> {
  if (process.env.PROJECTS_SOURCE === 'mongo') {
    const { mongoProjectRepository } = await import('./mongo-repository');
    return mongoProjectRepository;
  }

  const { dummyProjectRepository } = await import('./dummy-repository');
  return dummyProjectRepository;
}
