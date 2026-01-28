import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LocomotiveScroll from 'locomotive-scroll';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import BackgroundLights from './components/BackgroundLights';
import ParticlesBackground from './components/ParticlesBackground';
import CommandPalette from './components/CommandPalette';
import SystemDashboard from './components/SystemDashboard';
import TechMarquee from './components/TechMarquee';
import ProjectDetails from './pages/ProjectDetails';


function HomePage() {
  const location = useLocation();
  const [loading, setLoading] = useState(() => {
    return !sessionStorage.getItem('hasSeenPreloader');
  });

  useEffect(() => {
    const scroll = new LocomotiveScroll({
      lenisOptions: {
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        smoothTouch: false,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      }
    });
    return () => scroll.destroy();
  }, []);

  // Handle scroll to section from navigation state
  useEffect(() => {
    if (location.state?.scrollTo) {
      const timer = setTimeout(() => {
        const element = document.getElementById(location.state.scrollTo);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [location]);

  const handlePreloaderComplete = () => {
    setLoading(false);
    sessionStorage.setItem('hasSeenPreloader', 'true');
  };

  return (
    <>
      <CustomCursor />
      <BackgroundLights />
      <ParticlesBackground />
      <CommandPalette />
      <SystemDashboard />

      {loading && <Preloader onComplete={handlePreloaderComplete} />}

      <main style={{
        opacity: loading ? 0 : 1,
        transition: 'opacity 1.5s ease',
        pointerEvents: loading ? 'none' : 'auto',
        position: 'relative',
        zIndex: 1
      }}>
        <Navbar />
        <Hero />
        <About />
        <Experience />
        <TechMarquee />
        <Projects />
        <Contact />
        <Footer />
      </main>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
