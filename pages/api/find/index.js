import axios from 'axios';

const handler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      /*
      참고 문서
       - https://developers.kakao.com/docs/latest/ko/local/dev-guide#search-by-keyword
      */
      try {
        const response = await axios.get(
          `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(
            `${req.query.address} 카페`
          )}&page=45`,
          {
            headers: {
              Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_KEY}`,
            },
          }
        );

        const data = response.data.documents;
        if (!data || !data.length) {
          return res.status(200).json({ list: [] });
        }

        const excludeNotCafe = data.filter(
          (d) => d.category_group_code === 'CE7'
        );

        const formatData = excludeNotCafe.map((d) => {
          const obj = {
            id: d.id,
            address: d.address_name,
            roadAddress: d.road_address_name,
            phone: d.phone,
            placeName: d.place_name,
            placeURL: d.place_url,
            x: d.x,
            y: d.y,
          };

          return obj;
        });

        res.status(200).json({ list: formatData });
      } catch (error) {
        return res.status(500).json({ message: '데이터가 없습니다.' });
      }
      break;
  }
};

export default handler;
