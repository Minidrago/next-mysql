"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Upload() {

    const [imageView, setImageView] = useState();
    const [data, setData] = useState([]);
    const [testBlob,setTestBlob] = useState()

    const uploadFile = (e)=>{
        e.preventDefault();
        const formdata = new FormData(e.target);
        const obj = Object.fromEntries(formdata);
        //console.log(obj);
        //{title: '', upload: File}
        //obj.upload를 코드화시킬것.
        const fr = new FileReader();
        //파일을 읽어오는 생성자 함수
        fr.readAsDataURL(obj.upload);
        //obj.upload라는 파일을 읽을꺼임.
        fr.addEventListener('load',()=>{
            console.log(fr.result,obj.title)
            //fr.result에 url값이 들어있음. 이게 이미지 자체라고 보면됨. 이미지 명은 obj.title
            axios.post('/api/upload/files',{
                title:obj.title,
                imgUrl:fr.result
            })
            //입력한 값을 post로 보냄.
        })

    }

    //데이터 불러오기
    const getFile = async ()=>{
        const d = await axios.get('/api/upload/files');

        const setD = d.data.map(obj=>{
            obj.imgUrl = base64Blob(obj.imgUrl);
            return obj;
        })
        setData(setD)
    }

    // bas64를 blob으로 변환해주는 함수
    function base64Blob(b64Data, contentType = '') {
        const image_data = atob(b64Data.split(',')[1]); // data:image/gif;base64 필요없으니 떼주고, base64 인코딩을 풀어준다
    
        const arraybuffer = new ArrayBuffer(image_data.length);
        const view = new Uint8Array(arraybuffer);
    
        for (let i = 0; i < image_data.length; i++) {
        view[i] = image_data.charCodeAt(i) & 0xff;
        // charCodeAt() 메서드는 주어진 인덱스에 대한 UTF-16 코드를 나타내는 0부터 65535 사이의 정수를 반환
        // 비트연산자 & 와 0xff(255) 값은 숫자를 양수로 표현하기 위한 설정
        }
    
        const blob = new Blob([arraybuffer], { type: contentType });
        return URL.createObjectURL(blob);
    }

    useEffect(()=>{
        getFile();
    },[])

    return (
        <div>
            <h2>파일업로드</h2>
            <form 
                onSubmit={uploadFile}
                method='post'
                encType='multipart/form-data'
            >
                <p><input type='text' name='title' /></p>
                <p>
                    <input type='file' name='upload'
                        onChange={(e)=>{
                            // console.log(e.target.files[0]);
                            // FileList {0: File, length: 1}
                            // 0: File {name: '5602813.jpg', lastModified: 1624208718000, lastModifiedDate: Mon Jun 21 2021 02:05:18 GMT+0900 (한국 표준시), webkitRelativePath: '', size: 140920, …}
                            // length : 1
                            //setImageView()
                            const file = e.target.files[0];
                            // 이미지에대한 경로를 URL로 생성. 매개변수에 제공된 객체를 나타내는 URL이 포함된 문자열을 생성
                            //file && => 파일이 존재하는경우 setImageView를 실행. 이미지등록시 취소버튼을 누르면 에러뜨는것 방지
                            file && setImageView( URL.createObjectURL(file) )
                        }}
                    />
                    <img src={imageView} width="200" />
                </p>
                <p><input type='submit' value='저장' /></p>
            </form>

        <img src={testBlob} />
            <div>
                {
                    data.map(obj=>(
                        <figure key={obj.num}>
                            <img src={obj.imgUrl} alt='' width='200' />
                            <figcaption>{obj.title}</figcaption>
                        </figure>
                    ))
                }
                
            </div>
        </div>
    )
}
