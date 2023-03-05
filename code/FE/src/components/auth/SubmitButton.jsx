import React from 'react';
import styled, { css } from 'styled-components';

const SubmitButton = (props) => {
  return (
    <ButtonStyle {...props} onClick={props.move}>
      {props.children}
    </ButtonStyle>
  );
};

export default SubmitButton;

const ButtonStyle = styled.button`
  position: relative;
  border: none;
  min-width: 22rem;
  min-height: 50px;
  background: linear-gradient(90deg, #c5c7ff 0%, #b3a9e5 100%);
  border-radius: 1000px;
  color: #ffffff;
  cursor: pointer;
  box-shadow: 12px 12px 24px rgba(164, 141, 237, 0.64);
  font-weight: 700;
  font-size: 20px;
  transition: 0.3s;

  :hover {
    transform: scale(1.2);
  }

  :hover::after {
    content: '';
    width: 30px;
    height: 30px;
    border-radius: 100%;
    border: 6px solid #c5c7ff;
    position: absolute;
    z-index: -1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: ring 1.5s infinite;
  }

  @keyframes ring {
    0% {
      width: 30px;
      height: 30px;
      opacity: 1;
    }
    100% {
      width: 300px;
      height: 300px;
      opacity: 0;
    }
  }
`;
