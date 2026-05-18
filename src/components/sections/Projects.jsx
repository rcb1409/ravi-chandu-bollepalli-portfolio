import { Link } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';
import { HiExternalLink } from 'react-icons/hi';
import { RevealOnScroll } from '../RevealOnScroll';
import { getAllProjects, getBlogsByProject } from '../../utils/blogUtils';

export const Projects = () => {
  const projects = getAllProjects().filter((p) => p.featured);

  return (
    <section id="projects" className="min-h-screen flex items-center justify-center py-20">
      <RevealOnScroll>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
            Featured Projects
          </h2>
          <p className="text-gray-400 text-center mb-10 text-sm">
            Click a project to read the technical blog posts behind it.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => {
              const blogs = getBlogsByProject(project.slug);
              return (
                <div
                  key={project.slug}
                  className="relative border border-white/10 rounded-xl p-6 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition flex flex-col"
                >
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-400 mb-4 flex-1 text-sm">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <Link
                      to={`/projects/${project.slug}`}
                      className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors"
                    >
                      {blogs.length > 0
                        ? `${blogs.length} blog post${blogs.length > 1 ? 's' : ''} →`
                        : 'View Project →'}
                    </Link>
                    <div className="flex items-center gap-3">
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noreferrer"
                          className="text-gray-400 hover:text-white transition-colors text-sm inline-flex items-center gap-1"
                        >
                          <HiExternalLink size={15} /> Live
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          <FaGithub size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
