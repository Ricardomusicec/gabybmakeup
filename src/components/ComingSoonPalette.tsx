const swatches = [
  { color: "#6b2138", size: 128, top: "6%", left: "18%", rotate: "-6deg", delay: "0s" },
  { color: "#d9a29d", size: 96, top: "42%", left: "2%", rotate: "8deg", delay: "0.6s" },
  { color: "#b1854a", size: 84, top: "4%", left: "56%", rotate: "3deg", delay: "1.1s" },
  { color: "#7c5866", size: 100, top: "50%", left: "62%", rotate: "-4deg", delay: "0.3s" },
  { color: "#e9c6c1", size: 72, top: "70%", left: "30%", rotate: "10deg", delay: "0.9s" },
  { color: "#45162a", size: 64, top: "18%", left: "80%", rotate: "-8deg", delay: "1.4s" },
];

export default function ComingSoonPalette() {
  return (
    <div
      aria-hidden
      className="relative mx-auto h-72 w-full max-w-sm sm:h-80 sm:max-w-md"
    >
      {swatches.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full shadow-[0_18px_30px_-14px_rgba(36,19,24,0.4)] motion-safe:animate-[float_7s_ease-in-out_infinite]"
          style={
            {
              backgroundColor: s.color,
              width: s.size,
              height: s.size,
              top: s.top,
              left: s.left,
              animationDelay: s.delay,
              "--rotate": s.rotate,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
