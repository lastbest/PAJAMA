import React, { Component } from "react";
import styled from "styled-components";

const Username = styled.p`
  color: #FD7A99;
  font-size: 0.8rem;
  font-weight: 600;
  margin:0px;
`;

const MessageContainer = styled.div`
  width: 90%;
`;

const Text = styled.p`
  font-size: 1rem;
  background-color: white;
  border-radius: 10px;
  word-break: break-all;
  padding-left:5px;
  padding-right:5px;
  justify-content:center;
`;

class Message extends Component {
  render() {
    const { text, userName } = this.props;

    return (
      <MessageContainer>
        <Username>{userName}</Username>
        <Text>{text}</Text>
      </MessageContainer>
    );
  }
}

export default Message;
