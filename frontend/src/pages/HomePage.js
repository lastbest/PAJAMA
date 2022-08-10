import React, { useState } from 'react';
import NavBar from '../components/nav/NavBar';
import HomeCarousel from '../components/homecarousel/HomeCarousel';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const CreateBtn = styled.div`
    display: flex;
    justify-content: center;
`;

const StyledBtn = styled.button`
    text-align:center;
    width: 200px;
    height: 70px;
    border: none;
    border-radius: 15px;
    font-size: 25px;
    font-weight: bold;
    font-family:'BRITANIC';
    outline: none;
    cursor: pointer;
    background: #FD7A99;
    &:hover {
        background: #FFA4BD;
    }
    margin: 2rem;
`

const Img = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
`

const Text = styled.div`
    display: flex;
    justify-content: center;
    font-family: "star";
    font-size: x-large;
`

const HomePage = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let token = sessionStorage.getItem('accessToken')

    return (
        <div>
            <NavBar></NavBar>
            <HomeCarousel></HomeCarousel>
            <CreateBtn>
                <StyledBtn variant="primary" onClick={
                    ()=>{
                        if(!token){
                            handleShow()
                        } else {
                            document.location.href="/createparty"
                        }
                    }
                    }>
                    CREATE PARTY
                </StyledBtn>
            </CreateBtn>
            <Text>파자마만의 서비스</Text>
            <Img>
                <img src="/maintext2.png" style={{width:'80%'}}/>
            </Img>
            <Img>
                <img src="/설명1.png" style={{width:'50%'}}/>
            </Img>
            <Img>
                <img src="/설명2.png" style={{width:'50%'}}/>
            </Img>
            <Img>
                <img src="/설명3.png" style={{width:'50%'}}/>
            </Img>

            <Modal
                centered
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title style={{'font-family':'star'}}>PAZAMA</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{'font-family':'oldpicture', 'font-size':'20px'}}>
                로그인이 필요한 서비스입니다.
                </Modal.Body>
                <Modal.Footer>
                <Button style={{'color':'black', 'backgroundColor':'#FFA4BD', 'border':'none','font-family':'oldpicture', 'box-shadow':'none' }} onClick={()=>{document.location.href='/register'}}>회원가입</Button>
                <Button style={{'color':'black', 'backgroundColor':'#FD7A99', 'border':'none','font-family':'oldpicture', 'box-shadow':'none' }} onClick={()=>{document.location.href='/login'}}>로그인</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
};

export default HomePage;