// lib/api/client.ts
// Single source of truth for backend calls

import {
  NoiseResponse,
  AnonymizedResult,
  BiasFreeSummary,
} from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!;

/* ---------------- Helpers ---------------- */

async function handleJSON<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "API request failed");
  }
  return res.json();
}

/* ---------------- APIs ---------------- */

export async function ifNoise(
  file: File
): Promise<NoiseResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE}/api/if-noise`, {
    method: "POST",
    body: formData,
  });

  return handleJSON<NoiseResponse>(res);
}

export async function removeNameAndGeo(
  text: string
): Promise<AnonymizedResult> {
  const res = await fetch(
    `${API_BASE}/api/remove-name-and-geo`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    }
  );

  return handleJSON<AnonymizedResult>(res);
}

export async function removeAllBias(
  text: string
): Promise<BiasFreeSummary> {
  const res = await fetch(
    `${API_BASE}/api/remove-all-bias`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    }
  );

  return handleJSON<BiasFreeSummary>(res);
}
