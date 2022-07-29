import React from "react";
import styled from "styled-components";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  background-color: #ffe9ef;
  padding: 0px 30px;
  font-size: 18px;

  a {
    font-family: "star";
    text-decoration: none;
    color: black;
  }

  .nav_menu {
    display: flex;
    list-style: none;
    padding-left: 0px;
    padding-top: 10px;
  }
  .nav_menu li {
    padding: 8px 12px;
  }
  .nav_menu :hover {
    color: #fd7a99;
  }
`;

const NavBar = () => {
  let token = sessionStorage.getItem("accessToken");
  return (
    <Header>
      <logo>
        <a href="/">
          <img
            src="/pazamafont.png"
            alt="logo"
            width="150px"
            height="75px"
          ></img>
        </a>
      </logo>
      <ul class="nav_menu">
        <li>
          <a href="/">HOME</a>
        </li>
        {token !== "undefined" && token ? (
          <>
            <li>
              <a href="/mypage">마이페이지</a>
            </li>
            <li>
              <a
                href="/"
                onClick={() => {
                  // sessionStorage.setItem("accessToken", "");
                  sessionStorage.clear();
                }}
              >
                로그아웃
              </a>
            </li>
          </>
        ) : (
          <>
            <li>
              <a href="/register">회원가입</a>
            </li>
            <li>
              <a href="/login">로그인</a>
            </li>
          </>
        )}
      </ul>
    </Header>
  );
};

export default NavBar;
