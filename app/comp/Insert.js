"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react'


//폴더형식으로 구조를 잡고(pages폴더) 폼 형식을 컴포넌트화 해서 따로 작성(comp폴더).
//
export default function Insert() {
    const navi = useRouter();

    const insertFn = (e)=>{
        e.preventDefault();
        const formdata = new FormData(e.target);
        const values = Object.fromEntries(formdata);
        // console.log(values);
        // {name: '홍길동', email: 'hong@gmail.com', contents: '안녕하세요'}

        // api에 post로 보내줌
        axios.post('/api',values);
        //'저장'누를시 list 컴포넌트로 이동
        navi.push('./list');
    }

    return (
    <div>
    
        <form onSubmit={insertFn}>
            <p><input type='text' name='id' /></p>
            <p><input type='text' name='name' /></p>
            <p><input type='email' name='email' /></p>
            <p><input type='submit' value='저장' /></p>
        </form>
    
    </div>
    )
}
