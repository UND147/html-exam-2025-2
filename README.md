# DUICA 학생 포털 — HTML/CSS/JavaScript 프로젝트

순수 **Vanilla HTML5 · CSS3 · JavaScript** 로 구현한 학생용 통합 포털(대시보드) 웹사이트입니다. 외부 프레임워크 없이 출석 관리, 시간표, 자료실, 미니게임 등 여러 페이지를 직접 구성했습니다.

> 2025학년도 2학기 HTML/CSS/JavaScript 시험 과제로 작성한 프로젝트를 정리한 저장소입니다.

## 🎯 주요 기능

| 페이지 | 설명 |
|--------|------|
| **홈** (`index.html`) | 포털 대시보드, 카드형 메뉴, 회원가입·GitHub 링크 |
| **출석체크** (`attendance.html`) | `localStorage` 기반 출석 기록 저장·조회 |
| **시간표** (`timetable.html`) | `localStorage`에 시간표를 저장하는 인터랙티브 시간표 |
| **북마크** (`bookmark.html`) | 자주 쓰는 링크 즐겨찾기 |
| **언어요약** (`language.html`) | C/C++/Java 등 언어 요약 — 과목별 "몬스터" 카드 테마 |
| **자료실** (`forminfo.html`) | 강의 자료(PDF) 다운로드 제공 |
| **텍스트게임** (`textrpg.html`) | 몬스터 컨셉의 텍스트 RPG 미니게임 |
| **회원가입** (`signupform.html`) | 입력 폼 및 유효성 검사 |

## 🛠 기술 스택
- **HTML5** — 시맨틱 마크업, 멀티 페이지 구성
- **CSS3** — 반응형 레이아웃, 카드 UI, 웹폰트, 네비게이션 바
- **JavaScript (ES)** — DOM 조작, 이벤트 처리, `localStorage` 영속화
- 프레임워크·빌드도구 없이 **정적 사이트**로 동작 (GitHub Pages 배포 가능)

## 📂 프로젝트 구조
```
html-exam-2025-2/
├── index.html, attendance.html, timetable.html, ...   # 페이지
├── css/        # 페이지별 스타일 (style, cardstyle, attendance, timetable, textrpg)
├── js/         # 기능 스크립트 (navigation, attendance, timetable, textrpg, forminfo)
├── img/        # 이미지 (마크·프로필·아이콘, monsters/ 게임 에셋)
└── pdf/        # 자료실에서 제공하는 강의 자료
```

## ▶ 실행 방법
정적 사이트이므로 별도 빌드가 필요 없습니다.
```bash
# 방법 1) index.html 을 브라우저로 직접 열기
# 방법 2) 로컬 서버 (VS Code Live Server 등)
npx serve .      # 또는 python -m http.server
```

## ✨ 특징
- 외부 라이브러리 의존 없이 핵심 기능을 **바닐라 JS로 직접 구현**
- `localStorage` 를 활용한 클라이언트 사이드 데이터 영속화 (출석·시간표)
- 과목 학습 요약에 **게임화(gamification)** 요소(몬스터 카드·텍스트 RPG)를 접목
