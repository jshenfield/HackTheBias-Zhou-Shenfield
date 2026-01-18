"use client";

import { useState } from "react";
import {
  ifNoise,
  removeNameAndGeo,
} from "@/lib/api/client";

import { AnonymizedResult } from "@/lib/api/types";

export default function TestRemoveNameAndGeoPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnonymizedResult | null>(null);

  async function handleTest() {
    if (!file) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // 1️⃣ Call if-noise
      const noiseResult = await ifNoise(file);

      if (!noiseResult.isResume) {
        setError("This document is classified as noise (not a resume).");
        setLoading(false);
        return;
      }

      // 2️⃣ Call remove-name-and-geo with extracted text
      const anonymized = await removeNameAndGeo(
        noiseResult.text
      );

      setResult(anonymized);
    } catch (err) {
      console.error(err);
      setError("Failed to process resume.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-neutral-50 flex items-center justify-center px-6">
      <div className="w-full max-w-3xl bg-white border rounded-xl p-6 shadow">
        <h1 className="text-2xl font-bold mb-4">
          Test: remove-name-and-geo
        </h1>

        {/* File upload */}
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) =>
            setFile(e.target.files?.[0] || null)
          }
          className="block w-full text-sm mb-4"
        />

        {/* Button */}
        <button
          onClick={handleTest}
          disabled={!file || loading}
          className="w-full bg-neutral-900 text-white py-2 rounded-lg
            hover:bg-neutral-800 disabled:opacity-50"
        >
          {loading
            ? "Processing..."
            : "Test remove-name-and-geo"}
        </button>

        {/* Error */}
        {error && (
          <p className="mt-4 text-sm text-red-600">
            {error}
          </p>
        )}

        {/* Result */}
        {result && (
          <div className="mt-6 space-y-4">
            <h2 className="font-semibold text-lg">
              Anonymized Output
            </h2>

            {/* Education */}
            <Section title="Education">
              <pre className="whitespace-pre-wrap text-sm">
                {JSON.stringify(result.Education, null, 2)}
              </pre>
            </Section>

            {/* Work Experience */}
            <Section title="Work Experience">
              <pre className="whitespace-pre-wrap text-sm">
                {JSON.stringify(
                  result.WorkExperience,
                  null,
                  2
                )}
              </pre>
            </Section>

            {/* Skills */}
            <Section title="Skills">
              <pre className="whitespace-pre-wrap text-sm">
                {JSON.stringify(result.Skills, null, 2)}
              </pre>
            </Section>
          </div>
        )}
      </div>
    </main>
  );
}

/* ---------------- Helper ---------------- */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border bg-neutral-50 p-4">
      <h3 className="font-medium mb-2">{title}</h3>
      {children}
    </div>
  );
}
