export default function GalaxyBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="galaxy-nebula galaxy-nebula--indigo" />
      <div className="galaxy-nebula galaxy-nebula--cyan" />
      <div className="galaxy-nebula galaxy-nebula--violet" />
      <div className="galaxy-band" />
      <div className="galaxy-stars galaxy-stars--small" />
      <div className="galaxy-stars galaxy-stars--medium" />
      <div className="galaxy-stars galaxy-stars--large" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,6,15,0.55)_72%,#05060f_100%)]" />
    </div>
  );
}
