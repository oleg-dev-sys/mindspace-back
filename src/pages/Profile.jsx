import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  User,
  Crown,
  Award,
  Star,
  LogOut,
  ChevronRight,
  Palette,
  Check,
} from 'lucide-react';
import DynamicGlassCard from '../components/home/DynamicGlassCard';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { isVK } from '../utils/platform';

const modes = [
  { id: 'auto', label: 'Авто (по времени)' },
  { id: 'morning', label: 'Утро' },
  { id: 'afternoon', label: 'День' },
  { id: 'evening', label: 'Вечер' },
  { id: 'night', label: 'Ночь' },
];

export default function Profile() {
  const { user, streak, authData } = useAuth();
  const avatarUrl = user?.photo_url || null;
  const { theme, themeMode, setThemeMode } = useTheme();

  const completedSessions = Number(authData?.completed ?? 0);
  const totalMinutes = Number(authData?.total_minutes ?? completedSessions * 7);

  const achievements = useMemo(
    () => [
      { icon: Star, label: 'Первая медитация', unlocked: completedSessions >= 1, color: 'from-yellow-500 to-amber-500' },
      { icon: Award, label: '10 сессий', unlocked: completedSessions >= 10, color: 'from-blue-500 to-cyan-500' },
      { icon: Crown, label: '100 минут', unlocked: totalMinutes >= 100, color: 'from-purple-500 to-pink-500' },
      { icon: Star, label: 'Серия 7 дней', unlocked: (streak ?? 0) >= 7, color: 'from-green-500 to-emerald-500' },
    ],
    [completedSessions, totalMinutes, streak],
  );

  // const handleLogout = () => {
  //   window.Telegram?.WebApp?.close?.();
  // };

  return (
    <div className='mx-auto max-w-md px-6 pb-24 pt-12'>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className='mb-8 text-left'
      >
        <h1 className='mb-2 text-3xl font-bold text-white'>Профиль</h1>
        <p className='text-white/80'>Управление аккаунтом</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <DynamicGlassCard className='mb-6 p-6'>
          <div className='flex items-center gap-4'>
            <div className='flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 text-3xl font-bold text-white shadow-lg shadow-violet-500/50'>
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={user?.first_name || 'Аватар'}
                  className='h-full w-full object-cover rounded-2xl'
                />
              ) : (
                <div className='flex h-full w-full items-center justify-center bg-gradient-to-br from-violet-500 to-purple-600 text-3xl font-bold text-white'>
                  {(user?.first_name?.[0] || 'U').toUpperCase()}
                </div>
              )}
            </div>
            <div className='flex-1 text-left'>
              <h2 className='mb-1 text-xl font-bold text-white'>{user?.first_name || 'Пользователь'}</h2>
              <p className='text-sm text-white/80'>{isVK ? 'ВК ID' : 'Telegram ID'} {user?.id ?? '—'}</p>
              <p className='mt-1 text-xs text-white/70'>Стрик: {streak ?? 0} дней</p>
            </div>
          </div>
        </DynamicGlassCard>
      </motion.div>

      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Link to='/premium'>
          <DynamicGlassCard className='relative mb-6 overflow-hidden p-6'>
            <div className='absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-amber-400/30 to-orange-500/30 blur-3xl' />

            <div className='relative flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600'>
                  <Crown className='h-6 w-6 text-white' />
                </div>
                <div className='text-left'>
                  <h3 className='font-semibold text-white'>Premium</h3>
                  <p className='text-sm text-white/80'>Разблокируйте все возможности</p>
                </div>
              </div>
              <ChevronRight className='h-6 w-6 text-white/60' />
            </div>
          </DynamicGlassCard>
        </Link>
      </motion.div> */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className='mb-6'
      >
        <h2 className='mb-3 text-left font-semibold text-white'>Достижения</h2>
        <div className='grid grid-cols-2 gap-3'>
          {achievements.map((achievement, i) => {
            const Icon = achievement.icon;
            return (
              <motion.div
                key={achievement.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.05 }}
              >
                <DynamicGlassCard className={`p-5 text-center ${!achievement.unlocked ? 'opacity-55' : ''}`}>
                  <div className={`mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${achievement.unlocked ? achievement.color : 'from-white/10 to-white/10'}`}>
                    <Icon className='h-6 w-6 text-white' />
                  </div>
                  <p className='text-xs font-medium text-white'>{achievement.label}</p>
                </DynamicGlassCard>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className='mb-6'
      >
        <h2 className='mb-3 flex items-center gap-2 text-left font-semibold text-white'>
          <Palette className='h-5 w-5' />
          Визуальный режим
        </h2>
        <div className='space-y-2'>
          {modes.map((mode) => (
            <DynamicGlassCard
              key={mode.id}
              onClick={() => setThemeMode(mode.id)}
              className={`cursor-pointer p-4 transition-all ${themeMode === mode.id ? 'ring-2 ring-violet-500/50' : ''}`}
            >
              <div className='flex items-center justify-between'>
                <span className='text-white'>{mode.label}</span>
                {themeMode === mode.id && <Check className='h-5 w-5 text-violet-400' />}
              </div>
            </DynamicGlassCard>
          ))}
        </div>
        <p className='mt-3 text-left text-xs text-white/70'>Текущая активная тема: {theme}</p>
      </motion.div>

      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className='mb-6 space-y-2'
      >
        <DynamicGlassCard className='cursor-pointer p-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <User className='h-5 w-5 text-white/60' />
              <span className='text-white'>Редактировать профиль</span>
            </div>
            <ChevronRight className='h-5 w-5 text-white/40' />
          </div>
        </DynamicGlassCard>
      </motion.div> */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        {/* <button
          onClick={handleLogout}
          className='flex w-full items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-6 py-4 font-semibold text-white backdrop-blur-xl transition hover:bg-white/15'
          type='button'
        >
          <LogOut className='h-5 w-5' />
          Выйти
        </button> */}
      </motion.div>
    </div>
  );
}
