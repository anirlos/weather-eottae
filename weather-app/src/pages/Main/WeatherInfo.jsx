import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherInfo = () => {
	const [weatherData, setWeatherData] = useState({
		locationName: '',
		minTemp: null,
		maxTemp: null,
		precipitation: null,
		uvIndex: null,
	});
	const [isLoading, setIsLoading] = useState(true); // isLoading 상태와 설정 함수

	const OPEN_WEATHER_MAP_API_KEY = 'dcd4cc7754eeecc0a0b7ba1260ac6f25';
	const WEATHER_API_ENDPOINT =
		'https://api.openweathermap.org/data/2.5/weather';
	const ONE_CALL_API_ENDPOINT =
		'https://api.openweathermap.org/data/2.5/onecall';

	// 현재 위치 정보 가져오기
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
			// 위치명을 가져오는 API 호출
			const response = await axios.get(WEATHER_API_ENDPOINT, {
				params: {
					lat: lat,
					lon: lon,
					appid: OPEN_WEATHER_MAP_API_KEY,
					units: 'metric',
					lang: 'kr',
				},
			});

			const locationName = response.data.name; // 도시 이름

			// One Call API로부터 날씨 데이터를 가져오는 API 호출
			const oneCallResponse = await axios.get(ONE_CALL_API_ENDPOINT, {
				params: {
					lat: lat,
					lon: lon,
					exclude: 'current,minutely,hourly,alerts', // 필요하지 않은 데이터 제외
					appid: OPEN_WEATHER_MAP_API_KEY,
					units: 'metric',
					lang: 'kr',
				},
			});

			const dailyData = oneCallResponse.data.daily[0]; // 현재 날짜에 대한 데이터

			setWeatherData({
				locationName,
				minTemp: dailyData.temp.min,
				maxTemp: dailyData.temp.max,
				precipitation: dailyData.rain ? dailyData.rain['1h'] : 0, // 강수량이 없는 경우 0으로 설정
				uvIndex: dailyData.uvi,
			});
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
			<h2>오늘의 날씨 정보</h2>
			{weatherData.locationName && <p>위치: {weatherData.locationName}</p>}
			<p>
				최저 기온:{' '}
				{weatherData.minTemp ? weatherData.minTemp.toFixed(1) : 'N/A'}°C
			</p>
			<p>
				최고 기온:{' '}
				{weatherData.maxTemp ? weatherData.maxTemp.toFixed(1) : 'N/A'}°C
			</p>
			<p>강수량: {weatherData.precipitation}mm</p>
			<p>자외선 지수: {weatherData.uvIndex}</p>
		</div>
	);
};

export default WeatherInfo;
