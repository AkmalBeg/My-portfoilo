// Site-wide animated background: drifting green glow, a slowly moving grid,
// and tiny particles floating upward. CSS only (no libraries), and it stops
// moving for users who have "reduce motion" turned on.

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  left: `${(i * 37) % 100}%`,
  size: 2 + (i % 3),
  duration: `${12 + (i % 5) * 3}s`,
  delay: `-${((i * 1.7) % 12).toFixed(1)}s`,
}));

export default function Background() {
  return (
    <div aria-hidden="true" className="fixed inset-0 z-[999] overflow-hidden bg-transparent pointer-events-none">
      <style>{`
        @keyframes bgFloatA {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%      { transform: translate(12vw, 8vh) scale(1.2); }
        }
        @keyframes bgFloatB {
          0%, 100% { transform: translate(0, 0) scale(1.1); }
          50%      { transform: translate(-10vw, 10vh) scale(0.92); }
        }
        @keyframes bgFloatC {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%      { transform: translate(9vw, -10vh) scale(1.25); }
        }
        @keyframes bgGrid {
          from { background-position: 0 0; }
          to   { background-position: 48px 48px; }
        }
        @keyframes bgRise {
          0%   { transform: translateY(0); opacity: 0; }
          15%  { opacity: 0.85; }
          85%  { opacity: 0.85; }
          100% { transform: translateY(-110vh); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .bg-anim { animation: none !important; }
        }
      `}</style>

      {/* Glow orbs */}
      <div
        className="bg-anim absolute -top-32 -left-32 w-[320px] h-[320px] sm:w-[520px] sm:h-[520px] rounded-full bg-[#A6FF5D]/25 blur-[100px] sm:blur-[130px]"
        style={{ animation: "bgFloatA 16s ease-in-out infinite" }}
      />
      <div
        className="bg-anim absolute top-1/3 -right-32 w-[300px] h-[300px] sm:w-[480px] sm:h-[480px] rounded-full bg-[#5DFFB0]/20 blur-[100px] sm:blur-[130px]"
        style={{ animation: "bgFloatB 20s ease-in-out infinite" }}
      />
      <div
        className="bg-anim absolute -bottom-32 left-1/4 w-[280px] h-[280px] sm:w-[440px] sm:h-[440px] rounded-full bg-[#A6FF5D]/15 blur-[100px] sm:blur-[130px]"
        style={{ animation: "bgFloatC 24s ease-in-out infinite" }}
      />

      {/* Slowly moving grid that fades out toward the edges */}
      <div
        className="bg-anim absolute inset-0 opacity-[0.09]"
        style={{
          backgroundImage:
            "linear-gradient(#A6FF5D 1px, transparent 1px), linear-gradient(90deg, #A6FF5D 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          animation: "bgGrid 6s linear infinite",
        }}
      />

      {/* Floating particles */}
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="bg-anim absolute -bottom-2 rounded-full bg-[#A6FF5D] opacity-0"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            boxShadow: "0 0 8px #A6FF5D",
            animation: `bgRise ${p.duration} linear ${p.delay} infinite`,
          }}
        />
      ))}
    </div>
  );
}
