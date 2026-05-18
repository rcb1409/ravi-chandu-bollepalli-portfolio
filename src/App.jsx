import { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import './index.css';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { MobileMenu } from './components/MobileMenu';
import { Home } from './components/sections/Home';
import { About } from './components/sections/About';
import { Projects } from './components/sections/Projects';
import { Footer } from './components/Footer';
import { ProjectPage } from './pages/ProjectPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { AllBlogsPage } from './pages/AllBlogsPage';

function HomePage() {
  return (
    <>
      <Home />
      <About />
      <Projects />
      <Footer />
    </>
  );
}

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <HashRouter>
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}
      <div
        className={`min-h-screen transition-opacity duration-700 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } bg-black text-gray-100`}
      >
        <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/:slug" element={<ProjectPage />} />
          <Route path="/projects/:slug/:blogSlug" element={<BlogPostPage />} />
          <Route path="/blog" element={<AllBlogsPage />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
