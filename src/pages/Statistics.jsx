import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Trophy, Flame, TrendingUp, Calendar } from 'lucide-react';
import DynamicGlassCard from '../components/home/DynamicGlassCard';
import { useAuth } from '../context/AuthContext';
import { backEnd } from '../constants';

const toDateKey = (value) => {
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value;
  }

  const d = value instanceof Date ? value : new Date(value);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};


const buildWeekDays = (sessions) => {
  const now = new Date();
  const dayIndex = (now.getDay() + 6) % 7;
  const monday = new Date(now);
  monday.setDate(now.getDate() - dayIndex);

  const labels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  return labels.map((label, i) => {
    const day = new Date(monday);
    day.setDate(monday.getDate() + i);
    const key = toDateKey(day);
    const minutes = Math.round(
      sessions
        .filter((s) => toDateKey(s.date) === key)
        .reduce((acc, s) => acc + (s.duration_completed || 0), 0) / 60,
    );

    return { label, minutes };
  });
};

const calcStreak = (sessions) => {
  const doneDates = [
    ...new Set(
      sessions
        .filter((s) => s.completed)
        .map((s) => toDateKey(s.date)),
    ),
  ];

  if (!doneDates.length) return 0;

  let streak = 0;
  for (let i = 0; i < 365; i += 1) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = toDateKey(d);

    if (doneDates.includes(key)) {
      streak += 1;
    } else if (i > 0) {
      break;
    }
  }

  return streak;
};

export default function Statistics() {
  const { telegramId, streak: apiStreak } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!telegramId) {
      setSessions([]);
      setLoading(false);
      return;
    };

    let cancelled = false;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${backEnd}/meditations/sessions?telegram_id=${telegramId}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        if (!cancelled) setSessions(Array.isArray(data) ? data : []);
      } catch (e) {
        if (!cancelled) {
          setSessions([]);
          setError('Не удалось загрузить статистику');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [telegramId]);

  const totalMinutes = useMemo(
    () => Math.round(sessions.reduce((acc, s) => acc + (s.duration_completed || 0), 0) / 60),
    [sessions],
  );
  const completedSessions = useMemo(
    () => sessions.filter((s) => s.completed).length,
    [sessions],
  );
  const streak = apiStreak ?? calcStreak(sessions);

  const weekActivity = useMemo(() => buildWeekDays(sessions), [sessions]);
  const maxMinutes = Math.max(...weekActivity.map((d) => d.minutes), 30);
  const weekTotal = weekActivity.reduce((acc, d) => acc + d.minutes, 0);

  const weeklyGoal = 150;
  const goalProgress = Math.min((weekTotal / weeklyGoal) * 100, 100);

  return (
    <div className='mx-auto max-w-md px-6 pb-24 pt-12'>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className='mb-8 text-left'
      >
        <h1 className='mb-2 text-3xl font-bold text-white'>Статистика</h1>
        <p className='text-white/80'>Ваш путь осознанности</p>
      </motion.div>

      <div className='mb-6 grid grid-cols-3 gap-3'>
        <DynamicGlassCard className='p-3 text-center'>
          <p className='text-xs text-white/70'>Цель</p>
          <p className='text-xl font-bold text-white'>{Math.round(goalProgress)}%</p>
        </DynamicGlassCard>
        <DynamicGlassCard className='p-3 text-center'>
          <p className='text-xs text-white/70'>Сессий</p>
          <p className='text-xl font-bold text-white'>{completedSessions}</p>
        </DynamicGlassCard>
        <DynamicGlassCard className='p-3 text-center'>
          <p className='text-xs text-white/70'>Серия</p>
          <p className='text-xl font-bold text-white'>{streak}</p>
        </DynamicGlassCard>
      </div>

      <div className='mb-6 grid grid-cols-2 gap-3'>
        <DynamicGlassCard className='p-5 text-left'>
          <div className='mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/30 to-purple-600/30'>
            <Clock className='h-5 w-5 text-violet-400' />
          </div>
          <p className='mb-1 text-xs text-white/70'>Всего минут</p>
          <p className='text-2xl font-bold text-white'>{totalMinutes}</p>
        </DynamicGlassCard>

        <DynamicGlassCard className='p-5 text-left'>
          <div className='mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/30 to-orange-600/30'>
            <Trophy className='h-5 w-5 text-amber-400' />
          </div>
          <p className='mb-1 text-xs text-white/70'>Медитаций</p>
          <p className='text-2xl font-bold text-white'>{completedSessions}</p>
        </DynamicGlassCard>

        <DynamicGlassCard className='p-5 text-left'>
          <div className='mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500/30 to-pink-600/30'>
            <Flame className='h-5 w-5 text-rose-400' />
          </div>
          <p className='mb-1 text-xs text-white/70'>Серия</p>
          <p className='text-2xl font-bold text-white'>{streak} дн</p>
        </DynamicGlassCard>

        <DynamicGlassCard className='p-5 text-left'>
          <div className='mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/30 to-cyan-600/30'>
            <TrendingUp className='h-5 w-5 text-blue-400' />
          </div>
          <p className='mb-1 text-xs text-white/70'>За неделю</p>
          <p className='text-2xl font-bold text-white'>{weekTotal} м</p>
        </DynamicGlassCard>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <DynamicGlassCard className='mb-6 p-6'>
          <div className='mb-4 flex items-center gap-2'>
            <Calendar className='h-5 w-5 text-violet-400' />
            <h2 className='text-white font-semibold'>Активность за неделю</h2>
          </div>

          <div className='flex h-32 items-end justify-between gap-2'>
            {weekActivity.map((day, i) => (
              <div key={day.label} className='flex flex-1 flex-col items-center gap-2'>
                <div className='flex w-full flex-1 items-end'>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${day.minutes > 0 ? (day.minutes / maxMinutes) * 100 : 5}%` }}
                    transition={{ delay: 0.35 + i * 0.05, duration: 0.45 }}
                    className={`w-full rounded-lg ${
                      day.minutes > 0
                        ? 'bg-gradient-to-t from-violet-500 to-purple-500'
                        : 'bg-white/10'
                    }`}
                  />
                </div>
                <span className='text-xs text-white/60'>{day.label}</span>
              </div>
            ))}
          </div>
        </DynamicGlassCard>
      </motion.div>

      <DynamicGlassCard className='p-6 text-left'>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='font-semibold text-white'>Уровень осознанности</h2>
          <span className='text-2xl font-bold text-violet-400'>{Math.min(Math.floor(totalMinutes / 10), 99)}</span>
        </div>

        <div className='h-2 overflow-hidden rounded-full bg-white/10'>
          <motion.div
            className='h-full bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500'
            initial={{ width: 0 }}
            animate={{ width: `${Math.min((totalMinutes / 1000) * 100, 100)}%` }}
            transition={{ delay: 0.5, duration: 0.9 }}
          />
        </div>

        <p className='mt-3 text-sm text-white/80'>Продолжайте практиковать для роста</p>
      </DynamicGlassCard>
    </div>
  );
}
