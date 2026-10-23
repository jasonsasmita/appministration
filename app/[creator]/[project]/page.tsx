import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import SiteHeader from '@/app/components/SiteHeader';
import ProjectActions from '@/app/components/projects/ProjectActions';
import ProjectGallery from '@/app/components/projects/ProjectGallery';
import { getProjectRepository } from '@/lib/projects/repository';
import { getCategoryLabel } from '@/lib/projects/types';

const loadProject = cache(async (creator: string, project: string) => {
  const repository = await getProjectRepository();
  return repository.getProject(creator, project);
});

type ProjectPageProps = {
  params: Promise<{ creator: string; project: string }>;
};

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { creator, project } = await params;
  const found = await loadProject(creator, project);

  if (!found) return { title: 'Project not found' };

  return {
    title: `${found.name} by ${found.creator.displayName}`,
    description: found.description.split('\n')[0],
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { creator, project: projectSlug } = await params;
  const project = await loadProject(creator, projectSlug);

  if (!project) notFound();

  const createdAt = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(project.createdAt));

  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-6xl px-6 py-6">
        <SiteHeader />

        <div className="py-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-white"
          >
            <span aria-hidden="true">←</span>
            All projects
          </Link>

          <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-8">
              {project.images.length > 0 ? (
                <ProjectGallery
                  images={project.images}
                  projectName={project.name}
                />
              ) : null}

              <article>
                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {project.name}
                </h1>

                <p className="mt-2 text-white/60">
                  by{' '}
                  <span className="font-medium text-white">
                    {project.creator.displayName}
                  </span>{' '}
                  <span className="text-white/35">
                    @{project.creator.username}
                  </span>
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-full border border-indigo-400/30 bg-indigo-400/10 px-3 py-1 text-xs font-medium text-indigo-200">
                    {getCategoryLabel(project.category)}
                  </span>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/60"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <p className="mt-4 text-sm text-white/40">
                  Created{' '}
                  <time dateTime={project.createdAt}>{createdAt}</time>
                </p>

                <div className="mt-6 whitespace-pre-line text-base leading-7 text-white/65">
                  {project.description}
                </div>
              </article>
            </div>

            <aside className="lg:sticky lg:top-6 lg:h-fit">
              <ProjectActions project={project} />
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
