import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import axios from 'axios';
import { useState } from 'react';

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


const AuthForm = () => {
    let [credentials, setCredentials] = useState({username:'', password:''})
    let [username, setUsername] = useState('')
    let [password, setPassword] = useState('')
    
    return (
        <AuthFormBlock>
            <h3>로그인</h3>
            <form>

                <StyledInput 
                autoComplete="username" 
                name="username" 
                placeholder="아이디"
                onInput={(event)=>{
                    setUsername(event.target.value)
                  }}
                 />

                <StyledInput 
                autoComplete="current-password" 
                name="password" 
                placeholder="비밀번호" 
                type="password"
                onInput={(event)=>{
                    setPassword(event.target.value)
                  }}
                />

                <ButtonWithMarinTop fullWidth
                onClick={()=>{
                    setCredentials(credentials.username=username)
                    setCredentials(credentials.password=password)
                    axios({
                      url: 'http://127.0.0.1:8000/api/v1/accounts/login/',
                      method: 'post',
                      data: credentials
                    })
                    .then((res)=>{
                      console.log(res.data.key)
                      let token = res.data.ac
                      localStorage.setItem('token', token)
                      alert('로그인 성공하였습니다.')
                    })
                    .catch(()=>{
                      console.log('로그인 실패')
                    })
                  }}>로그인</ButtonWithMarinTop>
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

export default AuthForm;