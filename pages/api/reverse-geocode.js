import axios from 'axios';
import util from 'util';

const handler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      const { longitude, latitude } = req.query;

      try {
        const response = await axios.get(
          `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=${`${longitude},${latitude}`}&orders=roadaddr&output=json`,
          {
            headers: {
              'X-NCP-APIGW-API-KEY-ID': process.env.NEXT_PUBLIC_NAVER_MAP_ID,
              'X-NCP-APIGW-API-KEY': process.env.NEXT_PUBLIC_NAVER_MAP_SECRET,
            },
          }
        );

        const result = response.data.results[0];

        if (!result) {
          return res.status(500).json({ message: '주소를 찾지 못 했습니다.' });
        }

        const region = result.region;

        const address = ['area1', 'area2', 'area3']
          .reduce((address, key) => {
            if (!!region[key] && !!region[key].name) {
              address.push(region[key].name);
            }
            return address;
          }, [])
          .join(' ');

        res.status(200).json({ address });
      } catch (error) {
        res.status(500).json({ message: '주소를 찾지 못 했습니다.' });
      }

      break;
  }
};

export default handler;
