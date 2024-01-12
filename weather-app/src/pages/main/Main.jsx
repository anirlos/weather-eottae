import React, { useState, useEffect } from "react";

import styled from "styled-components";
import DayWaether from "../../components/main/DayWeather";
import DayClothes from "../../components/main/DayClothes";
import WeatherDays from "../../components/main/WeatherDays";
import Header from "../../components/header/Header";
import axios from "axios";
import Loading from "../../components/loading/Loading";
import SevenWeatherForecast from "./SevenWeatherForecast";
import Layout from "../../components/layout/Layout";
import { mediaQueries } from "../../styles/MediaStyle";

import { BREAKPOINT_TABLET, BREAKPOINT_PHONE } from "../../styles/MediaStyle";

const Main = () => {
  const [weatherData, setWeatherData] = useState({
    locationName: "",
    currentTemp: null,
    weatherDescription: "",
    minTemp: null,
    maxTemp: null,
    precipitation: null,
    uvIndex: null,
  });
  // const [forecastData, setForecastData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            });
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        reject(new Error("Geolocation is not supported by this browser."));
      }
    });
  };

  const fetchWeatherData = async (lat, lon) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        process.env.REACT_APP_WEATHER_API_ENDPOINT,
        {
          params: {
            lat: lat,
            lon: lon,
            appid: process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY,
            units: "metric",
            lang: "En",
          },
        }
      );

      const locationName = response.data.name;
      const currentTemp = response.data.main.temp;
      const weatherDescription = response.data.weather[0].description;

      const oneCallResponse = await axios.get(
        process.env.REACT_APP_ONE_CALL_API_ENDPOINT,
        {
          params: {
            lat: lat,
            lon: lon,
            exclude: "current,minutely,hourly,alerts",
            appid: process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY,
            units: "metric",
            lang: "kr",
          },
        }
      );

      const dailyData = oneCallResponse.data.daily[0];

      setWeatherData({
        locationName,
        currentTemp,
        weatherDescription,
        minTemp: dailyData.temp.min,
        maxTemp: dailyData.temp.max,
        precipitation: dailyData.rain ? dailyData.rain["1h"] : 0,
        uvIndex: dailyData.uvi,
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const loadWeatherData = async () => {
      try {
        const { lat, lon } = await getCurrentLocation();
        await fetchWeatherData(lat, lon);
      } catch (error) {
        console.error("Error getting user location:", error);
        setIsLoading(false);
      }
    };

    loadWeatherData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Layout>
      <Header />
      <Wrap>
        <DayWrap>
          <DayWaether weatherData={weatherData} />
          <DayClothes weatherData={weatherData} />
        </DayWrap>
        <SevenDayWrap>
          <SevenWeatherForecast />
        </SevenDayWrap>
      </Wrap>
    </Layout>
  );
};

export default Main;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const DayWrap = styled.div`
  display: flex;
  justify-content: space-around;

  //미디어 쿼리 모바일은 세로로 바꾸기!
  ${mediaQueries(BREAKPOINT_TABLET)} {
    flex-direction: column;
    justify-content: center;
    margin-left: 10%;
    gap: 15px;
  }
`;

const SevenDayWrap = styled.div``;
