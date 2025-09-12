import { RevealOnScroll } from "../RevealOnScroll"

export const About = () => {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center py-20">
      <RevealOnScroll>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">About Me</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border border-white/10 rounded-2xl p-6 md:p-8 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_2px_16px_rgba(59,130,246,0.2)] transition">
            
            {/* Left: Photo */}
            <div className="w-full">
              <div className="aspect-square overflow-hidden rounded-2xl border border-white/10">
                <img
                  src="/ravi-chandu-bollepalli-portfolio/profile.jpg"
                  alt="Ravi Bollepalli portrait"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Right: About text */}
            <div className="space-y-6">
              <p className="text-gray-300">
                I’m a Master’s CS student at NC State (’26) passionate about building scalable 
                full-stack applications, cloud-native systems, and experimenting with Generative AI 
                to bridge the gap between research and real-world software engineering. 
              </p>
              <p className="text-gray-300">
  Beyond code, I love pushing myself outdoors—running marathons, hiking, and exploring 
  trails. You can even catch some of my runs on{" "}
  <a
    href="https://strava.app.link/3esT6MWPBWb"
    target="_blank"
    rel="noreferrer"
    className="text-blue-400 hover:underline"
  >
    Strava
  </a>
  . I also enjoy keeping up with the latest 
  tech trends, and my current deep dive is Generative AI.
</p>
             
              {/* Optional buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="https://github.com/rcb1409"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-full border border-white/10 hover:border-blue-500/40 hover:bg-blue-500/10 transition text-sm"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/ravi-chandu-bollepalli/"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-full border border-white/10 hover:border-blue-500/40 hover:bg-blue-500/10 transition text-sm"
                >
                  LinkedIn
                </a>
                <a
                  href="#projects"
                  className="px-4 py-2 rounded-full bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 transition text-sm"
                >
                  View Projects
                </a>
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  )
}
