# Todo 리스트 웹사이트

간단하고 아름다운 Todo 리스트 웹사이트입니다. Node.js, Express, PostgreSQL을 사용하여 구축되었습니다.

## 🌟 주요 기능

- ✅ **할 일 관리**: 추가/삭제/수정/완료 토글
- ✅ **실시간 통계**: 전체/완료/대기 개수 표시
- ✅ **반응형 디자인**: 모바일/태블릿/데스크톱 지원
- ✅ **데이터베이스 저장**: PostgreSQL을 통한 안전한 데이터 저장
- ✅ **아름다운 UI/UX**: 모던한 그라데이션 디자인
- ✅ **실시간 알림**: 작업 완료/오류 알림 시스템

## 🚀 라이브 데모

**배포된 웹사이트**: https://todo-app-v4cj.onrender.com/

## 🛠️ 기술 스택

### Backend
- **Node.js**: 서버 런타임
- **Express.js**: 웹 프레임워크
- **PostgreSQL**: 관계형 데이터베이스
- **pg**: PostgreSQL 클라이언트

### Frontend
- **HTML5**: 시맨틱 마크업
- **CSS3**: 모던 스타일링 (Flexbox, Grid, 애니메이션)
- **JavaScript (ES6+)**: 클래스 기반 구조, Async/Await
- **Font Awesome**: 아이콘
- **Google Fonts**: Noto Sans KR 폰트

## 📁 프로젝트 구조

```
cousor_todo_project/
├── server.js              # 메인 서버 (PostgreSQL 버전)
├── server-sqlite.js       # SQLite 버전 (로컬 개발용)
├── package.json           # 프로젝트 설정 및 의존성
├── Procfile              # Heroku 배포 설정
├── render.yaml           # Render 배포 설정
├── README.md             # 프로젝트 설명서
└── public/               # 프론트엔드 파일들
    ├── index.html        # 메인 HTML 페이지
    ├── style.css         # CSS 스타일시트
    └── script.js         # 클라이언트 JavaScript
```

## 🏗️ 아키텍처

### 데이터 흐름
```
사용자 입력 → HTML 폼 → JavaScript → API 호출 → Express 서버 → PostgreSQL → JSON 응답 → UI 업데이트
```

### MVC 패턴
- **Model**: PostgreSQL 데이터베이스
- **View**: HTML/CSS 프론트엔드
- **Controller**: Express.js API 엔드포인트

## 💾 데이터베이스 스키마

```sql
CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔌 API 엔드포인트

| 메서드 | 엔드포인트 | 설명 | 요청 본문 |
|--------|------------|------|-----------|
| `GET` | `/api/todos` | 모든 할 일 조회 | - |
| `POST` | `/api/todos` | 새 할 일 추가 | `{"text": "할 일 내용"}` |
| `PUT` | `/api/todos/:id` | 할 일 수정 | `{"completed": true}` |
| `DELETE` | `/api/todos/:id` | 할 일 삭제 | - |

### API 응답 예시
```json
[
  {
    "id": 1,
    "text": "운동하기",
    "completed": false,
    "created_at": "2024-01-15T10:30:00.000Z"
  }
]
```

## 🚀 설치 및 실행

### 1. 저장소 클론
```bash
git clone https://github.com/yourusername/todo-app.git
cd todo-app
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 환경 변수 설정
`.env` 파일 생성 (로컬 개발용):
```env
DATABASE_URL=postgresql://username:password@localhost:5432/todos
NODE_ENV=development
```

### 4. 서버 실행

**프로덕션 모드**:
```bash
npm start
```

**개발 모드** (자동 재시작):
```bash
npm run dev
```

### 5. 웹사이트 접속
브라우저에서 `http://localhost:3000`으로 접속하세요.

## 🌐 배포 가이드

### Render.com 배포 (추천)

1. **GitHub에 코드 업로드**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Render에서 배포**
   - [render.com](https://render.com) 가입
   - "New Web Service" 클릭
   - GitHub 저장소 연결
   - 자동 배포 완료!

3. **PostgreSQL 데이터베이스 설정**
   - "New PostgreSQL" 클릭
   - 데이터베이스 생성
   - 환경 변수 `DATABASE_URL` 설정

### 다른 플랫폼

- **Railway**: `railway up`
- **Heroku**: `git push heroku main`
- **Vercel**: GitHub 연동 자동 배포

## 🎯 사용법

### 기본 기능
1. **할 일 추가**: 입력창에 할 일을 입력하고 Enter 키를 누르거나 추가 버튼을 클릭
2. **완료 표시**: 체크박스를 클릭하여 완료 상태를 토글
3. **삭제**: 휴지통 아이콘을 클릭하여 할 일을 제거
4. **통계 확인**: 상단의 전체/완료/대기 개수 확인

### 고급 기능
- **실시간 업데이트**: 변경사항이 즉시 반영
- **반응형 디자인**: 모든 디바이스에서 최적화된 화면
- **키보드 단축키**: Enter로 할 일 추가

## 🔧 개발 가이드

### 코드 구조

#### 서버 (server.js)
```javascript
// Express 서버 설정
const app = express();
app.use(express.json());
app.use(express.static('public'));

// PostgreSQL 연결
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// API 엔드포인트
app.get('/api/todos', async (req, res) => {
  const result = await pool.query('SELECT * FROM todos ORDER BY created_at DESC');
  res.json(result.rows);
});
```

#### 클라이언트 (script.js)
```javascript
class TodoApp {
  async loadTodos() {
    const response = await fetch('/api/todos');
    this.todos = await response.json();
    this.renderTodos();
  }

  async addTodo() {
    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: todoText })
    });
  }
}
```

### 스타일링 (style.css)
```css
/* 모던 그라데이션 배경 */
body {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: 'Noto Sans KR', sans-serif;
}

/* 카드 스타일 */
.todo-form, .todo-stats, .todo-list {
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}
```

## 🐛 문제 해결

### 일반적인 문제

1. **데이터베이스 연결 오류**
   - 환경 변수 `DATABASE_URL` 확인
   - PostgreSQL 서비스 상태 확인

2. **포트 충돌**
   - 다른 포트 사용: `PORT=3001 npm start`

3. **의존성 오류**
   - `node_modules` 삭제 후 재설치: `rm -rf node_modules && npm install`

### 로그 확인
```bash
# 애플리케이션 로그
npm run dev

# 데이터베이스 로그 (Render 대시보드)
PostgreSQL → Logs
```

## 📊 성능 최적화

- **데이터베이스 인덱싱**: `created_at` 컬럼 인덱스
- **캐싱**: Redis 추가 고려
- **CDN**: 정적 파일 캐싱
- **압축**: gzip 압축 활성화

## 🔒 보안 고려사항

- **SQL 인젝션 방지**: 파라미터화된 쿼리 사용
- **XSS 방지**: 입력 데이터 검증
- **CORS 설정**: 허용된 도메인만 접근
- **환경 변수**: 민감한 정보는 환경 변수로 관리

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 지원

문제가 있으시면 [GitHub Issues](https://github.com/yourusername/todo-app/issues)에 등록해주세요.

---

⭐ 이 프로젝트가 도움이 되었다면 스타를 눌러주세요! 