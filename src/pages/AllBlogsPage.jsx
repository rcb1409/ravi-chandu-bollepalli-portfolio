import { Link } from 'react-router-dom';
import { getAllBlogs, getAllProjects } from '../utils/blogUtils';

export const AllBlogsPage = () => {
  const blogs = getAllBlogs();
  const projects = getAllProjects();

  const projectMap = Object.fromEntries(projects.map((p) => [p.slug, p]));

  return (
    <div className="min-h-screen bg-black text-gray-100 pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4">

        <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
          Blog
        </h1>
        <p className="text-gray-400 mb-12">
          Technical deep-dives on what I build and the decisions behind it.
        </p>

        {blogs.length === 0 ? (
          <p className="text-gray-500 italic">No posts yet — check back soon.</p>
        ) : (
          <div className="space-y-4">
            {blogs.map((blog) => {
              const project = projectMap[blog.projectSlug];
              return (
                <Link
                  key={`${blog.projectSlug}-${blog.blogSlug}`}
                  to={`/projects/${blog.projectSlug}/${blog.blogSlug}`}
                  className="block border border-white/10 rounded-xl p-6 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h2 className="text-lg font-semibold mb-1 text-white">{blog.title}</h2>
                      <p className="text-gray-400 text-sm mb-3 line-clamp-2">{blog.summary}</p>
                      {project && (
                        <span className="inline-block text-blue-400 text-xs font-medium bg-blue-500/10 px-2 py-0.5 rounded-full">
                          {project.title}
                        </span>
                      )}
                    </div>
                    <span className="text-gray-500 text-xs whitespace-nowrap pt-1">{blog.date}</span>
                  </div>

                  {Array.isArray(blog.tags) && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {blog.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-white/5 text-gray-400 px-2 py-0.5 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
