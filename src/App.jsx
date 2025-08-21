
import { useEffect, useState } from 'react';
import './App.css';
import { Home } from './pages/Home';
import { backEnd } from './constants';

function App() {
  const tg = window.Telegram.WebApp;
  // const userPhotoUrl = tg.initDataUnsafe.photo_url;
  const [user, setUser] = useState();

  const platform = tg.platform;
  const isPhone = platform === 'android' || platform === 'ios';

  if (isPhone) {
    tg.expand?.();                 // раскрыть bottom-sheet на мобиле
    tg.disableVerticalSwipes?.();  // отключить свайп-вниз на мобиле
    tg.requestFullscreen?.();      // включить fullscreen на мобиле
  } else {
    tg.exitFullscreen?.();         // на всякий случай выключить, если поддерживается
    // тут — НИЧЕГО не делаем, оставляем стандартное окно
  }
  
  useEffect(() => {
    const user = tg.initDataUnsafe.user;
    
    fetch(`${backEnd}/user/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    }).then(res => res.json())
      .then(data => {
        setUser(data.streak);
        console.log('Авторизация:', data);
      });
  }, []);

  tg.expand();


  return (
    <div className="App">
      <div className='App__user_data'>
        <div>Добро пожаловать,</div>
        <div className='App__user_data_name'>{tg.initDataUnsafe.user.first_name}</div>
      </div>
      <Home streak={user}/>
      
    </div>

  );
}

export default App;
