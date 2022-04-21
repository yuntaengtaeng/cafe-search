import React from 'react';
import styled from 'styled-components';
import { VscSearch } from 'react-icons/vsc';

const Header = styled.header`
  width: 100vw;
  height: 3.5rem;
  background-color: #5dfda5;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;

  h3 {
    margin: 0 1rem 0 0;
  }
`;

const HeaderMain = ({ address }) => {
  return (
    <Header>
      <h3>{address}</h3>
      <VscSearch size={24} color="white"></VscSearch>
    </Header>
  );
};

export default HeaderMain;
