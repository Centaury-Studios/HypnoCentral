import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface Model3DBackgroundProps {
  className?: string;
  imageSrc?: string;
}

const Model3DBackground: React.FC<Model3DBackgroundProps> = ({ className = '', imageSrc = '/3d_model.png' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Scroll-based animations with more sophisticated parallax
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [0, -150, -300]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.8], [1, 1.1, 0.7]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8], [0.6, 0.9, 0.8, 0.3]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [0, 15, 30]);
  
  // Smooth spring animations
  const springY = useSpring(y, { stiffness: 100, damping: 30 });
  const springScale = useSpring(scale, { stiffness: 100, damping: 30 });
  const springOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 80, damping: 25 });

  // Mouse tracking for subtle 3D effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        setMousePosition({
          x: (e.clientX - centerX) / rect.width,
          y: (e.clientY - centerY) / rect.height,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className={`absolute pointer-events-none select-none ${className}`}
      style={{
        y: springY,
        scale: springScale,
        opacity: springOpacity,
        rotateY: springRotateY,
      }}
      initial={{ opacity: 0, scale: 0.5, rotateY: -30 }}
      animate={{ opacity: 0.6, scale: 1, rotateY: 0 }}
      transition={{ 
        duration: 2, 
        delay: 0.8,
        ease: "easeOut"
      }}
    >
      {/* 3D Model Container with perspective */}
      <motion.div
        className="relative w-80 h-80 lg:w-96 lg:h-96"
        style={{
          transform: `perspective(1000px) rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * 10}deg)`,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ 
          scale: 1.05,
          transition: { duration: 0.3 }
        }}
      >
        {/* Subtle background glow - positioned behind to hide the square shape */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-accent/8 to-primary/8 rounded-full blur-2xl transform scale-110 -z-10"
          animate={{
            scale: [1.1, 1.3, 1.1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Additional soft glow to blend the edges */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent rounded-full blur-xl transform scale-120 -z-10"
          animate={{
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        {/* Main 3D Model Display */}
        <div className="relative w-full h-full">
          {/* Using the image prop - clean, no overlays to preserve transparency */}
          <motion.div
            className="w-full h-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${imageSrc}')`,
              filter: 'drop-shadow(0 15px 30px rgba(0, 0, 0, 0.3))',
            }}
            animate={{
              rotateZ: [0, 1, 0, -1, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Floating particles around the model - positioned outside the image area */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${
              i % 3 === 0 ? 'w-2 h-2 bg-accent' : 
              i % 3 === 1 ? 'w-1 h-1 bg-primary' : 
              'w-1 h-1 bg-white'
            }`}
            style={{
              left: i < 3 ? `-${10 + (i * 5)}%` : `${110 + (i * 5)}%`,
              top: `${30 + (i * 15)}%`,
            }}
            animate={{
              y: [0, -20 - (i * 3), 0],
              x: [0, Math.sin(i) * 10, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3 + (i * 0.4),
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Model3DBackground;