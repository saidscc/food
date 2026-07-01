export function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div
        className="animate-aurora absolute -left-32 -top-32 h-[38rem] w-[38rem] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, oklch(0.78 0.15 165 / 0.35), transparent 70%)" }}
      />
      <div
        className="animate-aurora absolute -right-40 top-1/4 h-[34rem] w-[34rem] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, oklch(0.7 0.14 220 / 0.3), transparent 70%)", animationDelay: "-6s" }}
      />
      <div
        className="animate-aurora absolute bottom-0 left-1/3 h-[32rem] w-[32rem] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, oklch(0.82 0.13 85 / 0.22), transparent 70%)", animationDelay: "-12s" }}
      />
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.98 0.01 165 / 0.04) 1px, transparent 1px), linear-gradient(90deg, oklch(0.98 0.01 165 / 0.04) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
    </div>
  );
}
