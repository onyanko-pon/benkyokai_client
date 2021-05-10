import { useEffect, useState } from "react";
import { Jumbotron, Button } from "react-bootstrap";
import Link from "next/link";

export default function Index() {

  return <Jumbotron className={'mt-4'}>
    <h1>Slackチームの<br />イベント管理</h1>
    <p className={'mt-4'}>
      Slackのワークスペース単位でイベントが管理できます。
    </p>
    <p>
      <Link href={"/users/signin"} >
        <Button variant="outline-primary">サインイン / サインアップ</Button>
      </Link>
    </p>
  </Jumbotron>
}
