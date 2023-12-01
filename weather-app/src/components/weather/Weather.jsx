import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherInfo = ({ onWeatherUpdate }) => {
	const [weatherData, setWeatherData] = useState({
		locationName: '',
		temperature: null, // 'currentTemp' 대신 'temperature' 사용
		weatherDescription: '',
		minTemp: null,
		maxTemp: null,
		precipitation: null,
		uvIndex: null,
	});
	const [isLoading, setIsLoading] = useState(true);

	const OPEN_WEATHER_MAP_API_KEY =
		process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY;
	const WEATHER_API_ENDPOINT =
		'https://api.openweathermap.org/data/2.5/weather';
	const ONE_CALL_API_ENDPOINT =
		'https://api.openweathermap.org/data/2.5/onecall';

	// 현재 위치 가져오기
	const getCurrentLocation = () => {
		return new Promise((resolve, reject) => {
			if ('geolocation' in navigator) {
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
				reject(new Error('Geolocation is not supported by this browser.'));
			}
		});
	};

	// 날씨 데이터 가져오기
	const fetchWeatherData = async (lat, lon) => {
		setIsLoading(true);
		try {
			const response = await axios.get(WEATHER_API_ENDPOINT, {
				params: {
					lat: lat,
					lon: lon,
					appid: OPEN_WEATHER_MAP_API_KEY,
					units: 'metric',
					lang: 'kr',
				},
			});

			const locationName = response.data.name;
			const temperature = response.data.main.temp; // 온도
			const weatherDescription = response.data.weather[0].description;

			const oneCallResponse = await axios.get(ONE_CALL_API_ENDPOINT, {
				params: {
					lat: lat,
					lon: lon,
					exclude: 'current,minutely,hourly,alerts',
					appid: OPEN_WEATHER_MAP_API_KEY,
					units: 'metric',
					lang: 'kr',
				},
			});

			const dailyData = oneCallResponse.data.daily[0];

			setWeatherData({
				locationName,
				temperature, // 'currentTemp' 대신 'temperature' 사용
				weatherDescription,
				minTemp: dailyData.temp.min,
				maxTemp: dailyData.temp.max,
				precipitation: dailyData.rain ? dailyData.rain['1h'] : 0,
				uvIndex: dailyData.uvi,
			});

			// 외부 컴포넌트에 현재 온도 전달
			onWeatherUpdate(temperature);
		} catch (error) {
			console.error('Error fetching weather data:', error);
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
				console.error('Error getting user location:', error);
				setIsLoading(false);
			}
		};

		loadWeatherData();
	}, []);

	if (isLoading) {
		return <div>날씨 데이터를 불러오는 중입니다...</div>;
	}

	return (
		<div>
			<p>
				{typeof weatherData.temperature === 'number'
					? weatherData.temperature.toFixed(1)
					: 'N/A'}
				°C
			</p>
		</div>
	);
};

export default WeatherInfo;
