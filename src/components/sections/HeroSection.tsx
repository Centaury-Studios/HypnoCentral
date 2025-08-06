import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PlayIcon, ChevronRightIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { Button } from '../ui/button';
import RotatingPlanet from '../3d/RotatingPlanet';


const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      navigate(`/portfolio?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleSearchClick = () => {
    if (searchTerm.trim()) {
      navigate(`/portfolio?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark-950 pt-20">
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        {/* Gradient Overlay */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(125, 211, 252, 0.1) 0%, transparent 50%)`
          }}
        />
        
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-12 h-full">
            {Array.from({ length: 24 }).map((_, i) => (
              <motion.div
                key={i}
                className="border-r border-white/5 h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.1, 0] }}
                transition={{
                  duration: 3,
                  delay: i * 0.2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            ))}
          </div>
        </div>


      </div>

      {/* Rotating Planet */}
      <motion.div
        className="absolute top-10 right-10 opacity-60"
        initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
        animate={{ opacity: 0.6, scale: 1, rotate: 0 }}
        transition={{ duration: 2, delay: 1 }}
      >
        <RotatingPlanet />
      </motion.div>



      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div className="text-center space-y-8">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 glass-card px-6 py-3 rounded-full"
          >
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-gray-300 text-sm font-medium">Live Studio • Building the Future</span>
            <SparklesIcon className="w-4 h-4 text-accent" />
          </motion.div>

          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
                         <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight font-gaming">
               <span className="block text-white">Gaming</span>
               <span className="block gradient-text-primary">Innovation</span>
               <span className="block text-white">Studio</span>
             </h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto font-light leading-relaxed"
            >
              We craft extraordinary gaming experiences and partner with visionary developers 
              to build the next generation of interactive entertainment.
            </motion.p>
          </motion.div>



          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8"
          >
                                     <Button
              variant="primary"
              size="lg"
              icon={<ChevronRightIcon className="w-5 h-5" />}
              iconPosition="right"
              className="font-gaming"
              onClick={() => {
                setTimeout(() => {
                  const targetElement = document.getElementById('portfolio-contact');
                  if (targetElement) {
                    const headerHeight = 80;
                    const elementRect = targetElement.getBoundingClientRect();
                    const absoluteElementTop = elementRect.top + window.pageYOffset;
                    const targetPosition = absoluteElementTop - headerHeight;
                    window.scrollTo({
                      top: targetPosition,
                      behavior: 'smooth'
                    });
                  } else {
                    // Fallback: scroll to portfolio section end
                    const portfolioSection = document.getElementById('portfolio');
                    if (portfolioSection) {
                      const portfolioRect = portfolioSection.getBoundingClientRect();
                      const portfolioTop = portfolioRect.top + window.pageYOffset;
                      window.scrollTo({
                        top: portfolioTop + portfolioSection.offsetHeight - 600,
                        behavior: 'smooth'
                      });
                    }
                  }
                }, 100);
              }}
            >
              Start Your Project
            </Button>

             <Button
               variant="ghost"
               size="lg"
               icon={<PlayIcon className="w-5 h-5" />}
               iconPosition="left"
               className="font-tech"
             >
               Watch Our Work
             </Button>
          </motion.div>

                     {/* Search Integration */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 1.2 }}
             className="pt-40 pb-4"
           >
            <div className="search-bar max-w-md mx-auto">
              <div className="flex items-center px-6 py-4">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleSearch}
                  placeholder="Search our portfolio..."
                  className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-lg"
                />
                <button 
                  onClick={handleSearchClick}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

             {/* Scroll Indicator */}
       <motion.div
         className="absolute bottom-36 left-1/2 transform -translate-x-1/2"
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 1, delay: 1.5 }}
       >
        <motion.div
          className="flex flex-col items-center space-y-2 text-gray-400"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs font-medium">Scroll to explore</span>
          <div className="w-6 h-10 border border-gray-600 rounded-full flex justify-center pt-2">
            <motion.div
              className="w-1 h-3 bg-gray-400 rounded-full"
              animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;