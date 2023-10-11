import { queryExecute } from "../../db";

//워크벤치에 있는 데이터 꺼내오기
export async function GET() {
    const q = 'select * from files'
    const data = await queryExecute(q)
    return Response.json(data);
}

//워크벤치로 받아오기
export async function POST(req) {
    const {title, imgUrl} = await req.json();
    const q = 'insert into files (title,imgUrl) values (?,?)'

    // const imgUrl = req.nextUrl.searchParams.get('imgUrl');
    // console.log(title, imgUrl);
    // nextjs에서 데이터를 받아올때 사용하는 메소드가 get이다.
    await queryExecute(q,[title, imgUrl])

    return Response.json({done:'성공!!!'});
}
