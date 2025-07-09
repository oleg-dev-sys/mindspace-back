import React, { useState, useEffect } from 'react';
import './MoodTracker.css';
import { backEnd } from '../constants';

const moods = [
  { emoji: '😊', label: 'Хорошо' },
  { emoji: '😐', label: 'Нормально' },
  { emoji: '😞', label: 'Грустно' },
  { emoji: '😡', label: 'Злость' },
  { emoji: '😴', label: 'Устал' },
];

const getToday = () => new Date().toISOString().slice(0, 10);

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const today = getToday();

  const tg = window.Telegram.WebApp;

  useEffect(() => {
    const telegram_id = tg.initDataUnsafe.user.id;
    fetch(`${backEnd}/mood/today?telegram_id=${telegram_id}`)
      .then(res => res.json())
      .then(data => setSelectedMood(data.mood));
  }, [])

  const handleMoodSelect = (emoji) => {
    if (!selectedMood) {
      const telegram_id = tg.initDataUnsafe.user.id;
  
      fetch(`${backEnd}/mood/set`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ telegram_id, mood: emoji })
      });
  
      // localStorage.setItem(`mood-${today}`, emoji);
      setSelectedMood(emoji);
    }
  };

  // useEffect(() => {
  //   const savedMood = localStorage.getItem(`mood-${today}`);
  //   if (savedMood) {
  //     setSelectedMood(savedMood);
  //   }
  // }, [today]);

  return (
    <div className="mood-container">
      <h3>🧠 Как вы себя чувствуете сегодня?</h3>
      {selectedMood ? (
        <p>Сегодня вы отметили: <span className="mood-big">{selectedMood}</span></p>
      ) : (
        <div className="mood-list">
          {moods.map((mood) => (
            <button
              key={mood.emoji}
              className="mood-btn"
              onClick={() => handleMoodSelect(mood.emoji)}
              title={mood.label}
            >
              {mood.emoji}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MoodTracker;