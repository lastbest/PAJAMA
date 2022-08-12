import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./InvitePage.css";
import axios from "axios";
import { BrowserView, MobileView } from 'react-device-detect';
import NavBar from "../components/nav/NavBar";


const InvitePage = () => {
  let token = sessionStorage.getItem("accessToken");
  let [partyNickname, setPartyNickname] = useState("");
  let [partyName, setPartyName] = useState("");
  let [partyDesc, setPartyDesc] = useState("");
  let [partyDate, setPartyDate] = useState("");
  let { roomIdx } = useParams();

  useEffect(() => {
    axios({
      url: "http://i7c203.p.ssafy.io:8082/rooms",
      method: "get",
      headers: { accessToken: token },
      params: { roomIdx:roomIdx },
    })
      .then((res) => {
        setPartyNickname(res.data.result.partyNickname);
        setPartyName(res.data.result.partyName);
        setPartyDesc(res.data.result.partyDesc);
        setPartyDate(res.data.result.partyDate);
      })
  }, []);


  return (
    <>
    <MobileView>
      <a href="/" className="letterheader">
        <img
          className="headerlogo"
          src="/pazamafont.png"
          alt="logo"
          width="120px"
          height="60px"
        ></img>
      </a>
      <p className="Main">{partyNickname}님의 파티에 초대받으셨습니다.</p>
      <div className="partyinfo">
        <p style={{color:"#FD7A99", fontSize:"large", fontWeight:"bold"}}>{partyName}</p>
        <p>{partyDesc}</p>
        <p>{partyDate}</p>
      </div>
      <div className="lettercontainer">
        <img src="/letter.png" style={{ width: "60%", height: "60%",maxWidth: '1024px' }}></img>
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

    </MobileView>

    <BrowserView>
    <NavBar></NavBar>
      <p className="Main2">{partyNickname}님의 파티에 초대받으셨습니다.</p>
      <div className="partyinfo2">
        <p style={{color:"#FD7A99", fontSize:"large", fontWeight:"bold"}}>{partyName}</p>
        <p>{partyDesc}</p>
        <p>{partyDate}</p>
      </div>
      <div className="lettercontainer2">
        <img src="/letter.png" style={{ width: "20%", height: "20%" }}></img>
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
    </BrowserView>
    </>
  );
};

export default InvitePage;
