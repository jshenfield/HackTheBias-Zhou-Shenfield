"use client";

import { useState } from "react";
import ProgressPipeline from "@/components/ProgressPipeline";
import OptionsPanel from "@/components/OptionsPanel";
import ResultPanel from "@/components/ResultPanel";

import {
  ifNoise,
  removeNameAndGeo,
  removeAllBias,
} from "@/lib/api/client";

import {
  AnonymizedResult,
  BiasFreeSummary,
} from "@/lib/api/types";

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
  const [filterNoise, setFilterNoise] = useState(true);
  const [step, setStep] = useState<Step>("idle");

  const [result, setResult] = useState<
    AnonymizedResult | BiasFreeSummary | null
  >(null);

  async function handleSubmit() {
    if (!file) return;

    setResult(null);
    setStep("checking-noise");

    try {
      // 1️⃣ Noise detection + text extraction
      const noise = await ifNoise(file);

      if (filterNoise && !noise.isResume) {
        setStep("noise-failed");
        return;
      }

      // 2️⃣ Bias removal
      setStep("processing-bias");

      if (mode === "partial") {
        const anonymized = await removeNameAndGeo(noise.text);
        setResult(anonymized);
      } else {
        const summary = await removeAllBias(noise.text);
        setResult(summary);
      }

      setStep("done");
    } catch (err) {
      console.error(err);
      setStep("idle");
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center px-6">
      <div className="w-full max-w-3xl rounded-2xl bg-white shadow-lg border p-8">
        {/* Header */}
        <div className="flex items-center gap-3">
          <img
            src="/a.png"
            alt="HushHire logo"
            className="h-10 w-10"
          />
          <div>
            <h1 className="text-4xl font-bold leading-tight">
              HushHire
            </h1>
            <p className="text-neutral-600">
              Filter the noise. Silence the bias.
            </p>
          </div>
        </div>

        {/* Progress (always visible) */}
        <div className="mt-8">
          <ProgressPipeline step={step} />
        </div>

        {/* Upload */}
        <div className="mt-8">
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
        </div>

        {/* Options */}
        <div className="mt-6">
          <OptionsPanel
            filterNoise={filterNoise}
            setFilterNoise={setFilterNoise}
            mode={mode}
            setMode={setMode}
          />
        </div>

        {/* CTA */}
        <button
          onClick={handleSubmit}
          disabled={
            !file ||
            step === "checking-noise" ||
            step === "processing-bias"
          }
          className="mt-8 w-full rounded-xl bg-neutral-900 py-3
            text-white font-semibold hover:bg-neutral-800
            disabled:opacity-50"
        >
          Process Resume
        </button>

        {/* Results */}
        <ResultPanel result={result} />
      </div>
    </main>
  );
}
