import Link from "next/link";
import { getNotes } from "@/lib/content";

export const metadata = {
  title: "Architecture Notes — Sambit Sarkar",
  description:
    "Short-form architecture insights on mobile platforms, modernization, and software design.",
};

export default function NotesPage() {
  const notes = getNotes();

  return (
    <div className="page-container">
      <h1 className="page-title">
        Architecture Notes
      </h1>
      <p className="card-text mb-10 max-w-2xl">
        Short-form posts on architecture, mobile platforms, modernization, and
        software design. Concise and actionable.
      </p>

      {notes.length === 0 ? (
        <p className="card-text">Coming soon.</p>
      ) : (
        <div className="space-y-4">
          {notes.map((note) => (
            <Link
              key={note.meta.slug}
              href={`/notes/${note.meta.slug}`}
              className="card block"
            >
              <h2 className="card-title">{note.meta.title}</h2>
              <p className="card-text mb-2">{note.meta.summary}</p>
              <div className="flex items-center gap-3">
                <span className="meta-text">{note.meta.date}</span>
                {note.meta.tags?.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
