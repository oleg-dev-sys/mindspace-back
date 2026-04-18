
export function detectPlatform() {
  const params = new URLSearchParams(window.location.search);
  
  if (params.has('vk_user_id') || params.has('vk_app_id')) {
    return 'vk';
  }
  
  if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
    return 'telegram';
  }
  
  // Fallback для локальной разработки
  return 'unknown';
}

export const platform = detectPlatform();
export const isVK = platform === 'vk';
export const isTelegram = platform === 'telegram';