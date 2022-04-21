import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  border-bottom: 1px solid #eee;
  padding: 1rem 1.2rem;
`;

const Title = styled.p`
  font-weight: 500;
  font-size: 1.1rem;
  margin: 0 0 1rem 0;
`;

const Address = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.8rem;

  p {
    margin: 0;
  }
`;

const Phone = styled.p`
  color: #258fff;
`;

const Item = ({ item }) => {
  console.log(item);
  return (
    <Card>
      <Title>{item.placeName}</Title>
      <Address>
        <p>{item.address}</p>
        <p>{item.roadAddress}</p>
      </Address>
      <Phone>{item.phone}</Phone>
    </Card>
  );
};

export default Item;
