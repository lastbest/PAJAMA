import React from "react";
import styled from "styled-components";
import Counter from "../components/common/Counter";
import styles from "./RoomPage.module.css";
import Button from "../components/common/Button";

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
    <div className="text-center" style={{}}>
      <img src="/cake1.png" style={{"width":"500px", "height":"500px", "margin-left":"-250px"}} alt="cake1"/>
      <img src="/heart.png" style={{"width":"100px", "height":"200px", "margin-left":"-280px", "margin-top":"-200px",}} alt='heart' />
      <img src="/iloveyou.png" style={{"width":"220px", "height":"100px", "margin-left":"-340px", "margin-top":"-150px","display":"none"}} alt='love' />
      <img src="/fire.gif" style={{"width":"100px", "height":"100px", "margin-left":"-98px", "margin-top":"-400px", }} alt='fire' />
    </div>
    </>
  );
};

export default RoomPage;
