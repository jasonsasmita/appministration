import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: {
    default: 'Appministration — A hub for shared projects',
    template: '%s — Appministration',
  },
  description:
    'A central hub for sharing, showcasing, and discovering projects made by creators.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} flex min-h-screen flex-col bg-[#05060f] text-white antialiased`}
      >
        <div className="flex flex-1 flex-col">{children}</div>
        <footer className="border-t border-white/5 py-4 text-center text-xs text-white/40">
          © 2026 Jason. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
