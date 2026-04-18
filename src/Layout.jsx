import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Home, Search, BarChart3, User } from 'lucide-react';
import { motion } from 'framer-motion';
import DynamicBackground from './components/home/DynamicBackground';

const navItems = [
  { path: '/', icon: Home, label: 'Главная' },
  { path: '/catalog', icon: Search, label: 'Каталог' },
  { path: '/statistics', icon: BarChart3, label: 'Статистика' },
  { path: '/profile', icon: User, label: 'Профиль' },
];

export default function Layout() {
  const location = useLocation();
  const hideNav = location.pathname.startsWith('/category/') || location.pathname === '/admin';

  return (
    <div className='relative min-h-screen'>
      <DynamicBackground />

      <div className='relative z-10 min-h-screen mb-8'>
        <Outlet />
      </div>

      {!hideNav && (
        <motion.nav
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className='fixed bottom-0 left-0 right-0 z-50'
        >
          <div className='px-6 pb-6'>
            <div className='relative mx-auto max-w-md overflow-hidden rounded-3xl border border-white/30 bg-white/15 backdrop-blur-2xl shadow-2xl'>
              <div className='absolute inset-0 -translate-x-full animate-[shimmer_3s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent' />

              <div className='relative flex items-center justify-around px-4 py-4'>
                {navItems.map((item) => {
                  const isActive =
                    item.path === '/'
                      ? location.pathname === '/'
                      : location.pathname.startsWith(item.path);

                  return (
                    <Link key={item.path} to={item.path} className='flex flex-col items-center gap-1'>
                      <motion.div
                        whileTap={{ scale: 0.9 }}
                        className={`relative rounded-2xl p-3 transition-all ${
                          isActive
                            ? 'bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/50'
                            : 'text-white/70'
                        }`}
                      >
                        <item.icon className={`h-5 w-5 ${isActive ? 'text-white' : ''}`} />
                        {isActive && (
                          <motion.div
                            layoutId='activeTab'
                            className='absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600'
                          />
                        )}
                      </motion.div>
                      <span className={`text-xs font-medium ${isActive ? 'text-white' : 'text-white/70'}`}>
                        {item.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.nav>
      )}
    </div>
  );
}
