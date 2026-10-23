import { PROJECT_CATEGORIES, type CategorySlug } from './types';

export type RawSearchParams = Record<string, string | string[] | undefined>;

export type ProjectSearchState = {
  search: string;
  category: CategorySlug | 'all';
  page: number;
};

const firstValue = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export function parseProjectSearchParams(
  raw: RawSearchParams,
): ProjectSearchState {
  const search = firstValue(raw.q)?.trim() ?? '';
  const rawCategory = firstValue(raw.category);
  const category = PROJECT_CATEGORIES.some(
    (item) => item.slug === rawCategory,
  )
    ? (rawCategory as CategorySlug)
    : 'all';
  const parsedPage = Number.parseInt(firstValue(raw.page) ?? '1', 10);
  const page = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  return { search, category, page };
}

export function buildProjectsHref({
  search,
  category,
  page,
}: {
  search?: string;
  category?: CategorySlug | 'all';
  page?: number;
}): string {
  const params = new URLSearchParams();

  if (search?.trim()) params.set('q', search.trim());
  if (category && category !== 'all') params.set('category', category);
  if (page && page > 1) params.set('page', String(page));

  const query = params.toString();
  return query ? `/projects?${query}` : '/projects';
}
