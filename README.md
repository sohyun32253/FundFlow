## 📌 프로젝트 소개

텀블벅 프로젝트 리스트를 기반으로 한 프론트엔드 과제입니다.
제공된 JSON 데이터를 API처럼 활용하여 프로젝트 목록, 카드 UI, 상태별 기능을 구현했습니다.

---

## 🚀 주요 기능

* **프로젝트 리스트 조회 및 카드 UI 구성**
* **무한 스크롤 구현 (IntersectionObserver)**
* **좋아요 / 알림 기능 (localStorage 기반 상태 관리)**
* **전역 Toast 메시지 처리**
* **500 에러 재시도 로직 (공통 request 함수)**
* **Skeleton UI 적용**
* **반응형 레이아웃 (mobile-first)**

---

## 🛠 기술 스택

* **React (CRA)**
* **TypeScript**
* **Fetch API**
* **IntersectionObserver**
* **CSS (반응형, 모바일 퍼스트)**

---

## 📂 프로젝트 구조

```bash
src/
 ├ components/
 │   ├ ActionButton/
 │   ├ LikeButton/
 │   ├ NotificationButton/
 │   ├ ProjectBadge/
 │   ├ ProjectCard/
 │   ├ ProjectGrid/
 │ 
 ├ hooks/
 │   └ useProjects.ts
 ├ api/
 │   └ projectApi.ts
 ├ pages/
 │   └ ProjectListPage.tsx
 ├ types/
 │   └ project.ts
 ├ utils/
 │   └ format.ts
 └ App.tsx
```

---

## 📌 실행 방법

## **개발 환경**

* **Node.js**: v18.x (권장)
* **npm**: v9.x 이상

> Node.js 18 버전 환경에서 개발되었습니다.

---

## **프로젝트 실행**

### 1. 저장소 클론

```bash
git clone <레포지토리 URL>
cd tumblbug-web-hw
```
---

### 2. Mock 서버 실행

```bash
cd server
npm install
npm run dev
```

👉 API 서버: [http://localhost:4000](http://localhost:4000)

---

### 3. 프론트엔드 실행

```bash
cd frontend
npm install
npm start
```

👉 웹 실행: [http://localhost:3000](http://localhost:3000)

---

## ⚠️ 참고 사항

* 서버가 실행되지 않으면 데이터가 표시되지 않습니다.
* JSON 파일 및 `server.js`는 과제 조건에 따라 수정하지 않았습니다.
* API는 간헐적으로 500 에러를 반환하며, 이에 대해 **최대 3회 재시도 로직**을 적용했습니다.

---

## 👀 구현 포인트

### **무한 스크롤**

* IntersectionObserver 기반으로 스크롤 하단 감지
* 불필요한 이벤트 리스너 없이 효율적으로 구현

---

### **상태 관리**

* `loading / loadingMore` 상태를 분리하여 UX 개선
* 커스텀 훅(`useProjects`)으로 로직 분리

---

### 상태 유지

- 좋아요 및 알림 설정 상태를 localStorage를 활용하여 관리
- 새로고침 이후에도 상태가 유지되도록 구현

---

### **에러 처리**

* 공통 request 함수에서 500 에러 재시도 처리
* UI에서는 실패 상태만 표시하도록 역할 분리

---

### **반응형 설계**

* mobile-first 기반으로 설계
* 모바일 / 태블릿 / PC 환경 모두 대응

---

### **UX 개선**

* Skeleton UI 적용
* Toast 메시지를 통한 사용자 피드백 제공

---

## 🧠 한줄 요약

👉 **데이터 기반 UI, 상태 관리, 에러 처리, UX까지 고려한 프로젝트 리스트 구현**


