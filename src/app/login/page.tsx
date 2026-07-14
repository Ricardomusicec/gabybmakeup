"use client";

import { Suspense, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (error) {
      setError("Correo o contraseña incorrectos.");
      return;
    }

    router.replace(searchParams.get("next") ?? "/cuenta");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ivory px-6 py-16">
      <div className="w-full max-w-sm">
        <Link href="/" className="flex items-baseline gap-1.5">
          <span className="font-serif text-xl font-medium tracking-tight text-wine">
            GabyB
          </span>
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink-soft">
            MakeUp
          </span>
        </Link>

        <h1 className="mt-8 font-serif text-3xl tracking-tight text-ink">
          Bienvenida de vuelta
        </h1>
        <p className="mt-2 text-sm text-ink-soft">
          Ingresa para ver tu agenda y tus beneficios.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-ink">Correo</span>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-md border border-ink/15 bg-white px-3.5 py-2.5 text-ink outline-none transition-colors focus:border-wine"
              placeholder="tu@correo.com"
            />
          </label>

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-ink">Contraseña</span>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-md border border-ink/15 bg-white px-3.5 py-2.5 text-ink outline-none transition-colors focus:border-wine"
              placeholder="••••••••"
            />
          </label>

          {error && (
            <p role="alert" className="text-sm text-wine-deep">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-full bg-wine px-6 py-3 text-sm font-medium text-ivory transition-colors hover:bg-wine-deep disabled:opacity-60"
          >
            {loading ? "Ingresando…" : "Iniciar sesión"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-soft">
          ¿Aún no tienes cuenta?{" "}
          <Link href="/registro" className="font-medium text-wine underline underline-offset-4">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}
