import React, { useState, useEffect } from 'react';
import { backEnd } from '../constants';
import categories from '../data/categories';
import DynamicGlassCard from '../components/home/DynamicGlassCard';

const inputClass =
  'w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-white placeholder:text-white/60 outline-none';

const AdminPanel = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [duration, setDuration] = useState('');
  const [meditations, setMeditations] = useState([]);
  const [auth, setAuth] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const password = prompt('Введите пароль администратора:');
    if (!password) return;
    if (password === 'mindadmin123') {
      setAdminPassword(password);
      setAuth(true);
      fetchMeditations();
    }
  }, []);

  const fetchMeditations = async () => {
    try {
      const res = await fetch(`${backEnd}/meditation/all`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setMeditations(Array.isArray(data) ? data : []);
    } catch {
      setMeditations([]);
      setStatusMessage('Не удалось загрузить список медитаций');
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setStatusMessage('');

    if (!file || !title || !category || !duration) {
      setStatusMessage('Заполните файл, название, категорию и длительность');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('category', category);
    formData.append('duration', duration);
    formData.append('description', description);

    try {
      setIsUploading(true);

      const res = await fetch(`${backEnd}/admin/upload`, {
        method: 'POST',
        headers: {
          'X-Admin-Password': adminPassword,
        },
        body: formData,
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.detail || 'Не удалось загрузить медитацию');
      }

      setFile(null);
      setTitle('');
      setCategory('');
      setDuration('');
      setDescription('');
      setStatusMessage('Медитация успешно загружена');

      await fetchMeditations();
    } catch (error) {
      setStatusMessage(error.message || 'Ошибка загрузки');
    } finally {
      setIsUploading(false);
    }
  };

  if (!auth) {
    return <DynamicGlassCard className='w-full p-6 text-center text-white'>Доступ запрещён</DynamicGlassCard>;
  }

  return (
    <>
      <DynamicGlassCard className='mb-5 p-5 text-left'>
        <h3 className='mb-4 text-lg font-semibold text-white'>📤 Загрузка медитации</h3>
        <form onSubmit={handleUpload} className='space-y-3'>
          <input type='file' onChange={(e) => setFile(e.target.files?.[0] || null)} required className={inputClass} />
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Название'
            className={inputClass}
            required
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={inputClass}
            required
          >
            <option value='' className='text-black'>Выберите категорию</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id} className='text-black'>
                {cat.label}
              </option>
            ))}
          </select>
          <input
            type='text'
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder='Длительность (например: 5 мин)'
            className={inputClass}
          />
          <button
            type='submit'
            disabled={isUploading}
            className='w-full rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 px-4 py-2 font-semibold text-white shadow-lg shadow-violet-500/40 disabled:opacity-60'
          >
            {isUploading ? 'Загружаю...' : 'Загрузить'}
          </button>
        </form>
      </DynamicGlassCard>

      <DynamicGlassCard className='p-5 text-left'>
        <h3 className='mb-4 text-lg font-semibold text-white'>🎧 Все медитации</h3>
        <div className='space-y-2'>
          {Array.isArray(meditations) && meditations.length > 0 ? (
            meditations.map((m) => (
              <div key={m.id} className='rounded-xl border border-white/15 bg-white/10 p-3 text-sm text-white'>
                <div className='font-semibold'>{m.title}</div>
                <div className='text-white/70'>{m.category} · {m.duration}</div>
                <a href={m.file} target='_blank' rel='noreferrer' className='text-violet-300'>
                  Открыть файл
                </a>
              </div>
            ))
          ) : (
            <div className='rounded-xl border border-white/15 bg-white/10 p-3 text-white/80'>
              Нет данных или загрузки...
            </div>
          )}
        </div>
      </DynamicGlassCard>
    </>
  );
};

export default AdminPanel;
