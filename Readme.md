# 프로젝트 개요
- 로스트아크 레이드 스케쥴 관리 프로젝트(로아킨)의 서버 부분
- 클라이언트 부분과 관련하여 상세 내용은 [링크](https://github.com/liketiger/loakin)를 확인
- Node.js + Express + MongoDB
- TypeScript로 작성

<br>

# 서버
- 시간관계상 추가 학습 필요 없이 기존에 익숙한 언어인 JS로 서버를 다룰 수 있는 express 사용 
- 스키마 관련 코드는 model에, CRUD 로직은 함수로 controller에 분리
- src의 index에는 DB와의 통신 코드 및 REST API로 url resource 별로 controller의 CRUD 함수 적용

<br>

# DB
- 빠른 시일내에 제작했어야 하므로 추가 학습이 필요한 SQL을 사용할 필요가 없는 DB인 MongoDB를 사용
- 애플리케이션 개발에 집중하기 위해 Atlas를 사용하여 클라우드에서 MongoDB를 호스팅하고 관리.
- DB와 연결, 쿼리, 스키마와 모델 정의 등을 쉽게 하기 위해 mongoose 사용 

<br>

# 배포
- Heroku에 배포 후 heroku-dotenv 패키지를 이용하여 중요 정보 은닉