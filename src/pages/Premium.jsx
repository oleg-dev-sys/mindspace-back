import React from 'react';
import { motion } from 'framer-motion';
import { Check, Crown, Sparkles, Shield, Infinity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DynamicGlassCard from '../components/home/DynamicGlassCard';

const features = [
  'Золотой визуальный режим',
  'Эксклюзивные медитации',
  'Расширенная статистика',
  'Персональные рекомендации',
  'Приоритетные обновления',
];

export default function Premium() {
  const navigate = useNavigate();

  return (
    <div className='mx-auto max-w-md px-6 pb-24 pt-12'>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className='mb-6 text-left'
      >
        <button
          type='button'
          onClick={() => navigate('/profile')}
          className='mb-4 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/90'
        >
          ← Назад
        </button>
        <h1 className='text-3xl font-bold text-white'>Premium</h1>
        <p className='mt-1 text-white/80'>Разблокируйте максимальные возможности приложения</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
        <DynamicGlassCard className='relative mb-5 overflow-hidden p-6'>
          <div className='absolute -right-10 -top-10 h-36 w-36 rounded-full bg-gradient-to-br from-amber-400/35 to-orange-500/25 blur-3xl' />
          <div className='relative'>
            <div className='mb-4 flex items-center gap-3'>
              <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600'>
                <Crown className='h-6 w-6 text-white' />
              </div>
              <div className='text-left'>
                <p className='text-lg font-semibold text-white'>MindSpace Premium</p>
                <p className='text-sm text-white/70'>Для глубокой практики и роста</p>
              </div>
            </div>

            <div className='mb-5 grid grid-cols-3 gap-2'>
              <div className='rounded-xl bg-white/10 p-3 text-center'>
                <Sparkles className='mx-auto mb-1 h-4 w-4 text-amber-300' />
                <p className='text-xs text-white'>Новые темы</p>
              </div>
              <div className='rounded-xl bg-white/10 p-3 text-center'>
                <Infinity className='mx-auto mb-1 h-4 w-4 text-violet-300' />
                <p className='text-xs text-white'>Без лимитов</p>
              </div>
              <div className='rounded-xl bg-white/10 p-3 text-center'>
                <Shield className='mx-auto mb-1 h-4 w-4 text-cyan-300' />
                <p className='text-xs text-white'>Приоритет</p>
              </div>
            </div>

            <div className='rounded-2xl border border-amber-300/30 bg-gradient-to-r from-amber-500/20 to-orange-500/20 p-4 text-left'>
              <p className='text-sm text-white/80'>Тариф</p>
              <p className='text-3xl font-bold text-white'>299 ₽ <span className='text-sm font-medium text-white/70'>/ месяц</span></p>
            </div>
          </div>
        </DynamicGlassCard>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <DynamicGlassCard className='mb-5 p-5'>
          <h2 className='mb-3 text-left font-semibold text-white'>Что входит</h2>
          <div className='space-y-2'>
            {features.map((item) => (
              <div key={item} className='flex items-center gap-2 text-left'>
                <Check className='h-4 w-4 text-emerald-400' />
                <span className='text-sm text-white/90'>{item}</span>
              </div>
            ))}
          </div>
        </DynamicGlassCard>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <button
          type='button'
          className='w-full rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-amber-500/40'
        >
          Подключить Premium
        </button>
      </motion.div>
    </div>
  );
}
