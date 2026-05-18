import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import { getBlog, getProject } from '../utils/blogUtils';

export const BlogPostPage = () => {
  const { slug, blogSlug } = useParams();
  const blog = getBlog(slug, blogSlug);
  const project = getProject(slug);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Blog post not found.</p>
          <Link to="/" className="text-blue-400 hover:text-blue-300">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-gray-100 pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-10 flex-wrap">
          <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
          <span>/</span>
          <Link to={`/projects/${slug}`} className="hover:text-blue-400 transition-colors">
            {project?.title ?? slug}
          </Link>
          <span>/</span>
          <span className="text-gray-300">{blog.title}</span>
        </nav>

        {/* Post header */}
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white leading-snug">
          {blog.title}
        </h1>

        <div className="flex flex-wrap items-center gap-3 mb-10 text-sm text-gray-400">
          <span>{blog.date}</span>
          {Array.isArray(blog.tags) && blog.tags.length > 0 && (
            <>
              <span className="text-white/20">·</span>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Markdown content */}
        <article className="prose">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {blog.content}
          </ReactMarkdown>
        </article>

        {/* Footer nav */}
        <div className="mt-20 pt-8 border-t border-white/10 flex items-center justify-between flex-wrap gap-4">
          <Link
            to={`/projects/${slug}`}
            className="text-blue-400 hover:text-blue-300 transition-colors text-sm"
          >
            ← Back to {project?.title ?? 'Project'}
          </Link>
          <Link
            to="/blog"
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            All blog posts →
          </Link>
        </div>
      </div>
    </div>
  );
};
