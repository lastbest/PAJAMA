import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const AuthFormBlock = styled.div`
    h3{
        margin: 0;
        color: black;
        margin-bottom: 1rem;
    }
`;

const StyledInput = styled.input`
    border-radius: 10px;
    font-size:1rem;
    border:none;
    border-bottom: 1px solid #FFE9EF;
    padding-bottom: 1rem;
    outline: none;
    width: 100%;
    display:flex;

    &:focus{
        color: $oc-teal-7;
        border-bottom:1px solid #FD7A99 ;
    }
    /* Scss 에서 쓰는 요소가 서로 반복될 때 margin-top 을 줌 >>> input 과 input 사이에 margin-top 줌. */
    &+&{
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



const AuthRegisterForm = ({type}) => {

    return (
        <AuthFormBlock>
            <h3>회원가입</h3>
            <form>
                <StyledInput 
                autoComplete="username" 
                name="username" 
                placeholder="아이디"
                 />

                <StyledInput 
                autoComplete="current-password" 
                name="password" 
                placeholder="비밀번호" 
                type="password"
                
                />

                <StyledInput 
                    autoComplete="new-password" 
                    name="passwordConfirm" 
                    placeholder="비밀번호 확인" 
                    type="password" 
                />

                <ButtonWithMarinTop fullWidth>회원가입</ButtonWithMarinTop>
            </form>
            <Footer>

                <Link to="/">HOME</Link>
                <Link to=''> | </Link>
                <Link to="/register"> 회원가입</Link>
                <Link to=''> | </Link>
                <Link to="/login">로그인</Link>

            </Footer>
        </AuthFormBlock>
    );
}

export default AuthRegisterForm;