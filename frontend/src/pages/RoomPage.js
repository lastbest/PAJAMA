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
    <div className={styles.container}>
      <div>
        <Counter className={styles.counter} />
      </div>
      <div>
        <Button className={styles.button}>입장하기</Button>
      </div>
    </div>
  );
};

export default RoomPage;
