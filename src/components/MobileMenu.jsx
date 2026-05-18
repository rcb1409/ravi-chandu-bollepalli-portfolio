import { Link, useNavigate, useLocation } from 'react-router-dom';

export const MobileMenu = ({ menuOpen, setMenuOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollTo = (id) => {
    setMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const itemClass = `text-2xl font-semibold text-white my-4 transform transition-all duration-300 ${
    menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
  }`;

  return (
    <div
      className={`z-40 fixed top-0 left-0 w-full bg-[rgba(10,10,10,0.95)] flex flex-col items-center justify-center transition-all duration-300 ease-in-out ${
        menuOpen ? 'h-screen opacity-100 pointer-events-auto' : 'h-0 opacity-0 pointer-events-none'
      }`}
    >
      <button
        onClick={() => setMenuOpen(false)}
        className="absolute top-6 right-6 cursor-pointer text-3xl text-white"
      >
        &times;
      </button>

      <button className={itemClass} onClick={() => scrollTo('home')}>Home</button>
      <button className={itemClass} onClick={() => scrollTo('about')}>About</button>
      <button className={itemClass} onClick={() => scrollTo('projects')}>Projects</button>
      <Link
        to="/blog"
        onClick={() => setMenuOpen(false)}
        className={itemClass}
      >
        Blog
      </Link>
      <button className={itemClass} onClick={() => scrollTo('footer')}>Contact</button>
    </div>
  );
};
