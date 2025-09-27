import React, { useEffect, useRef } from 'react';
import { FiHome } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrame;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const stars = [];
    const starCount = Math.floor(canvas.width * canvas.height / 3000);

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        speed: Math.random() * 0.05
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach(star => {
        ctx.beginPath();
        ctx.fillStyle = `rgba(187, 134, 252, ${star.opacity})`;
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });

      const gradient = ctx.createRadialGradient(
        canvas.width * 0.75,
        canvas.height * 0.25,
        0,
        canvas.width * 0.75,
        canvas.height * 0.25,
        400
      );
      gradient.addColorStop(0, 'rgba(187, 134, 252, 0.05)');
      gradient.addColorStop(1, 'rgba(187, 134, 252, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#121212] pt-[68px] text-white">
      {/* Starfield background */}
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-20">
        <motion.h1 
          className="text-6xl md:text-7xl font-bold text-[#BB86FC] drop-shadow-md"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          404
        </motion.h1>

        <motion.p 
          className="mt-4 text-lg md:text-xl text-[#BBBBBB] max-w-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}>
          Oops! The page you're looking for doesn't exist or has been moved.
        </motion.p>
          <motion.div 
            className="absolute -top-32 -left-20 w-64 h-64 bg-[#BB86FC] rounded-full filter blur-[100px] opacity-10"
            animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
          />
          <div className="relative">
            <div className="absolute inset-0 bg-[#BB86FC] rounded-full filter blur-[100px] opacity-20 animate-pulse"></div>
            <div className="relative">
              <svg width="320" height="320" viewBox="0 0 400 400" className="drop-shadow-[0_0_30px_rgba(187,134,252,0.2)]">
                <circle cx="200" cy="200" r="120" fill="#1E1E1E" stroke="#2D2D2D" strokeWidth="2" />
                <circle cx="220" cy="180" r="30" fill="#2D2D2D" />
                <circle cx="160" cy="230" r="20" fill="#2D2D2D" />
                <circle cx="250" cy="240" r="15" fill="#2D2D2D" />

                <motion.g 
                  transform="translate(100, 100)"
                  animate={{ y: [0, -15, 0], rotate: [0, 5, 0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
                >
                  <circle cx="100" cy="100" r="15" fill="#ffffff" />
                  <rect x="85" y="115" width="30" height="40" rx="5" fill="#ffffff" />
                  <rect x="75" y="115" width="10" height="15" rx="3" fill="#ffffff" />
                  <rect x="115" y="115" width="10" height="15" rx="3" fill="#ffffff" />
                  <path d="M90 155 L85 180 L95 180 Z" fill="#ffffff" />
                  <path d="M110 155 L115 180 L105 180 Z" fill="#ffffff" />
                  <circle cx="95" cy="95" r="3" fill="#121212" />
                  <circle cx="105" cy="95" r="3" fill="#121212" />
                  <path d="M95 105 Q100 110 105 105" stroke="#121212" strokeWidth="2" fill="none" />
                </motion.g>

                <motion.g
                  transform="translate(300, 80)"
                  animate={{ x: [0, -20, 0], y: [0, 10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
                >
                  <circle cx="0" cy="0" r="8" fill="#BB86FC" />
                  <rect x="-15" y="-3" width="30" height="6" rx="3" fill="#BB86FC" />
                  <rect x="-3" y="-15" width="6" height="30" rx="3" fill="#BB86FC" />
                  <circle cx="0" cy="0" r="3" fill="#121212" />
                </motion.g>
              </svg>
            </div>
          </div>
        </div>
      </div>
  );
};

export default PageNotFound;
