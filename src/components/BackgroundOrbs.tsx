const BackgroundOrbs = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    <div
      className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[100px] animate-float-slow"
      style={{ background: `hsl(var(--glow-color) / 0.06)`, transition: 'background 500ms ease' }}
    />
    <div
      className="absolute bottom-[-15%] right-[-10%] w-[400px] h-[400px] rounded-full blur-[100px] animate-float"
      style={{ background: `hsl(var(--primary) / 0.05)`, transition: 'background 500ms ease' }}
    />
    <div
      className="absolute top-[40%] right-[20%] w-[300px] h-[300px] rounded-full blur-[80px] animate-pulse-soft"
      style={{ background: `hsl(var(--glow-color) / 0.04)`, transition: 'background 500ms ease' }}
    />
  </div>
);

export default BackgroundOrbs;
