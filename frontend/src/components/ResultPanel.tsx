export default function ResultPanel({
  downloadUrl,
  summary,
}: {
  downloadUrl: string | null;
  summary: any;
}) {
  if (!downloadUrl && !summary) return null;

  return (
    <div className="mt-6">
      {downloadUrl && (
        <a
          href={downloadUrl}
          download="hushhire_anonymized_resume.pdf"
          className="font-medium text-blue-600"
        >
          Download anonymized resume →
        </a>
      )}

      {summary && (
        <div className="mt-4 rounded-xl bg-neutral-50 p-5 text-sm border">
          <h3 className="font-semibold mb-2">Bias-Free Resume Summary</h3>
          <pre className="whitespace-pre-wrap">
            {JSON.stringify(summary, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
