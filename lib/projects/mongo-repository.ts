import { connectToDB } from '@/app/mongoose';
import { ProjectModel, type ProjectRecord } from './mongo-model';
import type { ProjectRepository } from './repository';
import {
  PROJECT_PAGE_SIZE,
  type CategorySlug,
  type Project,
} from './types';

function toProject(record: ProjectRecord): Project {
  return {
    slug: record.slug,
    name: record.name,
    description: record.description,
    creator: {
      username: record.creator.username,
      displayName: record.creator.displayName,
    },
    category: record.category,
    tags: record.tags,
    images: record.images,
    projectUrl: record.projectUrl,
    downloadUrl: record.downloadUrl,
    downloadLabel: record.downloadLabel,
    createdAt: new Date(record.createdAt).toISOString(),
    updatedAt: record.updatedAt
      ? new Date(record.updatedAt).toISOString()
      : undefined,
  };
}

/**
 * Not active yet. Enable with PROJECTS_SOURCE=mongo after seeding the
 * collection through ProjectModel.
 */
export const mongoProjectRepository: ProjectRepository = {
  async getProjects(query = {}) {
    await connectToDB();

    const pageSize = query.pageSize ?? PROJECT_PAGE_SIZE;
    const filter: {
      category?: CategorySlug;
      $text?: { $search: string };
    } = {};

    if (query.category && query.category !== 'all') {
      filter.category = query.category;
    }
    if (query.search?.trim()) {
      filter.$text = { $search: query.search.trim() };
    }

    const total = await ProjectModel.countDocuments(filter).exec();
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const page = Math.min(Math.max(1, query.page ?? 1), totalPages);

    const records = await ProjectModel.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .lean()
      .exec();

    return {
      items: records.map((record) =>
        toProject(record as unknown as ProjectRecord),
      ),
      total,
      page,
      pageSize,
      totalPages,
    };
  },

  async getProject(creatorUsername, projectSlug) {
    await connectToDB();

    const record = await ProjectModel.findOne({
      'creator.username': creatorUsername.toLowerCase(),
      slug: projectSlug.toLowerCase(),
    })
      .lean()
      .exec();

    return record ? toProject(record as unknown as ProjectRecord) : null;
  },
};
