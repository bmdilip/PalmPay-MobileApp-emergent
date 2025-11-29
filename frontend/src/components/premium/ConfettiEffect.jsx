import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ConfettiEffect = ({ active = false, duration = 3000 }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (active) {
      const newParticles = Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -20,
        rotation: Math.random() * 360,
        color: ['#00C8D6', '#008B95', '#586BFF', '#8B8FFF', '#10B981', '#F59E0B'][Math.floor(Math.random() * 6)],
        size: Math.random() * 10 + 5
      }));
      setParticles(newParticles);

      const timer = setTimeout(() => {
        setParticles([]);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [active, duration]);

  if (!active || particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          initial={{
            x: particle.x,
            y: particle.y,
            rotate: particle.rotation,
            opacity: 1
          }}
          animate={{
            y: window.innerHeight + 20,
            rotate: particle.rotation + 720,
            opacity: [1, 1, 0]
          }}
          transition={{
            duration: duration / 1000,
            ease: 'easeIn'
          }}
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            borderRadius: '2px'
          }}
        />
      ))}
    </div>
  );
};

export default ConfettiEffect;