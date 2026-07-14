import Link from "next/link";
import PillarPalette from "@/components/PillarPalette";

const pillarSections = [
  {
    id: "marca",
    shade: "Presencia",
    dot: "#45162a",
    title: "Marca personal",
    body: "GabyBMakeUp no es un directorio de servicios: es la firma de una sola persona. Cada sesión, cada publicación y cada respuesta lleva tu forma de ver la belleza — la plataforma existe para amplificar eso, no para diluirlo entre un catálogo de proveedores.",
    cta: { label: "Conocer la historia", href: "#historia" },
    align: "left" as const,
  },
  {
    id: "comunidad",
    shade: "Complicidad",
    dot: "#d9a29d",
    title: "Comunidad de belleza",
    body: "Tus clientas no vuelven solo por el maquillaje: vuelven por cómo las hace sentir. Un espacio para compartir looks, hacer preguntas y ver el trabajo de otras — sin convertirse en otra red social genérica.",
    cta: { label: "Unirse a la lista de espera", href: "#club" },
    align: "right" as const,
  },
  {
    id: "academia",
    shade: "Maestría",
    dot: "#b1854a",
    title: "Academia",
    body: "Cursos cortos y mentorías guiadas por ti, para quienes quieren aprender técnica, no solo ver un resultado. Certificados con tu nombre, no genéricos.",
    cta: { label: "Ver próximos cursos", href: "#academia-detalle" },
    align: "left" as const,
  },
  {
    id: "agenda",
    shade: "Precisión",
    dot: "#7c5866",
    title: "Agenda inteligente",
    body: "Reservar una sesión debería sentirse tan cuidado como la sesión misma: disponibilidad real, recordatorios claros y cero mensajes cruzados de ida y vuelta.",
    cta: { label: "Reservar una sesión", href: "/reservar" },
    align: "right" as const,
  },
  {
    id: "marketplace",
    shade: "Curaduría",
    dot: "#e9c6c1",
    title: "Marketplace",
    body: "No es un bazar de mil marcas: es el set de productos que tú de verdad usas y recomiendas, con tu criterio como filtro.",
    cta: { label: "Explorar productos", href: "#marketplace-detalle" },
    align: "left" as const,
  },
  {
    id: "club",
    shade: "Pertenencia",
    dot: "#6b2138",
    title: "Beauty Club",
    body: "Un lugar para las clientas frecuentes: acceso anticipado a citas, precios preferentes y contenido exclusivo. Lealtad que se siente reconocida, no solo transaccional.",
    cta: { label: "Ver beneficios", href: "#beneficios" },
    align: "right" as const,
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-ink/[0.06] bg-ivory/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
          <a href="#top" className="flex items-baseline gap-1.5">
            <span className="font-serif text-xl font-medium tracking-tight text-wine">
              GabyB
            </span>
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink-soft">
              MakeUp
            </span>
          </a>
          <nav className="hidden items-center gap-7 text-sm text-ink-soft md:flex">
            <a href="#historia" className="transition-colors hover:text-wine">Historia</a>
            <a href="#academia" className="transition-colors hover:text-wine">Paleta</a>
            <a href="#club" className="transition-colors hover:text-wine">Beauty Club</a>
            <Link href="/cuenta" className="transition-colors hover:text-wine">Mi cuenta</Link>
          </nav>
          <a
            href="/reservar"
            className="rounded-full bg-wine px-5 py-2.5 text-sm font-medium text-ivory transition-colors hover:bg-wine-deep"
          >
            Reservar
          </a>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-6 pb-16 pt-14 sm:px-8 sm:pb-24 sm:pt-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div className="flex flex-col justify-center">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-gold">
                Maquillaje · Comunidad · Marca
              </span>
              <h1 className="mt-5 font-serif text-4xl leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl">
                Belleza con{" "}
                <em className="italic text-wine">nombre propio</em>.
              </h1>
              <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft sm:text-lg">
                GabyBMakeUp reúne tu trabajo, tu comunidad y tu forma de enseñar
                en un solo lugar — diseñado con el mismo cuidado que pones en
                cada rostro.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-5">
                <a
                  href="/reservar"
                  className="rounded-full bg-wine px-6 py-3 text-sm font-medium text-ivory transition-colors hover:bg-wine-deep"
                >
                  Reservar una sesión
                </a>
                <a
                  href="#academia"
                  className="text-sm font-medium text-ink underline decoration-blush-deep decoration-2 underline-offset-4 transition-colors hover:text-wine"
                >
                  Descubre la paleta
                </a>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <p className="mb-4 text-sm text-ink-soft">
                Seis tonos, un solo rostro. Así se ve GabyBMakeUp completo:
              </p>
              <PillarPalette />
            </div>
          </div>
        </section>

        {/* Brand story */}
        <section
          id="historia"
          className="border-y border-ink/[0.06] bg-ivory-deep/60"
        >
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-wine">
                Manifiesto
              </span>
            </div>
            <blockquote className="font-serif text-2xl leading-snug text-ink sm:text-3xl">
              &ldquo;No construimos una página de reservas. Construimos un lugar
              al que la gente quiere volver — a mirar, a aprender, a sentirse
              parte de algo.&rdquo;
              <footer className="mt-6 font-sans text-sm not-italic tracking-wide text-ink-soft">
                — Gaby B.
              </footer>
            </blockquote>
          </div>
        </section>

        {/* Pillar detail sections */}
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          {pillarSections.map((s) => (
            <section
              id={s.id}
              key={s.id}
              className={`flex flex-col gap-6 border-b border-ink/[0.06] py-14 sm:py-16 lg:flex-row lg:items-center lg:gap-16 ${
                s.align === "right" ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className="lg:w-1/2">
                <div className="flex items-center gap-2.5">
                  <span
                    aria-hidden
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: s.dot }}
                  />
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
                    {s.shade}
                  </span>
                </div>
                <h2 className="mt-3 font-serif text-3xl tracking-tight text-ink sm:text-4xl">
                  {s.title}
                </h2>
                <p className="mt-4 max-w-lg text-base leading-relaxed text-ink-soft">
                  {s.body}
                </p>
                <a
                  href={s.cta.href}
                  className="mt-5 inline-block text-sm font-medium text-wine underline decoration-2 underline-offset-4 transition-colors hover:text-wine-deep"
                >
                  {s.cta.label} &rarr;
                </a>
              </div>
              <div
                className="hidden h-40 flex-1 rounded-lg lg:block"
                style={{
                  background: `linear-gradient(135deg, ${s.dot}22, ${s.dot}55)`,
                }}
                aria-hidden
              />
            </section>
          ))}
        </div>

        {/* Beauty Club CTA banner */}
        <section className="bg-wine">
          <div className="mx-auto max-w-6xl px-6 py-16 text-center sm:px-8 sm:py-20">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-gold-soft">
              Pertenencia
            </span>
            <h2 className="mx-auto mt-4 max-w-xl font-serif text-3xl italic leading-tight text-ivory sm:text-4xl">
              El Beauty Club es para quienes ya son parte de la familia.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ivory/80">
              Acceso anticipado a citas, precios preferentes y contenido que
              no compartimos en ningún otro lugar.
            </p>
            <a
              href="#unirse"
              className="mt-7 inline-block rounded-full bg-ivory px-6 py-3 text-sm font-medium text-wine-deep transition-colors hover:bg-gold-soft"
            >
              Unirme al Beauty Club
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-ink/[0.06]">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <a href="#top" className="flex items-baseline gap-1.5">
            <span className="font-serif text-lg font-medium tracking-tight text-wine">
              GabyB
            </span>
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ink-soft">
              MakeUp
            </span>
          </a>
          <p className="text-xs text-ink-soft">
            © {new Date().getFullYear()} GabyBMakeUp. Belleza con nombre propio.
          </p>
        </div>
      </footer>
    </div>
  );
}
