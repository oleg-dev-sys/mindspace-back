import { useEffect } from 'react';
import { Home } from './pages/Home';

function App() {
  const tg = window.Telegram?.WebApp;

  useEffect(() => {
    if (!tg) return;

    const platform = tg.platform;
    const isPhone = platform === 'android' || platform === 'ios';

    if (isPhone) {
      tg.expand?.();
      tg.disableVerticalSwipes?.();
      tg.requestFullscreen?.();
    } else {
      tg.exitFullscreen?.();
    }
  }, [tg]);

  return <Home />;
}

export default App;
