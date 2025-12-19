# ingQ

AI를 활용하여 사용자가 직접 동화와 이야기를 만들고, 선택지를 통해 스토리를 진행할 수 있는 React Native 모바일 애플리케이션입니다.

## 📱 프로젝트 소개

**ingQ**는 사용자가 설정한 장르, 캐릭터, 스토리 설정을 바탕으로 AI가 동화를 생성하고, 사용자가 선택지를 통해 이야기를 진행할 수 있는 인터랙티브 스토리텔링 플랫폼입니다.

### 주요 기능

- ✨ **AI 기반 동화 생성**: 사용자 설정에 라 AI가 동화를 자동 생성
- 📚 **인터랙티브 스토리 진행**: 선택지를 통해 이야기의 방향을 결정
- 🎨 **이미지 생성**: 각 페이지마다 AI가 생성한 일러스트 제공
- 📖 **책 라이브러리**: 생성한 책들을 모아서 관리
- 🔖 **북마크 기능**: 좋아하는 책을 저장
- 📤 **책 공유**: 만든 책을 다른 사용자와 공유
- ❓ **질문 기능**: 스토리 진행 중 질문을 통해 더 깊이 있는 경험 제공

## 🛠 기술 스택

### 프레임워크 & 라이브러리

- **React Native** `0.78.1` - 크로스 플랫폼 모바일 앱 개발
- **React** `19.0.0` - UI 라이브러리
- **TypeScript** `5.0.4` - 타입 안정성
- **Zustand** `5.0.5` - 상태 관리
- **React Navigation** `7.x` - 네비게이션 (Stack, Bottom Tabs)
- **Styled Components** `6.1.16` - 스타일링
- **NativeWind** `2.0.11` - Tailwind CSS for React Native
- **Axios** `1.9.0` - HTTP 클라이언트

### 주요 패키지

- `@react-native-async-storage/async-storage` - 로컬 스토리지
- `@gorhom/bottom-sheet` - 바텀 시트 UI
- `react-native-image-picker` - 이미지 선택
- `react-native-reanimated` - 애니메이션
- `react-native-svg` - SVG 지원
- `react-native-size-matters` - 반응형 크기 조정

## 📁 프로젝트 구조

```
MacMorning-FE/
├── src/
│   ├── apis/              # API 호출 함수들
│   │   ├── AI/            # AI 관련 API (스토리 생성, 이미지 생성)
│   │   ├── auth/          # 인증 API (로그인, 회원가입)
│   │   ├── book/          # 책 관련 API (생성, 조회, 좋아요)
│   │   ├── story/         # 스토리 진행 API
│   │   └── upload/        # 이미지 업로드 API
│   ├── assets/            # 이미지, 폰트 등 정적 자원
│   ├── components/        # 재사용 가능한 컴포넌트
│   │   ├── common/        # 공통 컴포넌트
│   │   ├── createBook/    # 책 생성 관련 컴포넌트
│   │   ├── home/          # 홈 화면 컴포넌트
│   │   └── ...
│   ├── constants/         # 상수 정의 (API URL, 색상 등)
│   ├── hooks/             # 커스텀 훅
│   ├── pages/             # 화면 컴포넌트
│   │   ├── auth/          # 인증 화면 (로그인, 회원가입)
│   │   ├── createBook/    # 책 생성 화면
│   │   ├── home/          # 홈 화면
│   │   ├── library/       # 라이브러리 화면
│   │   ├── myBook/        # 내 책 화면
│   │   ├── readBook/      # 책 읽기 화면
│   │   ├── storyProgress/ # 스토리 진행 화면
│   │   └── ...
│   ├── store/             # Zustand 스토어
│   ├── types/             # TypeScript 타입 정의
│   └── utils/             # 유틸리티 함수
├── android/               # Android 네이티브 코드
├── ios/                   # iOS 네이티브 코드
└── App.tsx                # 앱 진입점
```

## 🚀 시작하기

### 필수 요구사항

