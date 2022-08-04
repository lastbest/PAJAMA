import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import styles from "./RoomPage.module.css";
import OpenVideo from "../components/openvidu/OpenVideo";

const Header = styled.div`
  display: grid;
  grid-template-columns: 10% 10% 10% 10%;
  justify-content: space-around;
  text-align: center;
  background-color: #ffe9ef;
  img {
    margin-top: 10px;
  }
  height: 70px;
  padding: 3px;
`;

const StyledBtn = styled.button`
  width: 100px;
  height: 70px;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: bold;
  outline: none;
  cursor: pointer;
  background: none;
  &:hover {
    background: #ffa4bd;
  }
`;

const RoomPage = () => {
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  var dday = new Date("August 30, 2022, 0:00:00").getTime();
  useEffect(() => {
    setToken(sessionStorage.getItem("accessToken"));
    console.log(token);
  }, []);
  if (token === null) {
    // alert("로그인이 필요한 서비스입니다.");
    // navigate("/login");
  } else {
    // setInterval(function () {
    //   var today = new Date().getTime();
    //   var gap = dday - today;
    //   var day = Math.ceil(gap / (1000 * 60 * 60 * 24));
    //   var hour = Math.ceil((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    //   var min = Math.ceil((gap % (1000 * 60 * 60)) / (1000 * 60));
    //   var sec = Math.ceil((gap % (1000 * 60)) / 1000);
    //   document.getElementById("counter").innerHTML =
    //     "D-" +
    //     day.toString().padStart(2, "0") +
    //     " : " +
    //     hour.toString().padStart(2, "0") +
    //     " : " +
    //     min.toString().padStart(2, "0") +
    //     " : " +
    //     sec.toString().padStart(2, "0");
    // }, 1000);
  }

  return (
    <>
      <div className={styles.container}>
        <div>
          {/* <div id="counter" className={styles.counter} /> */}
        </div>
      </div>
      <div>
        <OpenVideo />
      </div>
    </>
  );
};

export default RoomPage;
