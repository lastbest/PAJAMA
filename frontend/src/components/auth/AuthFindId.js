import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Button from "../common/Button";
import axios from "axios";
import { useState } from "react";

const AuthFormBlock = styled.div`
  h3 {
    margin: 0;
    color: black;
    margin-bottom: 1rem;
    font-family: "star";
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

const AuthFindId = () => {
  let [tel, setTel] = useState("");

  return (
    <AuthFormBlock>
      <h3>아이디 찾기</h3>
      <form>
        <StyledInput
          autoComplete="tel"
          name="tel"
          placeholder=" 전화번호"
          onInput={(event) => {
            setTel(event.target.value);
          }}
        />

        <ButtonWithMarinTop
          fullWidth
          onClick={(e) => {
            e.preventDefault();

            axios({
              url: "http://localhost:8080/users/findEmail",
              method: "get",
              params: { tel: tel },
            })
              .then((res) => {
                alert(res.data.result);
              })
              .catch(() => {
                alert("전화번호를 확인해주세요.");
              });
          }}
        >
          아이디 찾기
        </ButtonWithMarinTop>
      </form>
      <Footer>
        <Link to="/findId" className="link">
          아이디찾기
        </Link>
        <span>|</span>
        <Link to="/findPwd" className="link">
          비밀번호찾기
        </Link>
        <span>|</span>
        <Link to="/register" className="link">
          회원가입
        </Link>
      </Footer>
    </AuthFormBlock>
  );
};

export default AuthFindId;
