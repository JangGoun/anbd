import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const GoogleMaps = () => {
  const navigate = useNavigate();

  const [selectedLocation, setSelectedLocation] = useState(""); // 선택된 좌표 상태변수 추가
  
  const GoWrite = (pageType) => {
    if (selectedLocation) {
        let path = '/product/write';
        if (pageType === 'update') {
            path = '/product/update';
        }
        navigate(path, { state: {
            location: selectedLocation
        }});  // 선택된 좌표와 함께 적절한 페이지로 이동
    } else {
        alert("위치를 선택해주세요!");
    }
};


  const mapRef = useRef(null);
  const markerRef = useRef(null);
  
  const initMap = useCallback(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 37.49943, lng: 127.0359 }, // 학원좌표
      zoom: 19,
    });
    
    // 클릭이벤트리스너 추가
    map.addListener("click", (event) => {
      addMarker(event.latLng, map);
      setSelectedLocation({
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      }); // 클릭한 좌표를 상태 변수에 설정
    });
  }, []);
  
  // 마커 추가
  const addMarker = (location, map) => {
    // 이전의 마커가 존재하는 경우 제거
    if(markerRef.current){
      markerRef.current.setMap(null);
    }
    const marker = new window.google.maps.Marker({
      position:location,
      map: map,
    });
    marker.addListener("click", () => {
      // 클릭한 좌표(더블클릭 해야 함)
      console.log(`lat:${marker.getPosition().lat()}, lng:${marker.getPosition().lng()}`);
    })
    // 새로운 마커를 참조에 할당
    markerRef.current = marker;
  }
  
  useEffect(() => {
    initMap();
  }, [initMap]);

  return (
    <div>
    <div
      className="map"
      style={{ width: "1000px", height: "750px" }}
      ref={mapRef}
    ></div>
      <Button variant="outline-dark mt-3" onClick={GoWrite}>선택 완료</Button>
    </div>
  );
}

export default GoogleMaps;