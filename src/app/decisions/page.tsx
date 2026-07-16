import Link from "next/link";
import { getDecisions } from "@/lib/content";

export const metadata = {
  title: "Architecture Decisions — Sambit Sarkar",
  description:
    "A collection of Architecture Decision Records (ADRs) documenting key technical decisions.",
};

export default function DecisionsPage() {
  const decisions = getDecisions();

  return (
    <div className="page-container">
      <h1 className="page-title">
        Architecture Decisions
      </h1>
      <p className="card-text mb-10 max-w-2xl">
        A collection of Architecture Decision Records (ADRs). Each documents the
        context, decision, and consequences of a significant technical choice.
      </p>

      {decisions.length === 0 ? (
        <p className="card-text">Coming soon.</p>
      ) : (
        <div className="space-y-4">
          {decisions.map((decision) => (
            <Link
              key={decision.meta.slug}
              href={`/decisions/${decision.meta.slug}`}
              className="card block"
            >
              <div className="flex items-start gap-4">
                {decision.meta.number && (
                  <span className="badge shrink-0">
                    ADR-{decision.meta.number}
                  </span>
                )}
                <div>
                  <h2 className="card-title">{decision.meta.title}</h2>
                  <p className="card-text">{decision.meta.summary}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="meta-text">
                      {decision.meta.date}
                    </span>
                    {decision.meta.status && (
                      <span className="tag">
                        {decision.meta.status}
                      </span>
                    )}
                    {decision.meta.category && (
                      <span className="meta-text">
                        {decision.meta.category}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
