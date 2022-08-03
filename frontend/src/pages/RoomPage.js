import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import styles from "./RoomPage.module.css";
import Button from "../components/common/Button";
import FadeInOut from "../components/common/FadeInOut";
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
    alert("로그인이 필요한 서비스입니다.");
    navigate("/login");
  } else {
    setInterval(function () {
      var today = new Date().getTime();
      var gap = dday - today;
      var day = Math.ceil(gap / (1000 * 60 * 60 * 24));
      var hour = Math.ceil((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var min = Math.ceil((gap % (1000 * 60 * 60)) / (1000 * 60));
      var sec = Math.ceil((gap % (1000 * 60)) / 1000);
      document.getElementById("counter").innerHTML =
        "D-" +
        day.toString().padStart(2, "0") +
        " : " +
        hour.toString().padStart(2, "0") +
        " : " +
        min.toString().padStart(2, "0") +
        " : " +
        sec.toString().padStart(2, "0");
    }, 1000);
  }

  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);

  const [show2, setShow2] = useState(false);
  const toggleShow2 = () => setShow2(!show2);

  const [show3, setShow3] = useState(false);
  const toggleShow3 = () => setShow3(!show3);

  function cake1Show() {
    const cake1 = document.getElementById("cake1");

    if (cake1.style.display === "none") {
      cake1.style.display = "";
    } else {
      cake1.style.display = "none";
    }
  }

  function cake2Show() {
    const cake2 = document.getElementById("cake2");

    if (cake2.style.display === "none") {
      cake2.style.display = "";
    } else {
      cake2.style.display = "none";
    }
  }

  function heartShow() {
    const heart = document.getElementById("heart");

    if (heart.style.display === "none") {
      heart.style.display = "";
    } else {
      heart.style.display = "none";
    }
  }

  function iloveyouShow() {
    const iloveyou = document.getElementById("iloveyou");

    if (iloveyou.style.display === "none") {
      iloveyou.style.display = "";
    } else {
      iloveyou.style.display = "none";
    }
  }

  function eighteenShow() {
    const eighteen = document.getElementById("eighteen");

    if (eighteen.style.display === "none") {
      eighteen.style.display = "";
    } else {
      eighteen.style.display = "none";
    }
  }

  return (
    <>
      <div className={styles.container}>
        <div>
          <div id="counter" className={styles.counter} />
          <div>
            <Button className={styles.button}>입장하기</Button>
          </div>
        </div>
      </div>
      <div>
        <OpenVideo />
      </div>
      <button onClick={toggleShow}>
        {show ? "하트촛불끄기" : "하트촛불켜기"}
      </button>
      <button onClick={toggleShow2}>
        {show2 ? "알러뷰촛불끄기" : "알러뷰촛불켜기"}
      </button>
      <button onClick={toggleShow3}>
        {show3 ? "18촛불끄기" : "18촛불켜기"}
      </button>
      <button onClick={cake1Show}>케이크1</button>
      <button onClick={cake2Show}>케이크2</button>
      <button onClick={heartShow}>하트초</button>
      <button onClick={iloveyouShow}>Iloveyou초</button>
      <button onClick={eighteenShow}>18th초</button>
      <div className="text-center">
        <img
          id="cake1"
          src="/cake1.png"
          style={{
            width: "500px",
            height: "500px",
            "margin-left": "-50px",
            display: "none",
          }}
          alt="cake1"
        />
      </div>
      <div className="text-center">
        <img
          id="cake2"
          src="/cake2.png"
          style={{
            width: "500px",
            height: "400px",
            "margin-top": "200px",
            display: "none",
          }}
          alt="cake2"
        />
      </div>
      <div className="text-center">
        <img
          id="heart"
          src="/heart.png"
          style={{
            width: "100px",
            height: "200px",
            "margin-top": "-800px",
            display: "none",
          }}
          alt="heart"
        />
        <img
          id="iloveyou"
          src="/iloveyou.png"
          style={{
            width: "220px",
            height: "100px",
            "margin-top": "-700px",
            display: "none",
          }}
          alt="love"
        />
        <img
          id="eighteen"
          src="/18th.png"
          style={{
            width: "150px",
            height: "150px",
            "margin-top": "-750px",
            display: "none",
          }}
          alt="eighteen"
        />
      </div>

      {/* 하트초 */}
      <div className="text-center">
        <FadeInOut show={show} duration={500}>
          <img
            id="heartfire"
            src="/fire.gif"
            style={{
              width: "100px",
              height: "100px",
              "margin-left": "0px",
              "margin-top": "-1050px",
            }}
            alt="fire"
          />
        </FadeInOut>
      </div>
      {/* iloveyou초 */}
      <div
        id="iloveyoufire"
        className="text-center"
        style={{ marginLeft: "-340px" }}
      >
        <FadeInOut show={show2} duration={500}>
          <img
            src="/fire.gif"
            style={{
              width: "70px",
              height: "70px",
              "margin-left": "345px",
              "margin-top": "-890px",
            }}
            alt="fire1"
          />
          <img
            src="/fire.gif"
            style={{
              width: "70px",
              height: "70px",
              "margin-left": "-28px",
              "margin-top": "-890px",
            }}
            alt="fire2"
          />
          <img
            src="/fire.gif"
            style={{
              width: "70px",
              height: "70px",
              "margin-left": "-5px",
              "margin-top": "-900px",
            }}
            alt="fire3"
          />
          <img
            src="/fire.gif"
            style={{
              width: "70px",
              height: "70px",
              "margin-left": "-43px",
              "margin-top": "-900px",
            }}
            alt="fire4"
          />
          <img
            src="/fire.gif"
            style={{
              width: "70px",
              height: "70px",
              "margin-left": "-25px",
              "margin-top": "-900px",
            }}
            alt="fire5"
          />
        </FadeInOut>
      </div>
      {/* eighteen초 */}
      <div className="text-center">
        <FadeInOut show={show3} duration={500}>
          <img
            id="eighteenfire"
            src="/fire.gif"
            style={{
              width: "100px",
              height: "100px",
              "margin-left": "-15px",
              "margin-top": "-1010px",
            }}
            alt="fire"
          />
        </FadeInOut>
      </div>
    </>
  );
};

export default RoomPage;
