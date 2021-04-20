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
- 깡통 페이지 및 화면전환 _ 메인화면, 프로필, 게시글 상세페이지, 게시글 작성, 방명록 (O)
- MySQL 세팅 및 연결 (-)
- 블로그 게시글 CRUD (X)
- 방명록 CRUD (X)

## Structure
- node_modules : Node.js의 모듈이 담긴 폴더  
- src  
    - css : css stylesheet  
    - database : MySQL과 연결하는 mapper 파일 (.ts)  
    - images : 화면 구성에 사용되는 이미지 파일 (.jpg, .png)  
    - routes : 화면 연결에 사용되는 라우터 파일 (.ts)  
    - views : 출력화면 (.ejs)  
        - board : 블로그 게시글  
        - guest : 블로그 방명록  
        - include : 측면 메뉴 등 여러 번 사용하기 위한 파일  
- .gitignore : 재설치 가능한 node_modules를 Git 커밋에서 제외  
- package.json / package-lock.json : 사용한 Node.js 모듈, Git 저장소 등 의존성 표시  
- README.md : 프로젝트 보고서  
- tsconfig.json : 프로젝트를 컴파일하는 데 필요한 루트 파일과 컴파일러 옵션을 지정  

## 이전 문제점 및 해결방안
- 타인이 작성한 nvm 설치 방법을 따라가다 다음과 같은 문제가 발생하였습니다.
```
-bash: nvm: command not found  
```
처음에는 .bash_profile이 생성되고 환경변수를 설정해주지 않아 생긴 문제점으로 판단되어  
다음과 같은 코드를 작성했습니다.  
```
vi ~/.bash_profile  
export NVM_DIR="$HOME/.nvm" [ -s "$NVM_DIR/nvm.sh" ] && . "NVM_DIR/nvm.sh" #This loads nvm
```
그러나 환경변수를 설정해도, nvm을 설치했음에도, 터미널을 재실행했음에도, 맥 자체를 재부팅했음에도  
커맨드를 찾지 못하는 bash의 문제는 재설치를 해도 해결되지 않아  
다음과 같은 임시 해결책을 사용했었습니다.
```
source ~/.nvm/nvm.sh
```
이후 zsh 환경에서는 위와 같은 명령어를 입력하지 않고도 nvm이 작동해서 zsh에서 작업을 진행했고  
나중에 bash에서도 nvm이 작동되었습니다.  
<br />

- MySQL을 실행하는 과정에서 다음과 같은 문제가 발생하였습니다.
```
$ mysql.server start
mysqld_safe A mysqld process already exists
```
Oracle SQL을 사용했기 때문에 MySQL로 데이터베이스를 구축하는 것을 목표로 잡았습니다.  
mysql을 강제로 shutdown시키고 실행시키는 방법으로 접근하다가 예제가 많았던 mongodb로 전환하였습니다.    
그러나 NoSQL을 바로 사용해보려는 것이 익숙치 않아 다시 MySQL을 실행시켜보고자 했습니다.  
root의 비밀번호 변경 후 mysql로 실행 가능하다는 것을 알게 되었고 작업을 진행했습니다.  
<br />

- MySQL을 연결하는 과정에서 다음과 같은 문제가 발생하였습니다.
```
async function query(sql: string) {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '****',
        database: 'donghun',
        port: 3306
    });
    
    connection.connect();
    try {
        let result = connection.query(sql);
        console.log(`SUCCESS : ${result}`);
        return result;
    } catch (error) {
        console.log(`ERROR : ${error}`);
        throw error;
    } finally {
        connection.end();
    }
}

Error: Cannot enqueue Handshake after already enqueuing a Handshake.
```
createConnection()에서 이미 MySQL 연결이 진행되는 것이었는데 연결을 생성하고 준비하는 것으로만 해석했기 때문에  
```
connection.connect();
connection.end();
```
중복연결을 하는 문제가 발생했고 위의 코드를 지우는 것으로 해결되었습니다.


## 현재 문제점
- MySQL에서 데이터가 가져와지지 않고 다음과 같이 출력됩니다.  
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
callback function이 이미 있다고 생각하는데 이와 같이 출력되니 답답합니다.  
오류가 아니라서 구글링으로는 찾아지지도 않습니다.  
<br />

- TypeScript로 작성 시 매개변수의 Type을 작성하는데 어려움이 있습니다.
구글링으로 찾을 수 있는 대부분의 Node.js를 이용한 게시판 제작은 JavaScript를 이용하여 작성되었습니다.  
TypeScript에 맞게 코드를 작성해보면 작동되지 않거나 오류가 생겨 작동 시도조차 되지 않는 경우가 대다수였습니다.  
Type을 작성 시 어떤 타입의 매개변수가 들어오는지 바로 알기 어려워 :any로 작성하는 경우가 많았습니다.  
