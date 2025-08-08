import { RevealOnScroll } from "../RevealOnScroll"

export const About = () => {
    const frontendSkills = [
        "React",
        "Vue",
        "TypeScript",
        "TailwindCSS"
    ]
    const backendSkills = [
        "Node.js",
        "python",
        "GCP",
        "MangoDB",
        "mySQL",
    ]
    return(
        <section id="about" className="min-h-screen flex items-center justify-center py-20">
            < RevealOnScroll >
            <div className="max-w-3xl mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8 text-center">About Me</h2>
                <div className="p-8 border border-white/10 rounded-xl hover:-translate-y-1">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga commodi sunt cumque excepturi voluptate vero rem necessitatibus assumenda iste ratione nulla repudiandae velit atque, laborum quidem? Corrupti ducimus corporis illo!</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 rounded-xl">
                        <div className="p-6 hover:-translate-y-1">
                            <h3 className="text-xl font-bold mb-4">Frontend Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {frontendSkills.map((skill, key) => (
                                    <span key={key} className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)]">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                         <div className="p-6 hover:-translate-y-1">
                            <h3 className="text-xl font-bold mb-4">Backend Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {backendSkills.map((skill, key) => (
                                    <span key={key} className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,2246,0.2)]">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </RevealOnScroll>
        </section>
    )
}