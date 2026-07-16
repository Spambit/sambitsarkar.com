import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content");

export interface ContentMeta {
  slug: string;
  title: string;
  date: string;
  summary: string;
  number?: string;
  category?: string;
  status?: string;
  stage?: "draft" | "published";
  order?: number;
  tags?: string[];
}

export interface ContentItem {
  meta: ContentMeta;
  content: string;
}

function getContentFromDir(dir: string): ContentItem[] {
  const fullPath = path.join(contentDirectory, dir);
  if (!fs.existsSync(fullPath)) return [];

  const files = fs.readdirSync(fullPath).filter((f) => f.endsWith(".md"));

  return files
    .map((filename) => {
      const filePath = path.join(fullPath, filename);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        meta: {
          slug: filename.replace(/\.md$/, ""),
          title: data.title || "",
          date: data.date || "",
          summary: data.summary || "",
          number: data.number || undefined,
          category: data.category || undefined,
          status: data.status || undefined,
          stage: data.stage || "draft",
          order: data.order || undefined,
          tags: data.tags || undefined,
        },
        content,
      };
    })
    .sort(
      (a, b) =>
        new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
    );
}

export function getDecisions(): ContentItem[] {
  return getContentFromDir("decisions")
    .filter((d) => d.meta.stage === "published")
    .sort((a, b) => {
      if (a.meta.order !== undefined && b.meta.order !== undefined) {
        return a.meta.order - b.meta.order;
      }
      return new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime();
    });
}

export function getDraftDecisions(): ContentItem[] {
  return getContentFromDir("decisions")
    .filter((d) => d.meta.stage !== "published")
    .sort(
      (a, b) =>
        new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
    );
}

export function getAllDecisionSlugs(): string[] {
  return getContentFromDir("decisions").map((d) => d.meta.slug);
}

export function getDecision(slug: string): ContentItem | undefined {
  return getContentFromDir("decisions").find(
    (d) => d.meta.slug === slug && d.meta.stage === "published"
  );
}

export function getNotes(): ContentItem[] {
  return getContentFromDir("notes")
    .filter((n) => n.meta.stage === "published")
    .sort((a, b) => {
      if (a.meta.order !== undefined && b.meta.order !== undefined) {
        return a.meta.order - b.meta.order;
      }
      return new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime();
    });
}

export function getDraftNotes(): ContentItem[] {
  return getContentFromDir("notes")
    .filter((n) => n.meta.stage !== "published")
    .sort(
      (a, b) =>
        new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
    );
}

export function getAllNoteSlugs(): string[] {
  return getContentFromDir("notes").map((n) => n.meta.slug);
}

export function getNote(slug: string): ContentItem | undefined {
  return getContentFromDir("notes").find(
    (n) => n.meta.slug === slug && n.meta.stage === "published"
  );
}
