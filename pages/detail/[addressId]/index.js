import axios from 'axios';
import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';

const Wrap = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #f3f3f3;
`;

const Top = styled.section`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;
  background-color: #fff;
`;

const ImgArea = styled.div`
  position: relative;
  width: 100%;
  min-height: 18.75rem;
`;

const CafeInfo = styled.div`
  text-align: center;
  box-shadow: 0 0.625rem 1.25rem rgba(0, 0, 0, 0.19),
    0 6px 6px rgba(0, 0, 0, 0.23);
  margin: -4rem auto 0;
  padding-bottom: 4px;
  z-index: 10;
  background-color: #fff;
  width: 80%;
`;

const CafeName = styled.h2`
  padding: 0.5rem 3.75rem 0;
  font-size: 2.75rem;
`;

const ReviewCount = styled.div`
  margin-bottom: 1.5rem;
  > span {
    color: blue;
  }
`;

const CafeDetail = styled.div`
  padding-top: 4rem;
  width: 80%;
  margin: 0 auto;
  > h3 {
    font-weight: bold;
  }
`;

const Bottom = styled.div``;

const Detail = ({ detailData = {} }) => {
  return (
    <Wrap>
      <Top>
        <ImgArea>
          {!!detailData.imageURL && (
            <Image
              src={`https://${detailData.imageURL}`}
              alt="logo"
              layout="fill"
              objectFit="cover"
            />
          )}
        </ImgArea>
        <CafeInfo>
          <CafeName>{detailData.placeName}</CafeName>
          <ReviewCount>
            리뷰 <span> {179} </span>
          </ReviewCount>
        </CafeInfo>
        <CafeDetail>
          <h3>상세정보</h3>
          <p>{detailData.loadAddress}</p>
          <p>{detailData.address}</p>
          <p>{detailData.openingTime}</p>
        </CafeDetail>
      </Top>
      <Bottom></Bottom>
    </Wrap>
  );
};

export const getStaticPaths = () => {
  return {
    fallback: true,
    paths: [],
  };
};

export const getStaticProps = async (context) => {
  const addressId = context.params.addressId;

  try {
    const {
      data: { detailData },
    } = await axios(`http://localhost:3000/api/detail?addressId=${addressId}`);
    return {
      props: {
        detailData,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default Detail;
