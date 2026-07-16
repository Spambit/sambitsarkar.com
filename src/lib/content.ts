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
  return getContentFromDir("decisions");
}

export function getDecision(slug: string): ContentItem | undefined {
  return getDecisions().find((d) => d.meta.slug === slug);
}

export function getNotes(): ContentItem[] {
  return getContentFromDir("notes");
}

export function getNote(slug: string): ContentItem | undefined {
  return getNotes().find((n) => n.meta.slug === slug);
}
