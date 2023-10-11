import Insert from '@/app/comp/Insert'
import Link from 'next/link'
import React from 'react'

export default function insert() {
    return (
        <>
            <h2>insert..비주얼..설명..</h2>
            <Insert/>

            <Link href="/">HOME</Link>
            <Link href="./list">List보기</Link>
        </>
    )
}
