import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { backEnd } from '../constants';
import { useAuth } from '../context/AuthContext';
import DynamicGlassCard from '../components/home/DynamicGlassCard';

function Category() {
  const { id } = useParams();
  const [meditations, setMeditations] = useState([]);
  const [currentMeditation, setCurrentMeditation] = useState(null);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const navigate = useNavigate();
  const { telegramId, refreshAuth } = useAuth();
  const [isFinishing, setIsFinishing] = useState(false);

  useEffect(() => {
    fetch(`${backEnd}/meditations/by_category?category=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMeditations(data);
        setCurrentMeditation(data[0] || null);
      });
  }, [id]);

  const finishMeditation = async () => {
    if (!telegramId || !currentMeditation?.id || isFinishing) return;

    try {
      setIsFinishing(true);

      const res = await fetch(`${backEnd}/meditations/finish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          telegram_id: telegramId,
          meditation_id: currentMeditation.id,
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      await res.json();
      await refreshAuth();
    } finally {
      setIsFinishing(false);
    }
  };

  const handlePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const selectMeditation = (med) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setCurrentMeditation(med);
    setIsPlaying(false);
  };

  return (
    <div className='mx-auto max-w-md px-6 pb-24 pt-12'>
      <div className='mb-5 flex justify-start'>
        <button
          className='rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-xl'
          onClick={() => navigate('/catalog')}
          type='button'
        >
          ← К каталогу
        </button>
      </div>

      {!currentMeditation ? (
        <DynamicGlassCard className='p-6 text-left text-white'>Медитации не найдены...</DynamicGlassCard>
      ) : (
        <>
          <div className='relative mx-auto mb-6 h-[130px] w-[130px] rounded-full [perspective:800px]'>
            <div className='absolute inset-0 box-border rounded-full border-b-[6px] border-b-[#1733b8] [animation:rotate-one_6s_linear_infinite]' />
            <div className='absolute inset-0 box-border rounded-full border-r-[6px] border-r-[#7f03bb] [animation:rotate-two_6s_linear_infinite]' />
            <div className='absolute inset-0 box-border rounded-full border-t-[6px] border-t-[#48f2fb] [animation:rotate-three_6s_linear_infinite]' />
          </div>

          <DynamicGlassCard className='mb-5 p-6 text-left'>
            <h2 className='mb-2 text-2xl font-bold text-white'>{currentMeditation.title}</h2>
            <p className='mb-5 text-sm text-white/70'>{currentMeditation.duration} мин</p>
            <audio ref={audioRef} src={`${backEnd}${currentMeditation.file}`} onEnded={finishMeditation} />
            <button
              className='w-full rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-violet-500/40'
              onClick={handlePlay}
              type='button'
            >
              {isPlaying ? '⏸️ Пауза' : '▶️ Играть'}
            </button>
          </DynamicGlassCard>

          <DynamicGlassCard className='p-5'>
            <h3 className='mb-3 text-left text-lg font-semibold text-white'>Другие медитации</h3>
            <ul className='list-none space-y-2 p-0 text-left'>
              {meditations.map((m) => (
                <li
                  key={m.id}
                  onClick={() => selectMeditation(m)}
                  className={`cursor-pointer rounded-2xl border border-white/10 p-3 text-white transition ${
                    m.id === currentMeditation.id
                      ? 'bg-white/25 font-semibold'
                      : 'bg-white/8 hover:bg-white/15'
                  }`}
                >
                  <strong>{m.title}</strong> <span className='text-white/70'>· {m.duration} мин</span>
                </li>
              ))}
            </ul>
          </DynamicGlassCard>
        </>
      )}
    </div>
  );
}

export default Category;
