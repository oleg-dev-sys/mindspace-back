export const mockMeditations = [
  {
    id: 'm1',
    title: 'Спокойное утро',
    description: 'Мягкая практика пробуждения и настройки на продуктивный день.',
    duration: 8,
    category: 'morning',
  },
  {
    id: 'm2',
    title: 'Глубокий сон',
    description: 'Расслабление тела и ума перед засыпанием.',
    duration: 12,
    category: 'sleep',
  },
  {
    id: 'm3',
    title: 'Антистресс за 5 минут',
    description: 'Короткая дыхательная техника для снятия напряжения.',
    duration: 5,
    category: 'stress',
  },
  {
    id: 'm4',
    title: 'Фокус и концентрация',
    description: 'Удержание внимания на задачах и снижение отвлечений.',
    duration: 10,
    category: 'focus',
  },
  {
    id: 'm7',
    title: 'Лесной дождь',
    description: 'Непрерывный шум дождя и ветра для глубокого расслабления.',
    duration: 15,
    category: 'silent',
  },
  {
    id: 'm8',
    title: 'Океанские волны',
    description: 'Ритмичные волны и лёгкий бриз без голосовых инструкций.',
    duration: 20,
    category: 'silent',
  },
  {
    id: 'm5',
    title: 'Восстановление энергии',
    description: 'Практика для возвращения внутреннего ресурса.',
    duration: 7,
    category: 'energy',
  },
  {
    id: 'm6',
    title: 'Снижение тревожности',
    description: 'Стабилизация дыхания и мягкое успокоение.',
    duration: 9,
    category: 'anxiety',
  },
];

const today = new Date();

const makeDate = (daysAgo) => {
  const d = new Date(today);
  d.setDate(today.getDate() - daysAgo);
  return d.toISOString().slice(0, 10);
};

export const mockSessions = [
  { id: 's1', date: makeDate(0), duration_completed: 900, completed: true },
  { id: 's2', date: makeDate(1), duration_completed: 1200, completed: true },
  { id: 's3', date: makeDate(2), duration_completed: 600, completed: true },
  { id: 's4', date: makeDate(3), duration_completed: 300, completed: true },
  { id: 's5', date: makeDate(5), duration_completed: 1400, completed: true },
  { id: 's6', date: makeDate(6), duration_completed: 700, completed: true },
  { id: 's7', date: makeDate(8), duration_completed: 500, completed: false },
  { id: 's8', date: makeDate(10), duration_completed: 1000, completed: true },
];
