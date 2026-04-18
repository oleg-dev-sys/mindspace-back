import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { backEnd } from '../constants';
import bridge from '@vkontakte/vk-bridge';
import { isVK } from '../utils/platform';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [telegramUser, setTelegramUser] = useState(null);
  const [vkUser, setVkUser] = useState(null);
  const [authData, setAuthData] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshAuth = useCallback(async () => {
    if (isVK) {
      try {
        setLoading(true);

        await bridge.send('VKWebAppInit');

        const userData = await bridge.send('VKWebAppGetUserInfo');
        setVkUser(userData);

        const res = await fetch(`${backEnd}/user/auth`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: userData.id,
            username: null,
            first_name: userData.first_name,
            platform: 'vk',
          }),
        });
        const data = await res.json();
        setAuthData(data);
      } catch (error) {
        console.error('VK Auth error:', error);
        setAuthData(null);
      } finally {
        setLoading(false);
      }

    } else {
      const tg = window.Telegram?.WebApp;
      const tgUser = tg?.initDataUnsafe?.user ?? null;

      setTelegramUser(tgUser);

      if (!tgUser) {
        setAuthData(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await fetch(`${backEnd}/user/auth`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(tgUser),
        });
        const data = await res.json();
        setAuthData(data);
      } catch (error) {
        console.error('Auth error:', error);
        setAuthData(null);
      } finally {
        setLoading(false);
      }
    };
  }, []);

  useEffect(() => {
    refreshAuth();
  }, [refreshAuth]);

  const unifiedUser = useMemo(() => {
    if (isVK && vkUser) {
      return {
        id: vkUser.id,
        first_name: vkUser.first_name,
        last_name: vkUser.last_name,
        photo_url: vkUser.photo_200 || vkUser.photo_100 || null,
        username: null,
      };
    }
    return telegramUser;
  }, [vkUser, telegramUser]);

  const value = useMemo(
    () => ({
      user: unifiedUser,
      authData,
      streak: authData?.streak,
      telegramId: unifiedUser?.id,
      loading,
      refreshAuth,
      isVK, 
    }),
    [telegramUser, authData, loading, refreshAuth],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
