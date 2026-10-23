import Link from 'next/link';
import SiteHeader from '@/app/components/SiteHeader';

export default function ProjectNotFound() {
  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-6xl px-6 py-6">
        <SiteHeader />

        <div className="flex flex-col items-center justify-center py-32 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-indigo-300/70">
            404
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Project not found
          </h1>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/50">
            The project you are looking for may have moved, or the creator and
            project name do not match.
          </p>
          <Link
            href="/projects"
            className="mt-8 inline-flex rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/[0.08]"
          >
            Back to projects
          </Link>
        </div>
      </div>
    </main>
  );
}
