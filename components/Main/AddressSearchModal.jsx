import React, { useState, useCallback, useEffect } from 'react';
import Modal from '../Ui/Modal';
import axios from 'axios';
import styled from 'styled-components';
import { VscClose } from 'react-icons/vsc';

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: right;
  margin-bottom: 1rem;
  font-size: 1.6rem;
`;

const Input = styled.input`
  box-sizing: border-box;
  margin: 0;
  display: inline-block;
  width: 100%;
  min-width: 0;
  padding: 0.25rem 0.75rem;
  color: rgba(0, 0, 0, 0.85);
  font-size: 0.875rem;
  background-color: #fff;
  border: 1px solid #cccccc;
  border-radius: 2px;
  outline: none;
  height: 2rem;
`;

const Content = styled.div`
  width: 50vw;
  height: 40vh;
  display: flex;
  flex-direction: column;
`;

const ScrollView = styled.div`
  overflow-y: scroll;
  flex: 1;
`;

const StyledUl = styled.ul`
  list-style: none;
  padding: 0;
`;

const StyledLi = styled.li`
  font-weight: 300;
  p {
    margin: 0;
  }
  padding-bottom: 0.4rem;
  margin-bottom: 0.8rem;
  border-bottom: 1px solid #eee;
`;

const AddressSearchModal = ({ closeHandler, onSelectHandler }) => {
  const [addressQuery, setAddressQuery] = useState('');
  const [tmpAddressQuery, setTmpAddressQuery] = useState(addressQuery);
  const [addressData, setAddressData] = useState([]);

  const onChangeAddressQuery = useCallback((event) => {
    setTmpAddressQuery(event.target.value);
  }, []);

  useEffect(() => {
    const debounce = setTimeout(() => {
      return setAddressQuery(tmpAddressQuery);
    }, 300);

    return () => clearTimeout(debounce);
  }, [tmpAddressQuery]);

  useEffect(() => {
    const requestAddressSearch = async () => {
      const response = await axios.get(
        `api/address/search?address=${encodeURIComponent(addressQuery)}`
      );

      setAddressData(response.data.searchAddressList);
    };

    if (!!addressQuery) {
      requestAddressSearch();
    } else {
      setAddressData([]);
    }
  }, [addressQuery]);

  return (
    <Modal>
      <Header>
        {closeHandler && <VscClose onClick={closeHandler} size={24} />}
      </Header>
      <Content>
        <Input
          type="text"
          placeholder="주소를 검색해주세요."
          value={tmpAddressQuery}
          onChange={onChangeAddressQuery}
        />
        <ScrollView>
          <StyledUl>
            {addressData.map((data) => (
              <StyledLi
                key={`${data.x} ${data.y}`}
                onClick={onSelectHandler.bind(this, data)}
              >
                <p>{data.address}</p>
                {data.loadAddress && <p>{data.loadAddress} </p>}
              </StyledLi>
            ))}
          </StyledUl>
        </ScrollView>
      </Content>
    </Modal>
  );
};

export default AddressSearchModal;