- Node.js >= 18
- React Native 개발 환경 설정
- iOS: Xcode 및 CocoaPods
- Android: Android Studio 및 JDK

### 설치

1. 레포지토리 클론

```bash
git clone <repository-url>
cd MacMorning-FE
```

2. 의존성 설치

```bash
npm install
# 또는
yarn install
```

3. iOS 의존성 설치 (iOS만 해당)

```bash
cd ios
pod install
cd ..
```

### 실행

#### iOS

```bash
npm run ios
# 또는
yarn ios
```

#### Android

```bash
npm run android
# 또는
yarn android
```

#### Metro Bundler 시작

```bash
npm start
# 또는
yarn start
```

## 📱 주요 화면

### 1. 홈 화면

- 앱의 메인 화면
- "이야기 만들러 가기" 버튼으로 책 생성 시작

### 2. 책 생성 화면

4단계로 구성된 책 생성 프로세스:

1. **장르 선택**: 최대 3개까지 선택 가능
2. **스토리 설정**: 제목, 줄거리, 시대적 배경, 문체 설정
3. **캐릭터 설정**: 주인공의 이름, 성별, 나이, 특징 입력
4. **설정 확인**: 입력한 모든 설정 확인 후 생성

### 3. 스토리 진행 화면

- AI가 생성한 스토리 텍스트 표시
- 선택지를 통해 다음 스토리 진행
- 이전/다음 페이지 네비게이션
- 진행 상황 표시

### 4. 라이브러리 화면

- 모든 책 목록 조회
- 그리드/리스트 뷰 전환
- 북마크 기능

### 5. 내 책 화면

- 사용자가 생성한 책 목록
- 진행 중인 책과 완료된 책 구분

### 6. 마이페이지

- 사용자 정보 관리
- 로그인/로그아웃

## 🔐 인증

- JWT 기반 인증 (Access Token, Refresh Token)
- AsyncStorage를 통한 토큰 저장
- Zustand를 통한 전역 인증 상태 관리

## 🌐 API 연동

### API 엔드포인트

- **Base URL**: `https://api.ilovejokbal.monster/v1`
- **AI Base URL**: `https://ai.ilovejokbal.monster/v1`
- **CDN**: `https://dyr2odb2idgl1.cloudfront.net`

### 주요 API

- 인증: 로그인, 회원가입
- 책: 생성, 조회, 목록, 좋아요
- 스토리: 생성, 진행, 엔딩 생성
- AI: 스토리 생성, 이미지 생성
- 업로드: 이미지 업로드

## 🎨 디자인 시스템

### 폰트

- **NPS 폰트**: NPSfont_regular, NPSfont_bold, NPSfont_extrabold
- **나눔스퀘어 네오**: NanumSquareNeo (다양한 굵기)

### 색상

- 색상 상수는 `src/constants/colors.ts`에서 관리

### 반응형

- `react-native-size-matters`의 `scale()` 함수 사용
- 화면 크기 상수는 `src/constants/windowSize.ts`에서 관리

## 📝 개발 가이드

### 코드 스타일

- TypeScript 사용
- 함수형 컴포넌트 및 Hooks 사용
- Styled Components를 통한 스타일링
- 절대 경로 사용 (`@/` 별칭)

### 네비게이션

- React Navigation 사용
- Stack Navigator: 메인 네비게이션
- Bottom Tab Navigator: 하단 탭 네비게이션

### 상태 관리

- **Zustand**: 전역 상태 관리 (인증, 로딩 등)
- **로컬 상태**: React의 `useState`, `useEffect` 사용

## 🧪 테스트

```bash
npm test
# 또는
yarn test
```

## 📦 빌드

### Android

```bash
cd android
./gradlew assembleRelease
```

### iOS

Xcode에서 Archive 및 배포

## 📄 라이선스

이 프로젝트는 에코노베이션 MacMorning 팀의 소유입니다.

---

**MacMorning 팀** - 에코노베이션 25년 1학기
