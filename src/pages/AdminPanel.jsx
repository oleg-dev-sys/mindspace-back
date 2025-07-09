import React, { useState, useEffect } from 'react';
import { backEnd } from '../constants';
import categories from '../data/categories';

const AdminPanel = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [duration, setDuration] = useState('');
  const [meditations, setMeditations] = useState([]);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const password = prompt("Введите пароль администратора:");
    if (password === "mindadmin123") {
      setAuth(true);
      fetchMeditations();
    }
  }, []);

  const fetchMeditations = () => {
    fetch(`${backEnd}/meditation/all`)
      .then(res => res.json())
      .then(data => setMeditations(data));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !title || !category) {
      // console.log('Ошибка: Не все поля заполнены');
      return;
    }  

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("category", category);
    formData.append("duration", duration);

    // await fetch(`${backEnd}/admin/upload`, {
    //   method: "POST",
    //   body: formData
    // });
    await fetch(`http://127.0.0.1:8000/api/admin/upload`, {
      method: "POST",
      body: formData
    });

    setFile(null); setTitle(''); setCategory(''); setDuration('');
    fetchMeditations();
  };

  if (!auth) return <p>Доступ запрещён</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>📤 Загрузка медитации</h2>
      <form onSubmit={handleUpload} style={{ marginBottom: 40 }}>
        <input type="file" onChange={e => setFile(e.target.files[0])} required />
        <br />
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Название"
          required
        />
        <br />
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          required
        >
          <option value="">Выберите категорию</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.label}
            </option>
          ))}
        </select>   
        <br />
        <input
          type="text"
          value={duration}
          onChange={e => setDuration(e.target.value)}
          placeholder="Длительность (например: 5 мин)"
        />
        <br />
        <button type="submit">Загрузить</button>
      </form>

      <h2>🎧 Все медитации</h2>
      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>Название</th>
            <th>Категория</th>
            <th>Длительность</th>
            <th>Файл</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(meditations) && meditations.length > 0 ? meditations.map(m => (
            <tr key={m.id}>
              <td>{m.title}</td>
              <td>{m.category}</td>
              <td>{m.duration}</td>
              <td><a href={m.file} target="_blank" rel="noreferrer">🔗</a></td>
            </tr>
          )) : (
            <tr>
              <td colSpan="4">Нет данных или загрузки...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;