// lib/api/types.ts
// Shared API response types for HushHire frontend

/* ------------------------------------------------------------------ */
/* API 1: Noise Detection                                              */
/* ------------------------------------------------------------------ */

export interface NoiseResponse {
  /** Whether the document is classified as a resume */
  isResume: boolean;

  /** Model confidence score (0–1) */
  confidence: number;

  /** Extracted raw resume text (passed to next steps) */
  text: string;
}

/* ------------------------------------------------------------------ */
/* API 2: Remove Name + Geo Bias                                       */
/* ------------------------------------------------------------------ */

export interface AnonymizedResult {
  /** Resume text with name and location removed */
  anonymized_text: string;

  /** What was replaced and how */
  replacements: {
    name?: string;
    location?: string;
    [key: string]: string | undefined;
  };
}

/* ------------------------------------------------------------------ */
/* API 3: Remove All Bias (Summary)                                    */
/* ------------------------------------------------------------------ */

export interface BiasFreeSummary {
  summary: {
    skills: string[];
    experience: string[];
    impact: string[];
  };

  /** List of bias categories removed */
  bias_removed: string[];
}
