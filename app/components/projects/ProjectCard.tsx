import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/lib/projects/types';

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default function ProjectCard({ project }: { project: Project }) {
  const cover = project.images[0];

  return (
    <Link
      href={`/${project.creator.username}/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition duration-300 hover:-translate-y-1 hover:border-indigo-400/40 hover:bg-white/[0.05]"
    >
      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-indigo-500/25 via-slate-950 to-cyan-500/20">
        {cover ? (
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-3xl font-semibold tracking-[0.3em] text-white/25">
            {getInitials(project.name)}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-5">
        <h2 className="text-lg font-semibold text-white">{project.name}</h2>
        <p className="text-sm text-white/50">
          by {project.creator.displayName}
        </p>
      </div>
    </Link>
  );
}
