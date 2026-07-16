# sambitsarkar.com

Personal architecture website. Architecture decisions, modernization strategies, and lessons learned building software.

## Development

```bash
npm run dev    # Start development server at http://localhost:3000
npm run build  # Production build
npm run start  # Start production server
```

## Content

Content is written in Markdown with YAML frontmatter, stored in `content/`:

- `content/decisions/` — Architecture Decision Records (ADRs)
- `content/notes/` — Short architecture articles

### Adding an ADR

Create a new `.md` file in `content/decisions/`:

```yaml
---
title: "Decision Title"
number: "006"
date: "2026-07-20"
status: "Proposed"
category: "Architecture"
summary: "One-line summary."
tags: ["architecture"]
---

## Context
## Decision
## Consequences
## Notes
```

### Adding a Note

Create a new `.md` file in `content/notes/`:

```yaml
---
title: "Note Title"
date: "2026-07-20"
summary: "One-line summary."
tags: ["architecture"]
---
```

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Markdown content with gray-matter frontmatter parsing
