import React from 'react';
import styled from 'styled-components';

const Backdrop = styled.div`
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
`;

const Content = styled.div`
  position: fixed;
  z-index: 200;
  border: 1px solid #eee;
  box-shadow: 0 2px 2px #ccc;
  background-color: white;
  padding: 1rem;
  box-sizing: border-box;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Modal = ({ children }) => {
  return (
    <Backdrop>
      <Content>{children}</Content>
    </Backdrop>
  );
};

export default Modal;
