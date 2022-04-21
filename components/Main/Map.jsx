import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Map = ({ address, setAddress, setShowPlaceList }) => {
  const [myLocation, setNyLocation] = useState(null);
  const [placeData, setPlaceData] = useState([]);
  const [map, setMap] = useState(null);

  useEffect(() => {
    const searchCoordInateToAddress = async () => {
      try {
        const response = await axios(
          `api/address/reverse-geocode?longitude=${myLocation.longitude}&latitude=${myLocation.latitude}`
        );

        setAddress(response.data.address);
      } catch (error) {
        setAddress('');
      }
    };

    if (!!myLocation) {
      searchCoordInateToAddress();
    }
  }, [myLocation, setAddress]);

  useEffect(() => {
    const searchAddressPlace = async () => {
      try {
        const response = await axios(`api/find?address=${address}`);
        setPlaceData(response.data.list);
      } catch (error) {
        setPlaceData([]);
      }
    };

    if (!!address) {
      searchAddressPlace();
    }
  }, [address]);

  const getLocation = () => {
    // 위치추적에 성공했을때 위치 값을 넣어줍니다.
    const success = (position) => {
      setNyLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    };

    // 위치 추적에 실패 했을때 초기값을 넣어줍니다.
    const error = () => {
      setNyLocation({ latitude: 37.4979517, longitude: 127.0276188 });
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (!!myLocation) {
      initMap();
    }
  }, [myLocation]);

  const initMap = () => {
    const mapVal = new naver.maps.Map('map', {
      center: new naver.maps.LatLng(myLocation.latitude, myLocation.longitude),
      zoomControl: true,
    });

    naver.maps.Event.addListener(mapVal, 'idle', () => {
      const { _lat, _lng } = mapVal.getCenter();
      setNyLocation({ latitude: _lat, longitude: _lng });
    });

    setMap(mapVal);
  };

  useEffect(() => {
    if (!!map) {
      const mapBounds = map.getBounds();
      const reflectPlace = [];

      placeData.forEach((place) => {
        const position = {
          y: place.y,
          x: place.x,
        };

        if (mapBounds.hasLatLng(position)) {
          const marker = new naver.maps.Marker({
            position: new naver.maps.LatLng(place.y, place.x),
            map: map,
            title: place.placeName,
          });
          reflectPlace.push(place);
        }
      });

      setShowPlaceList(reflectPlace);
    }
  }, [map, placeData, setShowPlaceList]);

  return (
    <div
      id="map"
      style={{
        width: '100%',
        height: '100%',
      }}
    ></div>
  );
};

export default Map;
