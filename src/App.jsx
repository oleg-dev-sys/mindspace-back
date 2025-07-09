
import { useEffect, useState } from 'react';
import './App.css';
import { Home } from './pages/Home';
import { backEnd } from './constants';

function App() {
  const tg = window.Telegram.WebApp;
  // const userPhotoUrl = tg.initDataUnsafe.photo_url;
  const [user, setUser] = useState();

  tg.requestFullscreen();
  tg.disableVerticalSwipes();
  
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
        // tg.setItem('telegram_id', user.id);
        // localStorage.setItem('telegram_id', user.id);
      });
  }, []);

  tg.expand();


  return (
    <div className="App">
      {/* <div className='App__header'>
        <button onClick={() => tg.close()}>Закрыть</button>
      </div> */}
      <div className='App__user_data'>
        <div>Добро пожаловать,</div>
        <div className='App__user_data_name'>{tg.initDataUnsafe.user.first_name}</div>
      </div>
      <Home streak={user}/>
      
    </div>

  );
}

export default App;
