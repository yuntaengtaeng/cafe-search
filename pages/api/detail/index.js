import puppeteer from 'puppeteer';
import { load } from 'cheerio';

const handler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      const addressId = req.query.addressId;

      if (!addressId) {
        return res.status(200).json({
          message: '찾을 수 없습니다.',
        });
      }

      try {
        const browser = await puppeteer.launch({});

        const page = await browser.newPage();
        await page.setViewport({
          width: 1366,
          height: 768,
        });

        await page.goto(`https://place.map.kakao.com/${addressId}`, {
          waitUntil: 'networkidle2',
          timeout: 2500,
        });

        const content = await page.content();

        const $ = load(content);

        const placeName = $('.tit_location').text();
        const loadAddress = $('.txt_address').text();
        const address = $('.txt_addrnum').text().replace('지번', '');
        const openingTime = $('.txt_operation').text();
        const imgElem = $('.bg_present');

        const extractLoadAddress = loadAddress
          .replace(/(?:\r\n|\r|\n)/g, '')
          .split('')
          .filter((v, i) => {
            const left = i === 0 ? true : loadAddress.charAt(i - 1).trim();
            const right =
              i === loadAddress.length
                ? true
                : loadAddress.charAt(i + 1).trim();

            return !!left || !!right;
          })
          .join('');

        let imageURL;

        if (!!imgElem['0']) {
          imageURL = imgElem['0'].attribs.style.replace(
            /background-image:url\('\/\/|'\)/g,
            ''
          );
        }

        const detailData = {
          placeName,
          address,
          loadAddress: extractLoadAddress,
          ...(!!openingTime && {
            openingTime,
          }),
          ...(!!imageURL && {
            imageURL,
          }),
        };

        res.status(200).json({ detailData });
      } catch (error) {
        res.status(500).json({ message: '상세 정보를 찾지 못 했습니다.' });
      }
  }
};

export default handler;
