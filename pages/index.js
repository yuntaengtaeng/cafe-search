import HeaderMain from '../components/Ui/Header/HeaderMain';
import styled from 'styled-components';

import Map from '../components/Main/Map';

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
  return (
    <>
      <HeaderMain></HeaderMain>
      <Section>
        <Left></Left>
        <Right>
          <Map></Map>
        </Right>
      </Section>
    </>
  );
};

export default Home;
