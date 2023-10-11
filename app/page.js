import Link from "next/link";
import Upload from "./comp/Upload";

export default function Home() {

  // let testEnv = process.env.NODE_HOST

  return (
    <>
      {/* {testEnv} */}

      <h1>MariaDB CRUD</h1>
        <Link href="./pages/insert">글작성</Link>
        <Link href="./pages/list">리스트</Link>
      <hr />
        <Upload />
    </>
  )
}
