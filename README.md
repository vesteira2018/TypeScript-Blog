# Blog
Caramella Inc. TypeScript Toy Project  
TypeScript와 Koa Framework를 이용해 간단한 블로그와 게시판 기능을 제작

## Period
14 April 2021 ~ 20 April 2021  

## Tools
- OS : macOS Big Sur (v11.2.3)
- Editor : Visual Studio Code (v1.55)
- Language : TypeScript, HTML(EJS), CSS
- Framework : Koa
- DB : MySQL
- Hosting : DotHome

## Embody
- Node.js 세팅 (O)
- Koa Framework 세팅 (O)
- HTML을 모듈로 사용하고 데이터를 받기 위한 EJS 세팅 (O)
- 깡통 페이지 _ 메인화면, 프로필, 게시글 상세페이지, 게시글 작성, 방명록 (O)
- MySQL 세팅 및 연결 (-)
- 블로그 게시글 CRUD (X)
- 방명록 CRUD (X)

## Structure
> node_modules : Node.js의 모듈이 담긴 폴더  
> src : 출력화면(.ejs),  
> > 
> .gitignore : 재설치 가능한 node_modules를 Git 커밋에서 제외  
> package.json / package-lock.json : 사용한 Node.js 모듈, Git 저장소 등 의존성 표시  
> README.md : 프로젝트 보고서  
> tsconfig.json : 프로젝트를 컴파일하는 데 필요한 루트 파일과 컴파일러 옵션을 지정  

## 
- MySQL 설치 오류 : 

## 현재 문제점
- MySQL에서 데이터가 가져와지지 않고 다음과 같이 출력된다.  
```
function(done) {  
    // Add a custom callback to provided args   
    args.push(function(err, result) {  
        // Query failed?  
        if (err) { return done(err); }  
        // Query succeeded  
        done(null, result);  
    });  
    // Execute the query  
    fn.apply(ctx, args);  
}  
```
