# 얄팍한 GraphQL과 Apollo

[강의 사이트](https://www.yalco.kr/@graphql-apollo/1-1/)

## GraphQL이 등장하기 전 
**REST API란?** 소프트웨어간 정보를 주고 받는 방식
- GraphQL 이전부터 사용
- '다른' 방식 - 용도와 작업 특성에 따라 적합한 것 사용


## GraphQL의 강점
1. 필요한 정보들만 선택하여 받아 올 수 있음 
   - Over Fetching 문제 해결
   - 데이터 전송량 감소
2. 여러 계츠의 정보들을 한 번에 받아올 수 있음
   - Under Fetching 문제 해결
   - 요청 회수 감소
3. 하나의 Endpoint 에서 모든 요청을 처리
   - 하나의 URI 에서 POST 로 모든 요청 가능

## GraphQL로 서비스를 만들려면
GraphQL은 **명세**, 형식일 뿐, GraphQL 구현할 솔루션 필요하다.
 - 백엔드에서 정보를 제공 및 처리
 - 프론트엔드에서 요청 전송
 - GraphQL.js, GraphQL Yoga, Apollo Relay, 등 [기타 솔루션 살펴보기](https://graphql.org/community/tools-and-libraries/)

**Apollo GraphQL**
 - 백엔드와 프론트엔드 모두 제공
 - 간편하고 쉬운 설정
 - 풍성한 기능들 제공

## Apollo 서버 구축하기
**ApolloServer**
- typeDef와 resolver를 인자로 받아 서버 생성

**typeDef**
- GraphQL 명세에서 사용될 데이터, 요청의 타입 지정
- ggq(template literal tag)로 생성됨

**resolver**
- 서비스의 액션들을 함수로 지정
- 요청에 따라 데이터를 반환, 입력, 수정 삭제

**GraphQL Playground**
- 작성한 GraphQL type, resolver 명세 확인
- 데이터 요청 및 전송 테스트