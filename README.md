# ClimbDog Calendar

클라이밍 크루를 위한 캘린더 및 정모 관리 시스템

## 프로젝트 구조

```
climbdog_calendar/
├── backend/          # NestJS 백엔드
└── frontend/         # React + Vite 프론트엔드
```

## 기술 스택

### Backend
- NestJS
- TypeScript

### Frontend
- React
- Vite
- TypeScript
- 네이버 지도 API

## 주요 기능

- 캘린더 기능
- 정모(정기모임) 일정 관리
- 네이버 지도 API를 활용한 모임 장소 표시

## 개발 환경 설정

### Backend

```bash
cd backend
npm install
npm run start:dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## 개발 시작

1. 백엔드와 프론트엔드의 의존성을 각각 설치합니다
2. 각 디렉토리에서 개발 서버를 실행합니다
3. 네이버 지도 API 키를 발급받아 환경 변수에 설정합니다
