import React from 'react';
import styled from 'styled-components';


const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    background-color: #FFE9EF;
    padding: 0px 30px;

    a {
        text-decoration: none;
        color: black;
        font-weight: bold;
    }

    .nav_menu {
        display: flex;
        list-style: none;
        padding-left: 0px;
    }
    .nav_menu li {
        padding: 8px 12px;
    
    }
    .nav_menu :hover {
        color: #FD7A99;
    }
`;


const NavBar = () => {
    return (
        
        <Header>
            <logo>
                <img src='/pazamafont.png' alt='logo' width='150px' height='75px'></img>
            </logo>
            <ul class="nav_menu">
                <li><a href="/">HOME</a></li>
                <li><a href="/register">회원가입</a></li>
                <li><a href="/login">로그인</a></li>
                {/* {token ? (
                    <>
                    <li><a href="/">마이페이지</a></li>
                    <li onClink={}>로그아웃</a></li>
                    </>
                ) : (
                    <>
                    <li><a href="/register">회원가입</a></li>
                    <li><a href="/login">로그인</a></li>
                    </>
                )}      */}
            </ul>
        </Header>
      
    )
};

export default NavBar;