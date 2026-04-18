import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

export default function DynamicBackground() {
  const { config } = useTheme();

  return (
    <>
      <motion.div
        className='absolute inset-0'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        style={{ backgroundColor: config.darkBg, willChange: 'opacity' }}
      />

      <motion.div
        className='absolute inset-0'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        style={{
          background: `radial-gradient(ellipse at top, ${config.gradientFrom} 0%, transparent 60%), radial-gradient(ellipse at bottom, ${config.gradientTo} 0%, transparent 65%)`,
          willChange: 'opacity',
        }}
      />

      <div className='pointer-events-none absolute inset-0 overflow-hidden'>
        {config.auroraColors.map((color, i) => (
          <motion.div
            key={i}
            className='absolute rounded-full'
            style={{
              width: '150%',
              height: '150%',
              background: `radial-gradient(ellipse at center, ${color} 0%, transparent 50%)`,
              filter: 'blur(80px)',
              top: i === 0 ? '-50%' : i === 1 ? 'auto' : '25%',
              left: i === 0 ? '-25%' : i === 1 ? 'auto' : '33%',
              bottom: i === 1 ? '-50%' : 'auto',
              right: i === 1 ? '-25%' : 'auto',
              willChange: 'transform, opacity',
              transform: 'translateZ(0)',
            }}
            animate={{
              x: [0, i % 2 ? -80 : 100, 0],
              y: [0, i % 2 ? 60 : -50, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 35 + i * 5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 4,
            }}
          />
        ))}
      </div>
    </>
  );
}
