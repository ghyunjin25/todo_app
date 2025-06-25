# Todo 리스트 웹사이트

간단하고 아름다운 Todo 리스트 웹사이트입니다. Node.js, Express, SQLite를 사용하여 구축되었습니다.

## 기능

- ✅ 할 일 추가/삭제/수정
- ✅ 완료 상태 토글
- ✅ 실시간 통계 (전체/완료/대기)
- ✅ 반응형 디자인
- ✅ 데이터베이스 저장
- ✅ 아름다운 UI/UX

## 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. 서버 실행
```bash
npm start
```

또는 개발 모드로 실행:
```bash
npm run dev
```

### 3. 웹사이트 접속
브라우저에서 `http://localhost:3000`으로 접속하세요.

## 기술 스택

- **Backend**: Node.js, Express
- **Database**: SQLite
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **UI**: Font Awesome, Google Fonts

## 프로젝트 구조

```
cousor_todo_project/
├── server.js          # Express 서버
├── package.json       # 프로젝트 설정
├── todos.db          # SQLite 데이터베이스 (자동 생성)
├── public/           # 정적 파일
│   ├── index.html    # 메인 페이지
│   ├── style.css     # 스타일시트
│   └── script.js     # 클라이언트 JavaScript
└── README.md         # 프로젝트 설명
```

## API 엔드포인트

- `GET /api/todos` - 모든 todo 목록 조회
- `POST /api/todos` - 새로운 todo 추가
- `PUT /api/todos/:id` - todo 수정 (완료 상태 토글)
- `DELETE /api/todos/:id` - todo 삭제

## 사용법

1. **할 일 추가**: 입력창에 할 일을 입력하고 Enter 키를 누르거나 추가 버튼을 클릭하세요.
2. **완료 표시**: 체크박스를 클릭하여 완료 상태를 토글할 수 있습니다.
3. **수정**: 할 일 텍스트를 클릭하여 수정할 수 있습니다.
4. **삭제**: 삭제 버튼을 클릭하여 할 일을 제거할 수 있습니다.

## 라이선스

MIT License 