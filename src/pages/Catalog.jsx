import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Moon, Brain, Sun, Heart, Leaf, Sparkles, Play, Clock, Waves } from 'lucide-react';
import DynamicGlassCard from '../components/home/DynamicGlassCard';
import categoriesData from '../data/categories';
import { backEnd } from '../constants';
import { mockMeditations } from '../mocks/mockData';

const categoryConfig = {
  sleep: { icon: Moon, gradient: 'from-indigo-500/80 to-purple-600/80', label: 'Сон' },
  stress: { icon: Leaf, gradient: 'from-emerald-400/80 to-teal-500/80', label: 'Антистресс' },
  focus: { icon: Brain, gradient: 'from-amber-400/80 to-orange-500/80', label: 'Фокус' },
  morning: { icon: Sun, gradient: 'from-rose-400/80 to-pink-500/80', label: 'Утро' },
  anxiety: { icon: Heart, gradient: 'from-violet-400/80 to-purple-500/80', label: 'Спокойствие' },
  energy: { icon: Sparkles, gradient: 'from-orange-400/80 to-red-500/80', label: 'Энергия' },
  silent: { icon: Waves, gradient: 'from-cyan-400/80 to-blue-500/80', label: 'Без слов' },
};

const normalizeMeditation = (m, idx) => ({
  id: m.id ?? `local-${idx}`,
  title: m.title ?? 'Медитация',
  description: m.description ?? 'Описание пока недоступно.',
  duration: Number.parseInt(m.duration, 10) || 5,
  category: m.category ?? 'morning',
});

export default function Catalog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [meditations, setMeditations] = useState(mockMeditations);

  useEffect(() => {
    fetch(`${backEnd}/meditation/all`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length) {
          setMeditations(data.map(normalizeMeditation));
        }
      })
      .catch(() => {
        setMeditations(mockMeditations);
      });
  }, []);

  const filteredMeditations = useMemo(() => {
    return meditations.filter((m) => {
      const matchesSearch =
        !searchQuery ||
        m.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || m.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [meditations, searchQuery, selectedCategory]);

  const categories = useMemo(
    () => categoriesData.map((c) => c.id).filter((id) => categoryConfig[id]),
    [],
  );

  return (
    <div className='mx-auto max-w-md px-6 pb-24 pt-12'>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className='mb-6'
      >
        <h1 className='mb-6 text-3xl font-bold text-white'>Каталог</h1>

        <div className='relative'>
          <Search className='absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40' />
          <input
            placeholder='Поиск медитаций...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='h-14 w-full rounded-2xl border border-white/20 bg-white/10 pl-12 pr-4 text-white placeholder:text-white/40 backdrop-blur-xl outline-none focus:ring-2 focus:ring-violet-500/50'
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className='mb-6'
      >
        <div className='hide-scrollbar flex gap-2 overflow-x-auto pb-2'>
          <button
            onClick={() => setSelectedCategory(null)}
            className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium transition-all ${
              !selectedCategory
                ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/50'
                : 'bg-white/10 text-white/70 backdrop-blur-xl'
            }`}
            type='button'
          >
            Все
          </button>
          {categories.map((cat) => {
            const config = categoryConfig[cat];
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? `bg-gradient-to-r ${config.gradient} text-white shadow-lg`
                    : 'bg-white/10 text-white/70 backdrop-blur-xl'
                }`}
                type='button'
              >
                {config.label}
              </button>
            );
          })}
        </div>
      </motion.div>

      <p className='mb-4 text-left text-sm text-white/70'>Найдено: {filteredMeditations.length}</p>

      <div className='space-y-3'>
        {filteredMeditations.map((meditation, i) => {
          const config = categoryConfig[meditation.category] || categoryConfig.morning;
          const Icon = config.icon;
          return (
            <motion.div
              key={meditation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link to={`/category/${meditation.category}`}>
                <DynamicGlassCard className='p-5'>
                  <div className='flex items-center gap-4'>
                    <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${config.gradient}`}>
                      <Icon className='h-8 w-8 text-white' />
                    </div>

                    <div className='min-w-0 flex-1 text-left'>
                      <h3 className='mb-1 truncate font-semibold text-white'>{meditation.title}</h3>
                      <p className='line-clamp-1 text-sm text-white/80'>{meditation.description}</p>
                      <div className='mt-2 flex items-center gap-1 text-xs text-white/70'>
                        <Clock className='h-3 w-3' />
                        {meditation.duration} мин
                      </div>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/50'
                    >
                      <Play className='ml-0.5 h-5 w-5 fill-white text-white' />
                    </motion.div>
                  </div>
                </DynamicGlassCard>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {filteredMeditations.length === 0 && (
        <div className='py-16 text-center'>
          <Search className='mx-auto mb-4 h-16 w-16 text-white/20' />
          <p className='text-white/50'>Ничего не найдено</p>
        </div>
      )}
    </div>
  );
}
