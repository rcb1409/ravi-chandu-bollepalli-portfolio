// Vite processes these globs at build time — adding a new .md file is all you need.
const rawBlogFiles = import.meta.glob('../content/projects/**/blogs/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const projectMetaFiles = import.meta.glob('../content/projects/*/meta.js', {
  eager: true,
});

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const data = {};
  match[1].split('\n').forEach((line) => {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) return;
    const key = line.slice(0, colonIdx).trim();
    let val = line.slice(colonIdx + 1).trim();

    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    } else if (val.startsWith('[') && val.endsWith(']')) {
      val = val
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean);
    }
    data[key] = val;
  });

  return { data, content: match[2] };
}

// Extracts projectSlug and blogSlug from a path like:
// ../content/projects/prep-buddy/blogs/01-architecture-overview.md
function parsePath(path) {
  const match = path.match(/\/projects\/([^/]+)\/blogs\/([^/]+)\.md$/);
  if (!match) return null;
  return { projectSlug: match[1], blogSlug: match[2] };
}

export function getAllBlogs() {
  return Object.entries(rawBlogFiles)
    .map(([path, raw]) => {
      const slugs = parsePath(path);
      if (!slugs) return null;
      const { data, content } = parseFrontmatter(raw);
      return { ...slugs, ...data, content };
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getBlogsByProject(projectSlug) {
  return getAllBlogs().filter((b) => b.projectSlug === projectSlug);
}

export function getBlog(projectSlug, blogSlug) {
  return getAllBlogs().find(
    (b) => b.projectSlug === projectSlug && b.blogSlug === blogSlug
  );
}

export function getAllProjects() {
  return Object.values(projectMetaFiles).map((m) => m.default);
}

export function getProject(slug) {
  return getAllProjects().find((p) => p.slug === slug);
}
