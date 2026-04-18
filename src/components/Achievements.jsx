import React, { useEffect, useState } from 'react';
import { backEnd } from '../constants';
import { useAuth } from '../context/AuthContext';

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const { telegramId } = useAuth();

  useEffect(() => {
    if (!telegramId) return;

    fetch(`${backEnd}/user/achievements?telegram_id=${telegramId}`)
      .then((res) => res.json())
      .then((data) => setAchievements(data));
  }, [telegramId]);

  return (
    <div className='text-left'>
      <h2 className='mb-3 text-lg font-semibold text-white'>🏆 Достижения</h2>
      <ul className='list-none space-y-2 p-0'>
        {achievements.map((ach) => (
          <li
            key={ach.id}
            className={`rounded-2xl border bg-white/10 p-3 text-left backdrop-blur-sm ${
              ach.unlocked
                ? 'border-emerald-400/70 shadow-[inset_4px_0_0_0_rgba(16,185,129,0.8)]'
                : 'border-white/20 opacity-75 shadow-[inset_4px_0_0_0_rgba(148,163,184,0.8)]'
            }`}
          >
            <span className='block text-base font-bold text-white'>{ach.name}</span>
            <span className='text-sm text-white/75'>{ach.description}</span>
            <span className='mt-1 block text-xs text-white/80'>
              {ach.unlocked ? '✅ Получено' : '🔒 Заблокировано'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Achievements;
