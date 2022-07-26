import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import axios from "axios";
import { useState } from "react";

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
  & + & {
    margin-top: 1rem;
  }
`;

const Footer = styled.div`
    display: felx;
    justify-content: center;
    margin-top: 1rem;
    a {
        color : #9D9D9D;
        text-decoration: none;
        &:hover{
            color: #FD7A99}
        }

    }
    .link {
      margin-right: 5px;
      margin-left: 5px;
    }
    span {
      color : #9D9D9D;
    }

`;

const ButtonWithMarinTop = styled(Button)`
  margin-top: 1rem;
`;

const AuthForm = () => {
  let [credentials, setCredentials] = useState({ username: "", password: "" });
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  //   let [userid, setUserid] = useState({ id: "" });
  //   setUserid(userid.id="11");
  return (
    <AuthFormBlock>
      <h3>로그인</h3>
      <form>
        <StyledInput
          autoComplete="username"
          name="username"
          placeholder=" 이메일"
          onInput={(event) => {
            setUsername(event.target.value);
          }}
        />

        <StyledInput
          autoComplete="current-password"
          name="password"
          placeholder=" 비밀번호"
          type="password"
          onInput={(event) => {
            setPassword(event.target.value);
          }}
        />

        <ButtonWithMarinTop
          fullWidth
          onClick={() => {
            setCredentials((credentials.username = username));
            setCredentials((credentials.password = password));
            axios({
              url: "http://localhost:9999/happyhouse/user/login",
              method: "post",
              data: { id: "11", password: "11" },
            })
              .then((res) => {
                console.log(res.data["access-token"]);
                let token = res.data["access-token"];
                localStorage.setItem("token", token);
                alert("로그인 성공하였습니다.");
              })
              .catch(() => {
                console.log("로그인 실패");
              });
          }}
        >
          로그인
        </ButtonWithMarinTop>
      </form>
      <Footer>
        <Link to="/" class='link'>HOME</Link>
        <span>|</span>
        <Link to="/register" class='link'>회원가입</Link>
        <span>|</span>
        <Link to="/login" class='link'>로그인</Link>
      </Footer>
    </AuthFormBlock>
  );
};

export default AuthForm;
