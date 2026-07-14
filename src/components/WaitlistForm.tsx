"use client";

import { useState, type FormEvent } from "react";
import { joinWaitlist } from "@/app/actions/waitlist";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage(null);

    const result = await joinWaitlist(email);

    if (!result.success) {
      setStatus("error");
      setMessage(result.error ?? "Algo salió mal.");
      return;
    }

    setStatus("done");
    setMessage(
      result.alreadyJoined
        ? "Ya estabas en la lista — te avisamos apenas abramos."
        : "Listo. Te avisamos apenas abramos."
    );
  }

  if (status === "done") {
    return (
      <p className="font-serif text-lg italic text-wine" role="status">
        {message}
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md flex-col gap-3 sm:flex-row sm:gap-2"
    >
      <label className="sr-only" htmlFor="waitlist-email">
        Correo electrónico
      </label>
      <input
        id="waitlist-email"
        type="email"
        required
        placeholder="tu@correo.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 rounded-full border border-ink/15 bg-white px-5 py-3 text-sm text-ink outline-none transition-colors focus:border-wine"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-full bg-wine px-6 py-3 text-sm font-medium text-ivory transition-colors hover:bg-wine-deep disabled:opacity-60"
      >
        {status === "loading" ? "Enviando…" : "Avísenme"}
      </button>
      {status === "error" && (
        <p role="alert" className="text-sm text-wine-deep sm:absolute sm:mt-12">
          {message}
        </p>
      )}
    </form>
  );
}
