# Mind Space (Vite + React)

Проект переведён с Create React App на Vite.

## Скрипты

- `npm run dev` - запуск dev-сервера Vite (по умолчанию `http://localhost:3000`).
- `npm run build` - production-сборка в папку `build`.
- `npm run preview` - локальный просмотр production-сборки.

## Структура запуска

- Входной HTML: `index.html`
- Точка входа приложения: `src/main.jsx`
- Конфиг Vite: `vite.config.js`

## Примечания

- Файлы из папки `public` доступны по абсолютным путям (например, `/favicon.ico`).
- Переменные окружения для клиентского кода в Vite должны начинаться с префикса `VITE_`.
