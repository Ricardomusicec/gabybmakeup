import ComingSoonPalette from "@/components/ComingSoonPalette";
import WaitlistForm from "@/components/WaitlistForm";

export default function ComingSoonPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ivory px-6 py-16 text-center sm:px-8">
      <span className="font-mono text-xs uppercase tracking-[0.25em] text-gold">
        Muy pronto
      </span>

      <h1 className="mt-5 max-w-lg font-serif text-4xl leading-[1.1] tracking-tight text-ink sm:text-5xl">
        Algo bueno está por <em className="italic text-wine">llegar</em>.
      </h1>

      <p className="mt-5 max-w-sm text-base leading-relaxed text-ink-soft">
        GabyBMakeUp se está preparando: una nueva forma de vivir la belleza,
        con nombre propio. Deja tu correo y sé de las primeras en saberlo.
      </p>

      <div className="mt-8">
        <ComingSoonPalette />
      </div>

      <div className="mt-8 w-full max-w-md">
        <WaitlistForm />
      </div>

      <div className="mt-14 flex items-baseline gap-1.5">
        <span className="font-serif text-lg font-medium tracking-tight text-wine">
          GabyB
        </span>
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ink-soft">
          MakeUp
        </span>
      </div>
    </div>
  );
}
