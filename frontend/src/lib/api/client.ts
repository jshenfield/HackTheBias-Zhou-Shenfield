// lib/api/client.ts
// Frontend API client for HushHire
// Talks directly to FastAPI backend

import {
  NoiseResponse,
  AnonymizedResult,
  BiasFreeSummary,
} from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!;

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

function buildFormData(file: File): FormData {
  const formData = new FormData();
  formData.append("file", file);
  return formData;
}

async function handleJSON<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "API request failed");
  }
  return res.json();
}

/* ------------------------------------------------------------------ */
/* API 1: Noise Detection + Text Extraction                            */
/* POST /api/if-noise                                                  */
/* ------------------------------------------------------------------ */

export async function ifNoise(
  file: File
): Promise<NoiseResponse> {
  const res = await fetch(`${API_BASE}/api/if-noise`, {
    method: "POST",
    body: buildFormData(file),
  });

  return handleJSON<NoiseResponse>(res);
}

/* ------------------------------------------------------------------ */
/* API 2: Remove Name + Geo Bias                                       */
/* POST /api/remove-name-and-geo                                       */
/* ------------------------------------------------------------------ */

export async function removeNameAndGeo(
  text: string
): Promise<AnonymizedResult> {
  const res = await fetch(`${API_BASE}/api/remove-name-and-geo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  return handleJSON<AnonymizedResult>(res);
}

/* ------------------------------------------------------------------ */
/* API 3: Remove All Bias (Bias-Free Summary)                          */
/* POST /api/remove-all-bias                                           */
/* ------------------------------------------------------------------ */

export async function removeAllBias(
  text: string
): Promise<BiasFreeSummary> {
  const res = await fetch(`${API_BASE}/api/remove-all-bias`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  return handleJSON<BiasFreeSummary>(res);
}
