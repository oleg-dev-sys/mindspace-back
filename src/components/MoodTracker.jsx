import React, { useState, useEffect } from 'react';
import { backEnd } from '../constants';
import { useAuth } from '../context/AuthContext';

const moods = [
  { emoji: '😊', label: 'Хорошо' },
  { emoji: '😐', label: 'Нормально' },
  { emoji: '😞', label: 'Грустно' },
  { emoji: '😡', label: 'Злость' },
  { emoji: '😴', label: 'Устал' },
];

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const { telegramId } = useAuth();

  useEffect(() => {
    if (!telegramId) return;

    fetch(`${backEnd}/mood/today?telegram_id=${telegramId}`)
      .then((res) => res.json())
      .then((data) => setSelectedMood(data.mood));
  }, [telegramId]);

  const handleMoodSelect = (emoji) => {
    if (!selectedMood && telegramId) {
      fetch(`${backEnd}/mood/set`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ telegram_id: telegramId, mood: emoji }),
      });

      setSelectedMood(emoji);
    }
  };

  return (
    <div className='text-left'>
      <h3 className='mb-3 text-base font-semibold text-white'>🧠 Как вы себя чувствуете сегодня?</h3>
      {selectedMood ? (
        <p className='text-white/90'>
          Сегодня вы отметили: <span className='text-3xl'>{selectedMood}</span>
        </p>
      ) : (
        <div className='mt-2 flex flex-wrap justify-between gap-2'>
          {moods.map((mood) => (
            <button
              key={mood.emoji}
              className='rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-2xl transition hover:scale-110'
              onClick={() => handleMoodSelect(mood.emoji)}
              title={mood.label}
              type='button'
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
