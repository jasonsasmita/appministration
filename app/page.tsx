import GalaxyBackground from './components/GalaxyBackground';
import Navigation from './components/Navigation';

export default function Home() {
  return (
    <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6 py-20 text-center">
      <GalaxyBackground />

      <div className="relative z-10 flex max-w-2xl flex-col items-center">
        <h1 className="bg-gradient-to-b from-white via-white to-white/55 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl lg:text-7xl">
          Appministration
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-white/60 lg:text-lg">
          A shared hub for makers to publish, showcase, and hand off their
          projects.
        </p>
        <div className="mt-10">
          <Navigation />
        </div>
      </div>
    </main>
  );
}
