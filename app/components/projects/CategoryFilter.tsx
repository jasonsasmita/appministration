import Link from 'next/link';
import { buildProjectsHref } from '@/lib/projects/query';
import {
  PROJECT_CATEGORIES,
  type CategorySlug,
} from '@/lib/projects/types';

const items = [
  { slug: 'all' as const, label: 'All' },
  ...PROJECT_CATEGORIES,
];

export default function CategoryFilter({
  active,
  search,
}: {
  active: CategorySlug | 'all';
  search: string;
}) {
  return (
    <nav aria-label="Filter by category">
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => {
          const isActive = item.slug === active;

          return (
            <li key={item.slug}>
              <Link
                href={buildProjectsHref({ search, category: item.slug })}
                aria-current={isActive ? 'page' : undefined}
                className={`inline-flex rounded-full border px-4 py-2 text-sm transition ${
                  isActive
                    ? 'border-indigo-400/50 bg-indigo-400/15 text-indigo-100'
                    : 'border-white/10 bg-white/[0.03] text-white/60 hover:border-white/20 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
