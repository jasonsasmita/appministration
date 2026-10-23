'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { ProjectImage } from '@/lib/projects/types';

export default function ProjectGallery({
  images,
  projectName,
}: {
  images: ProjectImage[];
  projectName: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = images[Math.min(activeIndex, images.length - 1)];

  if (!active) return null;

  return (
    <section aria-label={`${projectName} preview`}>
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
        <Image
          key={active.src}
          src={active.src}
          alt={active.alt}
          fill
          priority
          sizes="(min-width: 1024px) 66vw, 100vw"
          className="object-cover"
        />
      </div>

      {images.length > 1 ? (
        <ul className="mt-3 flex gap-3 overflow-x-auto pb-1">
          {images.map((image, index) => (
            <li key={image.src}>
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show image ${index + 1} of ${images.length}`}
                aria-pressed={index === activeIndex}
                className={`relative block aspect-video w-28 overflow-hidden rounded-lg border transition ${
                  index === activeIndex
                    ? 'border-indigo-400 ring-2 ring-indigo-400/30'
                    : 'border-white/10 opacity-60 hover:opacity-100'
                }`}
              >
                <Image
                  src={image.src}
                  alt=""
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
