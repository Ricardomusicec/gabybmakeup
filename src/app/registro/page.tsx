"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function RegistroPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });

    setLoading(false);

    if (error) {
      setError(
        error.message.includes("already registered")
          ? "Ese correo ya tiene una cuenta. Intenta iniciar sesión."
          : "No pudimos crear tu cuenta. Intenta de nuevo."
      );
      return;
    }

    setSent(true);
  }

  if (sent) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ivory px-6 py-16">
        <div className="w-full max-w-sm text-center">
          <h1 className="font-serif text-2xl tracking-tight text-ink">
            Revisa tu correo
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            Te enviamos un enlace de confirmación a <strong>{email}</strong>.
            Confírmalo para activar tu cuenta.
          </p>
          <Link
            href="/login"
            className="mt-6 inline-block text-sm font-medium text-wine underline underline-offset-4"
          >
            Ir a iniciar sesión
          </Link>
        </div>
      </div>
    );
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
          Crea tu cuenta
        </h1>
        <p className="mt-2 text-sm text-ink-soft">
          Para reservar sesiones y ser parte del Beauty Club.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-ink">Nombre completo</span>
            <input
              type="text"
              required
              autoComplete="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="rounded-md border border-ink/15 bg-white px-3.5 py-2.5 text-ink outline-none transition-colors focus:border-wine"
              placeholder="Tu nombre"
            />
          </label>

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
              minLength={6}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-md border border-ink/15 bg-white px-3.5 py-2.5 text-ink outline-none transition-colors focus:border-wine"
              placeholder="Mínimo 6 caracteres"
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
            {loading ? "Creando cuenta…" : "Crear cuenta"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-soft">
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="font-medium text-wine underline underline-offset-4">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
