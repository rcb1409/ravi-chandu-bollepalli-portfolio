import { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export const Navbar = ({ menuOpen, setMenuOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  const scrollTo = (id) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navBtn =
    'text-gray-300 hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0 font-[inherit] text-[inherit]';

  return (
    <nav className="fixed top-0 w-full z-40 bg-[rgba(10,10,10,0.8)] backdrop-blur-lg border-b border-white/10">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="font-mono font-bold text-white text-xl">
            RaviChanduBollepalli<span className="text-blue-500">.me</span>
          </Link>

          {/* Hamburger */}
          <div
            className="w-7 h-5 cursor-pointer md:hidden flex flex-col justify-between"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span className="block w-full h-0.5 bg-white" />
            <span className="block w-full h-0.5 bg-white" />
            <span className="block w-full h-0.5 bg-white" />
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-8">
            <button className={navBtn} onClick={() => scrollTo('home')}>Home</button>
            <button className={navBtn} onClick={() => scrollTo('about')}>About</button>
            <button className={navBtn} onClick={() => scrollTo('projects')}>Projects</button>
            <Link to="/blog" className="text-gray-300 hover:text-white transition-colors">Blog</Link>
            <button className={navBtn} onClick={() => scrollTo('footer')}>Contact</button>
          </div>
        </div>
      </div>
    </nav>
  );
};
