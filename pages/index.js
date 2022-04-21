import HeaderMain from '../components/Ui/Header/HeaderMain';
import styled from 'styled-components';
import React, { useState } from 'react';
import Map from '../components/Main/Map';
import ListGroup from '../components/Main/ListGroup';

const Section = styled.section`
  display: flex;
  width: 100vw;
  height: calc(100vh - 56px);
`;

const Left = styled.div`
  flex: 0.3;
  height: 100%;
  overflow-y: scroll;
`;

const Right = styled.div`
  flex: 0.7;
`;

const Home = () => {
  const [address, setAddress] = useState('');
  const [showPlaceList, setShowPlaceList] = useState([]);

  return (
    <>
      <HeaderMain address={address}></HeaderMain>
      <Section>
        <Left>
          <ListGroup list={showPlaceList} />
        </Left>
        <Right>
          <Map
            address={address}
            setAddress={setAddress}
            setShowPlaceList={setShowPlaceList}
          ></Map>
        </Right>
      </Section>
    </>
  );
};

export default Home;
