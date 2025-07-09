import React, { useEffect, useState } from 'react';
import './Achievements.css';
import { backEnd } from '../constants';

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const tg = window.Telegram.WebApp;
  
  useEffect(() => {
    // const telegram_id = localStorage.getItem('telegram_id');
    const telegram_id = tg.initDataUnsafe.user.id;
    fetch(`${backEnd}/user/achievements?telegram_id=${telegram_id}`)
      .then(res => res.json())
      .then(data => setAchievements(data));
  }, []);

  return (
    <div className="achievements-container">
      <h2>🏆 Достижения</h2>
      <ul className="achievement-list">
        {achievements.map((ach) => (
          <li key={ach.id} className={ach.unlocked ? 'unlocked' : 'locked'}>
            <span className="ach-name">{ach.name}</span>
            <span className="ach-desc">{ach.description}</span>
            <span className="ach-status">{ach.unlocked ? '✅ Получено' : '🔒 Заблокировано'}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Achievements;