"use client";

import { useState } from "react";

export default function CopyEmailsButton({ emails }: { emails: string[] }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(emails.join(", "));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleCopy}
      className="rounded-full border border-ink/15 px-4 py-2 text-xs font-medium text-ink transition-colors hover:border-wine hover:text-wine"
    >
      {copied ? "¡Copiado!" : "Copiar correos"}
    </button>
  );
}
