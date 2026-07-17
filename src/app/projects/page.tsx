import { WaitlistForm } from "@/components/WaitlistForm";

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
            <h3 className="card-title-lg">PhotoVault</h3>
            <span className="badge">
              Planned
            </span>
          </div>
          <p className="card-text mb-2 leading-relaxed">
            Your photos. Safe for 30 years.
          </p>
          <p className="card-text mb-8 leading-relaxed">
            A cost-effective photo and video backup app that archives your
            entire library to AWS Glacier Deep Archive — organized by date
            and location, deduplicated, and accessible from any device.
          </p>

          {/* The Problem */}
          <h4 className="card-title mb-3">The Problem</h4>
          <p className="card-text mb-6 leading-relaxed">
            Google Photos and iCloud charge $10/month for 2 TB. Most of those
            photos sit untouched for years — you&apos;re paying hot-storage
            prices for cold-storage needs. Self-hosted solutions like Immich
            require running your own server. There&apos;s no simple app that
            says: archive everything cheaply, organize it, and let me forget
            about it.
          </p>

          {/* What It Does */}
          <h4 className="card-title mb-3">What It Does</h4>
          <ul className="bullet-list mb-6">
            <li>Auto-backup from phone camera roll (iOS &amp; Android)</li>
            <li>Import from Google Photos / Google Takeout exports</li>
            <li>Desktop folder watching for local photo libraries</li>
            <li>Organizes into year/month/state/place/ folders using EXIF metadata</li>
            <li>Deduplicates via SHA-256 — never upload the same photo twice</li>
            <li>Stores originals in AWS Glacier Deep Archive ($1/TB/month)</li>
            <li>Thumbnails served instantly via CDN — browse without waiting</li>
            <li>Retrieve originals in 12–48 hours when you actually need them</li>
          </ul>

          {/* How It Works */}
          <h4 className="card-title mb-3">How It Works</h4>
          <div className="steps-list mb-8">
            <div className="step-item">
              <span className="step-number">1</span>
              <div>
                <p className="step-title">Install &amp; connect</p>
                <p className="card-text">Sign up, grant photo access. No AWS account needed.</p>
              </div>
            </div>
            <div className="step-item">
              <span className="step-number">2</span>
              <div>
                <p className="step-title">App scans &amp; organizes</p>
                <p className="card-text">Reads EXIF date &amp; GPS, builds year/month/location folders, skips duplicates.</p>
              </div>
            </div>
            <div className="step-item">
              <span className="step-number">3</span>
              <div>
                <p className="step-title">Uploads to Glacier</p>
                <p className="card-text">Photos go directly to deep archive. Background upload — set it and forget it.</p>
              </div>
            </div>
            <div className="step-item">
              <span className="step-number">4</span>
              <div>
                <p className="step-title">Browse anytime</p>
                <p className="card-text">Thumbnails load instantly. Request full-res when you need it (12–48h restore).</p>
              </div>
            </div>
          </div>

          {/* Architecture Decisions */}
          <h4 className="card-title mb-3">Architecture Decisions</h4>
          <p className="card-text mb-8">
            Technical decisions for this project are documented as ADRs in
            the{" "}
            <a href="/decisions" className="text-link">
              Decisions
            </a>{" "}
            section.
          </p>

          {/* Waitlist */}
          <div className="waitlist-section">
            <h4 className="card-title mb-1">Interested?</h4>
            <p className="card-text mb-4">
              Get notified when PhotoVault launches. No spam — just one email
              when it&apos;s ready.
            </p>
            <WaitlistForm />
          </div>
        </div>
      </section>
    </div>
  );
}
