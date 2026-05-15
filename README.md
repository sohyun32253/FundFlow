## 📌 프로젝트 소개

펀딩 플랫폼의 프로젝트 리스트 및 카드 UI를 구현한 프론트엔드 프로젝트입니다.  
사용자가 프로젝트 정보를 빠르게 탐색할 수 있도록 상태별 정보 구조와 인터랙션 흐름을 고려해 구현했습니다.

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

## 구현 내용

### 프로젝트 카드 UI
- 프로젝트 이미지, 제목, 크리에이터 정보 및 상태별 정보 표시
- 카드 전체 클릭 시 상세 페이지 이동
- 내부 링크 클릭 시 이벤트 전파 방지 처리

### 상태 기반 UI 분기
- 공개 예정(prelaunched) / 진행 중(ongoing) 상태에 따라 UI 분리
- 상태별 버튼 및 정보 조건부 렌더링

### 뱃지 노출 로직
- 좋은 창작자, 마감 임박, 남은 기간, 후원 금액, 에디터 PICK 뱃지 구현
- `priority` 기반 정렬 후 최대 2개 노출

### 후원 금액 포맷팅
- 금액 구간별(100만 / 1천만 / 1억) 단위 및 반올림 기준 분리

### 프로젝트 리스트 페이지
- 프로젝트 목록 API 기반 리스트 렌더링
- 로딩 / 에러 / 정상 상태 UI 분기 처리

### 무한 스크롤 구현
- `IntersectionObserver` 기반 자동 로딩 구현
- `page` 기반 API 구조로 확장 가능하도록 설계
- `loading`, `loadingMore` 상태 분리 및 중복 요청 방지 처리

### 스켈레톤 UI
- 초기 로딩 및 추가 로딩 시 Skeleton UI 제공
- 실제 카드 레이아웃과 유사하게 구성하여 레이아웃 흔들림 최소화

### API 구조 및 상태 관리
- 공통 `request` 함수에서 500 에러 발생 시 최대 3회 재시도
- `useProjects` 커스텀 훅으로 데이터 요청 및 상태 관리 로직 분리
- API 레이어와 UI 레이어를 분리하여 유지보수성 고려

### 반응형 설계
- Mobile-first 기반 Grid Layout 구성
- 모바일 1열 / 태블릿 2~3열 / PC 4열 대응

## 중점적으로 본 부분

- `priority` 기반 뱃지 정렬 로직으로 확장성 확보
- `IntersectionObserver` 기반 무한 스크롤 구조 설계
- 초기 로딩과 추가 로딩 상태를 분리하여 UX 개선
- Skeleton UI를 통한 자연스러운 로딩 경험 제공
- 커스텀 훅을 활용한 로직 분리 및 유지보수성 개선
- 모바일/태블릿/PC 환경을 고려한 반응형 UI 구현

## 추가 설명

- 페이지네이션 구조를 기반으로 구현하여 무한 스크롤 외 다른 방식으로도 확장 가능하도록 고려했습니다.
- 좋아요 및 알림 상태는 `localStorage`를 활용해 새로고침 이후에도 유지되도록 구현했습니다.
- 기존에는 `mock-server`를 통해 데이터를 불러오는 구조였지만, 배포 환경에서는 별도의 서버 실행 없이 동작할 수 있도록 프론트엔드 내부 목데이터를 사용하는 방식으로 변경했습니다.


## 🧠 한줄 요약

👉 **데이터 기반 UI, 상태 관리, 에러 처리, UX까지 고려한 프로젝트 리스트 구현**


