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
    font-family:"star";
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
  let [credentials, setCredentials] = useState({ email: "", pwd: "" });
  let [userEmail, setUserEmail] = useState("");
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
            setUserEmail(event.target.value);
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
          onClick={(e) => {
            e.preventDefault();
            setCredentials((credentials.email = userEmail));
            setCredentials((credentials.pwd = password));
            axios({
              url: "http://localhost:8080/auth/login",
              method: "post",
              data: credentials
            })
              .then((res) => {
                console.log(res.data);
                sessionStorage.setItem('accessToken',res.data.accessToken)
                document.location.href="/"
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
        <Link to="/" className='link'>HOME</Link>
        <span>|</span>
        <Link to="/register" className='link'>회원가입</Link>
        <span>|</span>
        <Link to="/login" className='link'>로그인</Link>
      </Footer>
    </AuthFormBlock>
  );
};

export default AuthForm;
