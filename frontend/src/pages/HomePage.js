import React, { useEffect, useState } from 'react';
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

const HomePage = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let token = sessionStorage.getItem('accessToken')

    return (
        <div>
            <NavBar></NavBar>
            <HomeCarousel></HomeCarousel>
            {/* <CreateBtn>
                <a href='/createparty'><StyledBtn>START PARTY</StyledBtn></a>
            </CreateBtn> */}
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

            <Modal
                style={{'top':'200px'}}
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
                <Button variant='secondary' style={{'border':'none','font-family':'oldpicture'}} onClick={handleClose}>
                    Close
                </Button>
                <Button style={{'color':'black', 'backgroundColor':'#FD7A99', 'border':'none','font-family':'oldpicture', 'box-shadow':'none' }} onClick={()=>{document.location.href='/login'}}>로그인</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
};

export default HomePage;