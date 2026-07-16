export const metadata = {
  title: "Projects — Sambit Sarkar",
  description:
    "Personal projects exploring architecture patterns and technology decisions.",
};

export default function ProjectsPage() {
  return (
    <div className="page-container">
      <h1 className="page-title">Projects</h1>
      <p className="card-text mb-12 max-w-2xl">
        Personal projects exploring architecture patterns, technology decisions,
        and real-world problems.
      </p>

      {/* Completed Projects */}
      <section className="mb-16">
        <h2 className="section-label">
          Completed
        </h2>
        <p className="card-text italic">No completed projects yet.</p>
      </section>

      {/* Upcoming Projects */}
      <section>
        <h2 className="section-label">
          Upcoming
        </h2>

        <div className="card-lg">
          <div className="flex items-start justify-between mb-4">
            <h3 className="card-title-lg">Photo Archive</h3>
            <span className="badge">
              Planned
            </span>
          </div>
          <p className="card-text mb-6 leading-relaxed">
            A personal project exploring long-term photo preservation
            strategies. The goal is to build a reliable, cost-effective system
            for backing up and archiving personal photos across decades.
          </p>

          <h4 className="card-title mb-3">Key Areas</h4>
          <ul className="bullet-list mb-6">
            <li>Google Photos backup and export strategies</li>
            <li>S3 Glacier archival for cost-effective long-term storage</li>
            <li>Cross-device synchronization patterns</li>
            <li>Long-term photo preservation and metadata management</li>
          </ul>

          <h4 className="card-title mb-3">Architecture Decisions</h4>
          <p className="card-text">
            Architecture decisions related to this project will be documented as
            ADRs in the{" "}
            <a href="/decisions" className="text-link">
              Decisions
            </a>{" "}
            section.
          </p>
        </div>
      </section>
    </div>
  );
}
