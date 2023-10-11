"use client"
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function List() {
    const [data,setData] = useState([])
    
    const getData = ()=>{
        axios.get('/api')
        .then(res=>{
            setData(res.data);
        })
    }

    const del = (num)=>{
        axios.delete(`/api/${num}`)
        .then(res=>{
            setData(res.data);
    })
    }

    const edit = (num)=>{
        axios.put(`/api/${num}`,{name:'홍홍힝'})
        .then(res=>{
            setData(res.data);
    })
    }
    
    useEffect(()=>{
        getData();
    },[])

    return (
        <>
        <div>List</div>
        {
            data.map(obj => (
                <li key={obj.num}>
                    아이디:{obj.id} /
                    이름:{obj.name} /
                    메일:{obj.email} /
                    <button onClick={()=>{del(obj.num)}}>삭제</button>
                    <button onClick={()=>{edit(obj.num)}}>수정</button>
                </li>
            ))
        }
            <Link href="/">HOME</Link>
            <Link href="/pages/insert">글작성</Link>
        </>
    )
}
