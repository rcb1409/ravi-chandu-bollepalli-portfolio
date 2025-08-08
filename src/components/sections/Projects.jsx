import { projectItems } from "../content/projectItems"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { RevealOnScroll } from "../RevealOnScroll"

export const Projects = () => {
    return(
        <section id="projects" className="min-h-screen flex items-center justify-center py-20">
            < RevealOnScroll >
            <div className="max-w-5xl mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">Featured Projects</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projectItems.map((project, key) => (
                    <div key={key} className="border border-white/10 rounded-xl p-6 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)">
                        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                        <p className="text-gray-400 mb-4">{project.desc}</p>
                        <div className="flex flex-wrap gap-2">
                            {project.techStack.map((skill, key) => (
                                    <span key={key} className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,2246,0.2)]">
                                        {skill}
                                    </span>))}
                        </div>
                        <a href={project.url}><FontAwesomeIcon icon={faGithub} /></a>
                    </div>
                ))}
            </div>
            </div>
            </RevealOnScroll>

        </section>
    )
}