import React, { useState } from "react";
import styled from "styled-components";
import 비 from "../../assets/img/main/비.png";
import 평균기온 from "../../assets/img/main/온도.png";
import 자외선 from "../../assets/img/main/자외선.png";
import 강수확률 from "../../assets/img/main/강수.png";
import axios from "axios";
import 해 from "../../assets/img/main/weatherIcon/해icon.png";
import 눈 from "../../assets/img/main/weatherIcon/눈icon.png";
import 번개 from "../../assets/img/main/weatherIcon/번개icon.png";
import 비내림 from "../../assets/img/main/weatherIcon/비icon.png";
import 약간흐림 from "../../assets/img/main/weatherIcon/약간흐림icon.png";
import 흐림 from "../../assets/img/main/weatherIcon/흐림icon.png";

export interface propsType {
  weatherData: {
    locationName: string;
    currentTemp: number;
    weatherDescription: string;
    minTemp: number;
    maxTemp: number;
    precipitation: number;
    uvIndex: number;
  };
}

const DayWaether = (props: propsType) => {
  //   const [weather, setWeather] = useState<CurrentWeather[]>([]);

  // useEffect(()=>{
  //   const getWeather
  // })
  const [icon, setIcon] = useState("");

  console.log(props);
  console.log(props.weatherData.minTemp);

  const minTemp = props.weatherData.minTemp;
  const maxTemp = props.weatherData.maxTemp;

  const avergeTemp = (minTemp + maxTemp) / 2;

  const weatherDescription = props.weatherData.weatherDescription;

  const weatherIcon = () => {
    if (weatherDescription.includes("sky")) {
      return <img src={해} />;
    } else if (weatherDescription.includes("few")) {
      return <img src={약간흐림} />;
    } else if (weatherDescription.includes("clouds")) {
      return <img src={흐림} />;
    } else if (weatherDescription.includes("rain")) {
      return <img src={비내림} />;
    } else if (weatherDescription.includes("thunderstorm")) {
      return <img src={번개} />;
    } else if (weatherDescription.includes("snow")) {
      return <img src={눈} />;
    } else {
      return <img src={해} />;
    }
  };

  console.log(icon);
  return (
    <DayWaetherWarp>
      <h2 className="title">오늘의 날씨</h2>
      {/* {props.weatherData.weatherDescription} */}

      <TodayWrap>
        <div className="weather-icon">{weatherIcon()}</div>
        <HighLowTemperatures>
          <div id="high">
            {props.weatherData.maxTemp
              ? props.weatherData.maxTemp.toFixed()
              : "N/A"}
            °
          </div>
          <div>━</div>
          <div id="low">
            {props.weatherData.minTemp
              ? props.weatherData.minTemp.toFixed()
              : "N/A"}
            °
          </div>
        </HighLowTemperatures>

        <div className="today-weather">
          {props.weatherData.currentTemp.toFixed()}°
        </div>
      </TodayWrap>
      <div className="weather__infos">
        <div className="weather__info--box">
          <p className="weather__info--title">평균기온</p>
          <img src={평균기온} />

          <p className="weather__info--value">{avergeTemp.toFixed()}°C</p>
        </div>
        <div className="weather__info--box">
          <p className="weather__info--title">자외선</p>
          <img src={자외선} />
          <p className="weather__info--value">{props.weatherData.uvIndex}</p>
        </div>
        <div className="weather__info--box">
          <p className="weather__info--title">강수량</p>
          <img src={강수확률} />
          <p className="weather__info--value">
            {props.weatherData.precipitation}mm
          </p>
        </div>
      </div>
    </DayWaetherWarp>
  );
};

export default DayWaether;

const DayWaetherWarp = styled.div`
  width: 470px;
  height: 500px;
  border-radius: 10px;
  box-shadow: 2px 4px 10px 0 #dcdbdb;
  background-color: white;
  text-align: center;
  .weather__info--title {
    font-size: large;

    margin: 10px 0 5px 0;
  }
  .weather__infos {
    display: flex;
    justify-content: space-around;
    align-items: center;
    img {
      width: 4.6rem;
      height: 4.6rem;
    }
  }
  .title {
    text-align: center;
    font-size: 24px;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .weather__info--box {
    width: 115px;
    height: 160px;
    box-shadow: 2px 4px 10px 0 #dcdbdb;
    border-radius: 10px;
  }
  .weather__info--value {
    margin: 5px;
  }
`;

const TodayWrap = styled.div`
  .weather-icon {
    margin-left: 20px;
    width: 240px;
    height: 170px;
  }
  display: flex;

  height: 230px;

  .today-weather {
    line-height: 150px;
    font-size: 64px;
    margin-left: 50px;
    padding-top: 5%;
  }
`;

const HighLowTemperatures = styled.div`
  height: 230px;
  padding-top: 15%;
  font-size: 10px;

  #high {
    color: #ff0000;
    font-size: 25px;
    /* border-bottom: 1px solid #dbdada; */
    padding-bottom: 5px;
  }
  #low {
    color: #5d6dbe;
    font-size: 25px;
    padding-top: 10px;
  }
`;
