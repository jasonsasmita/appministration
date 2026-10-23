import type { Project } from '@/lib/projects/types';

export default function ProjectActions({ project }: { project: Project }) {
  const hasProjectLink = Boolean(project.projectUrl);
  const hasDownload = Boolean(project.downloadUrl);

  return (
    <section
      aria-labelledby="resources-heading"
      className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
    >
      <h2
        id="resources-heading"
        className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45"
      >
        Resources
      </h2>

      {hasProjectLink || hasDownload ? (
        <div className="mt-4 flex flex-col gap-3">
          {hasProjectLink ? (
            <a
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400"
            >
              Go to project
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                className="h-3.5 w-3.5"
                fill="none"
              >
                <path
                  d="M5 11 11 5M6 5h5v5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          ) : null}

          {hasDownload ? (
            <a
              href={project.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/[0.08]"
            >
              Download
              {project.downloadLabel ? ` ${project.downloadLabel}` : ''}
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                className="h-3.5 w-3.5"
                fill="none"
              >
                <path
                  d="M8 2.5v7m0 0 2.5-2.5M8 9.5 5.5 7M3 11.5v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          ) : null}
        </div>
      ) : (
        <p className="mt-4 text-sm leading-relaxed text-white/45">
          Creator hasn&apos;t shared any project link or download yet.
        </p>
      )}
    </section>
  );
}
