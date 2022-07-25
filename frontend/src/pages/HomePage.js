import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const Header = styled.div`
    text-align: center;
    background-color: #FFE9EF;

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

const HomePage = () => {
    return (
        <>
        <Header>
            <img src='/pazamafont.png' alt='logo' width='100px' height='50px'></img>
        </Header>
        <Footer>
            <Link to="/">HOME</Link>
            <Link to=''> | </Link>
            <Link to="/register"> 회원가입</Link>
            <Link to=''> | </Link>
            <Link to="/login">로그인</Link>
        </Footer>
        </>
    )
};

export default HomePage;