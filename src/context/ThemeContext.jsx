import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const ThemeContext = createContext(null);
const SUPPORTED_THEMES = ['morning', 'afternoon', 'evening', 'night'];

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};

const getTimeBasedTheme = () => {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 18) return 'afternoon';
  if (hour >= 18 && hour < 22) return 'evening';
  return 'night';
};

const normalizeThemeMode = (value) => {
  if (value === 'auto') return 'auto';
  if (SUPPORTED_THEMES.includes(value)) return value;
  return 'auto';
};

export const themeConfig = {
  morning: {
    darkBg: '#1a1f2e',
    gradientFrom: 'rgba(147, 197, 253, 0.3)',
    gradientTo: 'rgba(253, 224, 71, 0.15)',
    auroraColors: [
      'rgba(147, 197, 253, 0.15)',
      'rgba(253, 224, 71, 0.12)',
      'rgba(134, 239, 172, 0.1)',
    ],
    orbGradient: 'from-blue-400 via-cyan-400 to-amber-300',
    glassGradient: 'linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.14))',
  },
  afternoon: {
    darkBg: '#0f1419',
    gradientFrom: 'rgba(59, 130, 246, 0.25)',
    gradientTo: 'rgba(14, 165, 233, 0.15)',
    auroraColors: [
      'rgba(59, 130, 246, 0.12)',
      'rgba(14, 165, 233, 0.1)',
      'rgba(56, 189, 248, 0.08)',
    ],
    orbGradient: 'from-sky-400 via-blue-400 to-indigo-400',
    glassGradient: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))',
  },
  evening: {
    darkBg: '#0a0a0f',
    gradientFrom: 'rgba(109, 40, 217, 0.4)',
    gradientTo: 'rgba(139, 92, 246, 0.3)',
    auroraColors: [
      'rgba(139, 92, 246, 0.18)',
      'rgba(99, 102, 241, 0.15)',
      'rgba(168, 85, 247, 0.12)',
    ],
    orbGradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
    glassGradient: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))',
  },
  night: {
    darkBg: '#000000',
    gradientFrom: 'rgba(30, 27, 75, 0.6)',
    gradientTo: 'rgba(15, 23, 42, 0.8)',
    auroraColors: [
      'rgba(109, 40, 217, 0.2)',
      'rgba(67, 56, 202, 0.18)',
      'rgba(79, 70, 229, 0.15)',
    ],
    orbGradient: 'from-indigo-600 via-violet-600 to-purple-700',
    glassGradient: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.08))',
  },
};

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(() => normalizeThemeMode(localStorage.getItem('visualMode') || 'auto'));
  const [resolvedTheme, setResolvedTheme] = useState(() =>
    themeMode === 'auto' ? getTimeBasedTheme() : themeMode,
  );

  useEffect(() => {
    const normalized = normalizeThemeMode(themeMode);
    if (normalized !== themeMode) {
      setThemeMode(normalized);
      return;
    }

    localStorage.setItem('visualMode', normalized);

    if (normalized !== 'auto') {
      setResolvedTheme(normalized);
      return;
    }

    setResolvedTheme(getTimeBasedTheme());
    const interval = setInterval(() => {
      setResolvedTheme(getTimeBasedTheme());
    }, 60000);

    return () => clearInterval(interval);
  }, [themeMode]);

  const value = useMemo(
    () => ({
      theme: resolvedTheme,
      themeMode,
      setThemeMode,
      config: themeConfig[resolvedTheme] ?? themeConfig.night,
    }),
    [resolvedTheme, themeMode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
