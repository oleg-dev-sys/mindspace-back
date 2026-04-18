import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

export default function DynamicGlassCard({ children, className = '', onClick, ...props }) {
  const { config } = useTheme();

  return (
    <motion.div
      whileHover={{ scale: 1.01, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      transition={{ type: 'spring', stiffness: 280, damping: 24 }}
      className={`relative overflow-hidden rounded-3xl border border-white/25 backdrop-blur-2xl ${className}`}
      style={{
        background: config.glassGradient,
        boxShadow:
          '0 10px 30px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.12)',
        willChange: 'transform',
      }}
      {...props}
    >
      <div
        className='absolute inset-0 opacity-[0.015]'
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")',
        }}
      />
      <div className='absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent' />
      <div className='absolute inset-0 -translate-x-full animate-[shimmer_4s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent' />
      <div className='relative z-10'>{children}</div>
    </motion.div>
  );
}
