import axios from 'axios';

const handler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      if (typeof req.query.address !== 'string' || !req.query.address) {
        return res.status(400).json({ message: '잘못된 요청입니다.' });
      }
      try {
        const address = decodeURIComponent(req.query.address);
        const {
          data: { documents = [] },
        } = await axios({
          url: 'https://dapi.kakao.com/v2/local/search/keyword.json',
          method: 'get',
          headers: {
            Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_KEY}`,
          },
          params: {
            query: address,
          },
        });

        const searchAddressList = documents.reduce(
          (searchAddressList, addressData) => {
            const loadAddress = addressData.road_address_name;

            const obj = {
              address: addressData.address_name,
              ...(!!loadAddress && {
                loadAddress,
              }),
              x: addressData.x,
              y: addressData.y,
            };

            searchAddressList.push(obj);

            return searchAddressList;
          },
          []
        );
        res.status(200).json({ searchAddressList });
      } catch (error) {
        res.status(500).json({ message: '서버요청에 실패하였습니다.' });
      }
  }
};

export default handler;
