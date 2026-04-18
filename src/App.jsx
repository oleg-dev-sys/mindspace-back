import { useEffect } from 'react';
import { Home } from './pages/Home';
import bridge from '@vkontakte/vk-bridge';
import { isVK } from './utils/platform';

function App() {
  useEffect(() => {
    if (isVK) {
      bridge.send('VKWebAppInit');
    } else {
      const tg = window.Telegram?.WebApp;
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
    }
  }, []);

  return <Home />;
}

export default App;
