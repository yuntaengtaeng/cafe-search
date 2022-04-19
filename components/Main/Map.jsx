import React, { useEffect, useState } from 'react';

const Map = () => {
  const [myLocation, setNyLocation] = useState(null);

  const initMap = () => {
    new naver.maps.Map('map', {
      center: new naver.maps.LatLng(37.71344096516783, 126.8666797982575),
      zoomControl: true,
    });
  };

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
    if (!!myLocation)
      new naver.maps.Map('map', {
        center: new naver.maps.LatLng(
          myLocation.latitude,
          myLocation.longitude
        ),
        zoomControl: true,
      });
  }, [myLocation]);
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
