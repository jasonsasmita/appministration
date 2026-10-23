export const PROJECT_PAGE_SIZE = 9;

export const PROJECT_CATEGORIES = [
  { slug: 'web-app', label: 'Web App' },
  { slug: 'game', label: 'Game' },
  { slug: 'design', label: 'Design' },
  { slug: 'tools', label: 'Tools' },
  { slug: 'mobile', label: 'Mobile' },
  { slug: 'other', label: 'Other' },
] as const;

export type CategorySlug = (typeof PROJECT_CATEGORIES)[number]['slug'];

export type Creator = {
  username: string;
  displayName: string;
};

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Project = {
  slug: string;
  name: string;
  description: string;
  creator: Creator;
  category: CategorySlug;
  tags: string[];
  images: ProjectImage[];
  projectUrl?: string;
  downloadUrl?: string;
  downloadLabel?: string;
  createdAt: string;
  updatedAt?: string;
};

export function getCategoryLabel(slug: CategorySlug): string {
  return PROJECT_CATEGORIES.find((category) => category.slug === slug)?.label ?? slug;
}
