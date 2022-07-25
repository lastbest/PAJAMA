import React from 'react';
// css import
import styled,{css} from 'styled-components';

// button styling
const StyledButton = styled.button`
  border: none;
  border-radius: 10px; /* 둥근 사각형 */
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: black;
  outline: none;
  cursor: pointer;
  
  background: #FD7A99;
  &:hover {
    background: #FFA4BD;
  }
  /* fullWidth props =ture */
  ${props =>
  props.fullWidth &&
  css`
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  width: 100%;
  font-size: 1.125rem;
  `
  }
   /* fullWidth cyan =ture */
  ${
    props =>
    props.cyan &&
    css`
    background: cyan;
    &:hover{
      background: cyan;
    }
    `

  }
`;

const Button = (props) => {
  return <StyledButton {...props} />;
};

export default Button;