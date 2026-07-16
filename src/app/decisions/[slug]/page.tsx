import { notFound } from "next/navigation";
import { getDecision, getDecisions } from "@/lib/content";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";

export function generateStaticParams() {
  return getDecisions().map((d) => ({ slug: d.meta.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const decision = getDecision(slug);
  if (!decision) return {};
  return {
    title: `${decision.meta.title} — Sambit Sarkar`,
    description: decision.meta.summary,
  };
}

export default async function DecisionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const decision = getDecision(slug);
  if (!decision) notFound();

  return (
    <div className="content-container">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          {decision.meta.number && (
            <span className="badge">
              ADR-{decision.meta.number}
            </span>
          )}
          {decision.meta.status && (
            <span className="tag">
              {decision.meta.status}
            </span>
          )}
          {decision.meta.category && (
            <span className="meta-text">{decision.meta.category}</span>
          )}
        </div>
        <h1 className="page-title">
          {decision.meta.title}
        </h1>
        <p className="card-text">{decision.meta.date}</p>
      </div>
      <article className="prose">
        <MarkdownRenderer content={decision.content} />
      </article>
    </div>
  );
}
