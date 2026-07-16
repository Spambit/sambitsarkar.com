import { remark } from "remark";
import remarkHtml from "remark-html";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  content: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function addHeadingIds(html: string): string {
  return html.replace(
    /<(h[1-3])>(.*?)<\/h[1-3]>/g,
    (_, tag, content) => {
      const plainText = content.replace(/<[^>]+>/g, "");
      const id = slugify(plainText);
      return `<${tag} id="${id}">${content}</${tag}>`;
    }
  );
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const result = remark().use(remarkGfm).use(remarkHtml).processSync(content);
  const html = addHeadingIds(String(result));

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
