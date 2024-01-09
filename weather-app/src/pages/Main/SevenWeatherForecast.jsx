import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherDays from "../../components/main/WeatherDays";

const SevenWeatherForecast = () => {
  const [forecastData, setForecastData] = useState([]);
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

  const fetchForecastData = async (lat, lon) => {
    setIsLoading(true);
    try {
      const response = await axios.get(process.env.ONE_CALL_API_ENDPOINT, {
        params: {
          lat: lat,
          lon: lon,
          exclude: "current,minutely,hourly,alerts",
          appid: process.env.OPEN_WEATHER_MAP_API_KEY,
          units: "metric",
          lang: "En",
        },
      });

      const dailyData = response.data.daily.slice(1, 7); // 7일간의 데이터
      setForecastData(
        dailyData.map((day) => ({
          date: new Date(day.dt * 1000).toLocaleDateString(), // 날짜
          weatherDescription: day.weather[0].description,

          minTemp: day.temp.min, // 최저 기온
          maxTemp: day.temp.max, // 최고 기온
        }))
      );
    } catch (error) {
      console.error("Error fetching forecast data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const loadForecastData = async () => {
      try {
        const { lat, lon } = await getCurrentLocation();
        await fetchForecastData(lat, lon);
      } catch (error) {
        console.error("Error getting user location:", error);
        setIsLoading(false);
      }
    };

    loadForecastData();
  }, []);

  if (isLoading) {
    return <div> </div>;
  }

  return (
    <div>
      <WeatherDays forecastData={forecastData} />
    </div>
  );
};

export default SevenWeatherForecast;
