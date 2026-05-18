import { RevealOnScroll } from '../RevealOnScroll';

const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

export const Home = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center">
      <RevealOnScroll>
        <div className="text-center px-4">
          <h1 className="mb-6 text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Hi, I'm Ravi Bollepalli
          </h1>
          <p className="mb-8 mx-auto max-w-lg text-lg text-gray-300 text-center">
            CS graduate student at NC State University. I build full-stack
            applications and AI-powered systems — and write about the technical
            decisions behind them.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => scrollTo('about')}
              className="border border-blue-500/50 text-blue-400 py-3 px-6 rounded font-medium transition-all duration-200 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:-translate-y-0.5 hover:bg-blue-500/10"
            >
              About me
            </button>
            <button
              onClick={() => scrollTo('projects')}
              className="bg-blue-500 text-white py-3 px-6 rounded font-medium hover:bg-blue-600 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:-translate-y-0.5 transition-all duration-200"
            >
              View Projects
            </button>
            <button
              onClick={() => scrollTo('footer')}
              className="border border-blue-500/50 text-blue-400 py-3 px-6 rounded font-medium transition-all duration-200 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:-translate-y-0.5 hover:bg-blue-500/10"
            >
              Contact Me
            </button>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
