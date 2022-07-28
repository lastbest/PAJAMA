import React, { useEffect } from 'react';
import NavBar from '../components/nav/NavBar';
import HomeCarousel from '../components/homecarousel/HomeCarousel';
import styled from 'styled-components';

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
    return (
        <div>
            <NavBar></NavBar>
            <HomeCarousel></HomeCarousel>
            <CreateBtn>
                <a href='/createparty'><StyledBtn>START PARTY</StyledBtn></a>
            </CreateBtn>
        </div>
    )
};

export default HomePage;