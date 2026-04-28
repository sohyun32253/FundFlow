# 프론트엔드 코딩테스트 과제

## 🛠️ 프로젝트 실행 방법

### 1. GitHub 원격 저장소 만들기

1. https://github.com/new 에 접속하여 새 레포지토리를 생성해주세요.
   - Repository name: `tumblbug-web-hw`
   - **⚠️ 꼭 Private로 설정해주세요.**
2. 레포지토리 화면에서 **[Settings]** > **[Collaborators]** 로 이동하고, **[Add people]** 를 클릭해주세요.
3. `tumblbug-interview` 계정을 Collaborator로 초대해주세요.

### 2. 개발 환경 세팅하기

본 과제는 지원자가 직접 개발 환경을 구성해야 합니다.

**필수 요구사항:**

- `React` 또는 `Next.js`를 사용하여 구현
- `TypeScript` 사용 필수
- UI Component Library 사용 금지 (직접 구현)

**권장 절차:**

```bash
# 1. 압축 해제 후 프로젝트 폴더로 이동
cd tumblbug-web-hw

# 2. 본인의 프론트엔드 프로젝트 생성 (예: Next.js)
npx create-next-app@latest frontend --typescript
# 또는 React
npx create-react-app frontend --template typescript

# 3. git 초기화 및 첫 커밋
git init
git add .
git commit -m "initial commit"

# 4. GitHub 저장소 연결
git remote add origin https://github.com/<GitHub 사용자명>/tumblbug-web-hw.git
git push -u origin main
```

### 3. Mock API 서버 실행

```bash
# server 폴더로 이동
cd server

# 의존성 설치
npm install

# 서버 실행 (포트 4000)
npm start
```

서버가 실행되면 `http://localhost:4000`에서 API를 사용할 수 있습니다.
