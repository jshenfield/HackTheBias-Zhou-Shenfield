"use client";

import { useState } from "react";

export default function TestIfNoisePage() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleTest() {
    if (!file) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/if-noise`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        throw new Error("Request failed");
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError("Failed to call backend");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-neutral-50 flex items-center justify-center px-6">
      <div className="w-full max-w-xl bg-white border rounded-xl p-6 shadow">
        <h1 className="text-2xl font-bold mb-4">
          Test /api/if-noise
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
          {loading ? "Testing..." : "Test if-noise API"}
        </button>

        {/* Error */}
        {error && (
          <p className="mt-4 text-sm text-red-600">
            {error}
          </p>
        )}

        {/* Result */}
        {result && (
          <div className="mt-4 rounded-lg bg-neutral-100 p-4 text-sm">
            <pre className="whitespace-pre-wrap">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </main>
  );
}
