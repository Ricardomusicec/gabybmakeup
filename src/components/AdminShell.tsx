import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";

const links = [
  { href: "/admin", label: "Resumen" },
  { href: "/admin/servicios", label: "Servicios" },
  { href: "/admin/citas", label: "Citas" },
  { href: "/admin/waitlist", label: "Lista de espera" },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-ivory">
      <header className="border-b border-ink/[0.06] bg-ivory/85 px-6 py-4 backdrop-blur-md sm:px-8">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Link href="/admin" className="flex items-baseline gap-1.5">
            <span className="font-serif text-xl font-medium tracking-tight text-wine">
              GabyB
            </span>
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink-soft">
              Admin
            </span>
          </Link>
          <LogoutButton />
        </div>
        <nav className="mx-auto mt-4 flex max-w-4xl gap-6 text-sm text-ink-soft">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="transition-colors hover:text-wine">
              {l.label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-4xl px-6 py-12 sm:px-8">{children}</main>
    </div>
  );
}
