export const metadata = {
  title: "About — Sambit Sarkar",
  description:
    "Software Architect with 17+ years of experience in mobile platforms, enterprise architecture, and modernization.",
};

export default function AboutPage() {
  return (
    <div className="content-container">
      <h1 className="page-title mb-6">About</h1>

      <div className="prose">
        <p>
          I&apos;m a Software Architect with 17+ years of experience designing
          and building mobile and enterprise software systems.
        </p>

        <p>
          This site is where I document architecture decisions, share lessons
          learned, and explore patterns for building reliable software at scale.
        </p>

        <h2>Interests</h2>
        <ul>
          <li>Mobile Platforms (iOS, Android, Cross-platform)</li>
          <li>Software Architecture &amp; System Design</li>
          <li>Legacy Modernization</li>
          <li>AI Transformation</li>
          <li>Cloud Architecture</li>
        </ul>

        <h2>This Site</h2>
        <p>
          The primary content here is Architecture Decision Records (ADRs) —
          structured documents that capture the context, decision, and
          consequences of significant technical choices.
        </p>
        <p>
          I also write short architecture notes on specific topics and document
          personal projects that explore interesting technical problems.
        </p>

        <h2>Disclaimer</h2>
        <p>
          All opinions expressed on this site are my own and do not represent the
          views of my employer.
        </p>
      </div>
    </div>
  );
}
