import { notFound } from "next/navigation";
import { getNote, getNotes } from "@/lib/content";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";

export function generateStaticParams() {
  return getNotes().map((n) => ({ slug: n.meta.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) return {};
  return {
    title: `${note.meta.title} — Sambit Sarkar`,
    description: note.meta.summary,
  };
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) notFound();

  return (
    <div className="content-container">
      <div className="mb-8">
        <h1 className="page-title">
          {note.meta.title}
        </h1>
        <div className="flex items-center gap-3">
          <span className="card-text">{note.meta.date}</span>
          {note.meta.tags?.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <article className="prose">
        <MarkdownRenderer content={note.content} />
      </article>
    </div>
  );
}
