import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/app/components/SiteHeader';
import CategoryFilter from '@/app/components/projects/CategoryFilter';
import Pagination from '@/app/components/projects/Pagination';
import ProjectGrid from '@/app/components/projects/ProjectGrid';
import SearchInput from '@/app/components/projects/SearchInput';
import { parseProjectSearchParams } from '@/lib/projects/query';
import { getProjectRepository } from '@/lib/projects/repository';
import {
  getCategoryLabel,
  PROJECT_PAGE_SIZE,
} from '@/lib/projects/types';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Browse projects shared by creators in the hub.',
};

type ProjectsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ProjectsPage({
  searchParams,
}: ProjectsPageProps) {
  const rawSearchParams = await searchParams;
  const { search, category, page } = parseProjectSearchParams(rawSearchParams);

  const repository = await getProjectRepository();
  const result = await repository.getProjects({
    search,
    category,
    page,
    pageSize: PROJECT_PAGE_SIZE,
  });

  const resultLabel = [
    `${result.total} ${result.total === 1 ? 'project' : 'projects'}`,
    category !== 'all' ? `in ${getCategoryLabel(category)}` : '',
    search ? `matching “${search}”` : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-6xl px-6 py-6">
        <SiteHeader />

        <section className="py-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Projects
              </h1>
              <p className="mt-2 text-sm text-white/50">
                Browse work shared by creators in the hub.
              </p>
            </div>
            <p className="text-sm text-white/40" aria-live="polite">
              {resultLabel}
            </p>
          </div>

          <div className="mt-8 space-y-4">
            <SearchInput initialValue={search} />
            <CategoryFilter active={category} search={search} />
          </div>
        </section>

        <section aria-label="Project list">
          {result.items.length > 0 ? (
            <>
              <ProjectGrid projects={result.items} />
              <Pagination
                page={result.page}
                totalPages={result.totalPages}
                search={search}
                category={category}
              />
            </>
          ) : (
            <div className="rounded-2xl border border-dashed border-white/10 px-6 py-20 text-center">
              <h2 className="text-xl font-semibold text-white">
                No projects found
              </h2>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-white/50">
                Try a different search term or category, or browse everything
                again.
              </p>
              <Link
                href="/projects"
                className="mt-6 inline-flex rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/[0.08]"
              >
                Clear filters
              </Link>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
