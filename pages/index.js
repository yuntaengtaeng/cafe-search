import HeaderMain from '../components/Ui/Header/HeaderMain';
import styled from 'styled-components';
import React, { useState, useCallback } from 'react';
import Map from '../components/Main/Map';
import ListGroup from '../components/Main/ListGroup';
import AddressSearchModal from '../components/Main/AddressSearchModal';
import { useRouter } from 'next/router';

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
  const router = useRouter();
  const [address, setAddress] = useState('');
  const [showPlaceList, setShowPlaceList] = useState([]);
  const [isShowingModal, setIsShowingModal] = useState(false);
  const [myLocation, setNyLocation] = useState(null);

  const showModal = useCallback(() => {
    setIsShowingModal(true);
  }, []);

  const hideModal = useCallback(() => {
    setIsShowingModal(false);
  }, []);

  const onAddressSelect = useCallback((addressData) => {
    setNyLocation({ latitude: addressData.y, longitude: addressData.x });
  }, []);

  const onListItemClickHandler = useCallback(({ id }) => {
    router.push(`/detail/${id}`);
  }, []);

  return (
    <>
      <HeaderMain address={address} searchIconClickHandler={showModal} />
      <Section>
        <Left>
          <ListGroup
            list={showPlaceList}
            onClickHandler={onListItemClickHandler}
          />
        </Left>
        <Right>
          <Map
            address={address}
            myLocation={myLocation}
            setNyLocation={setNyLocation}
            setAddress={setAddress}
            setShowPlaceList={setShowPlaceList}
          ></Map>
        </Right>
      </Section>
      {isShowingModal && (
        <AddressSearchModal
          closeHandler={hideModal}
          onSelectHandler={onAddressSelect}
        />
      )}
    </>
  );
};

export default Home;
