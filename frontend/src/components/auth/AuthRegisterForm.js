import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import axios from "axios";

const AuthFormBlock = styled.div`
  h3 {
    margin: 0;
    color: black;
    margin-bottom: 1rem;
  }
`;

const StyledInput = styled.input`
  border-radius: 10px;
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid #ffe9ef;
  padding-top: 0.7rem;
  padding-bottom: 0.7rem;
  outline: none;
  width: 100%;
  display: flex;

  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid #fd7a99;
  }
  /* Scss 에서 쓰는 요소가 서로 반복될 때 margin-top 을 줌 >>> input 과 input 사이에 margin-top 줌. */
  & + & {
    margin-top: 1rem;
  }
`;

const Footer = styled.div`
    margin-top: 1rem;
    text-align: center;
    a {
        color : #9D9D9D;
        text-decoration: none;
        &:hover{
            color: #FD7A99}
        }
        padding: 2px;
    }

`;

const ButtonWithMarinTop = styled(Button)`
  margin-top: 1rem;
`;

const AuthRegisterForm = () => {
  let [credentials, setCredentials] = useState({
    userEmail: "",
    password: "",
    userName: "",
    userNickname: "",
  });
  let [password1, setPassword1] = useState("");
  let [password2, setPassword2] = useState("");

  let [userEmail, setUserEmail] = useState("");
  let [userName, setUserName] = useState("");
  let [userNickname, setUserNickname] = useState("");
  function onSubmit() {
    if (password2 === password1) {
      if (password1.length < 6 || password1.length > 16) {
        alert("비밀번호는 6~16자리로 설정해야 합니다.");
      } else {
        let countNum = 0;
        let countEng = 0;
        let i = 0;
        for (i = 0; i < password1.length; i++) {
          if (password1.charAt(i) >= "A" && password1.charAt(i) <= "z") {
            countEng++;
          } else if (password1.charAt(i) >= "0" && password1.charAt(i) <= "9") {
            countNum++;
          }
        }
        if (countEng === 0 || countNum === 0) {
          alert("비밀번호는 숫자와 영문자를 혼용하여야 합니다.");
        } else {
          setCredentials(
            (credentials.userEmail = userEmail),
            (credentials.password = password1),
            (credentials.userName = userName),
            (credentials.userNickname = userNickname)
          );
          console.log(credentials);
          alert("환영합니다.");
        }
      }
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  }
  return (
    <AuthFormBlock>
      <h3>회원가입</h3>
      <form onSubmit={onSubmit}>
        <StyledInput
          autoComplete="userEmail"
          name="userEmail"
          placeholder=" 이메일"
          type="email"
          onInput={(event) => {
            setUserEmail(event.target.value);
          }}
          required
        />
        <StyledInput
          autoComplete="current-password"
          name="password"
          placeholder=" 비밀번호"
          type="password"
          onInput={(event) => {
            setPassword1(event.target.value);
          }}
          required
        />
        <StyledInput
          autoComplete="new-password"
          name="passwordConfirm"
          placeholder=" 비밀번호 확인"
          type="password"
          onChange={(event) => {
            setPassword2(event.target.value);
          }}
          required
        />
        <StyledInput
          autoComplete="userName"
          name="userName"
          placeholder=" 이름(선택)"
          onInput={(event) => {
            setUserName(event.target.value);
          }}
        />
        <StyledInput
          autoComplete="userNickname"
          name="userNickname"
          placeholder=" 닉네임"
          onInput={(event) => {
            setUserNickname(event.target.value);
          }}
          required
        />
        <ButtonWithMarinTop
          fullWidth
          onClick={() => {
            //     setCredentials((credentials.username = username));
            //     setCredentials((credentials.password = password));
            axios({
              url: "http://localhost:9999/happyhouse/user",
              method: "post",
              data: {
                email: "16@16",
                id: "16",
                name: "16",
                password: "16",
                tel: "16",
              },
            })
              .then((res) => {
                console.log(res.data);
                alert("로그인 성공하였습니다.");
              })
              .catch(() => {
                console.log("로그인 실패");
              });
          }}
        >
          회원가입
        </ButtonWithMarinTop>
      </form>
      <Footer>
        <Link to="/">HOME</Link>
        <Link to=""> | </Link>
        <Link to="/register"> 회원가입</Link>
        <Link to=""> | </Link>
        <Link to="/login">로그인</Link>
      </Footer>
    </AuthFormBlock>
  );
};

export default AuthRegisterForm;
