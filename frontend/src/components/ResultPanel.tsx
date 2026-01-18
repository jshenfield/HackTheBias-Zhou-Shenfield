import {
  AnonymizedResult,
  BiasFreeSummary,
} from "@/lib/api/types";

type Result =
  | AnonymizedResult
  | BiasFreeSummary
  | null;

export default function ResultPanel({
  result,
}: {
  result: Result;
}) {
  if (!result) return null;

  return (
    <div className="h-full flex flex-col gap-6">
      <header className="border-b pb-3">
        <h2 className="text-xl font-semibold text-neutral-900">
          Bias-Reduced Resume
        </h2>
        <p className="text-sm text-neutral-500">
          Personal identifiers and prestige signals have been removed
        </p>
      </header>

      {/* Education */}
      <Section title="Education">
        {result.Education.length === 0 ? (
          <Empty label="No education provided" />
        ) : (
          <ul className="space-y-2 text-sm">
            {result.Education.map(
              (edu: any, idx: number) => (
                <li key={idx}>
                  <span className="font-medium">
                    {edu.degree ?? "Degree"}
                  </span>
                  {edu.field_of_study && (
                    <> — {edu.field_of_study}</>
                  )}
                  <div className="text-neutral-500">
                    {edu.institution ?? "Institution"}
                    {edu.GPA && <> • GPA: {edu.GPA}</>}
                  </div>
                </li>
              )
            )}
          </ul>
        )}
      </Section>

      {/* Work Experience */}
      <Section title="Work Experience">
        {result.WorkExperience.length === 0 ? (
          <Empty label="No work experience provided" />
        ) : (
          <div className="space-y-5">
            {result.WorkExperience.map(
              (role: any, idx: number) => (
                <div key={idx}>
                  <div className="font-medium">
                    {role.title ?? "Role"}
                  </div>
                  <div className="text-sm text-neutral-500 mb-1">
                    {role.organization ??
                      "Organization"}
                  </div>

                  <ul className="list-disc pl-5 text-sm space-y-1">
                    {role.responsibilities.map(
                      (r: string, i: number) => (
                        <li key={i}>{r}</li>
                      )
                    )}
                  </ul>
                </div>
              )
            )}
          </div>
        )}
      </Section>

      {/* Skills */}
      <Section title="Skills">
        {result.Skills.length === 0 ? (
          <Empty label="No skills listed" />
        ) : (
          <div className="flex flex-wrap gap-2">
            {result.Skills.map(
              (skill: string, idx: number) => (
                <span
                  key={idx}
                  className="rounded-full bg-neutral-100 px-3 py-1 text-sm"
                >
                  {skill}
                </span>
              )
            )}
          </div>
        )}
      </Section>

      {/* Certifications */}
      <Section title="Certifications">
        {result.Certifications.length === 0 ? (
          <Empty label="No certifications provided" />
        ) : (
          <ul className="list-disc pl-5 text-sm space-y-1">
            {result.Certifications.map(
              (cert: string, idx: number) => (
                <li key={idx}>{cert}</li>
              )
            )}
          </ul>
        )}
      </Section>

      {/* Metadata */}
      <footer className="mt-auto pt-4 border-t text-xs text-neutral-500">
        Years of experience:{" "}
        {result.YearsOfExperience ?? "n/a"}
      </footer>
    </div>
  );
}

/* -------------------------------------------------- */
/* Helper Components                                  */
/* -------------------------------------------------- */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border bg-white p-4">
      <h3 className="font-medium mb-3">
        {title}
      </h3>
      {children}
    </section>
  );
}

function Empty({ label }: { label: string }) {
  return (
    <p className="text-sm text-neutral-400 italic">
      {label}
    </p>
  );
}
