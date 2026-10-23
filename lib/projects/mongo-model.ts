import { model, models, Schema, type Model } from 'mongoose';
import {
  PROJECT_CATEGORIES,
  type CategorySlug,
  type ProjectImage,
} from './types';

/**
 * Persistence shape for future MongoDB support. It mirrors the domain
 * Project type, with Date values instead of ISO strings.
 */
export type ProjectRecord = {
  slug: string;
  name: string;
  description: string;
  creator: {
    username: string;
    displayName: string;
  };
  category: CategorySlug;
  tags: string[];
  images: ProjectImage[];
  projectUrl?: string;
  downloadUrl?: string;
  downloadLabel?: string;
  createdAt: Date;
  updatedAt?: Date;
};

const imageSchema = new Schema<ProjectImage>(
  {
    src: { type: String, required: true },
    alt: { type: String, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
  },
  { _id: false },
);

const projectSchema = new Schema<ProjectRecord>(
  {
    slug: { type: String, required: true, trim: true, lowercase: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    creator: {
      username: { type: String, required: true, trim: true, lowercase: true },
      displayName: { type: String, required: true, trim: true },
    },
    category: {
      type: String,
      enum: PROJECT_CATEGORIES.map((category) => category.slug),
      required: true,
    },
    tags: { type: [String], default: [] },
    images: { type: [imageSchema], default: [] },
    projectUrl: { type: String },
    downloadUrl: { type: String },
    downloadLabel: { type: String },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date },
  },
  { versionKey: false },
);

projectSchema.index({ 'creator.username': 1, slug: 1 }, { unique: true });
projectSchema.index({ category: 1, createdAt: -1 });
projectSchema.index({ name: 'text', description: 'text', tags: 'text' });

export const ProjectModel: Model<ProjectRecord> =
  (models.Project as Model<ProjectRecord> | undefined) ??
  model<ProjectRecord>('Project', projectSchema);
