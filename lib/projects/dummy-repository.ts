import { DUMMY_PROJECTS } from './dummy-data';
import type { ProjectRepository } from './repository';
import { PROJECT_PAGE_SIZE, type Project } from './types';

const sortedProjects = [...DUMMY_PROJECTS].sort(
  (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt),
);

export const dummyProjectRepository: ProjectRepository = {
  async getProjects(query = {}) {
    const pageSize = query.pageSize ?? PROJECT_PAGE_SIZE;
    const search = query.search?.trim().toLowerCase() ?? '';
    const category = query.category ?? 'all';

    const filtered = sortedProjects.filter((project) => {
      if (category !== 'all' && project.category !== category) return false;
      if (!search) return true;

      const haystack = [
        project.name,
        project.creator.displayName,
        project.creator.username,
        ...project.tags,
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(search);
    });

    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const page = Math.min(Math.max(1, query.page ?? 1), totalPages);
    const start = (page - 1) * pageSize;

    return {
      items: filtered.slice(start, start + pageSize),
      total,
      page,
      pageSize,
      totalPages,
    };
  },

  async getProject(
    creatorUsername: string,
    projectSlug: string,
  ): Promise<Project | null> {
    const creator = creatorUsername.toLowerCase();
    const slug = projectSlug.toLowerCase();

    return (
      sortedProjects.find(
        (project) =>
          project.creator.username.toLowerCase() === creator &&
          project.slug.toLowerCase() === slug,
      ) ?? null
    );
  },
};
