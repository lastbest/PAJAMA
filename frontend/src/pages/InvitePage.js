import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./InvitePage.css";
import axios from "axios";

const InvitePage = () => {
  let token = sessionStorage.getItem("accessToken");
  let [nickname, setNickname] = useState("");
  let [room_idx, setRoomidx] = useState("");
  let { roomIdx } = useParams();

  // useEffect(() => {
  //   axios({
  //     url: "http://i7c203.p.ssafy.io:8082/lettters/{room_idx}",
  //     method: "get",
  //     params: { nickname: nickname, room_idx:room_idx },
  //   })
  //     .then((res) => {
  //       setNickname(res.data.result.nickname);
  //       setRoomidx(res.data.result.room_idx);
  //     })
  // }, []);

  return (
    <>
      <a href="/" className="letterheader">
        <img
          className="headerlogo"
          src="/pazamafont.png"
          alt="logo"
          width="120px"
          height="60px"
        ></img>
      </a>
      <p className="Main">{nickname}님의 파티에 초대받으셨습니다.</p>
      <div className="partyinfo">
        <p>파티제목</p>
        <p>파티정보</p>
        <p>파티날짜</p>
      </div>
      <div className="lettercontainer">
        <img src="/letter.png" style={{ width: "60%", height: "60%" }}></img>
      </div>
      {token !== "undefined" && token ? (
        <>
          <a href={`/room/${roomIdx}`} className="clicklink">
            JOIN PARTY
          </a>
        </>
      ) : (
        <>
          <a href={`/login/${roomIdx}`} className="clicklink">
            로그인이 필요합니다!
          </a>
        </>
      )}
    </>
  );
};

export default InvitePage;
