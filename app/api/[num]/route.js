import { queryExecute } from "../db";


export async function DELETE(req, {params}){
    console.log(req);
    
    const data = await queryExecute(`delete from member where num=?`,[params.num])
    const getData = await queryExecute(`select * from member`,[])

    // const data = await queryExecute('SELECT * from member')
    return Response.json(getData);
}



export async function PUT(req, {params}){
    
    const data = await req.json();
    const q = await queryExecute(`update member set name=? where num=?`,[data.name,params.num])

    const getData = await queryExecute(`select * from member`,[]);


    return Response.json(getData);
}
