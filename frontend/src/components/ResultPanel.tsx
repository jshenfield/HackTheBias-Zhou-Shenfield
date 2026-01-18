import {
  AnonymizedResult,
  BiasFreeSummary,
} from "@/lib/api/types";

type Result = AnonymizedResult | BiasFreeSummary | null;

export default function ResultPanel({
  result,
}: {
  result: Result;
}) {
  if (!result) return null;

  /* -------------------------------------------------- */
  /* Partial Bias Removal (Text Anonymization)          */
  /* -------------------------------------------------- */
  if ("anonymized_text" in result) {
    return (
      <div className="mt-6 rounded-xl border bg-neutral-50 p-5">
        <h3 className="font-semibold mb-3">
          Anonymized Resume Text
        </h3>

        <div className="mb-4 text-xs text-neutral-500">
          Removed:{" "}
          {Object.keys(result.replacements).join(", ")}
        </div>

        <pre className="whitespace-pre-wrap text-sm leading-relaxed">
          {result.anonymized_text}
        </pre>
      </div>
    );
  }

  /* -------------------------------------------------- */
  /* Full Bias Removal (Structured Summary)             */
  /* -------------------------------------------------- */
  if ("summary" in result) {
    const { skills, experience, impact } = result.summary;

    return (
      <div className="mt-6 space-y-5">
        <h3 className="font-semibold text-lg">
          Bias-Free Resume Summary
        </h3>

        {/* Skills */}
        <Section title="Skills">
          <BulletList items={skills} />
        </Section>

        {/* Experience */}
        <Section title="Experience">
          <BulletList items={experience} />
        </Section>

        {/* Impact */}
        <Section title="Impact">
          <BulletList items={impact} />
        </Section>

        {/* Bias Removed */}
        <div className="text-xs text-neutral-500 pt-2">
          Bias removed: {result.bias_removed.join(", ")}
        </div>
      </div>
    );
  }

  return null;
}

/* -------------------------------------------------- */
/* Small Helper Components                            */
/* -------------------------------------------------- */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border bg-white p-4">
      <h4 className="font-medium mb-2">{title}</h4>
      {children}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc pl-5 space-y-1 text-sm">
      {items.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ul>
  );
}
