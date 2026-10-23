'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function SearchInput({
  initialValue,
}: {
  initialValue: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(initialValue);
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);
  const queryString = searchParams.toString();

  useEffect(() => {
    if (document.activeElement !== inputRef.current) {
      setValue(initialValue);
    }
  }, [initialValue]);

  useEffect(() => {
    if (value.trim() === initialValue.trim()) return;

    const timeout = window.setTimeout(() => {
      const params = new URLSearchParams(queryString);
      const search = value.trim();

      if (search) {
        params.set('q', search);
      } else {
        params.delete('q');
      }
      params.delete('page');

      const nextQuery = params.toString();
      startTransition(() => {
        router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, {
          scroll: false,
        });
      });
    }, 300);

    return () => window.clearTimeout(timeout);
  }, [value, initialValue, pathname, queryString, router]);

  return (
    <div className="relative flex-1">
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40"
      >
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="m16.5 16.5 3.5 3.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>

      <input
        ref={inputRef}
        type="search"
        name="q"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search projects, creators, or tags..."
        aria-label="Search projects"
        className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3 pl-11 pr-12 text-sm text-white placeholder:text-white/35 transition focus:border-indigo-400/50 focus:bg-white/[0.06] focus:outline-none"
      />

      {value && !isPending ? (
        <button
          type="button"
          onClick={() => {
            setValue('');
            inputRef.current?.focus();
          }}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-white/40 transition hover:bg-white/10 hover:text-white"
        >
          <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4">
            <path
              d="m4 4 8 8M12 4l-8 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      ) : null}

      {isPending ? (
        <span
          aria-hidden="true"
          className="absolute right-4 top-1/2 h-2 w-2 -translate-y-1/2 animate-pulse rounded-full bg-indigo-300"
        />
      ) : null}
    </div>
  );
}
