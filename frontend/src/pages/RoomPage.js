import React, {useState} from "react";
import styled from "styled-components";
import Counter from "../components/common/Counter";
import styles from "./RoomPage.module.css";
import Button from "../components/common/Button";
import FadeInOut from "../components/common/FadeInOut";

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
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);

  const [show2, setShow2] = useState(false);
  const toggleShow2 = () => setShow2(!show2);

  function cake1Show() {
    const cake1 = document.getElementById("cake1")
    
    if (cake1.style.display === "none") {
      cake1.style.display = ""
    } else {
      cake1.style.display = "none"
    }
  }
  
  function cake2Show() {
    const cake2 = document.getElementById("cake2")
    
    if (cake2.style.display === "none") {
      cake2.style.display = ""
    } else {
      cake2.style.display = "none"
    }
  }
  
  function heartShow() {
    const heart = document.getElementById("heart")
    
    if (heart.style.display === "none") {
      heart.style.display = ""
    } else {
      heart.style.display = "none"
    }
  }

  function iloveyouShow() {
    const iloveyou = document.getElementById("iloveyou")
    
    if (iloveyou.style.display === "none") {
      iloveyou.style.display = ""
    } else {
      iloveyou.style.display = "none"
    }
  }

  return (
    <>
    <div className={styles.container}>
      <div>
        <Counter className={styles.counter} />
      </div>
      <div>
        <Button className={styles.button}>입장하기</Button>
      </div>

    </div>
    <button onClick={ toggleShow }>{show ? "하트촛불끄기" : "하트촛불켜기"}</button>
    <button onClick={ toggleShow2 }>{show2 ? "촛불끄기" : "촛불켜기"}</button>
    <button onClick={cake1Show}>케이크1</button>
    <button onClick={cake2Show}>케이크2</button>
    <button onClick={heartShow} >하트초</button>
    <button onClick={iloveyouShow} >Iloveyou초</button>
    <div className="text-center">
      <img id="cake1" src="/cake1.png" style={{"width":"500px", "height":"500px", "margin-left":"-50px","display":"none"}} alt="cake1"/>
    </div>
    <div className="text-center">
      <img id = "cake2" src="/cake2.png" style={{"width":"500px", "height":"400px", "margin-top":"200px","display":"none"}} alt="cake2"/>
    </div>
    <div className="text-center">
      <img id="heart" src="/heart.png" style={{"width":"100px", "height":"200px","margin-top":"-800px","display":"none"}} alt='heart' />
      <img id="iloveyou" src="/iloveyou.png" style={{"width":"220px", "height":"100px", "margin-top":"-700px","display":"none"}} alt='love' />
    </div>

    {/* 하트초 */}
    <div className="text-center">
      <FadeInOut show={show} duration={500}>
        <img id="heartfire"  src="/fire.gif" style={{"width":"100px", "height":"100px", "margin-left":"0px", "margin-top":"-1050px",}} alt='fire' /> 
      </FadeInOut>
    </div>
    {/* iloveyou초 */}
    <div id="iloveyoufire" className="text-center" style={{"marginLeft":"-340px"}}>
    <FadeInOut show={show2} duration={500}>
        <img src="/fire.gif" style={{"width":"70px", "height":"70px", "margin-left":"345px", "margin-top":"-890px"}} alt='fire1' /> 
        <img src="/fire.gif" style={{"width":"70px", "height":"70px", "margin-left":"-28px", "margin-top":"-890px"}} alt='fire2' /> 
        <img src="/fire.gif" style={{"width":"70px", "height":"70px", "margin-left":"-5px", "margin-top":"-900px"}} alt='fire3' /> 
        <img src="/fire.gif" style={{"width":"70px", "height":"70px", "margin-left":"-43px", "margin-top":"-900px"}} alt='fire4' /> 
        <img src="/fire.gif" style={{"width":"70px", "height":"70px", "margin-left":"-25px", "margin-top":"-900px"}} alt='fire5' /> 
      </FadeInOut>
    </div>
  </>
  );
};

export default RoomPage;
