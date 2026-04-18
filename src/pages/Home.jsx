import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Moon, Brain, Sun, Heart, Leaf, Sparkles, Play, ChevronRight, Waves } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { backEnd } from '../constants';
import categoriesData from '../data/categories';
import { mockMeditations } from '../mocks/mockData';
import DynamicBreathingOrb from '../components/home/DynamicBreathingOrb';
import DynamicGlassCard from '../components/home/DynamicGlassCard';
import { isVK } from '../utils/platform';

const categoryConfig = {
  sleep: { icon: Moon, gradient: 'from-indigo-500/80 to-purple-600/80', label: 'Сон' },
  stress: { icon: Leaf, gradient: 'from-emerald-400/80 to-teal-500/80', label: 'Антистресс' },
  focus: { icon: Brain, gradient: 'from-amber-400/80 to-orange-500/80', label: 'Фокус' },
  morning: { icon: Sun, gradient: 'from-rose-400/80 to-pink-500/80', label: 'Утро' },
  energy: { icon: Sparkles, gradient: 'from-orange-400/80 to-red-500/80', label: 'Энергия' },
  anxiety: { icon: Heart, gradient: 'from-violet-400/80 to-purple-500/80', label: 'Спокойствие' },
  silent: { icon: Waves, gradient: 'from-cyan-400/80 to-blue-500/80', label: 'Без слов' },
};

export const Home = () => {
  const { user, streak, telegramId } = useAuth();
  const [meditations, setMeditations] = useState(mockMeditations);

  useEffect(() => {
    fetch(`${backEnd}/meditation/all`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length) {
          setMeditations(data);
        }
      })
      .catch(() => {
        setMeditations(mockMeditations);
      });
  }, []);

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Доброе утро';
    if (hour < 18) return 'Добрый день';
    return 'Добрый вечер';
  };

  const topMeditation = meditations[0] || mockMeditations[0];
  const totalMinutes = streak ? streak * 5 : 0;

  const categories = useMemo(() => {
    return categoriesData.map((c) => ({ ...c, config: categoryConfig[c.id] || categoryConfig.morning }));
  }, []);

  return (
    <div className='relative min-h-screen overflow-hidden'>
      <div className='relative z-10 mx-auto max-w-md px-6 pb-24 pt-12'>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className='mb-8'
        >
          <p className='mb-1 text-sm text-white/70'>{greeting()}</p>
          <h1 className='text-4xl font-bold tracking-tight text-white'>
            {user?.first_name || 'Добро пожаловать'}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
          className='mb-10 flex flex-col items-center'
        >
          <DynamicBreathingOrb size={240} />
          <motion.p
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className='mt-8 text-sm font-light tracking-wide text-white/70'
          >
            Дышите глубоко и спокойно
          </motion.p>
        </motion.div>

        <DynamicGlassCard className='mb-6 p-5'>
          <div className='flex items-center justify-between'>
            <div className='text-left'>
              <p className='mb-1 text-xs text-white/70'>Медитировано сегодня</p>
              <p className='text-2xl font-bold text-white'>{totalMinutes} мин</p>
            </div>
            <div className='flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-600/20'>
              <Sparkles className='h-8 w-8 text-violet-400' />
            </div>
          </div>
        </DynamicGlassCard>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className='mb-6'
        >
          <h2 className='text-white text-lg font-semibold mb-3'>Медитация дня</h2>
          <Link to={`/category/${topMeditation.category}`}>
            <DynamicGlassCard className='p-6'>
              <div className='flex items-center justify-between mb-4'>
                <div className='flex-1 text-left'>
                  <p className='text-white font-semibold text-lg mb-1'>{topMeditation.title}</p>
                  <p className='text-white/80 text-sm'>{topMeditation.duration} минут</p>
                </div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className='w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/50'
                >
                  <Play className='w-6 h-6 text-white fill-white ml-0.5' />
                </motion.div>
              </div>
              <p className='text-white/70 text-sm line-clamp-2'>{topMeditation.description ?? 'Описание пока недоступно'}</p>
            </DynamicGlassCard>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className='mb-6'
        >
          <div className='mb-3 flex items-center justify-between'>
            <h2 className='text-lg font-semibold text-white'>Категории</h2>
            <Link to='/catalog' className='flex items-center gap-1 text-sm text-violet-400'>
              Все <ChevronRight className='h-4 w-4' />
            </Link>
          </div>
          <div className='grid grid-cols-3 gap-3'>
            {categories.slice(0, 6).map((cat, i) => {
              const Icon = cat.config.icon;
              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                >
                  <Link to={`/category/${cat.id}`}>
                    <DynamicGlassCard className='p-4 text-center'>
                      <div className={`mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${cat.config.gradient}`}>
                        <Icon className='h-6 w-6 text-white' />
                      </div>
                      <p className='text-xs font-medium text-white/90'>{cat.config.label}</p>
                    </DynamicGlassCard>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className='mb-3 text-left text-lg font-semibold text-white'>Прогресс</h2>
          <DynamicGlassCard className='p-4'>
            <div className='flex items-center justify-between'>
              <div className='text-left'>
                <p className='text-sm text-white'>{isVK ? 'ВК ID' : 'Telegram ID'}</p>
                <p className='text-xs text-white/70'>{telegramId ?? '—'}</p>
              </div>
              <div className='rounded-full bg-green-500/20 px-3 py-1 text-xs text-green-300'>
                Стрик: {streak ?? 0}
              </div>
            </div>
          </DynamicGlassCard>
        </motion.div>
      </div>
    </div>
  );
};
