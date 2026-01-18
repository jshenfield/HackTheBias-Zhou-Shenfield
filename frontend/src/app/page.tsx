"use client";

import { useState } from "react";

import ProgressPipeline from "@/components/ProgressPipeline";
import OptionsPanel from "@/components/OptionsPanel";
import ResultPanel from "@/components/ResultState";

import {
  ifNoise,
  removeNameAndGeo,
  removeAllBias,
} from "@/lib/api/client";

import {
  AnonymizedResult,
  BiasFreeSummary,
} from "@/lib/api/types";
import ResultState from "@/components/ResultState";

type Mode = "partial" | "full";
type Step =
  | "idle"
  | "checking-noise"
  | "noise-failed"
  | "processing-bias"
  | "done";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [mode, setMode] = useState<Mode>("partial");
  const [step, setStep] = useState<Step>("idle");
  const [error, setError] = useState<string | null>(null);

  const [result, setResult] = useState<
    AnonymizedResult | BiasFreeSummary | null
  >(null);

  async function handleSubmit() {
    if (!file) return;

    setError(null);
    setResult(null);
    setStep("checking-noise");

    try {
      // 1️⃣ Resume detection
      const noiseResult = await ifNoise(file);

      if (!noiseResult.isResume) {
        setStep("noise-failed");
        return;
      }

      // 2️⃣ Bias handling
      setStep("processing-bias");

      const output =
        mode === "partial"
          ? await removeNameAndGeo(noiseResult.text)
          : await removeAllBias(noiseResult.text);

      setResult(output);
      setStep("done");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
      setStep("idle");
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <header className="flex flex-col items-center text-center gap-3 mb-10">
          <img
            src="/hushhire-logo.png"
            alt="HushHire logo"
            className="h-24"
          />
          <p className="text-neutral-600">
            Filter the noise. Silence the bias.
          </p>
        </header>

        {/* Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* LEFT: Controls */}
          <section className="rounded-2xl bg-white border shadow p-6 space-y-6">
            <ProgressPipeline step={step} />

            <input
              type="file"
              accept="application/pdf"
              onChange={(e) =>
                setFile(e.target.files?.[0] || null)
              }
              className="block w-full text-sm
            file:rounded-lg file:border
            file:px-4 file:py-2
            file:bg-neutral-900 file:text-white
            hover:file:bg-neutral-800"
            />

            <OptionsPanel
              mode={mode}
              setMode={setMode}
            />

            <button
              onClick={handleSubmit}
              disabled={
                !file ||
                step === "checking-noise" ||
                step === "processing-bias"
              }
              className="w-full rounded-xl bg-neutral-900 py-3
            text-white font-semibold hover:bg-neutral-800
            disabled:opacity-50"
            >
              Process Resume
            </button>

            {error && (
              <p className="text-sm text-red-600">
                {error}
              </p>
            )}
          </section>

          {/* RIGHT: Results */}
          <section className="rounded-2xl bg-white border shadow p-6 h-[60vh] overflow-hidden">
            <div className="h-full overflow-y-auto">
              <ResultState step={step} result={result} />
            </div>
          </section>
        </div>
      </div>
    </main>

  );
}
