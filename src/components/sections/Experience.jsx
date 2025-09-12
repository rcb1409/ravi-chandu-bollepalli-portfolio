import { experienceItems } from "../content/experienceItems"
import { RevealOnScroll } from "../RevealOnScroll"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons"

export const Experience = () => {
  return (
    <section id="experience" className="min-h-screen flex items-center justify-center py-20">
      <RevealOnScroll>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
            Experience
          </h2>

          <div className="space-y-6">
            {experienceItems.map((exp, idx) => (
              <div
                key={idx}
                className="relative border border-white/10 rounded-xl p-6 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                  <h3 className="text-xl font-bold">
                    {exp.role} <span className="text-gray-400 font-normal">• {exp.company}</span>
                  </h3>
                  <span className="text-sm text-gray-400">
                    {exp.location ? `${exp.location} • ` : ""}{exp.dates}
                  </span>
                </div>

                {exp.summary && <p className="text-gray-300 mb-4">{exp.summary}</p>}

                {exp.highlights?.length > 0 && (
                  <ul className="list-disc list-inside space-y-1 text-gray-400 mb-4">
                    {exp.highlights.map((h, i) => <li key={i}>{h}</li>)}
                  </ul>
                )}

                {exp.techStack?.length > 0 && (
                  <div className="flex flex-wrap gap-2 pb-6">
                    {exp.techStack.map((tool, i) => (
                      <span
                        key={i}
                        className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)]"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                )}

                {exp.link && (
                  <a
                    href={exp.link}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute bottom-4 right-6"
                    aria-label="Open"
                    title="Open"
                  >
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </RevealOnScroll>
    </section>
  )
}
