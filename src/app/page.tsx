import Link from "next/link";
import { getDecisions } from "@/lib/content";

export default function Home() {
  const decisions = getDecisions().slice(0, 5);

  return (
    <div className="page-container">
      {/* Hero */}
      <section className="mb-20">
        <h1 className="page-title">Sambit Sarkar</h1>
        <p className="page-subtitle">Software Architect</p>
        <p className="page-description">
          I document architecture decisions, modernization strategies, mobile
          platform design, and lessons learned building software.
        </p>
        <p className="disclaimer">
          All opinions are my own and do not represent my employer.
        </p>
      </section>

      {/* Latest Decisions */}
      {decisions.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="section-heading">Latest Decisions</h2>
            <Link href="/decisions" className="view-all-link">
              View all &rarr;
            </Link>
          </div>
          <div className="space-y-4">
            {decisions.map((decision) => (
              <Link
                key={decision.meta.slug}
                href={`/decisions/${decision.meta.slug}`}
                className="card block"
              >
                <div className="flex items-start gap-4">
                  {decision.meta.number && (
                    <span className="badge">
                      ADR-{decision.meta.number}
                    </span>
                  )}
                  <div>
                    <h3 className="card-title">{decision.meta.title}</h3>
                    <p className="card-text">
                      {decision.meta.summary}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
