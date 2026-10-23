import Link from 'next/link';
import { buildProjectsHref } from '@/lib/projects/query';
import type { CategorySlug } from '@/lib/projects/types';

type PaginationProps = {
  page: number;
  totalPages: number;
  search: string;
  category: CategorySlug | 'all';
};

function getPageItems(
  page: number,
  totalPages: number,
): Array<number | 'ellipsis'> {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const items: Array<number | 'ellipsis'> = [1];
  const start = Math.max(2, page - 1);
  const end = Math.min(totalPages - 1, page + 1);

  if (start > 2) items.push('ellipsis');
  for (let current = start; current <= end; current += 1) {
    items.push(current);
  }
  if (end < totalPages - 1) items.push('ellipsis');
  items.push(totalPages);

  return items;
}

const baseItem =
  'inline-flex h-9 min-w-9 items-center justify-center rounded-lg border px-3 text-sm transition';

export default function Pagination({
  page,
  totalPages,
  search,
  category,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pageItems = getPageItems(page, totalPages);

  return (
    <nav
      aria-label="Project pagination"
      className="mt-10 flex flex-wrap items-center justify-center gap-2"
    >
      {page > 1 ? (
        <Link
          href={buildProjectsHref({ search, category, page: page - 1 })}
          className={`${baseItem} border-white/10 bg-white/[0.03] text-white/60 hover:border-white/20 hover:text-white`}
        >
          Previous
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className={`${baseItem} cursor-not-allowed border-white/5 bg-white/[0.01] text-white/25`}
        >
          Previous
        </span>
      )}

      {pageItems.map((item, index) =>
        item === 'ellipsis' ? (
          <span
            key={`ellipsis-${index}`}
            aria-hidden="true"
            className="px-2 text-sm text-white/30"
          >
            …
          </span>
        ) : (
          <Link
            key={item}
            href={buildProjectsHref({ search, category, page: item })}
            aria-current={item === page ? 'page' : undefined}
            className={`${baseItem} ${
              item === page
                ? 'border-indigo-400/50 bg-indigo-400/15 text-indigo-100'
                : 'border-white/10 bg-white/[0.03] text-white/60 hover:border-white/20 hover:text-white'
            }`}
          >
            {item}
          </Link>
        ),
      )}

      {page < totalPages ? (
        <Link
          href={buildProjectsHref({ search, category, page: page + 1 })}
          className={`${baseItem} border-white/10 bg-white/[0.03] text-white/60 hover:border-white/20 hover:text-white`}
        >
          Next
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className={`${baseItem} cursor-not-allowed border-white/5 bg-white/[0.01] text-white/25`}
        >
          Next
        </span>
      )}
    </nav>
  );
}
