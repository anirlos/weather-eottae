import React, { useState, useEffect } from "react";

import styled from "styled-components";
import DayWaether from "../../components/main/DayWeather";
import DayClothes from "../../components/main/DayClothes";
import WeatherDays from "../../components/main/WeatherDays";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import { coordinates } from "../../api/coordinatesApi";
import axios from "axios";

const Main = () => {
  // const [location, setLocation] = useState({
  //   coordinate: { lat: 0, lng: 0 },
  //   error: "",
  // });

  // const onError = (error: { code?: number; message: any }) => {
  //   setLocation({
  //     coordinate: { lat: 0, lng: 0 },
  //     error: error.message, // 에러 메시지 저장
  //   });
  // };

  // useEffect(() => {
  //   if (!("geolocation" in navigator)) {
  //     onError({
  //       code: 0,
  //       message: "Geolocation not supported",
  //     });
  //   } else {
  //     navigator.geolocation.getCurrentPosition(function (pos) {
  //       console.log(pos);
  //       const latitude = pos.coords.latitude;
  //       const longitude = pos.coords.longitude;
  //       console.log("현재 위치는 : " + latitude + ", " + longitude);
  //       setLocation({
  //         coordinate: { lat: latitude, lng: longitude },
  //         error: "",
  //       });
  //       console.log(location);
  //     });
  //   }
  // }, []);

  // useEffect(() => {
  //   coordinates(location);
  //   console.log(location);
  // }, []);

  return (
    <>
      <Header />
      <StMain>
        <div className="daywaether">
          <DayWaether />
          <DayClothes />
        </div>

        <WeatherDays />
      </StMain>
    </>
  );
};

export default Main;

const StMain = styled.div`
  width: 100%;
  margin: 0 auto;
  height: 830px;

  .daywaether {
    display: flex;
    justify-content: center;
    gap: 4%;
  }
`;
