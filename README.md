# Jun's Blog

간단하고 직관적인 사용자 경험을 제공하는 React 기반 블로그 애플리케이션입니다.  
회원가입·로그인, 게시글 작성·수정·삭제, 댓글 작성·수정·삭제, 좋아요 토글, 사용자 프로필 조회 등 핵심 기능을 포함하고 있습니다.

---

## 주요 기능

- **회원가입 / 로그인**  
  – 일반 계정 기반 인증 및 Kakao OAuth 로그인 지원

- **게시글 CRUD**  
  – 게시글 작성 (CreatePost)  
  – 게시글 목록 조회, 무한 스크롤 & 정렬 (PostListPage)  
  – 게시글 상세 조회, 이미지 포함 (PostDetailPage)  
  – 게시글 수정 (EditePost)  
  – 게시글 삭제 (PostDetailPage)

- **댓글 기능**  
  – 댓글 생성·조회·수정·삭제

- **좋아요 토글**  
  – 로그인 유저 대상 좋아요 상태 관리 및 카운트

- **사용자 프로필 페이지**  
  – 작성 글·댓글·좋아요 목록 조회  
  – 비밀번호 변경 / 회원 탈퇴

- **풍부한 텍스트 에디터**  
  – Quill 기반 WYSIWYG 에디터

- **모달 컴포넌트**  
  – ReactModal 라이브러리 기반 모달

- **레이아웃 & 네비게이션**  
  – 공통 레이아웃(DefaultLayout) 및 반응형 헤더(Header)

---

## 기술 스택

- **프레임워크 / 라이브러리**: React 18, React Router v6
- **상태 관리**: Redux Toolkit
- **HTTP 클라이언트**: Axios
- **에디터**: react-quill-new (Quill)
- **모달**: react-modal
- **OAuth**: Kakao OAuth (KakaoLoginButton)
- **CSS**: CSS Modules
- **번들러 / 개발 서버**: Vite

---

## 프로젝트 구조

```
src/
├── common/
│   ├── DefaultLayout.jsx
│   └── index.css
├── components/
│   ├── Header.jsx
│   ├── LikeButton.jsx
│   ├── Modal.jsx
│   ├── PostCard.jsx
│   ├── QuillEditor.jsx
│   ├── KakaoLoginButton.jsx
│   └── Comments.jsx
├── pages/
│   ├── RegisterPage.jsx
│   ├── LoginPage.jsx
│   ├── CreatePost.jsx
│   ├── PostListPage.jsx
│   ├── PostDetailPage.jsx
│   ├── EditePost.jsx
│   ├── UserPage.jsx
│   └── UserInfoUpdate.jsx
├── store.js
├── userSlice.js
├── router.jsx (index.jsx)
└── main.jsx
```

---
