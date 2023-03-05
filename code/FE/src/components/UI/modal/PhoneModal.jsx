import React from 'react';
import ReactDOM from 'react-dom';

import styled, { keyframes } from 'styled-components';

const ModalOverlay = (props) => {
  return (
    <ModalStyle>
      <ModalContentStyle onClick={props.onClose}>
        {props.children}
      </ModalContentStyle>
    </ModalStyle>
  );
};

const portalElement = document.getElementById('modal-root');

const Modal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </React.Fragment>
  );
};

export default Modal;

const ModalStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 30;
  background-color: rgba(0, 0, 0, 0.3);
`;

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-3rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ModalContentStyle = styled.div`
  width: 80rem;
  height: 40rem;
  background-color: white;
  padding: 27px;
  border-radius: 13px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  animation: ${slideDown} 300ms ease-out forwards;
`;
