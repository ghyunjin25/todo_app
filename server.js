const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// 미들웨어 설정
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// SQLite 데이터베이스 설정
const db = new sqlite3.Database('todos.db');

// 테이블 생성
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    completed BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

// 모든 todos 가져오기
app.get('/api/todos', (req, res) => {
    db.all('SELECT * FROM todos ORDER BY created_at DESC', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// 새로운 todo 추가
app.post('/api/todos', (req, res) => {
    const { text } = req.body;
    if (!text) {
        res.status(400).json({ error: 'Todo 텍스트가 필요합니다.' });
        return;
    }

    db.run('INSERT INTO todos (text) VALUES (?)', [text], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID, text, completed: 0 });
    });
});

// todo 완료 상태 토글
app.put('/api/todos/:id', (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;

    db.run('UPDATE todos SET completed = ? WHERE id = ?', [completed ? 1 : 0, id], (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ success: true });
    });
});

// todo 삭제
app.delete('/api/todos/:id', (req, res) => {
    const { id } = req.params;

    db.run('DELETE FROM todos WHERE id = ?', [id], (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ success: true });
    });
});

// 메인 페이지
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
}); 