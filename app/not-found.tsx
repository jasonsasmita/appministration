import Link from 'next/link';
import SiteHeader from './components/SiteHeader';

export default function NotFound() {
  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-6xl px-6 py-6">
        <SiteHeader />

        <div className="flex flex-col items-center justify-center py-32 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-indigo-300/70">
            404
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Page not found
          </h1>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/50">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/[0.08]"
          >
            Back home
          </Link>
        </div>
      </div>
    </main>
  );
}
