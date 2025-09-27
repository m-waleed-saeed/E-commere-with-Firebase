import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Hero = () => {

  const navigate = useNavigate()

  // Simulate image loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      document.querySelector('.hero-image').classList.add('opacity-100');
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Gradient background - acts as fallback while image loads */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] z-0"></div>

      {/* Hero image with fade-in effect */}
      <div className="hero-image opacity-0 transition-opacity duration-1000">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black z-10"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop')] bg-cover bg-center z-0"></div>
      </div>

      {/* Content container */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
              <span className="block">Luxury</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
                Tech Collection
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto mb-8">
              Experience the future of premium gadgets with <b><i>Luxury Tech</i></b>.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button onClick={() => navigate('/shop')} className="relative px-3 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white font-medium text-lg overflow-hidden group">
              <span className="relative z-10">Explore Collection</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine transition duration-500"></div>
            </button>
          </motion.div>
        </div>

        {/* Animated scrolling indicator */}
        <motion.div
          className="absolute bottom-8 flex flex-col items-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <span className="text-gray-300 text-sm mb-2">Discover more</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </motion.div>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute top-8 right-8 w-16 h-16 rounded-full border-2 border-purple-400/30 animate-pulse"></div>
        <div className="absolute bottom-16 left-8 w-8 h-8 rounded-full border border-blue-300/20"></div>
        <div className="absolute top-1/4 left-12 w-4 h-4 rounded-full bg-blue-500 opacity-70 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-16 w-3 h-3 rounded-full bg-purple-500"></div>
      </div>
    </section>
  );
};

export default Hero;