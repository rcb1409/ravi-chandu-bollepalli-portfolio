import { useParams, Link } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';
import { HiExternalLink } from 'react-icons/hi';
import { getProject, getBlogsByProject } from '../utils/blogUtils';

export const ProjectPage = () => {
  const { slug } = useParams();
  const project = getProject(slug);
  const blogs = getBlogsByProject(slug);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Project not found.</p>
          <Link to="/" className="text-blue-400 hover:text-blue-300">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-gray-100 pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4">

        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-blue-400 transition-colors mb-10"
        >
          ← Back to Home
        </Link>

        {/* Project header */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent leading-tight">
          {project.title}
        </h1>
        <p className="text-gray-300 text-lg mb-6 max-w-2xl">{project.description}</p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="bg-blue-500/10 text-blue-400 py-1 px-3 rounded-full text-sm"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-3 mb-16">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 rounded-lg text-gray-300 hover:text-white hover:border-blue-500/40 transition text-sm"
            >
              <FaGithub size={16} /> GitHub
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-600 transition text-sm"
            >
              <HiExternalLink size={16} /> Live Demo
            </a>
          )}
        </div>

        {/* Blog posts */}
        <div className="border-t border-white/10 pt-12">
          <h2 className="text-2xl font-bold mb-2 text-white">Blog Posts</h2>
          <p className="text-gray-400 text-sm mb-8">
            Technical deep-dives on what went into building this.
          </p>

          {blogs.length === 0 ? (
            <p className="text-gray-500 italic">No blog posts yet — check back soon.</p>
          ) : (
            <div className="space-y-4">
              {blogs.map((blog) => (
                <Link
                  key={blog.blogSlug}
                  to={`/projects/${slug}/${blog.blogSlug}`}
                  className="block border border-white/10 rounded-xl p-6 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition"
                >
                  <h3 className="text-lg font-semibold mb-2 text-white">{blog.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{blog.summary}</p>
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(blog.tags) &&
                        blog.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-white/5 text-gray-400 px-2 py-0.5 rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                    </div>
                    <span className="text-gray-500 text-xs">{blog.date}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
