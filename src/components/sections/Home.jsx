import { RevealOnScroll } from "../RevealOnScroll"

export const Home = () => {
    return(
        <section id="Home" className="min-h-screen flex items-center justify-center">
            < RevealOnScroll >
            <div className="text-center px-4">
            <h1 className="mb-6 text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Hi, I'm Ravi Bollepalli</h1>
            <p className="mb-8 mx-auto max-w-lg text-lg text-gray text-center">I'm a CS graduate student at NC State University with experience in Full Stack Development and a passion for integrating AI-powered solutions into scalable software systems. Currently seeking full-time opportunities starting Fall 2026</p>
            <div className="flex justify-center space-x-4">
                <a href="#projects"
                   className="bg-blue-500 text-white py-3 px-6 rounded font-medium hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:-translate-y-0.5 overflow-hidden "  
                >View Projects</a>
                <a href="#contact"
                   className="border border-blue-500/50 text-blue py-3 px-6 rounded font-medium transition-all duration-200 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:-translate-y-0.5 hover:bg-blue-500/10 overflow-hidden"
                >Contact Me</a>
            </div>
            </div>
            </RevealOnScroll>
            </section>
    )
}