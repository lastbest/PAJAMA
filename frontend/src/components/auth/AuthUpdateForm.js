import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, Params, useNavigate } from "react-router-dom";
import Button from "../common/Button";
import axios from "axios";
import styles from "./AuthUpdateForm.module.css";

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
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
  outline: none;
  width: 100%;
  display: flex;
  font-family:"oldpicture";
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid #fd7a99;
  }
  & + & {
    margin-top: 1rem;
  }
`;

const ButtonWithMarinTop = styled(Button)`
  margin-top: 1rem;
`;

const StyleButton = styled.button`
  margin-top: 4px;
  border: none;
  border-radius: 10px;
  font-size: 0.8rem;
  font-family: "oldpicture";
  height: 2rem;
  color: black;
  outline: none;
  cursor: pointer;
  display: inline;
  margin-left: -70px;
  background: #fd7a99;
  &:hover {
    background: #ffa4bd;
  }
`;

const AuthUpdateForm = () => {
  let token = sessionStorage.getItem("accessToken");
  useEffect(() => {
    axios({
      url: "http://i7c203.p.ssafy.io:8082/users/me",
      method: "get",
      headers: { accessToken: token },
    })
      .then((res) => {
        console.log(res);
        setEmail(res.data.result.email);
        setTel(res.data.result.tel);
        setName(res.data.result.name);
        setNickname(res.data.result.nickname);
        console.log(credentials);
      })
      .catch(() => {
        alert("불러오기 실패");
      });
  }, []);

  let [credentials, setCredentials] = useState({
    email: "",
    tel: "",
    pwd: "",
    nickname: "",
    name: "",
  });
  let [pwd1, setPwd1] = useState("");
  let [paw2, setPaw2] = useState("");
  let [tel, setTel] = useState("");
  let [email, setEmail] = useState("");
  let [name, setName] = useState("");
  let [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    if (paw2 === pwd1) {
      if (pwd1.length < 6 || pwd1.length > 16) {
        alert("비밀번호는 6~16자리로 설정해야 합니다.");
      } else {
        let countNum = 0;
        let countEng = 0;
        let i = 0;
        for (i = 0; i < pwd1.length; i++) {
          if (pwd1.charAt(i) >= "A" && pwd1.charAt(i) <= "z") {
            countEng++;
          } else if (pwd1.charAt(i) >= "0" && pwd1.charAt(i) <= "9") {
            countNum++;
          }
        }
        if (countEng === 0 || countNum === 0) {
          alert("비밀번호는 숫자와 영문자를 혼용하여야 합니다.");
        } else {
          setCredentials(
            (credentials.email = email),
            (credentials.pwd = pwd1),
            (credentials.name = name),
            (credentials.nickname = nickname),
            (credentials.tel = tel)
          );

          axios({
            url: "http://i7c203.p.ssafy.io:8082/users",
            method: "put",
            data: credentials,
            headers: { accessToken: token },
          })
            .then((res) => {
              if (res.data.result === "success") {
                sessionStorage.clear();
                window.alert("회원정보수정 성공");
                navigate("/");
              }
            })
            .catch(() => {
              alert("회원정보수정 실패");
              navigate("/mypage/update");
            });
        }
      }
    } else {
      alert("비밀번호가 일치하지 않습니다.");
      navigate("/mypage/update");
    }
  }

  const confirmDelete = () => {
    if (window.confirm("정말 삭제합니까?")) {
      alert("삭제되었습니다.");
      axios({
        url: "http://i7c203.p.ssafy.io:8082/users",
        method: "delete",
        headers: { accessToken: token },
      })
        .then((res) => {
          if (res.data.result === "success") {
            window.alert("계정 삭제 성공");
            sessionStorage.clear();
            navigate("/");
          } else {
            window.alert("삭제 실페.");
          }
        })
        .catch(() => {
          alert("삭제 실패");
        });
    } else {
      alert("취소합니다.");
    }
  };

  return (
    <AuthFormBlock>
      <h3 className={styles.h3}>회원정보수정</h3>
      <ButtonWithMarinTop onClick={confirmDelete} className={styles.button}>
        회원탈퇴
      </ButtonWithMarinTop>
      <form onSubmit={onSubmit}>
        <div className="d-flex">
          <StyledInput
            autoComplete="email"
            name="email"
            placeholder=" 이메일"
            type="email"
            onInput={(event) => {
              setEmail(event.target.value);
            }}
            value={email}
            disabled
          />
        </div>
        <StyledInput
          autoComplete="current-password"
          name="password"
          placeholder=" 비밀번호"
          type="password"
          onInput={(event) => {
            setPwd1(event.target.value);
          }}
          required
        />
        <StyledInput
          autoComplete="new-password"
          name="passwordConfirm"
          placeholder=" 비밀번호 확인"
          type="password"
          onChange={(event) => {
            setPaw2(event.target.value);
          }}
          required
        />
        <StyledInput
          autoComplete="name"
          name="name"
          placeholder=" 이름"
          onInput={(event) => {
            setName(event.target.value);
          }}
          value={name}
          required
        />
        <StyledInput
          autoComplete="tel"
          name="tel"
          placeholder=" 전화번호"
          onInput={(event) => {
            setTel(event.target.value);
          }}
          value={tel}
          required
        />
        <StyledInput
          autoComplete="nickname"
          name="nickname"
          placeholder=" 닉네임"
          onInput={(event) => {
            setNickname(event.target.value);
          }}
          value={nickname}
          required
        />
        <ButtonWithMarinTop fullWidth>회원정보수정</ButtonWithMarinTop>
      </form>
    </AuthFormBlock>
  );
};

export default AuthUpdateForm;
