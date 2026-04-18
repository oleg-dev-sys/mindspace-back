import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { backEnd } from '../constants';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [telegramUser, setTelegramUser] = useState(null);
  const [authData, setAuthData] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshAuth = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    refreshAuth();
  }, [refreshAuth]);

  const value = useMemo(
    () => ({
      user: telegramUser,
      authData,
      streak: authData?.streak,
      telegramId: telegramUser?.id,
      loading,
      refreshAuth,
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
