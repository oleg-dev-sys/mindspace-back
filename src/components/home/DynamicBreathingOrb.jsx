import React from 'react';
import { motion } from 'framer-motion';
import { themeConfig, useTheme } from '../../context/ThemeContext';

export default function DynamicBreathingOrb({ size = 200, isAnimating = true }) {
  const { theme } = useTheme();
  const config = themeConfig[theme] ?? themeConfig.night;

  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    angle: (i * 360) / 12,
  }));

  const glowColor =
    theme === 'morning'
      ? 'rgba(147, 197, 253, 0.25)'
      : theme === 'night'
      ? 'rgba(109, 40, 217, 0.3)'
      : 'rgba(139, 92, 246, 0.22)';

  return (
    <div className='relative flex items-center justify-center' style={{ width: size, height: size }}>
      <motion.div
        className='absolute inset-[-100%] rounded-full'
        style={{
          background: `radial-gradient(circle at center, ${glowColor} 0%, transparent 70%)`,
          filter: 'blur(40px)',
          willChange: 'transform, opacity',
          transform: 'translateZ(0)',
        }}
        animate={isAnimating ? { scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className='absolute inset-0 rounded-full'
        style={{
          background: `radial-gradient(circle at center, ${glowColor} 0%, transparent 72%)`,
          filter: 'blur(30px)',
          willChange: 'transform, opacity',
          transform: 'translateZ(0)',
        }}
        animate={isAnimating ? { scale: [1, 1.4, 1], opacity: [0.4, 0.6, 0.4] } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className='absolute h-[2px] w-[2px] rounded-full bg-white/90'
          style={{
            left: '50%',
            top: '50%',
            filter: 'blur(1px)',
            willChange: 'transform, opacity',
          }}
          animate={
            isAnimating
              ? {
                  x: [0, Math.cos((particle.angle * Math.PI) / 180) * (size * 0.6)],
                  y: [0, Math.sin((particle.angle * Math.PI) / 180) * (size * 0.6)],
                  opacity: [0, 0.6, 0],
                  scale: [0, 1.5, 0],
                }
              : {}
          }
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeOut',
            delay: (particle.id * 4) / 12,
          }}
        />
      ))}

      <motion.div
        className={`absolute inset-8 rounded-full bg-gradient-to-br shadow-2xl ${config.orbGradient}`}
        style={{ willChange: 'transform' }}
        animate={isAnimating ? { scale: [1, 1.15, 1] } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className='absolute inset-12 rounded-full'
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, transparent 60%)',
          willChange: 'transform, opacity',
        }}
        animate={isAnimating ? { opacity: [0.3, 0.5, 0.3], scale: [0.9, 1, 0.9] } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
