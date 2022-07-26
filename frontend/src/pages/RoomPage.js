import React from 'react';
import styled from 'styled-components';


const Header = styled.div`
    display: grid;
    grid-template-columns: 10% 10% 10% 10%;
    justify-content: space-around;
    text-align: center;
    background-color: #FFE9EF;
    img {
        margin-top: 10px;
    }
    height: 70px;
    padding: 3px;
    
`;

const StyledBtn = styled.button`
    width: 100px;
    height: 70px;
    border: none;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: bold;
    outline: none;
    cursor: pointer;
    background: none;
    &:hover {
        background: #FFA4BD;
    }
`

const RoomPage = () => {
    return (
        <>
        <Header>
            <img src='/pazamafont.png' alt='logo' width='100px' height='50px'></img>
            <StyledBtn><img src='/love-letter.png' alt='letter' width='40px' height='40px'></img></StyledBtn>
            <StyledBtn><img src='/birthday-cake.png' alt='cake' width='40px' height='40px'></img></StyledBtn>
            <StyledBtn><img src='/camera.png' alt='camera' width='40px' height='40px'></img></StyledBtn>
        </Header>
        </>
    )
};

export default RoomPage;