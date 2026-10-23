import type { Project } from '@/lib/projects/types';
import ProjectCard from './ProjectCard';

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard
          key={`${project.creator.username}/${project.slug}`}
          project={project}
        />
      ))}
    </div>
  );
}
