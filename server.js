const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어 설정
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// PostgreSQL 연결 설정
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://localhost:5432/todos',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// 테이블 생성
const createTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        text TEXT NOT NULL,
        completed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('테이블이 성공적으로 생성되었습니다.');
  } catch (err) {
    console.error('테이블 생성 오류:', err);
  }
};

createTable();

// 모든 todos 가져오기
app.get('/api/todos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM todos ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Todo 목록 조회 오류:', err);
    res.status(500).json({ error: err.message });
  }
});

// 새로운 todo 추가
app.post('/api/todos', async (req, res) => {
  const { text } = req.body;
  if (!text) {
    res.status(400).json({ error: 'Todo 텍스트가 필요합니다.' });
    return;
  }
  
  try {
    const result = await pool.query(
      'INSERT INTO todos (text) VALUES ($1) RETURNING *',
      [text]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Todo 추가 오류:', err);
    res.status(500).json({ error: err.message });
  }
});

// todo 완료 상태 토글
app.put('/api/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  
  try {
    await pool.query(
      'UPDATE todos SET completed = $1 WHERE id = $2',
      [completed, id]
    );
    res.json({ success: true });
  } catch (err) {
    console.error('상태 변경 오류:', err);
    res.status(500).json({ error: err.message });
  }
});

// todo 삭제
app.delete('/api/todos/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    await pool.query('DELETE FROM todos WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (err) {
    console.error('삭제 오류:', err);
    res.status(500).json({ error: err.message });
  }
});

// 메인 페이지
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
}); 