import Link from 'next/link';
import Navigation from './Navigation';

export default function SiteHeader() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 py-4">
      <Link
        href="/"
        className="text-lg font-bold tracking-tight text-white transition hover:text-indigo-200"
      >
        Appministration
      </Link>
      <Navigation />
    </header>
  );
}
