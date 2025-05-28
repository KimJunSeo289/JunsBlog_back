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
.
├── .git/                # Git 버전 관리 폴더
├── .gitignore           # Git에서 제외할 파일 목록
├── .vscode/             # VSCode 에디터 설정 폴더
│   └── settings.json    # VSCode 관련 설정 파일
├── README.md            # 프로젝트 설명 파일
├── config/              # 환경설정 관련 파일 모음
│   ├── db.js            # 데이터베이스 연결 설정
│   ├── jwt.js           # JWT 관련 설정
│   └── oauth.js         # OAuth 관련 설정
├── controllers/         # 비즈니스 로직 처리 컨트롤러
│   ├── authController.js      # 인증 관련 컨트롤러
│   ├── commentController.js  # 댓글 관련 컨트롤러
│   ├── kakaoAuthController.js# 카카오 인증 컨트롤러
│   ├── postController.js     # 게시글 관련 컨트롤러
│   └── userController.js     # 사용자 관련 컨트롤러
├── middlewares/         # 미들웨어 함수 모음
│   ├── auth.js          # 인증 미들웨어
│   └── upload.js        # 파일 업로드 미들웨어
├── models/              # 데이터베이스 모델 정의
│   ├── Comment.js       # 댓글 모델
│   ├── Post.js          # 게시글 모델
│   └── User.js          # 사용자 모델
├── node_modules/        # 설치된 npm 패키지 폴더
├── package.json         # 프로젝트 및 의존성 정보
├── package-lock.json    # 의존성 버전 고정 파일
├── routes/              # API 라우터 정의
│   ├── authRoutes.js        # 인증 관련 라우터
│   ├── commentRoutes.js    # 댓글 관련 라우터
│   ├── kakaoAuthRoutes.js  # 카카오 인증 라우터
│   ├── postRoutes.js       # 게시글 관련 라우터
│   └── userRoutes.js       # 사용자 관련 라우터
├── server.js            # 서버 진입점 파일
├── uploads/             # 업로드된 파일(이미지 등) 저장 폴더
│   ├── 1747901972102-70028829.png
│   ├── 1747964306104-266993690.png
│   └── 1747966169783-943860384.png
└── utils/               # 유틸리티 함수 모음
    └── errorHandler.js  # 에러 핸들러 유틸 함수
```

---
