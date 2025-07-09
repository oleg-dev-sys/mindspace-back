import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import './Category.css';
// import meditations from '../data/meditations';
import { backEnd } from '../constants';

function Category() {
  const { id } = useParams(); // id категории (например, "morning")
  const [meditations, setMeditations] = useState([]);
  const [currentMeditation, setCurrentMeditation] = useState(null);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const navigate = useNavigate();

  const tg = window.Telegram.WebApp;

  useEffect(() => {
    fetch(`${backEnd}/meditations/by_category?category=${id}`)
      .then(res => res.json())
      .then(data => {
        setMeditations(data);
        setCurrentMeditation(data[0] || null);
      });
  }, [id]);

  const finishMeditation = () => {
    const telegram_id = tg.initDataUnsafe.user.id;
    setIsPlaying(false)
    fetch(`${backEnd}/meditations/finish`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        telegram_id,
        meditation_id: currentMeditation.id
      })
    }).then(res => res.json())
      .then(data => {
        console.log('Meditation complete!', data);
        // можно обновить streak на экране
      });
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

  if (!currentMeditation) return (
    <div className="category-container">
      <div className='App__header'>
        <button className='back-btn' onClick={() => navigate('/')}>← Назад</button> 
      </div>
      <p>Медитации не найдены...</p>
    </div>  
    )

  return (
    <div className="category-container">
      <div className='App__header'>
        <button className='back-btn' onClick={() => navigate('/')}>← Назад</button> 
      </div>
      {/* Анимация дыхания */}
      <div class="loader">
        <div class="inner one"></div>
        <div class="inner two"></div>
        <div class="inner three"></div>
      </div>
      
      {/* Плеер */}
      <h2>{currentMeditation.title}</h2>
      <audio ref={audioRef} src={`${backEnd}${currentMeditation.file}`} onEnded={finishMeditation} />
      <button className="play-btn" onClick={handlePlay}>
        {isPlaying ? '⏸️ Пауза' : '▶️ Играть'}
      </button>

      {/* Список других медитаций */}
      <h3 style={{ marginTop: 30 }}>Другие медитации:</h3>
      <div className='App__content_user_results'>
        <ul className="meditation-list">
          {meditations.map((m) => (
            <li key={m.id} onClick={() => selectMeditation(m)} className={m.id === currentMeditation.id ? 'active' : ''}>
              <strong>{m.title}</strong> <span>· {m.duration} мин</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Category;