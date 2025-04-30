const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Файл для хранения времени
const TIME_FILE = 'endTime.json';

// Загружаем или создаём endTime
let endTime;
try {
  const data = fs.readFileSync(TIME_FILE);
  endTime = new Date(JSON.parse(data).endTime);
  console.log('Время загружено из файла:', endTime);
} catch (err) {
  // Если файла нет — создаём новое время
  endTime = new Date();
  endTime.setDate(endTime.getDate() + 11);
  endTime.setHours(endTime.getHours() + 11);
  fs.writeFileSync(TIME_FILE, JSON.stringify({ endTime }));
  console.log('Новое время создано:', endTime);
}

// API для фронтенда
app.get('/api/get-time', (req, res) => {
  res.json({ endTime: endTime.toISOString() });
});

// Статика (фронтенд)
app.use(express.static(__dirname));

// Все запросы → index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер работает: http://localhost:${PORT}`);
});
