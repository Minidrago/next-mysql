import { queryExecute } from "./db";


// import { useSearchParams } from 'next/navigation';

// //next의 페이지들은 대부분 page.js이지만, api폴더와 route.js라는 두 이름은 정해진 문법과 같다.
// //설치한 sql모듈 불러오고 (npm 사이트에서 mySQL로 검색해서 참고할것)
// var mysql      = require('mysql');
// //connection에 담고
// var connection = mysql.createConnection({
//     host     : 'svc.sel5.cloudtype.app',
//     user     : 'root',
//     password : '1234',
//     database : 'test',
//     port : '30846'
// });


// //connect로 접근하고 
// connection.connect();

// // connection.connect(()=>{
// //     console.log('성공!');
// // }); >> 이런식으로 일단 서버에 연결되는지 확인 가능(브라우저 새로고침시 아래 터미널에서 성공! 이 뜨는지 확인)

// //함수로 만든다 아래 'SELECT * from member'를 str로 받아서 아래 쿼리문안에서 활용하는것
// //str은 조회(아래는 모든것), 그 조회된 값을 콜백함수에서 활용
// async function queryExecute(str,value){
//     // let a; new Promise()이건 검색해볼것. 프로미스 저놈은 axios처럼 강제 비동기라 await를 걸어주는것. resolve를 첨에 써보고 안되면 reject를 활용한다
//     let data = await new Promise((resolve,reject)=>{
//         connection.query(str, value, function (error, results) {
//             resolve(results);
//         });
//     });
//     console.log(data);
//     //이상태에서 브라우저 새로고침해보면 아래 터미널에 값이 뜬다.

//     return data;
// }
//         //브라우저에서 http://localhost:3000/api로 하고 새로고침 해보면 그 브라우저에서 results로 뱉어내므로 아래 터미널에서
//         //RowDataPacket {
// //     num: 1,
// //     id: 'cho',
// //     name: '조자룡',
// //     email: 'joji2@naver.com'
// //   } 
// //이렇게 출력됨.


export async function GET(){
    
    const data = await queryExecute('SELECT * from member')

    //아래내용 작성 후 브라우저 새로고침하면 데이터가 들어가는건데 확인하려면 SQL들어가서 테이블에서 새로고침(회전화살표)
    //insert(데이터 입력)는 원래 POST에서 해야하는데 저기선 body로 들어가버려서 확인이 힘들다. 그래서 일단 GET에서 실험
    
    // const data = await queryExecute(`insert into member (id,name,email) values ('abc','홍길순','hong@gmail.com')`)

    // const data = await queryExecute(`update member set name='홍길동' where num=2`)

    // const data = await queryExecute(`delete from member where num=5`)

    //테이블 만들기
    // const data = await queryExecute(`
    //     create table contact(
    //         name varchar(30),
    //         email varchar(100),
    //         contents text,
    //         num int not null auto_increment,
    //         primary key(num)
    //     )
    // `)

    
    // const data = await queryExecute(`drop table contact`)
    //아래 이놈이 최종 출력. axios의 res를 떠올려.
    return Response.json(data);
}



export async function POST(req){
    const {name,email,id} = await req.json();
    // console.log(name,email,contents);
    // 웹에서 저장버튼 누르면 터미널에 해당 입력값이 뜸.
    const data = await queryExecute(`insert into member (id,name,email) values (?,?,?)`,[id,name,email])

    
    return Response.json([]);
}



//예를들어 axios.get('/abc') 라고 하면 저 위의 GET()함수가 실행