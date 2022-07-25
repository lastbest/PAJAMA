import React from 'react';
import styled from 'styled-components';

const AuthTemplateBlock = styled.div`
    
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    right:0;
    background : white;
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
`;

const Whitebox = styled.div`
    .logo-area {
        display: block;
        padding-bottom: 2rem;
        object-fit:fill;

    }
    /* 윤곽선 4면 전부 그림자로 입체감줌 */
    box-shadow: 0 0 8px rgba(0,0,0,0.025);
    padding: 2rem;
    width: 360px;
    background: #FDF1F3;
    border-radius: 20px;
`;

const AuthTemplate = ({children}) => {
    return (
        <AuthTemplateBlock>
            <Whitebox>

            {children}
            </Whitebox>
        </AuthTemplateBlock>
    )
}

export default AuthTemplate;